import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { cn } from '@/utils/cn'
import DealCard from './DealCard'

export default function KanbanColumn({ stage, deals, onSelectDeal }) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id })

  const totalValue = stage.totalValue
  const isClosedWon = stage.id === 'closed'

  return (
    <div className="kanban-col flex flex-col h-full bg-surface-container-low rounded-2xl flex-shrink-0 w-80">
      {/* Column header */}
      <div className="p-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className={cn('w-2 h-2 rounded-full', stage.dotColor)} />
          <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            {stage.label}
          </h3>
          <span className="bg-surface-container-high px-2 py-0.5 rounded text-[10px] font-bold text-on-secondary-container">
            {deals.length}
          </span>
        </div>
        <span className={cn('text-xs font-bold', isClosedWon ? 'text-tertiary' : 'text-on-surface-variant')}>
          {isClosedWon ? 'WON' : totalValue}
        </span>
      </div>

      {/* Droppable card list */}
      <SortableContext items={deals.map((d) => d.id)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={cn(
            'flex-1 overflow-y-auto p-4 space-y-4 transition-colors rounded-b-2xl',
            isOver && 'bg-primary-fixed/20',
            isClosedWon && 'opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0 transition-all',
          )}
        >
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} onSelect={onSelectDeal} />
          ))}

          {/* Empty drop target hint */}
          {deals.length === 0 && (
            <div className={cn(
              'h-24 rounded-xl border-2 border-dashed transition-colors flex items-center justify-center',
              isOver ? 'border-primary/40 bg-primary-fixed/20' : 'border-outline-variant/20',
            )}>
              <span className="text-xs text-on-surface-variant/50 font-medium">Drop here</span>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}
