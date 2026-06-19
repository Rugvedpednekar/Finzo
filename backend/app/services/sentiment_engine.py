from app.schemas import SentimentResponse

POSITIVE_KEYWORDS = [
    "beat",
    "growth",
    "profit",
    "strong",
    "upgrade",
    "record",
    "bullish",
    "revenue increased",
]

NEGATIVE_KEYWORDS = [
    "miss",
    "loss",
    "decline",
    "weak",
    "downgrade",
    "bearish",
    "lawsuit",
    "revenue dropped",
]


def analyze_sentiment(text: str) -> SentimentResponse:
    normalized = text.lower()
    positive_hits = [word for word in POSITIVE_KEYWORDS if word in normalized]
    negative_hits = [word for word in NEGATIVE_KEYWORDS if word in normalized]
    raw_score = len(positive_hits) - len(negative_hits)
    total_hits = len(positive_hits) + len(negative_hits)
    score = raw_score / total_hits if total_hits else 0.0

    if score > 0.2:
        label = "Positive"
    elif score < -0.2:
        label = "Negative"
    else:
        label = "Neutral"

    if total_hits:
        explanation = f"Found {len(positive_hits)} positive and {len(negative_hits)} negative financial keyword matches."
    else:
        explanation = "No strong positive or negative financial keyword matches were found."

    return SentimentResponse(label=label, score=round(score, 2), explanation=explanation)
