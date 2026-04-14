# Phase 2: Layout Shell & Routing

## Status: ✅ Complete

## Objective
Build the full application chrome (TopNav, SideNav, BottomNav) and wire up client-side routing so all 5 pages are navigable before any page content is built.

## Inputs Required
- `constants/navigation.js` — nav item definitions (label, path, icon)
- `store/useAppStore.js` — theme toggle state
- `store/useLeadsStore.js` — exposes `openCreateModal` for the CTA button

## Outputs
- Working navigation across all 5 routes
- Frosted glass TopNav with active link states
- Fixed SideNav on desktop (≥ 1024px) with icon slide animation
- Floating gradient BottomNav on mobile (< 1024px)
- Theme toggle (dark class on `<html>`)

## Files Created
- `src/router.jsx` — `createBrowserRouter`, 5 routes under `AppLayout`
- `src/layouts/AppLayout.jsx` — TopNav + SideNav + `<Outlet>` + BottomNav
- `src/components/layout/TopNav.jsx`
- `src/components/layout/SideNav.jsx`
- `src/components/layout/BottomNav.jsx`
- `src/main.jsx` — updated to use `RouterProvider`

## Key Design Decisions

### Frosted Glass Header
Uses `.glass-header` CSS class defined in `index.css`:
```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(24px);
```

### NavLink Active States
- **TopNav:** `text-primary font-bold border-b-2 border-primary h-16 flex items-center`
- **SideNav:** `bg-white text-primary rounded-lg shadow-sm font-bold`
- Both use `end={true}` on the Dashboard route to prevent `/` matching all paths

### Icon Slide Micro-interaction
Inactive SideNav icons use `group-hover:translate-x-1 transition-transform` — requires the parent `<NavLink>` to have the `group` class, which only applies on inactive state.

### BottomNav Center Button
The Pipeline slot is replaced by a floating gradient `+` button using `-mt-8` to lift it above the nav bar. Tapping it opens the Create Lead modal via `useLeadsStore.openCreateModal`.

### Mobile Breakpoint
SideNav and TopNav horizontal links hide below `lg:` (1024px). BottomNav shows below `lg:`. Main content uses `lg:ml-64 pt-16` to account for both offsets.

## Success Criteria
- ✅ All 5 routes render without errors
- ✅ SideNav shows active page highlight
- ✅ TopNav active underline tracks current route
- ✅ BottomNav visible on mobile, hidden on desktop
- ✅ Theme toggle adds/removes `dark` class on `<html>`
- ✅ Build passes: `npm run build`
