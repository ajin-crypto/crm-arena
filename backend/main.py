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
# ALLOWED_ORIGINS env var is a comma-separated list of origins.
# Defaults to localhost dev server when not set.
_raw_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
origins = [o.strip() for o in _raw_origins.split(",") if o.strip()]

# Allow all Vercel preview deployments
origins.append("https://crm-arena.vercel.app")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://crm-arena.*\.vercel\.app",
    allow_credentials=True,
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
