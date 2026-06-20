from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Backtest, User
from app.schemas import DashboardResponse
from app.services.auth import get_current_user
from app.services.portfolio_allocator import get_allocation_plan, get_portfolio_summary
from app.services.trade_decision_engine import get_market_sentiment_snapshot, get_strategy_performance, get_trade_timeline

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("", response_model=DashboardResponse)
def get_dashboard(db: Session = Depends(get_db), _: User = Depends(get_current_user)) -> DashboardResponse:
    total = db.query(Backtest).count()
    best_return = db.query(func.max(Backtest.total_return)).scalar() or 0.0
    average_win_rate = db.query(func.avg(Backtest.win_rate)).scalar() or 0.0
    recent = db.query(Backtest).order_by(Backtest.created_at.desc()).first()
    return DashboardResponse(
        total_backtests=total,
        best_return=round(best_return, 2),
        average_win_rate=round(average_win_rate, 2),
        recent_strategy=recent.strategy_type if recent else "No strategy yet",
    )


@router.get("/live")
def get_live_dashboard(_: User = Depends(get_current_user)) -> dict:
    return {
        "portfolio": get_portfolio_summary(),
        "allocation": get_allocation_plan(),
        "strategy_performance": get_strategy_performance(),
        "trade_timeline": get_trade_timeline(),
        "sentiment": get_market_sentiment_snapshot(),
        "disclaimer": "Finzo is for educational paper trading only and does not provide financial advice.",
    }
