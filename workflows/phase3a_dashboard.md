# Phase 3A: Executive Dashboard

## Status: ✅ Complete

## Objective
Build the Executive Dashboard page — the "hero" view that establishes the visual standard for all other pages. All components here use real Kinetic Blue design tokens and serve as the template pattern for subsequent pages.

## Inputs Required
- Kinetic Blue design system (see `kinetic_blue/DESIGN.md`)
- `executive_dashboard/code.html` mockup

## Outputs
- Fully interactive Dashboard page at `/`
- Reusable `KpiCard` and `Sparkline` UI components (used on Analytics page later)
- Period toggle (Monthly / Quarterly) wired to local state

## Files Created

### UI Components (`src/components/ui/`)
| File | Purpose |
|---|---|
| `Sparkline.jsx` | Pure SVG sparkline — polyline + gradient area fill from `data[]` array |
| `KpiCard.jsx` | KPI tile — Manrope value, trend badge, sparkline overlay, footer slot, optional `colSpan` |

### Dashboard Components (`src/components/dashboard/`)
| File | Purpose |
|---|---|
| `KpiBentoGrid.jsx` | 4-col bento: Revenue (2-col + sparkline), Pipeline Deals (avatar stack), Avg Cycle (progress bar) |
| `SalesPerformanceChart.jsx` | Target vs Actual grouped bar chart — pure CSS/HTML, no chart library |
| `ActivityFeed.jsx` | 4 activity types with icon circles: Closed Won, New Lead, Meeting, At Risk |
| `PipelineDistribution.jsx` | 4 stage cards with hover lift; Closed Won gets `bg-primary/5 border-primary/10` highlight |

### Page (`src/pages/`)
| File | Purpose |
|---|---|
| `Dashboard.jsx` | Full page — page header, period toggle, export button, 70/30 chart layout |

## Key Design Decisions

### No Chart Library for Bar Chart
The Sales Performance Chart is built with pure CSS flex+height, not Recharts. The mockup uses the same approach — two bars per month, the actual bar overlaps the target bar using `-mt-8 z-10`. This matches the mockup pixel-for-pixel without adding a Recharts import to the Dashboard bundle.

### Sparkline as Pure SVG
`Sparkline.jsx` scales any `data[]` array to a `viewBox="0 0 400 100"`. Min/max normalization ensures the line always fills the available height. The `preserveAspectRatio="none"` makes it stretch to fill the parent container regardless of aspect ratio.

### KpiCard Sparkline Overlay
The sparkline sits in an `absolute` positioned div at the bottom of the card at 20% opacity. On group hover it transitions to 40% opacity. The `z-10 relative` on the content div keeps text above the overlay.

### 70/30 Layout
Charts section uses `grid grid-cols-1 lg:grid-cols-3`: `SalesPerformanceChart` gets `lg:col-span-2` and `ActivityFeed` gets 1 column. On mobile, both stack vertically.

### Pipeline Distribution Hover
Cards use `hover:-translate-y-1 transition-transform`. The Closed Won card intentionally breaks from the surface-container-lowest pattern — it uses `bg-primary/5 border-2 border-primary/10` to signal completion status.

## Notes
- Static data is hardcoded in each component. Phase 5 (integration) will replace with API calls via TanStack Query hooks.
- The `SPARKLINE_DATA` array in `KpiBentoGrid` is representative — will be replaced with real revenue timeseries from `GET /analytics/summary`.

## Success Criteria
- ✅ Dashboard renders at `/` with all sections visible
- ✅ KPI bento grid: 2-col Revenue card with sparkline overlay
- ✅ Bar chart: 6 months, target + actual bars, hover opacity
- ✅ Activity feed: 4 items with correct icon colors
- ✅ Pipeline distribution: 4 cards, Closed Won highlighted
- ✅ Period toggle switches between Monthly/Quarterly
- ✅ Build passes: `npm run build` (48 modules, 0 errors)
