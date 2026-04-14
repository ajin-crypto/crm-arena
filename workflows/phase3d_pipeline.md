# Phase 3D: Sales Pipeline (Kanban)

## Status: ✅ Complete

## Objective
Build the Opportunities Pipeline page — a fully interactive drag-and-drop Kanban board with 5 stages, cross-column drag, within-column reorder, a drag overlay, and the "Closed" column fade/grayscale effect. The page uses a fixed-height `h-[calc(100vh-4rem)]` layout so the board fills the remaining viewport below the TopNav without a page scroll.

## Inputs Required
- `sales_pipeline/code.html` mockup
- `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` (already installed in Phase 1)

## Outputs
- Interactive Pipeline page at `/pipeline`
- 5 Kanban stages with real drag-and-drop
- DragOverlay floating card while dragging
- "Add Stage" dashed column at the end
- Board/List view toggle (List view is no-op until Phase 5)

## Files Created

### Pipeline Components (`src/components/pipeline/`)
| File | Purpose |
|---|---|
| `DealCard.jsx` | Draggable card via `useSortable`. Handles 3 card variants: standard (hover actions), VIP badge, priority icon, closed (check_circle + grayscale). Shows optional probability progress bar and avatar+activity footer. |
| `KanbanColumn.jsx` | Droppable column via `useDroppable` + `SortableContext`. Renders stage header (dot + label + count + total value), card list with `space-y-4`, empty drop target hint when column is empty, `isOver` highlight. |
| `KanbanBoard.jsx` | `DndContext` orchestrator. Owns all column/deal state locally (`useState`). Handles `onDragStart`, `onDragOver` (cross-column move), `onDragEnd` (within-column reorder via `arrayMove`). Renders `DragOverlay`. |

### Page (`src/pages/`)
| File | Purpose |
|---|---|
| `Pipeline.jsx` | `h-[calc(100vh-4rem)] flex flex-col overflow-hidden`. Page header with totals + Board/List toggle. Board section is `flex-1 overflow-x-auto overflow-y-hidden no-scrollbar`. |

## Key Design Decisions

### Viewport-Height Layout
The Pipeline page must not allow a vertical page scroll — columns must be the scrollable unit. The outer div uses `h-[calc(100vh-4rem)]` (full viewport minus TopNav height) with `overflow-hidden`. The board section uses `flex-1 overflow-x-auto overflow-y-hidden`. Each column's card list uses `flex-1 overflow-y-auto` internally.

### Cross-Column Drag: `onDragOver` vs `onDragEnd`
Cross-column moves happen in `onDragOver` (not `onDragEnd`). This gives the "live preview" effect — the card visually moves to the target column while still being dragged. `onDragEnd` only handles within-column reordering via `arrayMove`.

The column detection logic:
```js
const toCol = Object.keys(columns).includes(over.id)
  ? over.id           // dragged over the column droppable itself (empty column)
  : findColumn(over.id) // dragged over another card — use that card's column
```

### PointerSensor Activation Distance
`PointerSensor` uses `activationConstraint: { distance: 5 }`. Without this, any click on a card fires the drag. The 5px threshold distinguishes clicks (row selection, button click) from drag gestures.

### Closed Column Fade
```jsx
isClosedWon && 'opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0 transition-all'
```
Applied to the droppable div in `KanbanColumn`, not the column wrapper — so the header stays fully visible while the cards are faded.

### DragOverlay
`DragOverlay` renders a `<DealCard isOverlay />` floating above the board while dragging. The original card in the column renders at `opacity-40 scale-[0.98]` (ghost). The overlay card gets `rotate-1 shadow-lg cursor-grabbing` for visual depth.

### Closed Flag Propagation
When `onDragOver` moves a deal to the `closed` column, it sets `closed: true` on the deal object:
```js
[toCol]: [...prev[toCol], { ...deal, closed: toCol === 'closed' }]
```
`DealCard` reads this to render `check_circle` instead of `more_vert` and show "WON" instead of the probability.

## Notes
- All deal state is local to `KanbanBoard` (`useState`). Phase 5 replaces with Zustand `usePipelineStore` + TanStack Query mutations.
- Bundle size warning (543KB) is expected at this stage. Phase 6 introduces `React.lazy()` route-based code splitting.
- List View toggle is wired to local state but renders the same board — placeholder for Phase 5.

## Success Criteria
- ✅ Pipeline renders at `/pipeline` with full viewport height board
- ✅ 5 columns: Prospecting, Investigation, Value Proposition, Negotiation, Closed
- ✅ Cards draggable within a column (reorder) and across columns
- ✅ DragOverlay floating card visible during drag
- ✅ Target column highlights with `bg-primary-fixed/20` while dragging over
- ✅ Empty column shows dashed "Drop here" hint
- ✅ Closed column fades to `opacity-60 grayscale-[0.5]`, recovers on hover
- ✅ VIP badge, priority icon, check_circle rendered correctly per card type
- ✅ "Add Stage" dashed column rendered at the end
- ✅ Board/List toggle switches state
- ✅ Build passes: `npm run build` (353 modules, 0 errors)
