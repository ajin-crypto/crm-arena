# Phase 3E: Sales Analytics

## Status: ✅ Complete

## Objective
Build the Sales Analytics page — an executive-facing reporting view with KPI cards, a month-by-month revenue bar chart, an SVG donut chart for regional breakdown, and a top-performing accounts table. Uses a time range toggle (This Quarter / This Year / calendar picker placeholder) in the page header.

## Inputs Required
- `sales_analytics/code.html` mockup
- Existing design tokens (Kinetic Blue) + `cn()` utility

## Outputs
- Analytics page at `/analytics`
- 4 KPI bento cards
- Revenue Performance bar chart (6 months, forecast vs actual)
- Regional Breakdown SVG donut + legend
- Top Performing Accounts table (5 accounts, status badges)

## Files Created

### Analytics Components (`src/components/analytics/`)
| File | Purpose |
|---|---|
| `AnalyticsKpiGrid.jsx` | 4-col bento KPI cards: Win/Loss Ratio (gradient progress bar), Avg Deal Size (mini bar sparkline), Cycle Length (info note), Total Pipeline (segmented bar). Each card: label + badge, large KPI value, footer slot |
| `RevenueChart.jsx` | CSS layered bar chart. Each month: grey forecast bar fills full column height, actual primary bar overlaid. Dec is projection-only (forecast at 40% opacity, actual=4px stub). `group-hover:brightness-110` on actual bar. `lg:col-span-2` for 2/3 width. |
| `RegionalBreakdown.jsx` | SVG donut: `circle` elements with `stroke-dasharray` + `stroke-dashoffset` for segment positioning, rotated −90° so segments start at top. Three regions: North America (45%), EMEA (25%), APAC (30%). Legend below with dot + label + value. "Detailed Regional Report" ghost link. |
| `TopAccountsTable.jsx` | `border-separate border-spacing-y-1` table. Account avatar (initial letter in `rounded-lg bg-surface-container-high`), owner, deal value (right-aligned), status badge (Closed Won → tertiary, Negotiation/Proposal → primary), last touch. `hover:bg-primary-fixed/30` row highlight. |

### Page (`src/pages/`)
| File | Purpose |
|---|---|
| `Analytics.jsx` | Page header with `h1` + subtitle + time range toggle (pill buttons + calendar icon). `useState` for active range. KPI grid, asymmetric `grid grid-cols-1 lg:grid-cols-3` (RevenueChart spans 2, RegionalBreakdown spans 1), TopAccountsTable below. |

## Key Design Decisions

### CSS Bar Chart (no chart library)
The revenue chart uses two absolutely-positioned divs per month — a grey forecast bar at full column height, with the actual (primary) bar on top. This matches the mockup exactly with zero library overhead. The column height reflects forecast, and the inner actual bar's `height` is set inline via `style={{ height: 'Xpx' }}`.

December is rendered with `opacity-40` on the forecast bar and a stub `h-4` actual bar — signaling a projection that hasn't materialized yet. This requires no conditional logic beyond the data shape.

### SVG Donut via `stroke-dasharray`
The donut uses three `<circle>` elements on the same path (r=16, circumference treated as 100 for simplicity). Segments are positioned with `stroke-dashoffset` accumulating the prior segments' widths. The SVG is rotated `−90°` with CSS so the first segment starts at 12 o'clock. A centered div overlay shows the total label.

### Table Spacing
`border-separate border-spacing-y-1` creates the row gap without explicit margin or divider lines — consistent with the leads table's `border-spacing-y-2` pattern. The header row uses `rounded-l-lg` / `rounded-r-lg` on the first/last `<th>` to pill the header band.

### Time Range Toggle
Three-state toggle: two text pill buttons + a calendar icon pill. Active state: `bg-surface-container-lowest text-primary shadow-sm`. Inactive: `text-on-surface-variant hover:text-on-surface`. Calendar icon is a no-op placeholder (Phase 5 will wire a date picker). State is local `useState` — not in Zustand yet (Phase 5 connects to query params or store).

## Notes
- All data is hardcoded static. Phase 5 replaces with TanStack Query `GET /analytics/summary`.
- Bundle is now 554KB (up from 543KB). Still expected — Phase 6 introduces `React.lazy()` splits.
- The chart library (`recharts`) installed in Phase 1 is not used — CSS bars match the mockup exactly and are lighter.

## Success Criteria
- ✅ Analytics renders at `/analytics`
- ✅ 4 KPI cards: Win/Loss Ratio, Avg Deal Size, Cycle Length, Total Pipeline
- ✅ Revenue bar chart: 6 months (Jul–Dec), forecast + actual layers, Dec projection style
- ✅ Regional breakdown: SVG donut with 3 segments + legend
- ✅ Top accounts table: 5 rows, status badges, hover highlight
- ✅ Time range toggle: This Quarter / This Year / calendar icon
- ✅ Build passes: `npm run build` (357 modules, 0 errors)
