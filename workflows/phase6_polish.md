# Phase 6 — Polish SOP

## Objective
Ship production-quality polish: automatic dark mode with system-preference detection, localStorage persistence, and route-level code splitting.

## Scope
- Dark mode via CSS variable strategy (no component changes required)
- localStorage theme persistence + OS preference fallback
- React.lazy() code splitting per page route
- `/health` check tool
- Build verification

---

## Step 1: CSS Variable Dark Mode

**Why this approach:** Tailwind v3 hardcodes all custom token values as hex. Swapping to CSS variables means every existing utility class (`bg-primary/10`, `text-on-surface`, etc.) automatically works in dark mode without touching any component file.

**Pattern:**
```js
// tailwind.config.js — each color becomes:
'primary': 'rgb(var(--c-primary) / <alpha-value>)',
```

```css
/* index.css */
:root { --c-primary: 0 95 172; }
.dark { --c-primary: 164 201 255; }
```

The `<alpha-value>` placeholder is replaced by Tailwind at build time, enabling `bg-primary/50` to work correctly with CSS variables.

**Files changed:**
- `frontend/tailwind.config.js` — all 50 tokens converted to `rgb(var(--c-TOKEN) / <alpha-value>)`
- `frontend/src/index.css` — `:root {}` (light) and `.dark {}` (dark) blocks with full Kinetic Blue palette; `.glass-header`, `.hero-gradient`, `body` updated to use CSS variable references

**Dark palette derivation:** Based on Material Design 3 dark scheme conventions:
- Surfaces invert: `#f9f9f8` → `#111312`
- Primary lightens: `#005fac` → `#a4c9ff`
- On-primary darkens: `#ffffff` → `#001c39`
- Tertiary lightens: `#0e6d36` → `#83d996`
- Outline brightens slightly: `#6e7881` → `#879099`

---

## Step 2: Theme Store with Persistence

**File:** `frontend/src/store/useAppStore.js`

**Behavior:**
1. On module load, read `localStorage.getItem('crm-theme')`
2. If present (`'dark'` or `'light'`), use that
3. If absent, fall back to `window.matchMedia('(prefers-color-scheme: dark)').matches`
4. Apply immediately (before React renders) — no flash of wrong theme
5. On toggle: flip state, update `<html>` class, write to localStorage

---

## Step 3: Route-Level Code Splitting

**File:** `frontend/src/router.jsx`

Replace eager imports with `React.lazy()`:
```jsx
const Dashboard = lazy(() => import('@/pages/Dashboard'))
```

Wrap `AppLayout` in `<Suspense fallback={<PageFallback />}>` so React has a boundary during the async chunk load.

**Expected result:** Initial bundle drops from ~627KB to ~100KB; each page becomes its own chunk loaded on first visit.

---

## Step 4: Health Check Tool

**File:** `tools/health_check.py`

Hits `GET /health`, prints result, exits 0 (ok) or 1 (fail). Uses only stdlib (`urllib`). No backend import needed — can be run from any directory.

```bash
python tools/health_check.py
# ✓ CRM Arena API — status: ok (HTTP 200)
```

---

## Edge Cases

| Scenario | Handling |
|---|---|
| `localStorage` unavailable (private browsing, SSR) | `getItem` returns `null` → falls back to OS preference |
| OS preference changes while app is open | Not auto-tracked; user must toggle manually (acceptable for v1) |
| Suspense boundary during build-time SSR | N/A — Vite CSR only |
| First paint flash | Prevented by running `applyTheme()` synchronously before `create()` |

---

## Verification

```bash
cd frontend && npm run build
# Expected: 0 errors, multiple chunks output
# Chunks: index (shell), Dashboard, Leads, Pipeline, Contacts, Analytics

grep -r 'bg-white\|text-slate\|bg-slate\|border-1\b' src/
# Expected: 0 matches
```
