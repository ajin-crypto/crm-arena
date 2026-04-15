from datetime import datetime
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select

from database import get_session
from models import Contact, ContactCreate, ContactRead, ContactUpdate

router = APIRouter(prefix="/contacts", tags=["contacts"])


@router.get("", response_model=list[ContactRead])
def list_contacts(
    engagement: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    alpha: Optional[str] = Query(None, description="Single letter filter"),
    skip: int = 0,
    limit: int = 100,
    session: Session = Depends(get_session),
):
    query = select(Contact)
    if engagement:
        query = query.where(Contact.engagement == engagement)
    results = session.exec(query.offset(skip).limit(limit)).all()

    # In-memory filters that are awkward in SQLite (case-insensitive LIKE)
    if alpha and alpha != "ALL":
        results = [c for c in results if c.name.upper().startswith(alpha.upper())]
    if search:
        q = search.lower()
        results = [
            c for c in results
            if q in c.name.lower()
            or (c.company and q in c.company.lower())
            or q in c.email.lower()
        ]
    return results


@router.post("", response_model=ContactRead, status_code=201)
def create_contact(contact: ContactCreate, session: Session = Depends(get_session)):
    db_contact = Contact.model_validate(contact)
    session.add(db_contact)
    session.commit()
    session.refresh(db_contact)
    return db_contact


@router.get("/{contact_id}", response_model=ContactRead)
def get_contact(contact_id: int, session: Session = Depends(get_session)):
    contact = session.get(Contact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact


@router.patch("/{contact_id}", response_model=ContactRead)
def update_contact(contact_id: int, updates: ContactUpdate, session: Session = Depends(get_session)):
    contact = session.get(Contact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    data = updates.model_dump(exclude_unset=True)
    data["updated_at"] = datetime.utcnow()
    contact.sqlmodel_update(data)
    session.add(contact)
    session.commit()
    session.refresh(contact)
    return contact


@router.delete("/{contact_id}", status_code=204)
def delete_contact(contact_id: int, session: Session = Depends(get_session)):
    contact = session.get(Contact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    session.delete(contact)
    session.commit()
