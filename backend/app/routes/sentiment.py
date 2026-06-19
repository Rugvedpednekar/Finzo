from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import SentimentInput, SentimentScore
from app.schemas import SentimentRequest, SentimentResponse
from app.services.sentiment_engine import analyze_sentiment

router = APIRouter(prefix="/sentiment", tags=["sentiment"])


@router.post("/analyze", response_model=SentimentResponse)
def analyze(request: SentimentRequest, db: Session = Depends(get_db)) -> SentimentResponse:
    result = analyze_sentiment(request.text)
    sentiment_input = SentimentInput(text=request.text)
    db.add(sentiment_input)
    db.flush()
    db.add(
        SentimentScore(
            sentiment_input_id=sentiment_input.id,
            label=result.label,
            score=result.score,
            explanation=result.explanation,
        )
    )
    db.commit()
    return result
