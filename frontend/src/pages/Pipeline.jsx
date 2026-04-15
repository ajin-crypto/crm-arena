import { useState } from 'react'
import KanbanBoard from '@/components/pipeline/KanbanBoard'
import DealDetailSidebar from '@/components/pipeline/DealDetailSidebar'
import { useAnalyticsSummary } from '@/hooks/useAnalytics'

export default function Pipeline() {
  const [view, setView] = useState('board')
  const [selectedDeal, setSelectedDeal] = useState(null)
  const { data: summary } = useAnalyticsSummary()

  const totalValue = summary?.total_pipeline
    ? `$${(summary.total_pipeline / 1_000_000).toFixed(1)}M`
    : '—'
  const avgProb = summary?.avg_probability != null ? `${summary.avg_probability}%` : '—'

  return (
    // h-[calc(100vh-4rem)] = full viewport minus TopNav (4rem = 16*4px)
    // overflow-hidden keeps the horizontal scroll inside the board section only
    <div className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden">
      {/* Page header */}
      <section className="px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface flex-shrink-0">
        <div>
          <h1 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">
            Opportunities Pipeline
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-on-surface-variant">Total Value:</span>
              <span className="text-sm font-bold text-on-surface">{totalValue}</span>
            </div>
            <div className="w-px h-3 bg-outline-variant" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-on-surface-variant">Avg. Probability:</span>
              <span className="text-sm font-bold text-tertiary">{avgProb}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Board / List toggle */}
          <div className="bg-surface-container flex rounded-full p-1">
            {['board', 'list'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={
                  view === v
                    ? 'px-4 py-1.5 bg-surface-container-lowest shadow-sm rounded-full text-xs font-bold text-primary transition-all'
                    : 'px-4 py-1.5 text-xs font-medium text-on-surface-variant hover:text-on-surface transition-colors capitalize'
                }
              >
                {v.charAt(0).toUpperCase() + v.slice(1)} View
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full text-sm font-bold text-on-surface hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Filter
          </button>
        </div>
      </section>

      {/* Kanban board + Detail Sidebar */}
      <section className="flex-1 flex overflow-hidden">
        {/* Kanban board — flex-1 takes remaining width, overflow-x enables horizontal scroll */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden px-6 lg:px-8 no-scrollbar">
          <KanbanBoard onSelectDeal={(deal) => setSelectedDeal(deal._raw || deal)} />
        </div>

        {/* Deal detail sidebar */}
        <div className="flex-shrink-0 pr-6 lg:pr-8 overflow-y-auto">
          <DealDetailSidebar deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
        </div>
      </section>
    </div>
  )
}
