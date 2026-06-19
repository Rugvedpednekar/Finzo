from datetime import date, datetime
from typing import Any


def _to_date_string(value: Any) -> str:
    if isinstance(value, datetime | date):
        return value.date().isoformat() if isinstance(value, datetime) else value.isoformat()
    return str(value)[:10]


def fetch_historical_candles(symbol: str, start_date: str, end_date: str) -> list[dict[str, float | int | str]]:
    """Fetch daily historical OHLCV candles from Yahoo Finance via yfinance."""
    try:
        import yfinance as yf
    except ImportError as exc:
        raise RuntimeError("yfinance is not installed") from exc

    ticker = yf.Ticker(symbol.upper())
    frame = ticker.history(start=start_date, end=end_date, interval="1d", auto_adjust=False)
    if frame.empty:
        raise RuntimeError(f"No Yahoo Finance candles returned for {symbol}")

    candles: list[dict[str, float | int | str]] = []
    for index, row in frame.iterrows():
        close = row.get("Close")
        if close is None:
            continue
        candles.append(
            {
                "date": _to_date_string(index),
                "open": round(float(row.get("Open", close)), 2),
                "high": round(float(row.get("High", close)), 2),
                "low": round(float(row.get("Low", close)), 2),
                "close": round(float(close), 2),
                "volume": int(row.get("Volume", 0) or 0),
                "source": "yahoo",
            }
        )

    if not candles:
        raise RuntimeError(f"Yahoo Finance candles for {symbol} were empty after normalization")
    return candles
