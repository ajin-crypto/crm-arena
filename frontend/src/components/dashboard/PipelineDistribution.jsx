import { cn } from '@/utils/cn'

const STAGES = [
  {
    id: 'prospecting',
    label: 'Prospecting',
    count: 42,
    value: '$240K',
    change: '+5% WoW',
    changeColor: 'text-tertiary',
    dotColor: 'bg-outline',
    cardClass: 'bg-surface-container-lowest shadow-sm',
    labelClass: 'text-on-surface-variant',
    countClass: 'bg-surface-container-high text-on-surface',
  },
  {
    id: 'qualification',
    label: 'Qualification',
    count: 28,
    value: '$385K',
    change: 'Stable',
    changeColor: 'text-on-surface-variant',
    dotColor: 'bg-primary-container',
    cardClass: 'bg-surface-container-lowest shadow-sm',
    labelClass: 'text-on-surface-variant',
    countClass: 'bg-surface-container-high text-on-surface',
  },
  {
    id: 'proposal',
    label: 'Proposal',
    count: 15,
    value: '$510K',
    change: '+18% WoW',
    changeColor: 'text-tertiary',
    dotColor: 'bg-primary',
    cardClass: 'bg-surface-container-lowest shadow-sm',
    labelClass: 'text-on-surface-variant',
    countClass: 'bg-surface-container-high text-on-surface',
  },
  {
    id: 'closed_won',
    label: 'Closed Won',
    count: 112,
    value: '$1.2M',
    change: 'Target Hit',
    changeColor: 'text-tertiary',
    dotColor: 'bg-tertiary',
    cardClass: 'bg-primary-fixed/20',
    labelClass: 'text-tertiary',
    countClass: 'bg-tertiary/20 text-tertiary',
    valueClass: 'text-primary',
  },
]

export default function PipelineDistribution() {
  return (
    <div className="mt-8">
      <h3 className="font-headline font-bold text-xl mb-6 px-2 text-on-surface">
        Pipeline Distribution
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAGES.map((stage) => (
          <div
            key={stage.id}
            className={cn(stage.cardClass, 'p-6 rounded-2xl hover:-translate-y-1 transition-transform cursor-default')}
          >
            {/* Stage header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${stage.dotColor}`} />
                <span
                  className={`text-xs font-bold uppercase tracking-widest ${stage.labelClass}`}
                >
                  {stage.label}
                </span>
              </div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded ${stage.countClass}`}
              >
                {stage.count}
              </span>
            </div>

            {/* Value + change */}
            <div className="flex items-end justify-between">
              <h4
                className={`text-2xl font-headline font-bold ${stage.valueClass || 'text-on-surface'}`}
              >
                {stage.value}
              </h4>
              <span className={`text-[10px] font-bold ${stage.changeColor}`}>
                {stage.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
