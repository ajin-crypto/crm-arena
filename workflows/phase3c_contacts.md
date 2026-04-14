# Phase 3C: Contacts Directory

## Status: ✅ Complete

## Objective
Build the Contacts Directory page — grid-based (not `<table>`) contact list with alpha filter, live search, engagement badges, online status dots, and a sticky detail sidebar that slides in when a contact is selected.

## Inputs Required
- `contacts_directory/code.html` mockup
- `store/useContactsStore.js` — alphaFilter, search, selectedContact

## Outputs
- Interactive Contacts page at `/contacts`
- Alpha filter + live search that narrows list in real time
- Sticky detail sidebar (hidden below `xl:`) triggered by row click
- Engagement badge system: Warm / Engaged / Stalled

## Files Created

### Contacts Components (`src/components/contacts/`)
| File | Purpose |
|---|---|
| `AlphaFilter.jsx` | 12-col bento: 8-col search+alphabet pills + 4-col stats (Active 1,429 / New Today 12) |
| `ContactRow.jsx` | 12-col CSS grid row — Avatar+online dot, name/title, company/type, email/phone, last touch+engagement badge |
| `ContactsTable.jsx` | Grid table: header row + `space-y-2` rows + pagination; filters on `alphaFilter` and `search` from Zustand |
| `ContactDetailSidebar.jsx` | Sticky `xl:` sidebar — gradient hero band, Avatar overlapping at `-bottom-10`, action buttons, bio, LTV/Probability KPIs, recent activity, view full profile |

### Page (`src/pages/`)
| File | Purpose |
|---|---|
| `Contacts.jsx` | Page header (Export CSV + Add Contact), AlphaFilter bento, `flex gap-8` layout: ContactsTable + ContactDetailSidebar |

## Key Design Decisions

### Grid Rows, Not `<table>`
The contacts list uses CSS Grid (`grid grid-cols-12`) on individual `<div>` elements, not an HTML `<table>`. This allows the detail sidebar to sit in the same flex row as the list without the overflow constraints of `<table>`. The header row and data rows use the same 12-col grid so columns always align.

### Sidebar State in Zustand
`selectedContact` lives in `useContactsStore`. Clicking a `ContactRow` calls `setSelectedContact(contact)` — or `null` if already selected (toggle). The sidebar reads this same store, so no prop drilling needed from the page. The sidebar's close button also calls `setSelectedContact(null)`.

### Online Status Dot
Positioned `absolute bottom-0 right-0` inside a `relative` wrapper on the Avatar. Green (`bg-tertiary`) = online, grey (`bg-slate-400`) = offline. `border-2 border-white` gives it the classic "ring" separation from the avatar.

### Engagement Badge Colours
| Badge | Background | Text |
|---|---|---|
| Warm | `bg-tertiary-fixed` | `text-on-tertiary-fixed-variant` |
| Engaged | `bg-secondary-container` | `text-on-secondary-container` |
| Stalled | `bg-error-container` | `text-on-error-container` |

### Empty Sidebar State
When no contact is selected, the sidebar shows a centred `person` icon with a "Select a contact" prompt — avoids an awkward blank space on `xl:` viewports.

### Alpha Filter Reset
The search input and alpha pills both write to Zustand. `ContactsTable` reads both and applies `Array.filter()`. When the alpha filter is `ALL`, the letter filter is skipped. When search is empty, it's skipped. Both can be active simultaneously.

### Pagination
`PAGE_SIZE = 6`. Pagination resets implicitly because page state is local to `ContactsTable` — if `filtered.length` shrinks below the current page, `safePage = Math.min(page, totalPages)` prevents out-of-bounds renders.

## Notes
- 10 mock contacts covering all 3 engagement states and both online statuses.
- Phase 5: replace `MOCK_CONTACTS` with `useContacts(filters)` TanStack Query hook.
- Detail sidebar LTV/Probability values are hardcoded for now; Phase 5 populates from the selected contact object.

## Success Criteria
- ✅ Contacts page renders at `/contacts`
- ✅ Alpha filter narrows list by first letter in real time
- ✅ Search input narrows by name, company, or email
- ✅ Online dot: green for online, grey for offline
- ✅ Engagement badges: correct colours for Warm / Engaged / Stalled
- ✅ Clicking a row opens detail sidebar (xl: only)
- ✅ Sidebar close button dismisses it
- ✅ Empty sidebar state shown when no contact selected
- ✅ Pagination prev/next + page numbers work
- ✅ Build passes: `npm run build` (346 modules, 0 errors)
