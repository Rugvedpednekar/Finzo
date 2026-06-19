from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, selectinload

from app.database import get_db
from app.models import Backtest, Report, Trade, User
from app.schemas import BacktestRead, BacktestRunRequest
from app.services.auth import get_current_user
from app.services.backtest_engine import run_backtest
from app.services.report_generator import build_report_summary

router = APIRouter(prefix="/backtests", tags=["backtests"])


def _save_backtest(db: Session, result: BacktestRead) -> Backtest:
    backtest = Backtest(
        symbol=result.symbol,
        strategy_type=result.strategy_type,
        starting_capital=result.starting_capital,
        start_date=result.start_date,
        end_date=result.end_date,
        final_portfolio_value=result.final_portfolio_value,
        total_return=result.total_return,
        win_rate=result.win_rate,
        max_drawdown=result.max_drawdown,
        sharpe_ratio=result.sharpe_ratio,
    )
    db.add(backtest)
    db.flush()
    for trade in result.trades:
        db.add(
            Trade(
                backtest_id=backtest.id,
                date=trade.date,
                action=trade.action,
                price=trade.price,
                quantity=trade.quantity,
                value=trade.value,
            )
        )
    db.flush()
    db.add(Report(backtest_id=backtest.id, title=f"{result.symbol} {result.strategy_type} Report", summary=build_report_summary(backtest)))
    db.commit()
    db.refresh(backtest)
    return backtest


@router.post("/run", response_model=BacktestRead)
def run_and_save_backtest(
    request: BacktestRunRequest,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
) -> Backtest:
    result = run_backtest(request)
    return _save_backtest(db, result)


@router.get("", response_model=list[BacktestRead])
def list_backtests(db: Session = Depends(get_db), _: User = Depends(get_current_user)) -> list[Backtest]:
    return db.query(Backtest).options(selectinload(Backtest.trades)).order_by(Backtest.created_at.desc()).all()


@router.get("/{backtest_id}", response_model=BacktestRead)
def get_backtest(
    backtest_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
) -> Backtest:
    backtest = db.query(Backtest).options(selectinload(Backtest.trades)).filter(Backtest.id == backtest_id).first()
    if not backtest:
        raise HTTPException(status_code=404, detail="Backtest not found")
    return backtest
