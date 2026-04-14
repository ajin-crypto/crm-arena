# Changelog

All notable changes to CRM Arena are documented here.

---

## [Unreleased]

---

## [1.0.1] — 2026-04-10

### Dark Mode Audit — Hardcoded Color Fixes

#### Fixed
- `src/components/ui/Sparkline.jsx` — Rewrote entirely: removed `color` prop; replaced with `currentColor` SVG technique so the sparkline inherits its stroke from the Tailwind `text-primary` class on the wrapper. Also replaced `color.replace('#', '')` gradient ID generation (which produced invalid SVG IDs like `"spark-rgb(var(--c-primary))"` when CSS variable strings were passed) with `useId()` from React 18+
- `src/components/ui/KpiCard.jsx` — Removed `color="rgb(var(--c-primary))"` prop from `<Sparkline>`; color now flows through `text-primary` on the Sparkline wrapper
- `src/index.css` — Added `.dark .hero-gradient` override: in dark mode uses `primary → primary-fixed` (both light-range blues) so `text-on-primary` (dark navy) has adequate contrast against both gradient endpoints. Added `.kpi-gradient` class (`tertiary → tertiary-container`) and `.dark .kpi-gradient` override (`tertiary → tertiary-fixed`, both light greens) for the Conversion Rate KPI card in Leads

#### Changed — `text-white` → `text-on-primary` (gradient/primary backgrounds)
All instances where `text-white` was used on a `hero-gradient` or `bg-primary` background — which breaks dark mode contrast (light blue primary background with white text = ~1.2:1 ratio). Semantic token `on-primary` = white in light mode, dark navy in dark mode.

| File | Location |
|------|----------|
| `layout/BottomNav.jsx` | FAB center button icon (`text-white` → `text-on-primary`); nav background (`bg-white/90` → `bg-surface/90`) |
| `layout/TopNav.jsx` | User avatar initials |
| `layout/SideNav.jsx` | "Create New Lead" CTA button |
| `pages/Leads.jsx` | "Create New Lead" page header button |
| `leads/CreateLeadModal.jsx` | Form submit button |
| `contacts/ContactsTable.jsx` | Active alpha-filter pagination pill |
| `leads/LeadsTable.jsx` | Active pagination page button |

#### Changed — tertiary gradient text
- `leads/LeadFilterBar.jsx` — Conversion Rate KPI card: `bg-gradient-to-br from-tertiary to-tertiary-container text-white` → `.kpi-gradient text-on-tertiary`. Semantic token `on-tertiary` = white in light mode, dark green in dark mode — correct contrast on both ends of the new dark-mode gradient

#### Changed — `border-white` → `border-surface-container-lowest` (avatar separators)
`border-white` on stacked avatars doesn't adapt in dark mode (white separator on dark card background is invisible). `surface-container-lowest` = white in light mode, near-black in dark mode — always contrasts with the card surface it sits on.

| File | Location |
|------|----------|
| `dashboard/KpiBentoGrid.jsx` | Avatar stack in Pipeline Deals card (×2) |
| `pipeline/DealCard.jsx` | Assignee avatar stack in deal footer |
| `contacts/ContactRow.jsx` | Online status dot ring |
| `contacts/ContactDetailSidebar.jsx` | Contact avatar border overlapping the hero band |

#### Changed — hero band close button
- `contacts/ContactDetailSidebar.jsx` — Close button on gradient hero band: `bg-white/20 hover:bg-white/30` → `bg-surface-container-lowest/20 hover:bg-surface-container-lowest/40`; icon `text-white` → `text-on-primary`

---

## [1.0.0] — 2026-04-10

### Phase 6: Polish — Dark Mode, Persistence & Code Splitting

#### Added
- `tools/health_check.py` — stdlib-only script; pings `GET /health`, prints status, exits 0/1
- `workflows/phase6_polish.md` — Phase 6 SOP documenting CSS variable strategy, persistence logic, code splitting approach, and edge cases

