# Agent Instructions

You're working inside the **WAT framework** (Workflows, Agents, Tools). This architecture separates concerns so that probabilistic AI handles reasoning while deterministic code handles execution. That separation is what makes this system reliable.

## The WAT Architecture

**Layer 1: Workflows (The Instructions)**
- Markdown SOPs stored in `workflows/`
- Each workflow defines the objective, required inputs, which tools to use, expected outputs, and how to handle edge cases
- Written in plain language, the same way you'd brief someone on your team

**Layer 2: Agents (The Decision-Maker)**
- This is your role. You're responsible for intelligent coordination.
- Read the relevant workflow, run tools in the correct sequence, handle failures gracefully, and ask clarifying questions when needed
- You connect intent to execution without trying to do everything yourself
- Example: If you need to pull data from a website, don't attempt it directly. Read `workflows/scrape_website.md`, figure out the required inputs, then execute `tools/scrape_single_site.py`

**Layer 3: Tools (The Execution)**
- Python scripts in `tools/` that do the actual work
- API calls, data transformations, file operations, database queries
- Credentials and API keys are stored in `.env`
- These scripts are consistent, testable, and fast

**Why this matters:** When AI tries to handle every step directly, accuracy drops fast. If each step is 90% accurate, you're down to 59% success after just five steps. By offloading execution to deterministic scripts, you stay focused on orchestration and decision-making where you excel.

## How to Operate

**1. Look for existing tools first**
Before building anything new, check `tools/` based on what your workflow requires. Only create new scripts when nothing exists for that task.

**2. Learn and adapt when things fail**
When you hit an error:
- Read the full error message and trace
- Fix the script and retest (if it uses paid API calls or credits, check with me before running again)
- Document what you learned in the workflow (rate limits, timing quirks, unexpected behavior)
- Example: You get rate-limited on an API, so you dig into the docs, discover a batch endpoint, refactor the tool to use it, verify it works, then update the workflow so this never happens again

**3. Keep workflows current**
Workflows should evolve as you learn. When you find better methods, discover constraints, or encounter recurring issues, update the workflow. That said, don't create or overwrite workflows without asking unless I explicitly tell you to. These are your instructions and need to be preserved and refined, not tossed after one use.

## The Self-Improvement Loop

Every failure is a chance to make the system stronger:
1. Identify what broke
2. Fix the tool
3. Verify the fix works
4. Update the workflow with the new approach
5. Move on with a more robust system

This loop is how the framework improves over time.

## File Structure

**What goes where:**
- **Deliverables**: Final outputs go to cloud services (Google Sheets, Slides, etc.) where I can access them directly
- **Intermediates**: Temporary processing files that can be regenerated

**Directory layout:**
```
.tmp/           # Temporary files (scraped data, intermediate exports). Regenerated as needed.
tools/          # Python scripts for deterministic execution
workflows/      # Markdown SOPs defining what to do and how
.env            # API keys and environment variables (NEVER store secrets anywhere else)
credentials.json, token.json  # Google OAuth (gitignored)
```

**Core principle:** Local files are just for processing. Anything I need to see or use lives in cloud services. Everything in `.tmp/` is disposable.

## Bottom Line

You sit between what I want (workflows) and what actually gets done (tools). Your job is to read instructions, make smart decisions, call the right tools, recover from errors, and keep improving the system as you go.

Stay pragmatic. Stay reliable. Keep learning.

---

# CRM Arena — Project Context

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, Tailwind CSS v3 (CSS variable tokens) |
| Routing | React Router v7 with `React.lazy()` code splitting |
| State | Zustand (`useAppStore`, `useLeadsStore`, `useContactsStore`, `usePipelineStore`) |
| Data Fetching | TanStack Query v5 + Axios (`src/services/api.js`) |
| Forms | React Hook Form + Zod |
| Drag & Drop | @dnd-kit (kanban board) |
| Backend | FastAPI + SQLModel (`redirect_slashes=False` on app) |
| Database | SQLite dev (`crm_arena.db`) → PostgreSQL prod |

## Design System — Kinetic Blue

