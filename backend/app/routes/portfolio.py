from fastapi import APIRouter, Depends

from app.models import User
from app.services.auth import get_current_user
from app.services.portfolio_allocator import get_allocation_plan, get_portfolio_summary, get_positions
from app.services.trade_decision_engine import get_trade_timeline

router = APIRouter(prefix="/portfolio", tags=["portfolio"])


@router.get("/summary")
def portfolio_summary(_: User = Depends(get_current_user)) -> dict:
    return get_portfolio_summary()


@router.get("/allocation")
def portfolio_allocation(_: User = Depends(get_current_user)) -> dict:
    plan = get_allocation_plan()
    plan["positions"] = get_positions()
    return plan


@router.get("/activity")
def portfolio_activity(_: User = Depends(get_current_user)) -> dict:
    return {"activity": get_trade_timeline()}