#### Changed
- `tailwind.config.js` — all 50 color tokens converted from hardcoded hex to `rgb(var(--c-TOKEN) / <alpha-value>)` pattern; enables opacity modifiers (`bg-primary/10`) to work with CSS variables
- `src/index.css` — added full `:root {}` (light) and `.dark {}` (dark) CSS variable blocks for the Kinetic Blue palette; `.glass-header`, `.hero-gradient`, `body`, and `.shadow-ambient` updated to reference CSS variables; dark palette derived from Material Design 3 dark scheme conventions
- `src/store/useAppStore.js` — init reads `localStorage.getItem('crm-theme')`, falls back to `prefers-color-scheme`, applies theme synchronously before React renders (prevents flash); `toggleTheme` writes to localStorage on every change
- `src/router.jsx` — all 5 page imports converted to `React.lazy()`; `AppLayout` wrapped in `<Suspense>` with a spinner fallback; initial bundle reduced from ~627KB to ~100KB

---

## [0.9.0] — 2026-04-10

### Phase 5: Frontend-Backend Integration

#### Added
- `@tanstack/react-query` + `axios` installed as frontend dependencies
- `QueryClientProvider` wrapped around app in `main.jsx` (staleTime: 30s, retry: 1, no refetch-on-focus)
- `src/hooks/useLeads.js` — `useLeads(filters)`, `useLead(id)`, `useCreateLead`, `useUpdateLead`, `useDeleteLead`
- `src/hooks/useContacts.js` — `useContacts(filters)`, `useCreateContact`, `useUpdateContact`, `useDeleteContact`
- `src/hooks/usePipeline.js` — `usePipeline(stage)`, `useCreateOpportunity`, `useUpdateOpportunity`, `useMoveOpportunity`, `useDeleteOpportunity`
- `src/hooks/useAnalytics.js` — `useAnalyticsSummary`, `useLeadsFunnel`
- `src/components/ui/Skeleton.jsx` — `Skeleton`, `SkeletonRow` (table), `SkeletonContactRow` (grid), `SkeletonKpiCard`, `SkeletonDealCard`
- `tools/export_leads.py` — exports leads to CSV; supports `--status` filter and `--out` path

#### Changed
- `LeadsTable` — replaced 10 mock rows with `useLeads(filters)`; shows `SkeletonRow ×5` while loading; shows inline error when backend is unreachable
- `CreateLeadModal` — `onSubmit` calls `useCreateLead().mutateAsync`; invalidates leads query on success; shows root error message on failure
- `ContactsTable` — replaced mock array with `useContacts({ alpha, search })`; shows `SkeletonContactRow ×6` while loading
- `KanbanBoard` — replaced `INITIAL_DEALS` seed with `usePipeline()`; maps API `Opportunity → DealCard` shape; calls `useMoveOpportunity` on cross-column drag; shows column skeleton headers + `SkeletonDealCard` while loading
- `KpiBentoGrid` — Revenue and Pipeline Deals values live from `useAnalyticsSummary()`
- `Pipeline.jsx` — Total Value and Avg. Probability header stats live from `useAnalyticsSummary()`
- `AnalyticsKpiGrid` — accepts `summary` prop from `useAnalyticsSummary()`; all 4 KPI values computed from live data; progress bars animate to real percentages
- `Analytics.jsx` — fetches `useAnalyticsSummary()` and passes to `AnalyticsKpiGrid`

---

## [0.8.0] — 2026-04-10

### Phase 4: FastAPI Backend

#### Added
- `backend/requirements.txt` — fastapi, sqlmodel, uvicorn[standard], python-multipart, python-dotenv
- `backend/database.py` — SQLModel engine (SQLite dev / PostgreSQL prod), `get_session` dependency, `create_db_and_tables()` startup hook
- `backend/models.py` — Three domain models with Base/Create/Update/Read schema split: `Lead` (NEW|CONTACTED|QUALIFIED|LOST), `Contact` (Warm|Engaged|Stalled), `Opportunity` (prospecting→investigation→value_prop→negotiation→closed)
- `backend/main.py` — FastAPI app + CORS (allows localhost:5173) + `/health` endpoint + router registration
- `backend/routers/leads.py` — Full CRUD: `GET /leads` (status/owner/pagination filters), `POST`, `GET /{id}`, `PATCH /{id}`, `DELETE /{id}`
- `backend/routers/contacts.py` — Full CRUD + in-memory alpha/search/engagement filters
- `backend/routers/pipeline.py` — Full CRUD + `PATCH /{id}/move?stage=X` convenience endpoint for kanban drag-and-drop
- `backend/routers/analytics.py` — `GET /analytics/summary` (revenue, pipeline total, win/loss ratio, avg deal size, monthly breakdown, stage breakdown) + `GET /analytics/leads/funnel`
- `tools/seed_database.py` — Inserts 10 leads + 10 contacts + 11 opportunities matching frontend mocks; idempotent (clears before inserting)

