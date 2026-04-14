"""
seed_neon.py
────────────
Seed Neon PostgreSQL database via Railway deployment.
Connects using DATABASE_URL environment variable.

Usage:
    # Set your Neon connection string
    export DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require"
    
    # Run from backend directory
    cd backend
    python ../tools/seed_neon.py
"""

import sys
import os
from datetime import datetime, timedelta

# Add backend/ to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from sqlmodel import Session, select, delete
from database import engine, create_db_and_tables
from models import Lead, Contact, Opportunity

# ─── Seed Data ────────────────────────────────────────────────────────────────

LEADS = [
    {"name": "Jordan Donovan",  "email": "jordan.d@vortex.io",         "company": "Vortex Dynamics",   "status": "QUALIFIED", "source": "Organic Search", "owner": "Sarah Jenkins",  "phone": "+1 (555) 100-0001"},
    {"name": "Sarah Jenkins",   "email": "s.jenkins@lumina.com",        "company": "Lumina Creative",   "status": "NEW",       "source": "Referral",       "owner": "Mark Thompson",  "phone": "+1 (555) 100-0002"},
    {"name": "Marcus Knight",   "email": "m.knight@zenith.org",         "company": "Zenith Global",     "status": "CONTACTED", "source": "Cold Outreach",  "owner": "Sarah Jenkins",  "phone": "+1 (555) 100-0003"},
    {"name": "Alex Rivera",     "email": "alex.rivera@skytech.co",      "company": "SkyTech Solutions", "status": "LOST",      "source": "Paid Ads",       "owner": "James Park",     "phone": "+1 (555) 100-0004"},
    {"name": "Priya Lakshmi",   "email": "p.lak@oceanic.in",            "company": "Oceanic Logistics", "status": "QUALIFIED", "source": "Webinar",        "owner": "Sarah Jenkins",  "phone": "+1 (555) 100-0005"},
    {"name": "Daniel Choi",     "email": "d.choi@apexlab.com",          "company": "Apex Labs",         "status": "NEW",       "source": "Social Media",   "owner": "Mark Thompson",  "phone": "+1 (555) 100-0006"},
    {"name": "Fatima Nasser",   "email": "f.nasser@horizonco.ae",       "company": "Horizon Co.",       "status": "CONTACTED", "source": "Cold Outreach",  "owner": "James Park",     "phone": "+1 (555) 100-0007"},
    {"name": "Lucas Oliveira",  "email": "l.oliveira@brightpath.br",    "company": "BrightPath",        "status": "QUALIFIED", "source": "Referral",       "owner": "Sarah Jenkins",  "phone": "+1 (555) 100-0008"},
    {"name": "Emma Langford",   "email": "e.lang@novawrks.com",         "company": "NovaWorks",         "status": "NEW",       "source": "LinkedIn",       "owner": "Mark Thompson",  "phone": "+1 (555) 100-0009"},
    {"name": "Ravi Menon",      "email": "r.menon@deltasync.in",        "company": "DeltaSync",         "status": "LOST",      "source": "Paid Ads",       "owner": "James Park",     "phone": "+1 (555) 100-0010"},
]

CONTACTS = [
    {"name": "Elena Rodriguez",   "title": "Strategic Account Manager", "company": "Global Dynamics Inc.",   "company_type": "Fortune 500 Enterprise", "email": "elena.r@globaldyn.com",    "phone": "+1 (555) 012-3456", "engagement": "Warm",    "online": True,  "last_touch": "2 hours ago"},
    {"name": "Marcus Sterling",   "title": "Chief Operations Officer",  "company": "NorthStar Logistics",    "company_type": "Key Growth Lead",        "email": "m.sterling@northstar.co",  "phone": "+1 (555) 987-6543", "engagement": "Engaged", "online": False, "last_touch": "Yesterday"},
    {"name": "Dr. Sarah Jenkins", "title": "VP of Innovation",          "company": "BioTech Solutions",      "company_type": "Government Research",    "email": "s.jenkins@biotech.org",    "phone": "+1 (555) 234-5678", "engagement": "Stalled", "online": True,  "last_touch": "3 days ago"},
    {"name": "Thomas Chen",       "title": "Lead Designer",             "company": "Pixel Path Labs",        "company_type": "Design Partner",         "email": "t.chen@pixelpath.io",      "phone": "+1 (555) 345-6789", "engagement": "Engaged", "online": False, "last_touch": "Aug 12"},
    {"name": "Aisha Okonkwo",     "title": "Head of Procurement",       "company": "Meridian Corp",          "company_type": "Enterprise Client",      "email": "a.okonkwo@meridian.co",    "phone": "+44 20 7946 0958",  "engagement": "Warm",    "online": True,  "last_touch": "1 week ago"},
    {"name": "Raj Patel",         "title": "CTO",                       "company": "CloudNine Systems",      "company_type": "SaaS Partner",           "email": "raj.p@cloudnine.io",       "phone": "+91 98765 43210",   "engagement": "Engaged", "online": True,  "last_touch": "Just now"},
    {"name": "Francesca Levi",    "title": "Sales Director",            "company": "Luxe Market Group",      "company_type": "Channel Partner",        "email": "f.levi@luxemarket.eu",     "phone": "+39 06 6988 0001",  "engagement": "Warm",    "online": False, "last_touch": "2 days ago"},
    {"name": "James Okafor",      "title": "Founder & CEO",             "company": "FinFlow Analytics",      "company_type": "Startup Client",         "email": "james@finflow.ng",         "phone": "+234 803 000 0001", "engagement": "Stalled", "online": False, "last_touch": "Oct 20"},
    {"name": "Yuki Tanaka",       "title": "Regional VP",               "company": "Pacific Bridge Co.",     "company_type": "Distribution Partner",   "email": "y.tanaka@pacbridge.jp",    "phone": "+81 3-1234-5678",   "engagement": "Engaged", "online": True,  "last_touch": "Oct 18"},
    {"name": "Priya Nair",        "title": "Marketing Manager",         "company": "BrightStar Media",       "company_type": "Media Partner",          "email": "priya.n@brightstar.in",    "phone": "+91 99887 65432",   "engagement": "Warm",    "online": True,  "last_touch": "5 hours ago"},
]

