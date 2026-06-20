from datetime import date, timedelta

from fastapi import APIRouter, Query, WebSocket, WebSocketDisconnect

from app.schemas import LiveQuoteResponse
from app.services.finnhub_live import stream_watchlist_quotes
from app.services.market_data import get_historical_candles, get_live_quote

router = APIRouter(prefix="/market", tags=["market data"])


@router.get("/quote/{symbol}", response_model=LiveQuoteResponse)
def get_quote(symbol: str) -> dict[str, float | int | str]:
    return get_live_quote(symbol)


@router.get("/history/{symbol}")
def get_history(symbol: str, range: str = Query("1M")) -> dict:
    days_by_range = {"1D": 5, "1W": 7, "1M": 30, "3M": 90, "1Y": 365}
    days = days_by_range.get(range.upper(), 30)
    end = date.today()
    start = end - timedelta(days=days)
    candles = get_historical_candles(symbol, start.isoformat(), end.isoformat())
    return {"symbol": symbol.upper(), "range": range.upper(), "candles": candles[-120:]}


@router.websocket("/watchlist")
async def watchlist_prices(websocket: WebSocket, symbols: str = Query("AAPL,MSFT,TSLA")) -> None:
    await websocket.accept()
    watchlist = [symbol.strip().upper() for symbol in symbols.split(",") if symbol.strip()]
    try:
        async for quotes in stream_watchlist_quotes(watchlist):
            await websocket.send_json({"type": "quotes", "quotes": quotes})
    except WebSocketDisconnect:
        return
