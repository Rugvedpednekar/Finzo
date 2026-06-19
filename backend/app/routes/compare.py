from fastapi import APIRouter, Depends

from app.models import User
from app.schemas import CompareRequest, CompareResponse
from app.services.auth import get_current_user
from app.services.backtest_engine import run_backtest
from app.services.sentiment_engine import analyze_sentiment

router = APIRouter(prefix="/compare", tags=["compare"])


@router.post("", response_model=CompareResponse)
def compare_strategies(request: CompareRequest, _: User = Depends(get_current_user)) -> CompareResponse:
    sentiment = analyze_sentiment(request.sentiment_text or "Neutral market update.")
    technical = run_backtest(request)
    adjusted = run_backtest(request, sentiment_score=sentiment.score)
    summary = (
        f"Sentiment was {sentiment.label.lower()} ({sentiment.score:+.2f}). "
        f"The adjusted strategy ended at ${adjusted.final_portfolio_value:,.2f} versus "
        f"${technical.final_portfolio_value:,.2f} for technical-only."
    )
    return CompareResponse(technical_only=technical, sentiment_adjusted=adjusted, sentiment=sentiment, summary=summary)
