# Finzo

Finzo is a polished AI-powered paper-trading and backtesting sandbox for learning how technical indicators and financial sentiment can affect a simulated strategy.

Finzo is for educational paper trading only and does not provide financial advice. It does not execute real trades or connect to brokerages.

## Tech Stack

- Frontend: Expo React Native, TypeScript, Expo Router
- Backend: FastAPI, SQLAlchemy, Pydantic
- Auth: JWT bearer tokens with `python-jose` and hashed passwords with Passlib
- Local database: SQLite fallback
- Production-ready database target: Amazon Aurora PostgreSQL
- Historical data: Yahoo Finance through `yfinance`, with generated mock candle fallback
- Live data: Finnhub quotes, with cached/mock price fallback when the API key is missing or unavailable

## Environment Variables

```env
DATABASE_URL=
EXPO_PUBLIC_API_URL=http://localhost:8000
FINNHUB_API_KEY=
JWT_SECRET=change-me
ENVIRONMENT=development
USE_MOCK_MARKET_DATA=true
```

Keep `DATABASE_URL`, `FINNHUB_API_KEY`, and `JWT_SECRET` only on the backend host, such as Railway. The frontend should only receive `EXPO_PUBLIC_API_URL`.

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

## Authentication Flow

- New users call `POST /auth/register` with name, email, and password.
- Existing users call `POST /auth/login` with email and password.
- Passwords are stored as hashes, never plain text.
- The API returns a JWT with `user_id`, `email`, and a 7-day expiration.
- The frontend stores the JWT in `localStorage` on web, with an in-memory React Native fallback.
- On app load, the frontend calls `/auth/me`. Failed validation clears the token and returns to Login.
- Protected API requests include `Authorization: Bearer TOKEN`.

Demo seeded login:

```text
Email: demo@finzo.app
Password: demo-password
```

## API Endpoints

- `GET /health`
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
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

For local development, leave `DATABASE_URL` empty and the backend will create `backend/finzo.db` with SQLite.

For Amazon Aurora PostgreSQL, set `DATABASE_URL`:

```env
DATABASE_URL=postgresql+psycopg2://USER:PASSWORD@HOST:5432/finzo
```

Aurora PostgreSQL is a managed relational database that can run the same SQLAlchemy schema used locally. In a deployed version, the FastAPI service would connect to Aurora through a private network or secure connection string. This MVP keeps setup simple while preserving the production database path.

Backtest results, simulated trades, sentiment inputs, sentiment scores, and generated reports are written through SQLAlchemy, so the same persistence flow works with Aurora PostgreSQL when `DATABASE_URL` points to Aurora.

## Market Data

Historical OHLCV candles for backtesting are fetched server-side from Yahoo Finance through `yfinance`. If Yahoo Finance or `yfinance` fails, Finzo falls back to generated mock candles so local demos still work.

Live/latest quote data is fetched server-side from Finnhub using `FINNHUB_API_KEY`. The key is never exposed to the frontend. The REST quote endpoint is implemented first, and the optional watchlist WebSocket relays Finnhub WebSocket updates from the backend when configured. If the key is missing or Finnhub fails, Finzo returns cached or mock live prices.

## Deployment Notes

Vercel frontend:

- Deploy from `frontend/`.
- Use `frontend/vercel.json`.
- Set `EXPO_PUBLIC_API_URL` to the Railway backend URL.
- Do not add backend secrets to Vercel.

Railway backend:

- Deploy from `backend/`.
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
- Set `DATABASE_URL`, `JWT_SECRET`, `FINNHUB_API_KEY`, `ENVIRONMENT`, and optional `USE_MOCK_MARKET_DATA`.

Aurora PostgreSQL:

- Use a PostgreSQL SQLAlchemy URL in `DATABASE_URL`.
- The MVP uses `SQLAlchemy create_all` for simple schema creation.
- In production, move to Alembic migrations before changing live schemas.

## Hackathon Submission Notes

- Works locally with SQLite and mock market-data fallbacks.
- Includes seeded dashboard, reports, and strategy examples.
- Includes JWT auth with login/register and protected product routes.
- Uses mock historical prices for deterministic paper-trading demos.
- Includes a rule-based sentiment analyzer and sentiment-adjusted comparison flow.
- Clearly separates frontend and backend responsibilities.

## Educational Disclaimer

Finzo is for educational paper trading only and does not provide financial advice.
