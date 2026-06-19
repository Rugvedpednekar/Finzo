from app.schemas import BacktestRead, BacktestRunRequest, TradeRead
from app.services.market_data import generated_mock_historical_candles, get_historical_candles
from app.services.metrics import calculate_max_drawdown, calculate_sharpe, percent


def generate_mock_prices(symbol: str, start_date: str, end_date: str) -> list[dict[str, float | str]]:
    return generated_mock_historical_candles(symbol, start_date, end_date)


def _sma(values: list[float], window: int) -> float:
    if len(values) < window:
        return sum(values) / len(values)
    return sum(values[-window:]) / window


def _rsi(values: list[float], window: int = 14) -> float:
    if len(values) <= window:
        return 50.0
    recent = values[-window - 1 :]
    gains = []
    losses = []
    for index in range(1, len(recent)):
        change = recent[index] - recent[index - 1]
        gains.append(max(change, 0))
        losses.append(abs(min(change, 0)))
    average_gain = sum(gains) / window
    average_loss = sum(losses) / window
    if average_loss == 0:
        return 100.0
    relative_strength = average_gain / average_loss
    return 100 - (100 / (1 + relative_strength))


def _ema(previous: float, price: float, period: int) -> float:
    multiplier = 2 / (period + 1)
    return price * multiplier + previous * (1 - multiplier)


def _technical_signal(strategy: str, closes: list[float], ema_state: dict[str, float]) -> str:
    if len(closes) < 2:
        return "HOLD"
    if strategy == "SMA crossover":
        short = _sma(closes, 5)
        long = _sma(closes, 15)
        previous_short = _sma(closes[:-1], 5)
        previous_long = _sma(closes[:-1], 15)
        if previous_short <= previous_long and short > long:
            return "BUY"
        if previous_short >= previous_long and short < long:
            return "SELL"
    if strategy == "RSI strategy":
        value = _rsi(closes)
        if value < 35:
            return "BUY"
        if value > 65:
            return "SELL"
    if strategy == "MACD strategy":
        price = closes[-1]
        ema_state["fast"] = _ema(ema_state.get("fast", price), price, 12)
        ema_state["slow"] = _ema(ema_state.get("slow", price), price, 26)
        macd = ema_state["fast"] - ema_state["slow"]
        previous_macd = ema_state.get("macd", macd)
        ema_state["macd"] = macd
        if previous_macd <= 0 and macd > 0:
            return "BUY"
        if previous_macd >= 0 and macd < 0:
            return "SELL"
    return "HOLD"


def run_backtest(request: BacktestRunRequest, sentiment_score: float | None = None) -> BacktestRead:
    prices = get_historical_candles(request.symbol, request.start_date, request.end_date)
    cash = request.starting_capital
    shares = 0.0
    entry_price = 0.0
    closed_results: list[float] = []
    portfolio_values: list[float] = []
    trades: list[TradeRead] = []
    closes: list[float] = []
    ema_state: dict[str, float] = {}

    for point in prices:
        price = float(point["close"])
        closes.append(price)
        signal = _technical_signal(request.strategy_type, closes, ema_state)

        if signal == "BUY" and shares == 0:
            allocation = 0.8
            if sentiment_score is not None and sentiment_score < -0.2:
                allocation = 0.35
            quantity = (cash * allocation) / price
            if quantity > 0:
                shares += quantity
                cash -= quantity * price
                entry_price = price
                trades.append(TradeRead(date=str(point["date"]), action="BUY", price=price, quantity=round(quantity, 4), value=round(quantity * price, 2)))
        elif signal == "SELL" and shares > 0:
            value = shares * price
            cash += value
            closed_results.append(price - entry_price)
            trades.append(TradeRead(date=str(point["date"]), action="SELL", price=price, quantity=round(shares, 4), value=round(value, 2)))
            shares = 0.0

        portfolio_values.append(cash + shares * price)

    final_price = float(prices[-1]["close"])
    final_value = cash + shares * final_price
    if shares > 0:
        closed_results.append(final_price - entry_price)

    total_return = percent((final_value - request.starting_capital) / request.starting_capital)
    wins = [result for result in closed_results if result > 0]
    win_rate = percent(len(wins) / len(closed_results)) if closed_results else 0.0

    return BacktestRead(
        symbol=request.symbol.upper(),
        strategy_type=request.strategy_type,
        starting_capital=round(request.starting_capital, 2),
        start_date=request.start_date,
        end_date=request.end_date,
        final_portfolio_value=round(final_value, 2),
        total_return=total_return,
        win_rate=win_rate,
        max_drawdown=calculate_max_drawdown(portfolio_values),
        sharpe_ratio=calculate_sharpe(portfolio_values),
        trades=trades,
    )
