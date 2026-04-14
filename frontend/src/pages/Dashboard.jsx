import { useState } from 'react'
import KpiBentoGrid from '@/components/dashboard/KpiBentoGrid'
import SalesPerformanceChart from '@/components/dashboard/SalesPerformanceChart'
import ActivityFeed from '@/components/dashboard/ActivityFeed'
import PipelineDistribution from '@/components/dashboard/PipelineDistribution'

export default function Dashboard() {
  const [period, setPeriod] = useState('monthly')

  return (
    <div className="px-6 lg:px-8 py-8">
      {/* Page header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-headline font-extrabold tracking-tight text-on-surface">
            Revenue Overview
          </h1>
          <p className="text-on-surface-variant font-medium mt-1 text-sm">
            Welcome back, Director. Here's your performance snapshot.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Period toggle */}
          <div className="bg-surface-container flex p-1 rounded-full">
            {['monthly', 'quarterly'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={
                  period === p
                    ? 'px-4 py-1.5 bg-surface-container-lowest text-on-surface rounded-full text-sm font-semibold shadow-sm transition-all'
                    : 'px-4 py-1.5 text-on-surface-variant text-sm font-medium hover:text-on-surface transition-colors capitalize'
                }
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          {/* Export */}
          <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high rounded-full text-sm font-semibold hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined text-base">file_download</span>
            Export PDF
          </button>
        </div>
      </header>

      {/* KPI Bento Grid */}
      <KpiBentoGrid />

      {/* Charts row: 70 / 30 split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <SalesPerformanceChart />
        <ActivityFeed />
      </div>

      {/* Pipeline Distribution */}
      <PipelineDistribution />
    </div>
  )
}
