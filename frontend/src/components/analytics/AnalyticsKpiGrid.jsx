import { cn } from '@/utils/cn'

/**
 * Renders 4 KPI bento cards.
 * `summary` comes from GET /analytics/summary when available;
 * falls back to placeholder dashes while loading.
 */
export default function AnalyticsKpiGrid({ summary }) {
  const fmt = (n) => n != null ? `$${(n / 1000).toFixed(0)}k` : '—'
  const pct = (n) => n != null ? `${n}%` : '—'

  const KPIS = [
    {
      label: 'Win/Loss Ratio',
      value: pct(summary?.win_loss_ratio),
      badge: summary ? (summary.win_loss_ratio >= 50 ? '↑ Above Target' : '↓ Below Target') : '—',
      badgeStyle: summary?.win_loss_ratio >= 50 ? 'bg-tertiary/10 text-tertiary' : 'bg-error/10 text-error',
      sub: 'target 50%',
      footer: (
        <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-tertiary to-tertiary-container transition-all duration-700"
            style={{ width: `${Math.min(summary?.win_loss_ratio ?? 0, 100)}%` }}
          />
        </div>
      ),
    },
    {
      label: 'Avg. Deal Size',
      value: fmt(summary?.avg_deal_size),
      badge: 'Live',
      badgeStyle: 'bg-primary/10 text-primary',
      sub: null,
      footer: (
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5 items-end h-6">
            {[2, 4, 3, 5, 4].map((h, i) => (
              <div
                key={i}
                className={cn('w-1.5 rounded-t-sm', i === 3 ? 'bg-primary' : `bg-primary/${[20, 40, 60, 100, 80][i]}`)}
                style={{ height: `${h * 4}px` }}
              />
            ))}
          </div>
          <span className="text-xs text-on-surface-variant ml-2">From closed deals</span>
        </div>
      ),
    },
    {
      label: 'Total Deals',
      value: summary?.total_deals != null ? String(summary.total_deals) : '—',
      badge: summary?.avg_probability != null ? `${summary.avg_probability}% avg prob.` : '—',
      badgeStyle: 'bg-secondary-container text-on-secondary-container',
      sub: null,
      footer: (
        <div className="text-xs text-on-surface-variant flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">info</span>
          Across all pipeline stages
        </div>
      ),
    },
    {
      label: 'Total Pipeline',
      value: summary?.total_pipeline != null ? `$${(summary.total_pipeline / 1_000_000).toFixed(1)}M` : '—',
      badge: 'Open',
      badgeStyle: 'bg-tertiary/10 text-tertiary',
      sub: null,
      footer: (
        <div className="h-1.5 w-full bg-surface-container rounded-full flex overflow-hidden">
          <div className="h-full bg-primary w-2/5" />
          <div className="h-full bg-primary-container w-1/4 opacity-50" />
        </div>
      ),
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {KPIS.map((kpi) => (
        <div
          key={kpi.label}
          className="bg-surface-container-lowest p-6 rounded-xl shadow-sm group hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
              {kpi.label}
            </span>
            <span className={cn('px-2 py-1 rounded-full text-[10px] font-bold', kpi.badgeStyle)}>
              {kpi.badge}
            </span>
          </div>

          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-headline font-bold tracking-tighter text-on-surface">
              {kpi.value}
              {kpi.valueSuffix && (
                <span className="text-xl font-medium text-on-surface-variant">{kpi.valueSuffix}</span>
              )}
            </span>
            {kpi.sub && (
              <span className="text-on-surface-variant text-sm mb-1">{kpi.sub}</span>
            )}
          </div>

          {kpi.footer}
        </div>
      ))}
    </div>
  )
}