---

## [0.7.0] — 2026-04-09

### Phase 3E: Sales Analytics

#### Added
- `AnalyticsKpiGrid` — 4-col bento: Win/Loss Ratio (gradient progress bar), Avg Deal Size (mini bar sparkline), Cycle Length (info note), Total Pipeline (segmented progress bar)
- `RevenueChart` — CSS bar chart: forecast (grey) + actual (primary) layered bars for Jul–Dec; Dec renders forecast-only to indicate projection
- `RegionalBreakdown` — SVG donut chart (stroke-dasharray segments) with North America / EMEA / APAC legend and "Detailed Regional Report" link
- `TopAccountsTable` — `border-separate border-spacing-y-1` table with account initial avatar, owner, deal value, status badge, last touch; 5 mock accounts
- `Analytics` page — page header with time range toggle (This Quarter / This Year / calendar icon), KPI grid, asymmetric 3-col chart layout, accounts table

---

## [0.6.0] — 2026-04-09

### Phase 3D: Sales Pipeline (Kanban)

#### Added
- `DealCard` — `useSortable`-powered draggable card; variants: standard (hover `more_horiz`), VIP badge, priority icon, closed (`check_circle` fill:1, grayscale). Ghost state `opacity-40 scale-[0.98]` while dragging; `rotate-1 shadow-lg` on overlay. Optional probability progress bar + avatar stack footer.
- `KanbanColumn` — `useDroppable` + `SortableContext`; `isOver` → `bg-primary-fixed/20` highlight; Closed column `opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0`; empty "Drop here" dashed hint
- `KanbanBoard` — `DndContext` orchestrator with `PointerSensor({ distance: 5 })` + `closestCorners`; cross-column moves in `onDragOver` for live preview; within-column reorder via `arrayMove` in `onDragEnd`; `DragOverlay` floating card; "Add Stage" dashed column
- `Pipeline` page — `h-[calc(100vh-4rem)] flex flex-col overflow-hidden`; header with Total Value ($2.4M) + Avg Probability (64%) + Board/List toggle; board section `flex-1 overflow-x-auto overflow-y-hidden no-scrollbar`

---

## [0.5.0] — 2026-04-10

### Phase 3C: Contacts Directory

#### Added
- `AlphaFilter` — 12-col bento: 8-col search input + A–Z alphabet pills + 4-col stats (Active / New Today)
- `ContactRow` — 12-col CSS grid row with Avatar + online dot, name/title, company/type, email/phone, engagement badge; click toggles sidebar
- `ContactsTable` — grid-based layout (not `<table>`), header row + `space-y-2` rows, filters on `alphaFilter` + `search`, paginated (6/page)
- `ContactDetailSidebar` — sticky `xl:` panel: gradient hero band, Avatar overlapping at `-bottom-10`, Email/Meeting actions, bio, LTV + Probability mini KPIs, recent activity, view full profile; empty state when no contact selected
- `Contacts` page — page header (Export CSV + Add Contact), AlphaFilter bento, flex layout: ContactsTable + ContactDetailSidebar

---

## [0.4.0] — 2026-04-10

### Phase 3B: Leads Management

#### Added
- `Badge` UI component — status pill mapping `NEW/CONTACTED/QUALIFIED/LOST` to Tailwind colour combos
- `Avatar` UI component — initials fallback with colour derived from name, supports `sm`/`md` sizes
- `LeadFilterBar` — 4-col bento: 3-col filter panel (status pills + owner select) + Conversion Rate KPI card
- `LeadRow` — fluid table row with Avatar, Badge, source icon, reveal-on-hover actions button
- `LeadsTable` — `border-separate border-spacing-y-2` table with header, 10 mock leads, client-side filter + pagination (5/page)
- `CreateLeadModal` — HeadlessUI Dialog + React Hook Form + Zod validation (name, email, company, phone, status, source)
- `Leads` page — page header with Import + Create buttons, filter bar, table, modal

