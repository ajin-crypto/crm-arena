# Phase 3B: Leads Management

## Status: ✅ Complete

## Objective
Build the Leads Management page — fluid data table with 8px row gaps, bento filter bar, status badges, and a fully validated Create Lead modal. Establishes the table pattern used by the Contacts page.

## Inputs Required
- `leads_management/code.html` mockup
- `store/useLeadsStore.js` — filters, selectedLead, modal state
- `constants/leadStatuses.js` — status → Tailwind class mapping

## Outputs
- Interactive Leads page at `/leads`
- Reusable `Badge` and `Avatar` UI components (used across Contacts, Pipeline pages)
- Working status filter that narrows table rows in real time
- Paginated table (5 rows/page)
- Create Lead modal with full Zod validation

## Dependencies Added
- `@hookform/resolvers` — bridges React Hook Form with Zod schemas

## Files Created

### UI Components (`src/components/ui/`)
| File | Purpose |
|---|---|
| `Badge.jsx` | Status pill — maps `NEW/CONTACTED/QUALIFIED/LOST` to Tailwind colour combos |
| `Avatar.jsx` | Initials avatar — derives colour from `name.charCodeAt(0) % 4`, supports `sm`/`md` sizes |

### Leads Components (`src/components/leads/`)
| File | Purpose |
|---|---|
| `LeadFilterBar.jsx` | 4-col bento: 3-col filter panel (status pills + owner select + more filters) + 1-col Conversion Rate KPI |
| `LeadRow.jsx` | Table row — Avatar, name/email, company, Badge, source icon+text, last activity, reveal-on-hover actions button |
| `LeadsTable.jsx` | Full `<table>` with `border-separate border-spacing-y-2`, header, paginated rows, pagination controls |
| `CreateLeadModal.jsx` | HeadlessUI Dialog + React Hook Form + Zod — name, email, company, phone, status, source fields |

### Page (`src/pages/`)
| File | Purpose |
|---|---|
| `Leads.jsx` | Page header with Import + Create buttons, LeadFilterBar, LeadsTable, CreateLeadModal |

## Key Design Decisions

### 8px Row Gap Pattern
The table uses `border-separate border-spacing-y-2` on `<table>`. This gives every `<tr>` 8px of vertical breathing room without any border lines. The `bg-surface-container` table background shows through the gaps — the "gap colour" is actually the table's own background.

### Rounded Row Cells
First and last `<td>` in every `<tr>` get `rounded-l-xl` and `rounded-r-xl`. HTML tables require `border-separate` for border-radius to work on cells — this is already set.

### Reveal-on-Hover Actions
The `more_vert` button has `opacity-0 group-hover:opacity-100` transition. The parent `<tr>` must have the `group` class. Clicking the button calls `e.stopPropagation()` so it doesn't also fire the row's `onClick`.

### Modal Validation Flow
Zod schema is `z.object({...})` resolved via `@hookform/resolvers/zod`. Errors appear as `text-[11px] text-error` below each field. Fields with errors get `ring-2 ring-error` via `cn()`. On successful submit, `reset()` clears the form before `closeCreateModal()`.

### Filter State in Zustand
`LeadFilterBar` writes to `useLeadsStore` via `setFilter(key, value)`. `LeadsTable` reads `filters.status` and applies `Array.filter()` over `MOCK_LEADS`. Phase 5 replaces this with a TanStack Query `useLeads(filters)` hook that passes filters as query params to the API.

### Pagination
Client-side. `PAGE_SIZE = 5`. Page state is local to `LeadsTable` (not in Zustand) since it resets when filters change. Phase 5 will move this to the API via `?page=&limit=` query params.

## Notes
- `MOCK_LEADS` contains 10 entries covering all 4 statuses. Phase 5 seeds 50+ via `tools/seed_database.py`.
- The modal `onSubmit` currently `console.log`s the data. Phase 5 replaces with `useMutation(createLead)` from TanStack Query.

## Success Criteria
- ✅ Leads page renders at `/leads`
- ✅ Status filter pills narrow rows in real time
- ✅ All 4 badge states render with correct colours
- ✅ `more_vert` button hidden until row hover
- ✅ Pagination: prev/next and page number buttons work
- ✅ "Create New Lead" button opens modal
- ✅ Form validates — errors shown per field
- ✅ Successful submit closes modal and resets form
- ✅ Build passes: `npm run build` (341 modules, 0 errors)
