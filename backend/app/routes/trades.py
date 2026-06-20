from fastapi import APIRouter, Depends

from app.models import User
from app.services.auth import get_current_user
from app.services.trade_decision_engine import get_recent_paper_trades, get_trade_timeline

router = APIRouter(prefix="/trades", tags=["trades"])


@router.get("/timeline")
def trade_timeline(_: User = Depends(get_current_user)) -> dict:
    return {"timeline": get_trade_timeline()}


@router.get("/recent")
def recent_trades(_: User = Depends(get_current_user)) -> dict:
    return {"trades": get_recent_paper_trades()}
