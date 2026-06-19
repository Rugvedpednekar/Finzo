from app.models import Backtest


def build_report_summary(backtest: Backtest) -> str:
    direction = "gained" if backtest.total_return >= 0 else "lost"
    return (
        f"{backtest.strategy_type} on {backtest.symbol} {direction} {abs(backtest.total_return):.2f}% "
        f"and ended at ${backtest.final_portfolio_value:,.2f}. "
        f"Win rate was {backtest.win_rate:.2f}% with max drawdown of {backtest.max_drawdown:.2f}%."
    )
