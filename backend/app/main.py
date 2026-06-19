from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, SessionLocal, engine
from app.routes import auth, backtests, compare, dashboard, market, reports, sentiment
from app.seed import seed_data

# Create tables before starting the app
Base.metadata.create_all(bind=engine)

# Seed demo data safely
try:
    with SessionLocal() as db:
        seed_data(db)
        print("Seed data created or already exists.")
except Exception as e:
    print(f"Seed data skipped due to error: {e}")

app = FastAPI(
    title="Finzo API",
    description="Educational paper-trading and backtesting API. No real trades are executed.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router)
app.include_router(auth.router)
app.include_router(backtests.router)
app.include_router(sentiment.router)
app.include_router(compare.router)
app.include_router(reports.router)
app.include_router(market.router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "finzo-api"}
