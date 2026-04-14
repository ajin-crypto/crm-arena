# Phase 5 — Frontend-Backend Integration SOP

## Objective
Connect the React frontend to the FastAPI backend. Replace all mock data (hardcoded arrays in component files) with live API calls using TanStack React Query and Axios. Add skeleton loading states and optimistic drag-and-drop updates.

---

## Required Inputs
- Backend running at `http://localhost:8000` (`cd backend && python3 -m uvicorn main:app --reload`)
- Database seeded (`cd backend && python3 ../tools/seed_database.py`)
- `VITE_API_URL=http://localhost:8000` in `.env`
- Frontend dev server running (`cd frontend && npm run dev`)

---

## Dependencies
```bash
cd frontend
npm install @tanstack/react-query axios
```

---

## Step 1: Install QueryClientProvider

**File:** `frontend/src/main.jsx`

Wrap the entire app with `QueryClientProvider`:

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,          // don't refetch for 30s — CRM data changes slowly
      retry: 1,                   // one retry on failure, then show error
      refetchOnWindowFocus: false, // avoid surprise refreshes while user is in another tab
    },
  },
})

// Wrap <RouterProvider> inside <QueryClientProvider client={queryClient}>
```

**Why these defaults:**
- `staleTime: 30s` — CRM data (leads, contacts, pipeline) changes slowly. Aggressive refetching wastes API calls and causes layout shifts.
- `retry: 1` — Transient network errors should retry once. More retries delay error feedback.
- `refetchOnWindowFocus: false` — Sales reps often switch tabs mid-call. Unexpected data refreshes mid-edit are disruptive.

---

## Step 2: Axios Instance

**File:** `frontend/src/services/api.js` (already exists from Phase 1)

Verify it points to `VITE_API_URL` with an error interceptor. No changes needed if it follows:

```js
import axios from 'axios'
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })
api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err),
)
export default api
```

---

## Step 3: Domain Hooks

Create one file per domain in `frontend/src/hooks/`. Each file exports query hooks + mutation hooks.

### Pattern — Query Hook
```js
export function useLeads(filters = {}) {
  return useQuery({
    queryKey: [KEY, filters],
    queryFn: async () => {
      const params = {}
      // Exclude filter values that mean "no filter" (e.g., 'ALL', '')
      if (filters.status && filters.status !== 'ALL') params.status = filters.status
      if (filters.owner) params.owner = filters.owner
      const { data } = await api.get('/leads', { params })
      return data
    },
  })
}
```

**Key rule:** Always include filters in the `queryKey` array. TanStack Query caches per key — if filters change, a new request fires automatically.

### Pattern — Mutation Hook
```js
export function useCreateLead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body) => api.post('/leads', body).then((r) => r.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
  })
}
```

**Key rule:** Always `invalidateQueries` on success. This refetches the list so the new record appears immediately.

### Files and exports

| File | Exports |
|------|---------|
| `useLeads.js` | `useLeads(filters)`, `useLead(id)`, `useCreateLead`, `useUpdateLead`, `useDeleteLead` |
| `useContacts.js` | `useContacts(filters)`, `useCreateContact`, `useUpdateContact`, `useDeleteContact` |
| `usePipeline.js` | `usePipeline(stage?)`, `useCreateOpportunity`, `useUpdateOpportunity`, `useMoveOpportunity`, `useDeleteOpportunity` |
| `useAnalytics.js` | `useAnalyticsSummary`, `useLeadsFunnel` |

### `useMoveOpportunity` — special case
The pipeline `PATCH /{id}/move` endpoint takes the new stage as a query param, not in the request body:
```js
mutationFn: ({ id, stage }) =>
  api.patch(`/pipeline/${id}/move`, null, { params: { stage } }).then((r) => r.data),
