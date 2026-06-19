from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


StrategyName = Literal["SMA crossover", "RSI strategy", "MACD strategy"]


class TradeRead(BaseModel):
    id: int | None = None
    date: str
    action: Literal["BUY", "SELL"]
    price: float
    quantity: float
    value: float

    model_config = {"from_attributes": True}


class BacktestRunRequest(BaseModel):
    symbol: str = Field(..., min_length=1, max_length=12)
    strategy_type: StrategyName
    starting_capital: float = Field(..., gt=0)
    start_date: str
    end_date: str


class BacktestRead(BaseModel):
    id: int | None = None
    symbol: str
    strategy_type: str
    starting_capital: float
    start_date: str
    end_date: str
    final_portfolio_value: float
    total_return: float
    win_rate: float
    max_drawdown: float
    sharpe_ratio: float
    created_at: datetime | None = None
    trades: list[TradeRead] = []

    model_config = {"from_attributes": True}


class SentimentRequest(BaseModel):
    text: str = Field(..., min_length=1)


class SentimentResponse(BaseModel):
    label: Literal["Positive", "Neutral", "Negative"]
    score: float
    explanation: str


class LiveQuoteResponse(BaseModel):
    symbol: str
    price: float
    open: float
    high: float
    low: float
    previous_close: float
    change: float
    percent_change: float
    timestamp: int
    source: str


class CompareRequest(BacktestRunRequest):
    sentiment_text: str = ""


class CompareResponse(BaseModel):
    technical_only: BacktestRead
    sentiment_adjusted: BacktestRead
    sentiment: SentimentResponse
    summary: str


class DashboardResponse(BaseModel):
    total_backtests: int
    best_return: float
    average_win_rate: float
    recent_strategy: str


class ReportRead(BaseModel):
    id: int
    backtest_id: int
    title: str
    summary: str
    created_at: datetime

    model_config = {"from_attributes": True}
