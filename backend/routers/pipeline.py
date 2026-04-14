from typing import Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select

from database import get_session
from models import Opportunity, OpportunityCreate, OpportunityRead, OpportunityUpdate

router = APIRouter(prefix="/pipeline", tags=["pipeline"])


@router.get("", response_model=list[OpportunityRead])
def list_opportunities(
    stage: Optional[str] = Query(None),
    skip: int = 0,
    limit: int = 200,
    session: Session = Depends(get_session),
):
    query = select(Opportunity)
    if stage:
        query = query.where(Opportunity.stage == stage)
    query = query.offset(skip).limit(limit).order_by(Opportunity.created_at.desc())
    return session.exec(query).all()


@router.post("", response_model=OpportunityRead, status_code=201)
def create_opportunity(opp: OpportunityCreate, session: Session = Depends(get_session)):
    db_opp = Opportunity.model_validate(opp)
    session.add(db_opp)
    session.commit()
    session.refresh(db_opp)
    return db_opp


@router.get("/{opp_id}", response_model=OpportunityRead)
def get_opportunity(opp_id: int, session: Session = Depends(get_session)):
    opp = session.get(Opportunity, opp_id)
    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    return opp


@router.patch("/{opp_id}", response_model=OpportunityRead)
def update_opportunity(opp_id: int, updates: OpportunityUpdate, session: Session = Depends(get_session)):
    opp = session.get(Opportunity, opp_id)
    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    data = updates.model_dump(exclude_unset=True)
    data["updated_at"] = datetime.utcnow()
    opp.sqlmodel_update(data)
    session.add(opp)
    session.commit()
    session.refresh(opp)
    return opp


@router.patch("/{opp_id}/move", response_model=OpportunityRead)
def move_opportunity(
    opp_id: int,
    stage: str = Query(..., description="Target stage ID"),
    session: Session = Depends(get_session),
):
    """Convenience endpoint for kanban drag-and-drop moves."""
    opp = session.get(Opportunity, opp_id)
    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    opp.stage = stage
    opp.closed = stage == "closed"
    opp.updated_at = datetime.utcnow()
    session.add(opp)
    session.commit()
    session.refresh(opp)
    return opp


@router.delete("/{opp_id}", status_code=204)
def delete_opportunity(opp_id: int, session: Session = Depends(get_session)):
    opp = session.get(Opportunity, opp_id)
    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    session.delete(opp)
    session.commit()