**Hard rules — never break these:**
- **No `text-white`** on any colored background. Use `text-on-primary` (gradient/primary buttons), `text-on-tertiary` (tertiary gradient), `text-on-surface` (cards).
- **No `bg-white`** anywhere. Use `bg-surface-container-lowest` (cards/modals), `bg-surface` (page background).
- **No `border-white`** on avatar separators. Use `border-surface-container-lowest`.
- **No hardcoded hex colors** in classNames or inline styles. Every color must be a Tailwind design token.
- **No 1px borders** (`border`, `border-1`). Use tonal surface layering for depth.
- **`cn()` required** on every component with conditional classNames — import from `@/utils/cn`.

**Gradient buttons:**
- `.hero-gradient text-on-primary` — primary blue gradient. `on-primary` = white in light mode, dark navy in dark mode.
- `.kpi-gradient text-on-tertiary` — green gradient. `on-tertiary` = white in light mode, dark green in dark mode.
- Never use `text-white` on gradients — it breaks dark mode contrast.

**Dark mode:**
- All tokens are CSS variables. `:root` defines light values; `.dark` (on `<html>`) defines dark values.
- The `dark` class is toggled by `useAppStore.toggleTheme()` and persisted to `localStorage` under key `'crm-theme'`.
- To add a new dark-mode override: add `.dark .your-class { ... }` in `src/index.css`.

**Token reference (light → dark):**
- `surface`: `#f9f9f8` → `#111312`
- `surface-container-lowest`: `#ffffff` → `#0c0f0f`
- `primary`: `#005fac` → `#a4c9ff`
- `on-primary`: `#ffffff` → `#001c39`
- `on-surface`: `#1a1c1c` → `#e2e3e2`

## Key Conventions

### Frontend
- Path alias: `@/` → `src/`
- Hooks live in `src/hooks/` — one file per domain (`useLeads.js`, `useContacts.js`, `usePipeline.js`, `useAnalytics.js`)
- Always call `queryClient.invalidateQueries({ queryKey: [KEY] })` on mutation success
- Filter values that mean "no filter" (e.g. `'ALL'`, empty string) must be excluded from API params
- Skeleton components in `src/components/ui/Skeleton.jsx`: `SkeletonRow`, `SkeletonContactRow`, `SkeletonKpiCard`, `SkeletonDealCard`
- QueryClient defaults: `staleTime: 30s`, `retry: 1`, `refetchOnWindowFocus: false`

### Backend
- Use `python3` (not `python`) on macOS
- `FastAPI(redirect_slashes=False)` — all list/create routes use `@router.get("")` not `@router.get("/")`
- PATCH for partial updates (not PUT) — use `model_dump(exclude_unset=True)`
- Seeding: `cd backend && python3 ../tools/seed_database.py`
- Running: `cd backend && python3 -m uvicorn main:app --reload`

### Sparkline
- `Sparkline` uses `currentColor` for SVG stroke and gradient fill — set color via `text-*` class on the wrapper or parent
- Do NOT pass a hex string or CSS variable string as the `color` prop — the gradient ID will break

## Available Tools

| Tool | Run from | Usage |
|------|----------|-------|
| `tools/seed_database.py` | `backend/` | `python3 ../tools/seed_database.py` — seeds 10 leads, 10 contacts, 11 opportunities |
| `tools/export_leads.py` | `backend/` | `python3 ../tools/export_leads.py [--status NEW] [--out path.csv]` |
| `tools/health_check.py` | anywhere | `python3 tools/health_check.py [--url http://localhost:8000/health]` |

## Workflows
All 9 phase workflows live in `workflows/`. Read the relevant one before making changes to that phase's code.

| Workflow | Covers |
|----------|--------|
| `phase1_setup.md` | Tailwind config, fonts, path alias |
| `phase2_layout_shell.md` | TopNav, SideNav, BottomNav, routing |
| `phase3a_dashboard.md` | KPI bento, sparklines, charts |
| `phase3b_leads.md` | Leads table, filter bar, create modal |
| `phase3c_contacts.md` | Alpha filter, contact grid, detail sidebar |
| `phase3d_pipeline.md` | Kanban board, @dnd-kit |
| `phase3e_analytics.md` | Revenue chart, donut, accounts table |
| `phase4_backend.md` | FastAPI, SQLModel, seed script |
| `phase5_integration.md` | TanStack Query, hooks, skeleton, optimistic DnD |
| `phase6_polish.md` | CSS variable dark mode, localStorage, code splitting |
| `deployment_to_production.md` | Demo deploy, production checklist, environment setup |
