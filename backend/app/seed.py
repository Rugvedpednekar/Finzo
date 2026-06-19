from sqlalchemy.orm import Session

from app.models import Backtest, Report, Strategy, Trade, User
from app.schemas import BacktestRunRequest
from app.services.backtest_engine import run_backtest
from app.services.auth import hash_password
from app.services.report_generator import build_report_summary


def seed_data(db: Session) -> None:
    if db.query(User).first():
        return

    db.add(User(email="demo@finzo.app", name="Finzo Demo User", hashed_password=hash_password("demo-password")))
    db.add_all(
        [
            Strategy(name="SMA crossover", description="Buys when a short moving average crosses above a long moving average."),
            Strategy(name="RSI strategy", description="Looks for oversold and overbought momentum signals."),
            Strategy(name="MACD strategy", description="Uses fast and slow exponential averages to spot momentum shifts."),
        ]
    )

    request = BacktestRunRequest(
        symbol="AAPL",
        strategy_type="SMA crossover",
        starting_capital=10000,
        start_date="2025-01-01",
        end_date="2025-04-30",
    )
    result = run_backtest(request)
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
    db.add(Report(backtest_id=backtest.id, title="Sample SMA Crossover Report", summary=build_report_summary(backtest)))
    db.commit()
