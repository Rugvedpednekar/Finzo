from fastapi import APIRouter, Query, WebSocket, WebSocketDisconnect

from app.schemas import LiveQuoteResponse
from app.services.finnhub_live import stream_watchlist_quotes
from app.services.market_data import get_live_quote

router = APIRouter(prefix="/market", tags=["market data"])


@router.get("/quote/{symbol}", response_model=LiveQuoteResponse)
def get_quote(symbol: str) -> dict[str, float | int | str]:
    return get_live_quote(symbol)


@router.websocket("/watchlist")
async def watchlist_prices(websocket: WebSocket, symbols: str = Query("AAPL,MSFT,TSLA")) -> None:
    await websocket.accept()
    watchlist = [symbol.strip().upper() for symbol in symbols.split(",") if symbol.strip()]
    try:
        async for quotes in stream_watchlist_quotes(watchlist):
            await websocket.send_json({"type": "quotes", "quotes": quotes})
    except WebSocketDisconnect:
        return
