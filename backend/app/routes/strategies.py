from fastapi import APIRouter, Depends

from app.models import User
from app.services.auth import get_current_user
from app.services.trade_decision_engine import get_strategy_performance

router = APIRouter(prefix="/strategies", tags=["strategies"])


@router.get("/performance")
def strategy_performance(_: User = Depends(get_current_user)) -> dict:
    return get_strategy_performance()
