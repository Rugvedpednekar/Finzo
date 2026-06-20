from dataclasses import dataclass


@dataclass
class OpportunitySignal:
    symbol: str
    score: float
    trend: float
    volatility: float
    momentum: float
    sentiment: float
    explanation: str


class DemoMLSignalModel:
    """Small weighted scoring model for demo-only paper-trading signals."""

    def score(self, symbol: str, sentiment: float = 0.35) -> OpportunitySignal:
        seed = sum(ord(char) for char in symbol.upper())
        trend = ((seed % 19) - 5) / 14
        volatility = ((seed % 11) + 3) / 20
        momentum = ((seed % 23) - 7) / 16
        score = (trend * 0.35) + (momentum * 0.3) + (sentiment * 0.25) - (volatility * 0.1)
        score = max(-1, min(1, score))

        if score > 0.25:
            explanation = "Momentum and sentiment are supportive for a simulated long bias."
        elif score < -0.2:
            explanation = "Risk and weak momentum suggest reducing simulated exposure."
        else:
            explanation = "Signals are mixed, so the model favors monitoring over action."

        return OpportunitySignal(
            symbol=symbol.upper(),
            score=round(score, 2),
            trend=round(trend, 2),
            volatility=round(volatility, 2),
            momentum=round(momentum, 2),
            sentiment=round(sentiment, 2),
            explanation=explanation,
        )
