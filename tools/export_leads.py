"""
export_leads.py
───────────────
Exports all leads from the CRM Arena database to a CSV file.

Usage:
    cd backend
    python ../tools/export_leads.py                     # → .tmp/leads_export.csv
    python ../tools/export_leads.py --out my_file.csv   # → custom path
    python ../tools/export_leads.py --status QUALIFIED  # → filtered by status
"""

import sys
import os
import csv
import argparse
from datetime import datetime

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from sqlmodel import Session, select
from database import engine
from models import Lead


def export(out_path: str, status: str | None = None):
    os.makedirs(os.path.dirname(out_path) if os.path.dirname(out_path) else ".", exist_ok=True)

    with Session(engine) as session:
        query = select(Lead)
        if status:
            query = query.where(Lead.status == status.upper())
        query = query.order_by(Lead.created_at.desc())
        leads = session.exec(query).all()

    if not leads:
        print("No leads found matching the filter.")
        return

    fields = ["id", "name", "email", "company", "phone", "status", "source", "owner", "created_at", "updated_at"]

    with open(out_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        for lead in leads:
            writer.writerow({k: getattr(lead, k, "") for k in fields})

    print(f"✓ Exported {len(leads)} leads → {out_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Export leads to CSV")
    parser.add_argument("--out", default=f"../.tmp/leads_export_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv")
    parser.add_argument("--status", default=None, help="Filter by status: NEW, CONTACTED, QUALIFIED, LOST")
    args = parser.parse_args()
    export(args.out, args.status)
