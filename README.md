# Finzo

Finzo is an AI-powered paper-trading and backtesting sandbox for learning how technical indicators and financial sentiment can affect a simulated strategy.

Finzo is for educational paper trading only and does not provide financial advice. It does not execute real trades, connect to brokerages, or use paid market-data APIs.

## Tech Stack

- Frontend: Expo React Native, TypeScript, Expo Router
- Backend: FastAPI, SQLAlchemy, Pydantic
- Local database: SQLite fallback
- Production-ready database target: Amazon Aurora PostgreSQL
- Historical data: Yahoo Finance through `yfinance`, with generated mock candle fallback
- Live data: Finnhub quotes, with cached/mock price fallback when the API key is missing or unavailable

## Folder Structure

```text
finzo/
├── frontend/
├── backend/
├── docs/
├── README.md
├── .gitignore
└── .env.example
```

## Run the Backend Locally

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

On Windows PowerShell:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Open `http://localhost:8000/docs` for the interactive API docs.

## Run the Frontend Locally

```bash
cd frontend
npm install
npm run web
```

For mobile:

```bash
npm run android
npm run ios
```

Set `EXPO_PUBLIC_API_URL` if your backend is not running at `http://localhost:8000`.

## API Endpoints

- `GET /health`
- `GET /dashboard`
- `POST /backtests/run`
- `GET /backtests`
- `GET /backtests/{id}`
- `POST /sentiment/analyze`
- `POST /compare`
- `GET /reports`
- `GET /reports/{id}`
- `GET /market/quote/{symbol}`
- `WS /market/watchlist?symbols=AAPL,MSFT,TSLA`

## Database Setup

For local development, leave `DATABASE_URL` empty and the backend will create `finzo.db` with SQLite.

For Amazon Aurora PostgreSQL, set `DATABASE_URL`:

```env
DATABASE_URL=postgresql+psycopg2://USER:PASSWORD@HOST:5432/finzo
```

Aurora PostgreSQL is a managed relational database that can run the same SQLAlchemy schema used locally. In a deployed version, the FastAPI service would connect to Aurora through a private network or secure connection string. This MVP keeps setup simple while preserving the production database path.

Backtest results, simulated trades, sentiment inputs, sentiment scores, and generated reports are written through SQLAlchemy, so the same persistence flow works with Aurora PostgreSQL when `DATABASE_URL` points to Aurora.

## Market Data

Historical OHLCV candles for backtesting are fetched server-side from Yahoo Finance through `yfinance`. If Yahoo Finance or `yfinance` fails, Finzo falls back to generated mock candles so local demos still work.

Live/latest quote data is fetched server-side from Finnhub using `FINNHUB_API_KEY`. The key is never exposed to the frontend. The REST quote endpoint is implemented first, and the optional watchlist WebSocket relays Finnhub WebSocket updates from the backend when configured. If the key is missing or Finnhub fails, Finzo returns cached or mock live prices.

## Hackathon Submission Notes

- Works locally without paid APIs.
- Includes seeded dashboard, reports, and strategy examples.
- Uses mock historical prices for deterministic paper-trading demos.
- Includes a rule-based sentiment analyzer and sentiment-adjusted comparison flow.
- Clearly separates frontend and backend responsibilities.

## Educational Disclaimer

Finzo is for educational paper trading only and does not provide financial advice.
