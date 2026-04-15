import os
import re
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from database import create_db_and_tables
from routers import leads, contacts, pipeline, analytics

load_dotenv()

app = FastAPI(
    title="CRM Arena API",
    version="0.1.0",
    description="Backend API for CRM Arena — Leadrax sales intelligence platform.",
    redirect_slashes=False,
)

# ─── CORS ────────────────────────────────────────────────────────────────────
# Allow ALL origins for now to fix CORS issues
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Startup ─────────────────────────────────────────────────────────────────
@app.on_event("startup")
def on_startup():
    create_db_and_tables()


# ─── Routers ─────────────────────────────────────────────────────────────────
app.include_router(leads.router)
app.include_router(contacts.router)
app.include_router(pipeline.router)
app.include_router(analytics.router)


# ─── Health check ────────────────────────────────────────────────────────────
@app.get("/health", tags=["system"])
def health():
    return {"status": "ok", "service": "CRM Arena API"}
