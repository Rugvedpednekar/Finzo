from datetime import datetime, timezone

from app.services.ml_signal_model import DemoMLSignalModel


def get_trade_timeline() -> list[dict]:
    return [
        {
            "timestamp": "09:35 AM",
            "tag": "REBALANCE",
            "symbol": "SPY",
            "title": "Allocated 20% to SPY",
            "explanation": "Broad market trend stayed positive while volatility remained moderate.",
            "impact": "+0.4% expected portfolio stability",
        },
        {
            "timestamp": "10:10 AM",
            "tag": "ALERT",
            "symbol": "NVDA",
            "title": "Reduced NVDA exposure due to negative sentiment",
            "explanation": "AI sentiment scan detected elevated downside language around chip demand.",
            "impact": "Reduced active bucket risk",
        },
        {
            "timestamp": "11:05 AM",
            "tag": "BUY",
            "symbol": "AAPL",
            "title": "Opened swing trade in AAPL",
            "explanation": "Momentum score and sentiment aligned for a small simulated position.",
            "impact": "Active bucket exposure +1.5%",
        },
        {
            "timestamp": "01:40 PM",
            "tag": "SELL",
            "symbol": "MSFT",
            "title": "Closed MSFT trade at +3.1%",
            "explanation": "Paper trade hit profit target and momentum cooled.",
            "impact": "+$155 simulated gain",
        },
        {
            "timestamp": "03:15 PM",
            "tag": "HOLD",
            "symbol": "BND",
            "title": "Moved 5% into bond ETF for risk control",
            "explanation": "Model increased defensive allocation after intraday volatility rose.",
            "impact": "Drawdown guard active",
        },
    ]


def get_recent_paper_trades() -> list[dict]:
    return [
        {"strategy": "SMA Crossover", "symbol": "AAPL", "date": "Oct 12", "return_value": "+12.4%", "status": "Completed"},
        {"strategy": "RSI Reversion", "symbol": "TSLA", "date": "Oct 11", "return_value": "-3.2%", "status": "Completed"},
        {"strategy": "MACD Trend", "symbol": "NVDA", "date": "Oct 10", "return_value": "+28.1%", "status": "Completed"},
        {"strategy": "Sentiment Pulse", "symbol": "MSFT", "date": "Oct 09", "return_value": "+8.9%", "status": "Completed"},
    ]


def get_strategy_performance() -> dict:
    model = DemoMLSignalModel()
    signal = model.score("AAPL", sentiment=0.48)
    return {
        "strategy_name": "SMA Crossover + Sentiment Filter",
        "symbol": "AAPL",
        "cumulative_return": 16.8,
        "win_rate": 68.2,
        "max_drawdown": -4.2,
        "sharpe_ratio": 1.84,
        "equity_curve": [
            {"label": "Jan", "value": 10000},
            {"label": "Feb", "value": 10200},
            {"label": "Mar", "value": 9800},
            {"label": "Apr", "value": 10500},
            {"label": "May", "value": 11200},
            {"label": "Jun", "value": 10800},
            {"label": "Jul", "value": 11680},
        ],
        "ai_signal": signal.__dict__,
    }


def get_market_sentiment_snapshot() -> dict:
    return {
        "status": "Bullish",
        "score": 0.72,
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "explanation": "Recent market text is leaning positive, with growth and earnings language outweighing risk terms.",
    }
