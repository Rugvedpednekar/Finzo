from app.services.ml_signal_model import DemoMLSignalModel


DEFAULT_ALLOCATION = [
    {
        "bucket": "Stocks",
        "percent": 45,
        "value": 45000,
        "color": "#2563EB",
        "rationale": "Core diversified equity exposure for growth.",
    },
    {
        "bucket": "ETFs",
        "percent": 20,
        "value": 20000,
        "color": "#22D3EE",
        "rationale": "Broad index exposure through SPY and QQQ.",
    },
    {
        "bucket": "Bonds",
        "percent": 20,
        "value": 20000,
        "color": "#A78BFA",
        "rationale": "Risk dampening during volatile periods.",
    },
    {
        "bucket": "Cash",
        "percent": 10,
        "value": 10000,
        "color": "#10B981",
        "rationale": "Reserve for drawdowns and new paper trades.",
    },
    {
        "bucket": "Active Trading Bucket",
        "percent": 5,
        "value": 5000,
        "color": "#F59E0B",
        "rationale": "Small sandbox for algorithmic paper-trading strategies.",
    },
]


def get_portfolio_summary() -> dict:
    return {
        "total_portfolio_value": 104850.25,
        "daily_pl": 1240.5,
        "daily_pl_percent": 1.2,
        "total_return": 4.85,
        "cash_available": 10000,
        "virtual_capital": 100000,
        "currency": "USD",
    }


def get_allocation_plan(virtual_capital: float = 100000) -> dict:
    scale = virtual_capital / 100000
    allocation = [{**item, "value": round(item["value"] * scale, 2)} for item in DEFAULT_ALLOCATION]
    model = DemoMLSignalModel()
    signal = model.score("SPY", sentiment=0.42)
    return {
        "allocation": allocation,
        "insight_title": "AI Allocation Plan",
        "insight": (
            "Risk-adjusted allocation favors diversified equities and bonds while reserving "
            "a small trading bucket for active algorithmic strategies."
        ),
        "risk_profile": "Balanced growth",
        "rebalance_signal": signal.__dict__,
    }


def get_positions() -> list[dict]:
    return [
        {"symbol": "SPY", "name": "S&P 500 ETF", "weight": 18, "value": 18000, "change": 0.9},
        {"symbol": "QQQ", "name": "Nasdaq 100 ETF", "weight": 12, "value": 12000, "change": 1.4},
        {"symbol": "AAPL", "name": "Apple", "weight": 8, "value": 8000, "change": 1.2},
        {"symbol": "MSFT", "name": "Microsoft", "weight": 7, "value": 7000, "change": 0.8},
        {"symbol": "BND", "name": "Total Bond ETF", "weight": 20, "value": 20000, "change": 0.2},
    ]
