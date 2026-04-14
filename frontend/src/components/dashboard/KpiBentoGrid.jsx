import KpiCard from '@/components/ui/KpiCard'
import { useAnalyticsSummary } from '@/hooks/useAnalytics'

const SPARKLINE_DATA = [30, 55, 40, 70, 50, 80, 60, 95, 75, 100]

// Avatar stack for Pipeline Deals card
function AvatarStack() {
  const initials = ['AJ', 'MR']
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex -space-x-2">
        {initials.map((i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-primary-container flex items-center justify-center text-[10px] font-bold text-primary-fixed"
          >
            {i}
          </div>
        ))}
        <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-primary-fixed flex items-center justify-center text-[10px] font-bold text-primary">
          +12
        </div>
      </div>
      <span className="text-xs text-on-surface-variant font-medium">Assigned Sales Reps</span>
    </div>
  )
}

// Progress bar for Avg. Cycle card
function CycleFooter() {
  return (
    <>
      <div className="mt-2 h-2 bg-surface-container rounded-full overflow-hidden">
        <div className="h-full bg-primary-container w-3/4 rounded-full" />
      </div>
      <p className="text-[10px] mt-2 text-on-surface-variant">
        Efficiency: 8.5% faster than Q2
      </p>
    </>
  )
}

export default function KpiBentoGrid() {
  const { data: summary } = useAnalyticsSummary()

  const revenue = summary?.total_revenue
    ? `$${(summary.total_revenue / 1_000_000).toFixed(1)}M`
    : '—'
  const pipeline = summary?.total_deals != null ? String(summary.total_deals) : '—'

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Hero: Total Revenue – spans 2 cols */}
      <KpiCard
        label="Total Revenue"
        value={revenue}
        trend={summary ? `${summary.win_loss_ratio}% won` : undefined}
        trendUp={summary ? summary.win_loss_ratio >= 50 : true}
        sparklineData={SPARKLINE_DATA}
        colSpan
      />

      {/* Pipeline Deals */}
      <KpiCard label="Pipeline Deals" value={pipeline}>
        <AvatarStack />
      </KpiCard>

      {/* Avg. Cycle */}
      <KpiCard label="Avg. Cycle" value="24d">
        <CycleFooter />
      </KpiCard>
    </div>
  )
}
