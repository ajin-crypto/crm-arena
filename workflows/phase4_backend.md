# Phase 4: FastAPI Backend

## Status: ✅ Complete

## Objective
Build the CRM Arena backend API using FastAPI + SQLModel. Provides REST endpoints for Leads, Contacts, and Opportunities (Pipeline), plus an analytics summary endpoint. SQLite in development; ready for PostgreSQL in production.

## Inputs Required
- `backend/` directory (empty at start)
- `DATABASE_URL` from `.env` (defaults to `sqlite:///./crm_arena.db`)

## Outputs
- Running FastAPI server at `http://localhost:8000`
- Auto-generated OpenAPI docs at `http://localhost:8000/docs`
- SQLite database at `backend/crm_arena.db`

## Files Created

### Backend Core
| File | Purpose |
|---|---|
| `backend/requirements.txt` | Python deps: fastapi, sqlmodel, uvicorn[standard], python-multipart, python-dotenv |
| `backend/database.py` | SQLModel engine from `DATABASE_URL` env var; `get_session` dependency; `create_db_and_tables()` called on startup |
| `backend/models.py` | Three table models: `Lead`, `Contact`, `Opportunity`. Each has a Base, Create, Update, and Read schema. |
| `backend/main.py` | FastAPI app + CORS middleware (allows localhost:5173) + startup hook + router registration + `/health` endpoint |

### Routers (`backend/routers/`)
| File | Endpoints |
|---|---|
| `leads.py` | `GET /leads` (status/owner filters), `POST /leads`, `GET /leads/{id}`, `PATCH /leads/{id}`, `DELETE /leads/{id}` |
| `contacts.py` | `GET /contacts` (engagement/search/alpha filters), `POST /contacts`, `GET /contacts/{id}`, `PATCH /contacts/{id}`, `DELETE /contacts/{id}` |
| `pipeline.py` | `GET /pipeline` (stage filter), `POST /pipeline`, `GET /pipeline/{id}`, `PATCH /pipeline/{id}`, `PATCH /pipeline/{id}/move?stage=X`, `DELETE /pipeline/{id}` |
| `analytics.py` | `GET /analytics/summary`, `GET /analytics/leads/funnel` |

### Tools
| File | Purpose |
|---|---|
| `tools/seed_database.py` | Inserts 10 leads, 10 contacts, 11 opportunities matching frontend mocks. Clears existing rows first (safe to re-run). Usage: `cd backend && python ../tools/seed_database.py` |

## Models

### Lead
```python
id, name, email, company, phone, status (NEW|CONTACTED|QUALIFIED|LOST),
source, owner, created_at, updated_at
```

### Contact
```python
id, name, title, company, company_type, email, phone,
engagement (Warm|Engaged|Stalled), online (bool), last_touch, created_at
```

### Opportunity
```python
id, title, company, value (int USD), stage (prospecting|investigation|value_prop|negotiation|closed),
probability (0-100), owner, priority (bool), vip (bool), closed (bool),
created_at, updated_at
```

## Key Design Decisions

### SQLModel over raw SQLAlchemy
SQLModel combines Pydantic (for request/response validation) and SQLAlchemy (for ORM) in one definition. This means one model class covers both DB schema and API schema, reducing duplication. The `LeadBase → Lead (table) / LeadCreate / LeadUpdate / LeadRead` pattern isolates what fields are required at creation vs. what can be updated vs. what is returned.

### PATCH instead of PUT for updates
All update endpoints use `PATCH` with `model_dump(exclude_unset=True)` so the client can send only the fields it wants to change. PUT would require sending the entire object.

### `/pipeline/{id}/move` convenience endpoint
Drag-and-drop from the kanban board sends a simple `PATCH /pipeline/{id}/move?stage=closed` call rather than a full object update. The endpoint also automatically sets `closed=True` when the target stage is `"closed"`.

### In-memory filters for contacts
SQLite string matching (case-insensitive LIKE) is awkward with SQLModel. The contacts router fetches up to 100 records and applies alpha/search filters in Python. This is fine at dev scale; Phase 6 can push these to DB with proper indexes.

### Analytics computed on-the-fly
No materialized views or caching at this stage. `GET /analytics/summary` runs three simple selects and aggregates in Python. Fast enough for hundreds of records; Phase 6 can add Redis caching if needed.

## How to Run

```bash
cd backend
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Seed the database
python ../tools/seed_database.py

# Start the server
uvicorn main:app --reload
# → http://localhost:8000
# → http://localhost:8000/docs   (Swagger UI)
```

## API Endpoints Summary

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Liveness check |
| GET | `/leads` | List leads (status, owner, skip, limit filters) |
| POST | `/leads` | Create lead |
| GET | `/leads/{id}` | Get lead |
| PATCH | `/leads/{id}` | Update lead fields |
| DELETE | `/leads/{id}` | Delete lead |
| GET | `/contacts` | List contacts (engagement, search, alpha filters) |
| POST | `/contacts` | Create contact |
| GET | `/contacts/{id}` | Get contact |
| PATCH | `/contacts/{id}` | Update contact fields |
| DELETE | `/contacts/{id}` | Delete contact |
| GET | `/pipeline` | List opportunities (stage filter) |
| POST | `/pipeline` | Create opportunity |
| GET | `/pipeline/{id}` | Get opportunity |
| PATCH | `/pipeline/{id}` | Update opportunity fields |
| PATCH | `/pipeline/{id}/move` | Move to stage (kanban drag-and-drop) |
| DELETE | `/pipeline/{id}` | Delete opportunity |
| GET | `/analytics/summary` | Executive summary (revenue, pipeline, ratios) |
| GET | `/analytics/leads/funnel` | Leads conversion funnel counts |

## Success Criteria
- ✅ `uvicorn main:app --reload` starts without errors
- ✅ `/health` returns `{"status": "ok"}`
- ✅ `/docs` shows all endpoints with correct schemas
- ✅ `seed_database.py` inserts 10+10+11 rows cleanly
- ✅ `GET /leads` returns 10 leads
- ✅ `GET /analytics/summary` returns computed revenue/pipeline stats
- ✅ CORS allows requests from `http://localhost:5173`
