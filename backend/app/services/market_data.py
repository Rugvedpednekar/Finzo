from datetime import date, timedelta
from math import sin
import os

from app.services.finnhub_live import fetch_live_quote
from app.services.yahoo_data import fetch_historical_candles


def _parse_date(value: str) -> date:
    return date.fromisoformat(value)


def generated_mock_historical_candles(symbol: str, start_date: str, end_date: str) -> list[dict[str, float | int | str]]:
    start = _parse_date(start_date)
    end = _parse_date(end_date)
    days = max((end - start).days, 30)
    symbol_bias = (sum(ord(char) for char in symbol.upper()) % 17) / 10
    candles = []
    base = 95 + symbol_bias
    for index in range(days + 1):
        current = start + timedelta(days=index)
        trend = index * 0.08
        cycle = sin(index / 4) * 2.8
        momentum = sin(index / 11) * 1.6
        close = max(5, base + trend + cycle + momentum)
        open_price = close * (1 + sin(index / 6) * 0.003)
        high = max(open_price, close) * 1.008
        low = min(open_price, close) * 0.992
        candles.append(
            {
                "date": current.isoformat(),
                "open": round(open_price, 2),
                "high": round(high, 2),
                "low": round(low, 2),
                "close": round(close, 2),
                "volume": int(1_000_000 + (index * 13_571) % 600_000),
                "source": "mock",
            }
        )
    return candles


def get_historical_candles(symbol: str, start_date: str, end_date: str) -> list[dict[str, float | int | str]]:
    if os.getenv("USE_MOCK_MARKET_DATA", "").lower() == "true":
        return generated_mock_historical_candles(symbol, start_date, end_date)
    try:
        return fetch_historical_candles(symbol, start_date, end_date)
    except Exception:
        return generated_mock_historical_candles(symbol, start_date, end_date)


def get_live_quote(symbol: str) -> dict[str, float | int | str]:
    if os.getenv("USE_MOCK_MARKET_DATA", "").lower() == "true":
        from app.services.finnhub_live import mock_live_quote

        return mock_live_quote(symbol)
    return fetch_live_quote(symbol)
