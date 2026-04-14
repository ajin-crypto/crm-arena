# CRM Arena — Frontend

React 19 + Vite 8 + Tailwind CSS 3, following the **Kinetic Blue** design system.

## Commands

```bash
npm run dev      # Dev server → http://localhost:5173
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
npm run lint     # ESLint check
```

## Directory Structure

```
src/
├── components/
│   ├── layout/       TopNav, SideNav, BottomNav
│   ├── ui/           Atomic components: Button, Badge, KpiCard, Sparkline, Avatar, Modal
│   ├── dashboard/    KpiBentoGrid, SalesPerformanceChart, ActivityFeed, PipelineDistribution
│   ├── leads/        LeadsTable, LeadRow, LeadFilterBar, CreateLeadModal
│   ├── pipeline/     KanbanBoard, KanbanColumn, DealCard
│   ├── contacts/     ContactsTable, ContactRow, ContactDetailSidebar, AlphaFilter
│   └── analytics/    RevenueChart, RegionalBreakdown, TopAccountsTable
├── pages/            Dashboard, Leads, Pipeline, Contacts, Analytics
├── layouts/          AppLayout
├── store/            useAppStore, useLeadsStore, useContactsStore, usePipelineStore
├── hooks/            useDebounce, useLocalStorage, useMediaQuery
├── services/         api.js (Axios instance)
├── utils/            cn.js, formatCurrency.js, formatDate.js
└── constants/        navigation.js, leadStatuses.js, pipelineStages.js
```

## Design Rules (Kinetic Blue)

- **No 1px borders** — use tonal surface shifts (`surface` → `surface-container` → `surface-container-lowest`)
- **`cn()` on every component** — import from `@/utils/cn`
- **Manrope** for all headlines, KPI values, and CTAs
- **Inter** for all body text, table data, labels
- **Gradient pill** for primary CTAs: `hero-gradient` class
- **Frosted glass nav**: `glass-header` class
- **Ambient shadow** for modals: `shadow-ambient` class
- **8px row gaps** in tables via `border-separate border-spacing-y-2`

## Path Alias

All imports use `@/` which resolves to `src/`:

```js
import { cn } from '@/utils/cn'
import KpiCard from '@/components/ui/KpiCard'
```
