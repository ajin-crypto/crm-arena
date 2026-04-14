# CRM Arena

A modern, high-end sales CRM built for Leadrax — designed around the **Kinetic Blue** design system and the **WAT framework** (Workflows → Agent → Tools).

---

## Project Structure

```
CRM Arena/
├── frontend/                    React 19 + Vite + Tailwind CSS v3
├── backend/                     FastAPI + SQLModel
├── tools/
│   ├── health_check.py          — ping GET /health, exit 0/1
│   ├── export_leads.py          — export leads to CSV (--status, --out)
│   └── seed_database.py         — seed 10 leads + 10 contacts + 11 opportunities
├── workflows/                   Markdown SOPs — one per phase
├── docs/
│   ├── ARCHITECTURE.md          System architecture overview
│   ├── CHANGELOG.md             Version history
│   ├── DEPLOYMENT_COMPARISON.md Deployment options compared
│   ├── DEPLOYMENT_QUICKSTART.md Fast-path deployment guide
│   ├── DOCUMENTATION_INDEX.md   Index of all project docs
│   ├── GETTING_STARTED.md       Onboarding guide for new contributors
│   └── PROJECT_MAP.txt          Directory and file map
├── .tmp/                        Temporary processing files (gitignored)
├── .env                         API keys and secrets (gitignored)
├── CLAUDE.md                    Agent instructions (WAT framework rules)
├── CRM Arena.code-workspace     VS Code multi-root workspace
└── README.md                    This file
```

---

## Design System — Kinetic Blue

| Token | Value |
|---|---|
| Primary | `#005fac` |
| Primary Container | `#4599f8` |
| Surface | `#f9f9f8` |
| Surface Container Lowest | `#ffffff` |
| Tertiary (positive) | `#0e6d36` |
| Error | `#ba1a1a` |
| Headline font | Manrope |
| Body font | Inter |

**Core rules:** No 1px borders. Depth via tonal surface layering. Frosted glass nav. Gradient pill CTAs.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, Tailwind CSS 3 |
| Routing | React Router v7 |
| State | Zustand |
| Data Fetching | TanStack Query v5 + Axios |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Drag & Drop | @dnd-kit |
| Backend | FastAPI + SQLModel |
| Database | SQLite (dev) → PostgreSQL (prod) |

---

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 -m uvicorn main:app --reload
# → http://localhost:8000
```

### Seed + Tools

```bash
# Seed database with 10 leads, 10 contacts, 11 opportunities
cd backend && python3 ../tools/seed_database.py

# Export leads to CSV
cd backend && python3 ../tools/export_leads.py --status QUALIFIED --out ../leads.csv

# Check API health
python3 tools/health_check.py
```

### Environment Variables

Copy `.env.example` to `.env` and fill in values:

```bash
cp .env.example .env
```

---

## Build Phases

| Phase | Status | Description |
|---|---|---|
| 1 — Foundation | ✅ Done | Tailwind config, fonts, path alias, directory structure |
| 2 — Layout Shell | ✅ Done | TopNav, SideNav, BottomNav, routing |
| 3A — Dashboard | ✅ Done | KPI bento, sparklines, bar chart, activity feed, pipeline distribution |
| 3B — Leads | ✅ Done | Fluid table, filter bar, status badges, create modal |
| 3C — Contacts | ✅ Done | Alpha filter, grid table, sticky detail sidebar |
| 3D — Pipeline | ✅ Done | @dnd-kit kanban board, drag-and-drop between stages |
| 3E — Analytics | ✅ Done | Bar chart, SVG donut, top accounts table |
| 4 — Backend API | ✅ Done | FastAPI CRUD, SQLModel models, seed script |
| 5 — Integration | ✅ Done | TanStack Query, API hooks, skeleton loading, optimistic DnD |
| 6 — Polish | ✅ Done | Dark mode (CSS vars), localStorage persistence, React.lazy() code splitting |
| 7 — Deployment | ✅ Done | Demo deployment, production readiness, deployment comparison |

---

## WAT Framework

This project runs on the **WAT** architecture:

- **Workflows** (`workflows/`) — Markdown SOPs that define objectives, steps, and edge cases
- **Agent** (Claude) — reads workflows, makes decisions, calls tools
- **Tools** (`tools/`) — Python scripts for deterministic execution (API calls, data transforms, exports)

See [CLAUDE.md](CLAUDE.md) for full agent instructions.