```
Pass `null` as the body — FastAPI reads `stage` from the query string.

---

## Step 4: Skeleton Loading Components

**File:** `frontend/src/components/ui/Skeleton.jsx`

Create 5 variants. All use `animate-pulse bg-surface-container-high` as the base shimmer:

| Export | Usage |
|--------|-------|
| `Skeleton` | Base shimmer block — pass `className` for sizing |
| `SkeletonRow` | Table row with N shimmer cells (for Leads/Contacts tables) |
| `SkeletonContactRow` | 12-col CSS grid row matching ContactsTable layout |
| `SkeletonKpiCard` | Dashboard/Analytics bento card placeholder |
| `SkeletonDealCard` | Kanban card placeholder |

Show `×5 SkeletonRow` while leads load, `×6 SkeletonContactRow` for contacts, `×2 SkeletonDealCard` per column while pipeline loads.

---

## Step 5: Wire Components to Hooks

Replace mock data arrays in each component with the corresponding hook.

### LeadsTable
```jsx
const { data: leads = [], isLoading, isError } = useLeads(filters)
// Show <SkeletonRow> ×5 while loading
// Show inline error message when isError — don't crash the page
```

### ContactsTable
```jsx
const { data: contacts = [], isLoading } = useContacts({ alpha: alphaFilter, search })
// Show <SkeletonContactRow> ×6 while loading
```

### KanbanBoard (optimistic DnD)
```jsx
const { data: opps = [], isLoading } = usePipeline()
const moveOpp = useMoveOpportunity()

// Local state mirrors server state for instant DnD feedback
const [columns, setColumns] = useState({})
useEffect(() => {
  if (opps.length) setColumns(buildColumns(opps))
}, [opps])

// handleDragOver: immediately update local column state (visual feedback)
// handleDragEnd: fire moveOpp.mutate({ id, stage }) to sync with backend
```

**Optimistic rule:** Update local React state in `onDragOver` for instant feedback. Fire the mutation in `onDragEnd`. If the mutation fails, `invalidateQueries` will restore server truth on next render.

### KpiBentoGrid / Pipeline / Analytics
```jsx
const { data: summary } = useAnalyticsSummary()
// Fall back to '—' while loading: summary?.total_revenue ?? null
```

### CreateLeadModal
```jsx
const createLead = useCreateLead()

async function onSubmit(data) {
  try {
    await createLead.mutateAsync(data)
    reset()
    closeCreateModal()
  } catch {
    setError('root', { message: 'Failed to create lead. Please try again.' })
  }
}
```

---

## Step 6: Data Shape Mapping

The API returns snake_case objects. Map to the shape your components expect:

```js
// API Opportunity → DealCard shape
function oppToCard(opp) {
  return {
    id: String(opp.id),
    _apiId: opp.id,          // keep original ID for mutations
    category: opp.stage.replace('_', ' '),
    name: opp.title,
    value: `$${opp.value.toLocaleString()}`,
    probability: `${opp.probability}%`,
    assignees: opp.owner ? [opp.owner.split(' ').map(w => w[0]).join('')] : [],
    closed: opp.closed,
    showProgress: opp.probability >= 70,
  }
}
```

---

## Edge Cases

| Scenario | Handling |
|----------|----------|
| Backend not running | `isError: true` from useQuery — show inline error in table, not a crash |
| Filter value `'ALL'` | Exclude from API params (`if status !== 'ALL'`) — backend treats missing param as "no filter" |
| DnD mutation fails | Server data is invalidated and re-fetched — UI reverts to server truth |
| Empty pipeline stage | `columns[stageId] = []` always initialized — `KanbanColumn` receives empty array, shows "Drop here" hint |
| Optimistic move to wrong stage | `useEffect` on `opps` re-syncs local state when server responds |
| `mutateAsync` vs `mutate` | Use `mutateAsync` in form `onSubmit` (to `await` and catch errors); use `mutate` in fire-and-forget cases (DnD, delete) |

---

## Verification

```bash
# 1. Start backend with seeded data
cd backend
python3 ../tools/seed_database.py
python3 -m uvicorn main:app --reload

# 2. Start frontend
cd ../frontend
npm run dev

# 3. Verify in browser:
# - Leads table shows real data, not mock rows
# - Filtering by status/owner updates table
# - Creating a lead via modal adds it to the list
# - Kanban board shows real opportunities, drag-and-drop persists on reload
# - Dashboard Revenue and Pipeline Deals stats match backend totals
# - Analytics KPI grid values match GET /analytics/summary

# 4. Verify error state:
# - Stop the backend (Ctrl+C)
# - Reload frontend — tables show inline error messages, not white screens
```
