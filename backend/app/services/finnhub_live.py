import asyncio
import json
import os
from datetime import datetime, timezone
from math import sin
from urllib.parse import urlencode
from urllib.request import urlopen

FINNHUB_QUOTE_URL = "https://finnhub.io/api/v1/quote"
FINNHUB_WEBSOCKET_URL = "wss://ws.finnhub.io"
_QUOTE_CACHE: dict[str, dict[str, float | int | str]] = {}


def _mock_price(symbol: str) -> float:
    bias = sum(ord(char) for char in symbol.upper()) % 41
    minute = datetime.now(timezone.utc).minute
    return round(80 + bias + sin(minute / 5) * 1.75, 2)


def mock_live_quote(symbol: str) -> dict[str, float | int | str]:
    price = _mock_price(symbol)
    return {
        "symbol": symbol.upper(),
        "price": price,
        "open": round(price * 0.992, 2),
        "high": round(price * 1.014, 2),
        "low": round(price * 0.984, 2),
        "previous_close": round(price * 0.997, 2),
        "change": round(price * 0.003, 2),
        "percent_change": 0.3,
        "timestamp": int(datetime.now(timezone.utc).timestamp()),
        "source": "mock",
    }


def fetch_live_quote(symbol: str) -> dict[str, float | int | str]:
    """Fetch a latest quote from Finnhub, falling back to cached/mock prices."""
    normalized = symbol.upper()
    api_key = os.getenv("FINNHUB_API_KEY")
    if not api_key:
        return _QUOTE_CACHE.get(normalized) or mock_live_quote(normalized)

    url = f"{FINNHUB_QUOTE_URL}?{urlencode({'symbol': normalized, 'token': api_key})}"
    try:
        with urlopen(url, timeout=5) as response:
            payload = json.loads(response.read().decode("utf-8"))
        price = float(payload.get("c") or 0)
        if price <= 0:
            raise RuntimeError("Finnhub returned an empty quote")
        quote = {
            "symbol": normalized,
            "price": round(price, 2),
            "open": round(float(payload.get("o") or price), 2),
            "high": round(float(payload.get("h") or price), 2),
            "low": round(float(payload.get("l") or price), 2),
            "previous_close": round(float(payload.get("pc") or price), 2),
            "change": round(float(payload.get("d") or 0), 2),
            "percent_change": round(float(payload.get("dp") or 0), 2),
            "timestamp": int(payload.get("t") or datetime.now(timezone.utc).timestamp()),
            "source": "finnhub",
        }
        _QUOTE_CACHE[normalized] = quote
        return quote
    except Exception:
        return _QUOTE_CACHE.get(normalized) or mock_live_quote(normalized)


async def stream_watchlist_quotes(symbols: list[str], interval_seconds: float = 5.0):
    """Yield latest quotes for a watchlist; Finnhub keys stay server-side."""
    normalized = [symbol.upper() for symbol in symbols if symbol.strip()]
    api_key = os.getenv("FINNHUB_API_KEY")
    if api_key:
        try:
            async for quotes in _stream_finnhub_websocket_quotes(normalized, api_key):
                yield quotes
            return
        except Exception:
            pass

    while True:
        yield [fetch_live_quote(symbol) for symbol in normalized]
        await asyncio.sleep(interval_seconds)


async def _stream_finnhub_websocket_quotes(symbols: list[str], api_key: str):
    try:
        import websockets
    except ImportError as exc:
        raise RuntimeError("websockets is not installed") from exc

    url = f"{FINNHUB_WEBSOCKET_URL}?token={api_key}"
    async with websockets.connect(url) as websocket:
        for symbol in symbols:
            await websocket.send(json.dumps({"type": "subscribe", "symbol": symbol}))

        while True:
            message = json.loads(await websocket.recv())
            if message.get("type") != "trade":
                continue
            quotes = []
            for trade in message.get("data", []):
                symbol = str(trade.get("s", "")).upper()
                price = round(float(trade.get("p") or 0), 2)
                if not symbol or price <= 0:
                    continue
                cached = _QUOTE_CACHE.get(symbol, mock_live_quote(symbol))
                quote = {
                    **cached,
                    "symbol": symbol,
                    "price": price,
                    "timestamp": int((trade.get("t") or 0) / 1000) or int(datetime.now(timezone.utc).timestamp()),
                    "source": "finnhub-websocket",
                }
                _QUOTE_CACHE[symbol] = quote
                quotes.append(quote)
            if quotes:
                yield quotes
