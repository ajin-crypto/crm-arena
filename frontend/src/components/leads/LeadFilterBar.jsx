import { useLeadsStore } from '@/store/useLeadsStore'

const STATUSES = ['ALL', 'NEW', 'CONTACTED', 'QUALIFIED', 'LOST']

export default function LeadFilterBar() {
  const { filters, setFilter } = useLeadsStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {/* Filter panel — spans 3 cols */}
      <div className="md:col-span-3 bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-wrap items-center gap-6">
        {/* Status pills */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant px-1">
            Lead Status
          </label>
          <div className="flex bg-surface-container-low p-1 rounded-full gap-0.5">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setFilter('status', s)}
                className={
                  filters.status === s
                    ? 'px-4 py-1.5 bg-surface-container-lowest shadow-sm rounded-full text-xs font-bold text-primary transition-all'
                    : 'px-4 py-1.5 text-xs font-medium text-on-surface-variant hover:text-on-surface transition-colors rounded-full'
                }
              >
                {s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-10 w-px bg-outline-variant/20 hidden sm:block" />

        {/* Owner select */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant px-1">
            Owner
          </label>
          <select
            value={filters.owner}
            onChange={(e) => setFilter('owner', e.target.value)}
            className="bg-surface-container-low border-none text-xs font-medium rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 text-on-surface"
          >
            <option value="ALL">Everyone</option>
            <option value="ME">My Leads</option>
            <option value="ALPHA">Sales Team Alpha</option>
          </select>
        </div>

        {/* Divider */}
        <div className="h-10 w-px bg-outline-variant/20 hidden sm:block" />

        {/* More filters */}
        <button className="flex items-center gap-2 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-sm">filter_list</span>
          More Filters
        </button>
      </div>

      {/* Conversion Rate KPI — 1 col */}
      <div className="kpi-gradient p-6 rounded-xl text-on-tertiary shadow-sm flex flex-col justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
          Conversion Rate
        </span>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-3xl font-headline font-black">24.8%</span>
          <span className="material-symbols-outlined text-sm">trending_up</span>
        </div>
      </div>
    </div>
  )
}