now = datetime.utcnow()

OPPORTUNITIES = [
    # Prospecting
    {"title": "Cloud Platform Upgrade",  "company": "DeltaSync",          "value": 85000,  "stage": "prospecting",   "probability": 20, "owner": "James Park",    "priority": False, "vip": False, "closed": False},
    {"title": "Annual SaaS Contract",    "company": "Apex Labs",           "value": 120000, "stage": "prospecting",   "probability": 25, "owner": "Mark Thompson", "priority": True,  "vip": False, "closed": False},
    # Investigation
    {"title": "ERP Integration Suite",  "company": "Zenith Global",       "value": 195000, "stage": "investigation", "probability": 40, "owner": "Sarah Jenkins", "priority": False, "vip": True,  "closed": False},
    {"title": "Data Analytics Package", "company": "Oceanic Logistics",   "value": 78000,  "stage": "investigation", "probability": 45, "owner": "James Park",    "priority": False, "vip": False, "closed": False},
    # Value Proposition
    {"title": "Security Audit & Tools", "company": "BrightPath",          "value": 230000, "stage": "value_prop",    "probability": 60, "owner": "Mark Thompson", "priority": True,  "vip": False, "closed": False},
    {"title": "Global Rollout License", "company": "Global Dynamics Inc.", "value": 420000, "stage": "value_prop",    "probability": 55, "owner": "Sarah Jenkins", "priority": False, "vip": True,  "closed": False},
    # Negotiation
    {"title": "Enterprise Premium Tier","company": "NorthStar Logistics",  "value": 182500, "stage": "negotiation",   "probability": 80, "owner": "Mark Thompson", "priority": False, "vip": False, "closed": False},
    {"title": "Custom API Gateway",     "company": "CloudNine Systems",    "value": 95000,  "stage": "negotiation",   "probability": 75, "owner": "James Park",    "priority": True,  "vip": False, "closed": False},
    # Closed
    {"title": "Q3 Platform License",    "company": "Astra Global Systems", "value": 245000, "stage": "closed",        "probability": 100,"owner": "Sarah Jenkins", "priority": False, "vip": False, "closed": True,
     "updated_at": now - timedelta(days=2)},
    {"title": "APAC Distribution Deal", "company": "Pacific Bridge Co.",   "value": 72500,  "stage": "closed",        "probability": 100,"owner": "Mark Thompson", "priority": False, "vip": False, "closed": True,
     "updated_at": now - timedelta(days=10)},
    {"title": "EMEA SaaS Renewal",      "company": "Luxe Market Group",    "value": 125000, "stage": "closed",        "probability": 100,"owner": "Sarah Jenkins", "priority": False, "vip": False, "closed": True,
     "updated_at": now - timedelta(days=25)},
]


# ─── Runner ───────────────────────────────────────────────────────────────────

def seed():
    print("🌱 Starting Neon database seeding...")
    print(f"📊 Database URL: {os.getenv('DATABASE_URL', 'Not set')[:50]}...")
    
    create_db_and_tables()
    print("✅ Database tables created/verified")

    with Session(engine) as session:
        # Clear existing data
        print("\n🗑️  Clearing existing records...")
        session.exec(delete(Lead))
        session.exec(delete(Contact))
        session.exec(delete(Opportunity))
        session.commit()
        print("   Cleared existing records.")

        # Insert leads
        print("\n📋 Inserting leads...")
        for data in LEADS:
            session.add(Lead(**data))
        session.commit()
        print(f"   ✅ Inserted {len(LEADS)} leads.")

        # Insert contacts
        print("\n👥 Inserting contacts...")
        for data in CONTACTS:
            session.add(Contact(**data))
        session.commit()
        print(f"   ✅ Inserted {len(CONTACTS)} contacts.")

        # Insert opportunities
        print("\n💼 Inserting opportunities...")
        for data in OPPORTUNITIES:
            updated_at = data.pop("updated_at", now)
            opp = Opportunity(**data)
            opp.updated_at = updated_at
            session.add(opp)
        session.commit()
        print(f"   ✅ Inserted {len(OPPORTUNITIES)} opportunities.")

    print("\n🎉 Database seeded successfully!")
    print(f"\n📊 Summary:")
    print(f"   • {len(LEADS)} leads")
    print(f"   • {len(CONTACTS)} contacts")
    print(f"   • {len(OPPORTUNITIES)} opportunities")
    print(f"\n✨ Your CRM is ready to use!")


if __name__ == "__main__":
    # Check if DATABASE_URL is set
    if not os.getenv("DATABASE_URL"):
        print("❌ ERROR: DATABASE_URL environment variable not set!")
        print("\n💡 Set it with:")
        print('   export DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require"')
        sys.exit(1)
    
    seed()
