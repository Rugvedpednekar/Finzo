from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Backtest
from app.schemas import DashboardResponse

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("", response_model=DashboardResponse)
def get_dashboard(db: Session = Depends(get_db)) -> DashboardResponse:
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
