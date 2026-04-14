import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/utils/cn'
import Avatar from '@/components/ui/Avatar'

export default function DealCard({ deal, isOverlay = false }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-transparent',
        'hover:border-primary/10 transition-all cursor-grab active:cursor-grabbing group',
        isDragging && !isOverlay && 'opacity-40 scale-[0.98]',
        isOverlay && 'rotate-1 shadow-lg cursor-grabbing',
        deal.closed && 'grayscale-[0.3]',
      )}
    >
      {/* Category label + actions */}
      <div className="flex justify-between items-start mb-2">
        <span
          className={cn(
            'text-[10px] font-bold uppercase tracking-widest',
            deal.closed ? 'text-on-surface-variant' : 'text-primary-container',
          )}
        >
          {deal.category}
        </span>

        {deal.vip ? (
          <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant text-[9px] px-2 py-0.5 rounded-full font-bold">
            VIP DEAL
          </span>
        ) : deal.priority ? (
          <span className="material-symbols-outlined text-error text-lg">priority_high</span>
        ) : deal.closed ? (
          <span
            className="material-symbols-outlined text-tertiary text-sm"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        ) : (
          <button
            aria-label="More actions"
            className="material-symbols-outlined text-sm text-outline hover:text-on-surface opacity-0 group-hover:opacity-100 transition-opacity"
          >
            more_horiz
          </button>
        )}
      </div>

      {/* Deal name */}
      <h4 className="font-headline font-bold text-on-surface mb-4 leading-tight text-sm">
        {deal.name}
      </h4>

      {/* Value + Probability */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] text-on-surface-variant font-medium">
            {deal.closed ? 'Final Value' : 'Value'}
          </p>
          <p className="text-lg font-headline font-extrabold text-on-surface">
            {deal.value}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-on-surface-variant font-medium">
            {deal.closed ? 'Status' : 'Probability'}
          </p>
          <p className={cn('text-sm font-bold', deal.closed ? 'text-tertiary' : 'text-on-surface')}>
            {deal.closed ? 'WON' : deal.probability}
          </p>
        </div>
      </div>

      {/* Probability progress bar (Negotiation style) */}
      {deal.showProgress && (
        <div className="mt-4 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
          <div
            className="h-full bg-tertiary rounded-full"
            style={{ width: deal.probability }}
          />
        </div>
      )}

      {/* Footer: avatar stack + last activity */}
      {(deal.assignees?.length || deal.lastActivity) && (
        <div className="mt-4 pt-4 border-t border-surface-container-low flex items-center justify-between">
          {deal.assignees?.length ? (
            <div className="flex -space-x-2">
              {deal.assignees.map((a) => (
                <Avatar
                  key={a}
                  name={a}
                  size="sm"
                  className="border-2 border-surface-container-lowest w-6 h-6 text-[10px]"
                />
              ))}
            </div>
          ) : (
            <div />
          )}
          {deal.lastActivity && (
            <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
              {deal.lastActivity}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
