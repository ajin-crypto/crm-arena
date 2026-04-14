from typing import Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select

from database import get_session
from models import Lead, LeadCreate, LeadRead, LeadUpdate

router = APIRouter(prefix="/leads", tags=["leads"])


@router.get("", response_model=list[LeadRead])
def list_leads(
    status: Optional[str] = Query(None, description="Filter by status"),
    owner: Optional[str] = Query(None),
    skip: int = 0,
    limit: int = 100,
    session: Session = Depends(get_session),
):
    query = select(Lead)
    if status and status != "ALL":
        query = query.where(Lead.status == status)
    if owner and owner != "ALL":
        query = query.where(Lead.owner == owner)
    query = query.offset(skip).limit(limit).order_by(Lead.created_at.desc())
    return session.exec(query).all()


@router.post("", response_model=LeadRead, status_code=201)
def create_lead(lead: LeadCreate, session: Session = Depends(get_session)):
    db_lead = Lead.model_validate(lead)
    session.add(db_lead)
    session.commit()
    session.refresh(db_lead)
    return db_lead


@router.get("/{lead_id}", response_model=LeadRead)
def get_lead(lead_id: int, session: Session = Depends(get_session)):
    lead = session.get(Lead, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead


@router.patch("/{lead_id}", response_model=LeadRead)
def update_lead(lead_id: int, updates: LeadUpdate, session: Session = Depends(get_session)):
    lead = session.get(Lead, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    data = updates.model_dump(exclude_unset=True)
    data["updated_at"] = datetime.utcnow()
    lead.sqlmodel_update(data)
    session.add(lead)
    session.commit()
    session.refresh(lead)
    return lead


@router.delete("/{lead_id}", status_code=204)
def delete_lead(lead_id: int, session: Session = Depends(get_session)):
    lead = session.get(Lead, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    session.delete(lead)
    session.commit()
