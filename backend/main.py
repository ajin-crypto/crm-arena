import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from database import create_db_and_tables
from routers import leads, contacts, pipeline, analytics

load_dotenv()


# ─── Lifespan ────────────────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(
    title="CRM Arena API",
    version="0.1.0",
    description="Backend API for CRM Arena — Leadrax sales intelligence platform.",
    redirect_slashes=False,
    lifespan=lifespan,
)

# ─── CORS ────────────────────────────────────────────────────────────────────
_raw_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173")
allowed_origins = [o.strip() for o in _raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"https://crm-arena[a-z0-9\-]*\.vercel\.app",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Routers ─────────────────────────────────────────────────────────────────
app.include_router(leads.router)
app.include_router(contacts.router)
app.include_router(pipeline.router)
app.include_router(analytics.router)


# ─── Health check ────────────────────────────────────────────────────────────
@app.get("/health", tags=["system"])
def health():
    return {"status": "ok", "service": "CRM Arena API"}
