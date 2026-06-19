# Finzo Backend

FastAPI backend for the Finzo paper-trading MVP.

## Local Setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

If `DATABASE_URL` is not set, the API creates a local SQLite database. Set `DATABASE_URL` for PostgreSQL or Amazon Aurora PostgreSQL.

## Market Data

- Historical backtest candles use Yahoo Finance via `yfinance`.
- Live quotes use Finnhub via `FINNHUB_API_KEY`.
- `GET /market/quote/{symbol}` uses Finnhub REST quote data.
- `WS /market/watchlist?symbols=AAPL,MSFT` optionally relays Finnhub WebSocket updates.
- Finnhub keys stay on the backend and are not exposed to the frontend.
- Yahoo failures fall back to generated mock historical candles.
- Finnhub failures or missing API keys fall back to cached/mock live quotes.

Finzo is for educational paper trading only and does not provide financial advice.
