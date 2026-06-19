from statistics import mean, pstdev


def percent(value: float) -> float:
    return round(value * 100, 2)


def calculate_max_drawdown(values: list[float]) -> float:
    if not values:
        return 0.0
    peak = values[0]
    worst = 0.0
    for value in values:
        peak = max(peak, value)
        drawdown = (value - peak) / peak if peak else 0.0
        worst = min(worst, drawdown)
    return percent(worst)


def calculate_sharpe(values: list[float]) -> float:
    if len(values) < 3:
        return 0.0
    returns = [(values[i] - values[i - 1]) / values[i - 1] for i in range(1, len(values)) if values[i - 1]]
    if len(returns) < 2:
        return 0.0
    volatility = pstdev(returns)
    if volatility == 0:
        return 0.0
    return round((mean(returns) / volatility) * (252 ** 0.5), 2)