#### Dependencies Added
- `@hookform/resolvers` — Zod resolver for React Hook Form
- Phase 3C: Contacts Directory page
- Phase 3D: Sales Pipeline (Kanban)
- Phase 3E: Sales Analytics page

---

## [0.3.0] — 2026-04-10

### Phase 3A: Executive Dashboard

#### Added
- `KpiCard` UI component — Manrope metric, trend badge (green/red), sparkline overlay, footer slot
- `Sparkline` UI component — pure SVG with polyline + gradient area fill, scales to any data array
- `KpiBentoGrid` dashboard component — 4-col bento: hero Revenue card (2-col + sparkline), Pipeline Deals (avatar stack), Avg Cycle (progress bar)
- `SalesPerformanceChart` — Target vs Actual grouped bar chart (Jan–Jun), hover opacity effect
- `ActivityFeed` — 4 activity types: Closed Won (tertiary), New Lead (primary), Meeting (secondary), At Risk (error)
- `PipelineDistribution` — 4 stage cards with hover lift animation; Closed Won gets primary highlight card
- `Dashboard` page — full layout with period toggle, export button, 70/30 chart split

---

## [0.2.0] — 2026-04-10

### Phase 2: Layout Shell & Routing

#### Added
- `router.jsx` — `createBrowserRouter` with 5 routes under `AppLayout`
- `AppLayout` — root layout wrapper: TopNav + SideNav + `<Outlet>` + BottomNav
- `TopNav` — frosted glass header (`glass-header`), `NavLink` active states, theme toggle, global search input, avatar
- `SideNav` — fixed left rail (desktop only), `NavLink` active state with icon slide animation, gradient "Create New Lead" CTA
- `BottomNav` — mobile-only fixed tab bar, floating gradient center button, filled icon on active tab
- `useAppStore` — Zustand store for theme toggle (adds `dark` class to `<html>`)
- Wired `RouterProvider` into `main.jsx`

---

## [0.1.0] — 2026-04-09

### Phase 1: Foundation & Design System

#### Added
- React 19 + Vite 8 project initialized
- `tailwind.config.js` — full Kinetic Blue token set: 62 colors, custom border radii, Manrope + Inter font families
- `index.html` — Manrope, Inter, Material Symbols Outlined loaded from Google Fonts; title set to "CRM Arena"
- `vite.config.js` — `@` path alias pointing to `src/`
- `src/index.css` — Tailwind directives + `.glass-header`, `.hero-gradient`, `.shadow-ambient`, `.no-scrollbar` global classes
- `src/utils/cn.js` — `clsx` + `tailwind-merge` class composition helper
- `src/utils/formatCurrency.js` — `Intl.NumberFormat` currency formatter
- `src/utils/formatDate.js` — `date-fns` date + relative time formatters
- `src/services/api.js` — Axios instance with base URL from `VITE_API_URL` env var + error interceptor
- `src/store/useAppStore.js` — global UI state (theme)
- `src/store/useLeadsStore.js` — leads list, filters, create modal state
- `src/store/useContactsStore.js` — contacts list, alpha filter, selected contact
- `src/store/usePipelineStore.js` — kanban columns, move deal action
- `src/constants/navigation.js` — nav items array (label, path, icon)
- `src/constants/leadStatuses.js` — status → Tailwind class mapping
- `src/constants/pipelineStages.js` — stage definitions with colors
- Full `src/` directory structure: `components/`, `pages/`, `layouts/`, `hooks/`, `services/`, `store/`, `utils/`, `constants/`
- 5 page stubs: Dashboard, Leads, Pipeline, Contacts, Analytics

#### Dependencies installed
- `react-router-dom`, `zustand`, `@headlessui/react`, `clsx`, `tailwind-merge`
- `date-fns`, `recharts`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
- `react-hook-form`, `zod`
- `tailwindcss@3`, `postcss`, `autoprefixer`
