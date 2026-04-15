import { cn } from '@/utils/cn'
import Avatar from '@/components/ui/Avatar'
import { formatCurrency } from '@/utils/formatCurrency'
import { timeAgo, formatDate } from '@/utils/formatDate'

const STAGE_LABELS = {
  prospecting: 'Prospecting',
  investigation: 'Investigation',
  value_prop: 'Value Proposition',
  negotiation: 'Negotiation',
  closed: 'Closed Won',
}

const STAGE_COLORS = {
  prospecting: 'bg-outline-variant text-on-surface',
  investigation: 'bg-primary-container text-on-primary-container',
  value_prop: 'bg-primary text-on-primary',
  negotiation: 'bg-tertiary-container text-on-tertiary-container',
  closed: 'bg-tertiary text-on-tertiary',
}

export default function DealDetailSidebar({ deal, onClose }) {
  if (!deal) {
    return (
      <div className="hidden xl:flex w-96 sticky top-0 h-fit items-center justify-center flex-shrink-0">
        <div className="bg-surface-container-lowest rounded-2xl p-10 text-center shadow-sm">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 block mb-3">
            handshake
          </span>
          <p className="text-sm text-on-surface-variant font-medium">
            Click a deal to view details
          </p>
        </div>
      </div>
    )
  }

  const stageLabel = STAGE_LABELS[deal.stage] || deal.stage
  const stageColor = STAGE_COLORS[deal.stage] || 'bg-surface-container text-on-surface'
  const probabilityColor =
    deal.probability >= 75
      ? 'text-tertiary'
      : deal.probability >= 50
        ? 'text-primary'
        : deal.probability >= 25
          ? 'text-on-surface'
          : 'text-error'

  return (
    <div className="hidden xl:block w-96 sticky top-0 h-fit flex-shrink-0 animate-in slide-in-from-right-4 duration-200">
      <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
        {/* Gradient hero band */}
        <div className="relative h-28 bg-gradient-to-br from-primary via-primary/80 to-tertiary">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-surface-container-lowest/20 hover:bg-surface-container-lowest/40 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-on-primary text-sm">close</span>
          </button>

          {/* Stage badge */}
          <div className="absolute top-3 left-4">
            <span className={cn('text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full', stageColor)}>
              {stageLabel}
            </span>
          </div>

          {/* Deal value overlay */}
          <div className="absolute bottom-3 left-4">
            <p className="text-on-primary/70 text-[10px] font-bold uppercase tracking-widest">Deal Value</p>
            <p className="text-on-primary text-2xl font-headline font-extrabold">
              {formatCurrency(deal.value)}
            </p>
          </div>

          {/* Priority / VIP badges */}
          <div className="absolute bottom-3 right-4 flex gap-2">
            {deal.vip && (
              <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant text-[9px] px-2 py-0.5 rounded-full font-bold">
                VIP
              </span>
            )}
            {deal.priority && (
              <span className="bg-error-container text-on-error-container text-[9px] px-2 py-0.5 rounded-full font-bold">
                PRIORITY
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Deal title + company */}
          <div className="flex justify-between items-start mb-1">
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-headline font-extrabold text-on-surface tracking-tight leading-tight">
                {deal.title}
              </h3>
              <p className="text-sm font-medium text-primary mt-1">{deal.company}</p>
            </div>
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors flex-shrink-0 ml-2">
              <span className="material-symbols-outlined text-on-surface-variant text-xl">more_horiz</span>
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mb-6 mt-4">
            <button className="flex-1 py-2.5 bg-primary text-on-primary rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-sm">edit</span>
              Edit Deal
            </button>
            <button className="flex-1 py-2.5 bg-surface-container-high rounded-lg text-xs font-bold uppercase tracking-wider text-on-surface flex items-center justify-center gap-1.5 hover:bg-surface-container-highest transition-colors">
              <span className="material-symbols-outlined text-sm">mail</span>
              Contact
            </button>
          </div>

          <div className="space-y-4">
            {/* Probability gauge */}
            <div className="bg-surface-container p-4 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  Win Probability
                </p>
                <p className={cn('text-2xl font-headline font-black', probabilityColor)}>
                  {deal.probability}%
                </p>
              </div>
              <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all',
                    deal.probability >= 75
                      ? 'bg-tertiary'
                      : deal.probability >= 50
                        ? 'bg-primary'
                        : deal.probability >= 25
                          ? 'bg-on-surface-variant'
                          : 'bg-error',
                  )}
                  style={{ width: `${deal.probability}%` }}
                />
              </div>
            </div>

            {/* Key metrics grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-container p-3 rounded-xl">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">
                  Owner
                </p>
                <div className="flex items-center gap-2">
                  <Avatar name={deal.owner || 'Unassigned'} size="sm" className="w-6 h-6 text-[10px]" />
                  <p className="text-sm font-bold text-on-surface truncate">
                    {deal.owner || 'Unassigned'}
                  </p>
                </div>
              </div>
              <div className="bg-surface-container p-3 rounded-xl">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">
                  Status
                </p>
                <p className={cn('text-sm font-bold', deal.closed ? 'text-tertiary' : 'text-on-surface')}>
                  {deal.closed ? '✓ Closed Won' : 'Active'}
                </p>
              </div>
            </div>

            {/* Deal info */}
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                Deal Information
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-[15px] text-primary">business</span>
                    Company
                  </span>
                  <span className="font-bold text-on-surface">{deal.company}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-[15px] text-primary">payments</span>
                    Deal Value
                  </span>
                  <span className="font-bold text-on-surface">{formatCurrency(deal.value)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-[15px] text-primary">trending_up</span>
                    Stage
                  </span>
                  <span className={cn('font-bold text-xs px-2 py-0.5 rounded-full', stageColor)}>
                    {stageLabel}
                  </span>
                </div>
                {deal.created_at && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-on-surface-variant flex items-center gap-2">
                      <span className="material-symbols-outlined text-[15px] text-primary">calendar_today</span>
                      Created
                    </span>
                    <span className="font-bold text-on-surface">{formatDate(deal.created_at)}</span>
                  </div>
                )}
                {deal.updated_at && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-on-surface-variant flex items-center gap-2">
                      <span className="material-symbols-outlined text-[15px] text-primary">update</span>
                      Last Updated
                    </span>
                    <span className="font-bold text-on-surface">{timeAgo(deal.updated_at)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Stage Progress */}
            <div className="bg-surface-container-low p-4 rounded-xl">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-3">
                Pipeline Progress
              </p>
              <div className="flex items-center gap-1">
                {Object.keys(STAGE_LABELS).map((stageKey) => (
                  <div key={stageKey} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className={cn(
                        'w-full h-2 rounded-full transition-colors',
                        Object.keys(STAGE_LABELS).indexOf(stageKey) <= Object.keys(STAGE_LABELS).indexOf(deal.stage)
                          ? stageKey === 'closed'
                            ? 'bg-tertiary'
                            : 'bg-primary'
                          : 'bg-surface-container-high',
                      )}
                    />
                    <span className={cn(
                      'text-[8px] font-bold uppercase tracking-wider',
                      stageKey === deal.stage ? 'text-primary' : 'text-on-surface-variant/50',
                    )}>
                      {STAGE_LABELS[stageKey].split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* View full deal button */}
          <button className="w-full mt-5 py-3 bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-sm rounded-xl transition-colors">
            View Full Details
          </button>
        </div>
      </div>
    </div>
  )
}
