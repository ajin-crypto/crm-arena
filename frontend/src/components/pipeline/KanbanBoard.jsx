import { useState, useEffect } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import KanbanColumn from './KanbanColumn'
import DealCard from './DealCard'
import { SkeletonDealCard } from '@/components/ui/Skeleton'
import { usePipeline, useMoveOpportunity } from '@/hooks/usePipeline'

const STAGES_META = [
  { id: 'prospecting',   label: 'Prospecting',       dotColor: 'bg-outline-variant',    totalValue: null },
  { id: 'investigation', label: 'Investigation',      dotColor: 'bg-primary-container',  totalValue: null },
  { id: 'value_prop',    label: 'Value Proposition',  dotColor: 'bg-primary',            totalValue: null },
  { id: 'negotiation',   label: 'Negotiation',        dotColor: 'bg-tertiary-container', totalValue: null },
  { id: 'closed',        label: 'Closed',             dotColor: 'bg-tertiary',           totalValue: null },
]

/** Map API opportunity to the shape DealCard expects */
function oppToCard(opp) {
  return {
    id: String(opp.id),
    _apiId: opp.id,
    category: opp.stage.replace('_', ' '),
    name: opp.title,
    value: `$${opp.value.toLocaleString()}`,
    probability: `${opp.probability}%`,
    assignees: opp.owner ? [opp.owner.split(' ').map((w) => w[0]).join('')] : [],
    lastActivity: null,
    priority: opp.priority,
    vip: opp.vip,
    closed: opp.closed,
    showProgress: opp.probability >= 70,
    // Raw data for detail sidebar
    _raw: opp,
  }
}

/** Build the columns map from a flat API array */
function buildColumns(opps) {
  const cols = {}
  STAGES_META.forEach(({ id }) => { cols[id] = [] })
  opps.forEach((opp) => {
    const stage = opp.stage
    if (cols[stage]) cols[stage].push(oppToCard(opp))
  })
  return cols
}

export default function KanbanBoard({ onSelectDeal }) {
  const { data, isLoading } = usePipeline()
  const opps = Array.isArray(data) ? data : []
  const moveOpp = useMoveOpportunity()

  const [columns, setColumns] = useState({})
  const [activeId, setActiveId] = useState(null)

  // Sync server data → local column state (only when not dragging)
  useEffect(() => {
    if (opps.length) setColumns(buildColumns(opps))
  }, [opps])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  )

  function findColumn(dealId) {
    return Object.keys(columns).find((col) =>
      columns[col].some((d) => d.id === dealId),
    )
  }

  function getActiveDeal() {
    if (!activeId) return null
    const col = findColumn(activeId)
    return col ? columns[col].find((d) => d.id === activeId) : null
  }

  function handleDragStart({ active }) {
    setActiveId(active.id)
  }

  function handleDragOver({ active, over }) {
    if (!over) return
    const fromCol = findColumn(active.id)
    const toCol = Object.keys(columns).includes(over.id)
      ? over.id
      : findColumn(over.id)
    if (!fromCol || !toCol || fromCol === toCol) return

    setColumns((prev) => {
      const deal = prev[fromCol].find((d) => d.id === active.id)
      return {
        ...prev,
        [fromCol]: prev[fromCol].filter((d) => d.id !== active.id),
        [toCol]: [...prev[toCol], { ...deal, closed: toCol === 'closed' }],
      }
    })
  }

  function handleDragEnd({ active, over }) {
    const fromStage = findColumn(active.id)
    setActiveId(null)
    if (!over) return

    const toStage = Object.keys(columns).includes(over.id)
      ? over.id
      : findColumn(over.id)

    // Cross-column: fire API move (optimistic UI already applied in onDragOver)
    if (fromStage && toStage && fromStage !== toStage) {
      const deal = columns[toStage]?.find((d) => d.id === active.id)
      if (deal?._apiId) {
        moveOpp.mutate({ id: deal._apiId, stage: toStage })
      }
      return
    }

    // Same-column reorder
    if (!fromStage || !toStage || fromStage !== toStage) return
    const items = columns[fromStage]
    const oldIdx = items.findIndex((d) => d.id === active.id)
    const newIdx = items.findIndex((d) => d.id === over.id)
    if (oldIdx !== newIdx) {
      setColumns((prev) => ({
        ...prev,
        [fromStage]: arrayMove(prev[fromStage], oldIdx, newIdx),
      }))
    }
  }

  const activeDeal = getActiveDeal()

  if (isLoading) {
    return (
      <div className="flex gap-6 h-full items-start pb-4">
        {STAGES_META.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-80 flex flex-col gap-3">
            <div className="flex items-center gap-2 px-1 mb-1">
              <div className={`w-2 h-2 rounded-full ${stage.dotColor}`} />
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                {stage.label}
              </span>
            </div>
            {Array.from({ length: 2 }, (_, i) => <SkeletonDealCard key={i} />)}
          </div>
        ))}
      </div>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 h-full items-start pb-4">
        {STAGES_META.map((stage) => (
          <KanbanColumn
            key={stage.id}
            stage={stage}
            deals={columns[stage.id] || []}
            onSelectDeal={onSelectDeal}
          />
        ))}

        {/* Add Stage */}
        <div className="flex items-center justify-center border-2 border-dashed border-outline-variant/30 rounded-2xl p-6 h-64 w-80 flex-shrink-0 self-start">
          <button className="flex flex-col items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group">
            <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary-fixed transition-colors">
              <span className="material-symbols-outlined">add</span>
            </div>
            <span className="text-sm font-bold">Add Stage</span>
          </button>
        </div>
      </div>

      <DragOverlay dropAnimation={{ duration: 150, easing: 'ease' }}>
        {activeDeal ? <DealCard deal={activeDeal} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  )
}
