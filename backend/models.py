from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field


# ─────────────────────────────────────────────
# Lead
# ─────────────────────────────────────────────

class LeadBase(SQLModel):
    name: str
    email: str
    company: str
    phone: Optional[str] = None
    status: str = "NEW"          # NEW | CONTACTED | QUALIFIED | LOST
    source: Optional[str] = None
    owner: Optional[str] = None


class Lead(LeadBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class LeadCreate(LeadBase):
    pass


class LeadUpdate(SQLModel):
    name: Optional[str] = None
    email: Optional[str] = None
    company: Optional[str] = None
    phone: Optional[str] = None
    status: Optional[str] = None
    source: Optional[str] = None
    owner: Optional[str] = None


class LeadRead(LeadBase):
    id: int
    created_at: datetime
    updated_at: datetime


# ─────────────────────────────────────────────
# Contact
# ─────────────────────────────────────────────

class ContactBase(SQLModel):
    name: str
    title: Optional[str] = None
    company: Optional[str] = None
    company_type: Optional[str] = None
    email: str
    phone: Optional[str] = None
    engagement: str = "Warm"     # Warm | Engaged | Stalled
    online: bool = False
    last_touch: Optional[str] = None


class Contact(ContactBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ContactCreate(ContactBase):
    pass


class ContactUpdate(SQLModel):
    name: Optional[str] = None
    title: Optional[str] = None
    company: Optional[str] = None
    company_type: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    engagement: Optional[str] = None
    online: Optional[bool] = None
    last_touch: Optional[str] = None


class ContactRead(ContactBase):
    id: int
    created_at: datetime


# ─────────────────────────────────────────────
# Opportunity  (pipeline deal)
# ─────────────────────────────────────────────

class OpportunityBase(SQLModel):
    title: str
    company: str
    value: int = 0               # deal value in USD
    stage: str = "prospecting"   # prospecting | investigation | value_prop | negotiation | closed
    probability: int = 50        # 0-100
    owner: Optional[str] = None
    priority: bool = False
    vip: bool = False
    closed: bool = False


class Opportunity(OpportunityBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class OpportunityCreate(OpportunityBase):
    pass


class OpportunityUpdate(SQLModel):
    title: Optional[str] = None
    company: Optional[str] = None
    value: Optional[int] = None
    stage: Optional[str] = None
    probability: Optional[int] = None
    owner: Optional[str] = None
    priority: Optional[bool] = None
    vip: Optional[bool] = None
    closed: Optional[bool] = None


class OpportunityRead(OpportunityBase):
    id: int
    created_at: datetime
    updated_at: datetime
