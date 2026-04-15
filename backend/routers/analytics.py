from collections import defaultdict
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends
from sqlmodel import Session, select, func

from database import get_session
from models import Lead, Opportunity

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/summary")
def get_summary(session: Session = Depends(get_session)):
    """
    Returns an executive analytics summary computed from live DB data.
    All monetary values in USD. Percentages as floats 0-100.
    """
    opps = session.exec(select(Opportunity)).all()
    leads = session.exec(select(Lead)).all()

    total_deals = len(opps)
    # treat stage=="closed" as won for analytics
    closed_opps = [o for o in opps if o.stage == "closed"]
    open_opps = [o for o in opps if o.stage != "closed"]

    total_pipeline = sum(o.value for o in open_opps)
    total_revenue = sum(o.value for o in closed_opps)

    win_loss_ratio = (len(closed_opps) / total_deals * 100) if total_deals else 0
    avg_deal_size = (total_revenue / len(closed_opps)) if closed_opps else 0
    avg_probability = (sum(o.probability for o in opps) / total_deals) if total_deals else 0

    # Leads breakdown
    leads_by_status: dict[str, int] = defaultdict(int)
    for lead in leads:
        leads_by_status[lead.status] += 1

    # Revenue by stage (for pipeline distribution card)
    revenue_by_stage: dict[str, int] = defaultdict(int)
    count_by_stage: dict[str, int] = defaultdict(int)
    for opp in opps:
        revenue_by_stage[opp.stage] += opp.value
        count_by_stage[opp.stage] += 1

    # Revenue by month (last 6 months) from closed opportunities
    now = datetime.utcnow()
    monthly: dict[str, int] = {}
    for i in range(5, -1, -1):
        month_dt = now - timedelta(days=30 * i)
        key = month_dt.strftime("%b")
        monthly[key] = 0
    for opp in closed_opps:
        key = opp.updated_at.strftime("%b")
        if key in monthly:
            monthly[key] += opp.value

    return {
        "total_pipeline": total_pipeline,
        "total_revenue": total_revenue,
        "total_deals": total_deals,
        "win_loss_ratio": round(win_loss_ratio, 1),
        "avg_deal_size": round(avg_deal_size, 0),
        "avg_probability": round(avg_probability, 1),
        "leads_by_status": dict(leads_by_status),
        "revenue_by_month": [{"month": k, "revenue": v} for k, v in monthly.items()],
        "revenue_by_stage": [
            {"stage": k, "revenue": v, "count": count_by_stage[k]}
            for k, v in revenue_by_stage.items()
        ],
    }


@router.get("/leads/funnel")
def get_leads_funnel(session: Session = Depends(get_session)):
    """Conversion funnel counts by status."""
    leads = session.exec(select(Lead)).all()
    funnel: dict[str, int] = defaultdict(int)
    for lead in leads:
        funnel[lead.status] += 1
    order = ["NEW", "CONTACTED", "QUALIFIED", "LOST"]
    return [{"status": s, "count": funnel.get(s, 0)} for s in order]
