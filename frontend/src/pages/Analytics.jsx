import { useState } from 'react'
import AnalyticsKpiGrid from '@/components/analytics/AnalyticsKpiGrid'
import RevenueChart from '@/components/analytics/RevenueChart'
import RegionalBreakdown from '@/components/analytics/RegionalBreakdown'
import TopAccountsTable from '@/components/analytics/TopAccountsTable'
import { useAnalyticsSummary } from '@/hooks/useAnalytics'

const RANGES = ['This Quarter', 'This Year']

export default function Analytics() {
  const [range, setRange] = useState('This Quarter')
  const { data: summary } = useAnalyticsSummary()

  return (
    <div className="px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-2">
            Sales Performance
          </h1>
          <p className="text-on-surface-variant text-lg">
            Executive overview of quarterly revenue and pipeline health.
          </p>
        </div>

        {/* Time range toggle */}
        <div className="flex items-center gap-2 bg-surface-container p-1 rounded-full">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={
                range === r
                  ? 'px-6 py-2 rounded-full text-sm font-semibold transition-all bg-surface-container-lowest text-primary shadow-sm'
                  : 'px-6 py-2 rounded-full text-sm font-medium text-on-surface-variant hover:text-on-surface transition-all'
              }
            >
              {r}
            </button>
          ))}
          <button className="px-4 py-2 rounded-full text-sm text-on-surface-variant hover:text-on-surface transition-all">
            <span className="material-symbols-outlined text-base align-middle">calendar_month</span>
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <AnalyticsKpiGrid summary={summary} />

      {/* Charts — 3-col asymmetric */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <RevenueChart />
        <RegionalBreakdown />
      </div>

      {/* Top accounts table */}
      <TopAccountsTable />
    </div>
  )
}
