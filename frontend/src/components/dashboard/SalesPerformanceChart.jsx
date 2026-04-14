const MONTHS = [
  { label: 'Jan', target: 60, actual: 75 },
  { label: 'Feb', target: 45, actual: 50 },
  { label: 'Mar', target: 80, actual: 95 },
  { label: 'Apr', target: 65, actual: 60 },
  { label: 'May', target: 70, actual: 85 },
  { label: 'Jun', target: 85, actual: 90 },
]

function Bar({ heightPct, colorClass, shadow = false }) {
  return (
    <div
      className={`w-full max-w-[40px] ${colorClass} rounded-t-lg transition-all ${shadow ? 'shadow-md z-10' : ''}`}
      style={{ height: `${heightPct}%` }}
    />
  )
}

export default function SalesPerformanceChart() {
  return (
    <div className="lg:col-span-2 bg-surface-container-lowest rounded-full p-8 lg:p-10 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-headline font-bold text-xl text-on-surface">Sales Performance</h3>
        <div className="flex gap-4 text-xs font-semibold text-on-surface-variant">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-primary inline-block" />
            Target
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-primary-fixed inline-block" />
            Actual
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-[260px] flex items-end justify-between gap-3">
        {MONTHS.map((m) => (
          <div
            key={m.label}
            className="flex-1 flex flex-col items-center gap-0 h-full justify-end group"
          >
            {/* Target bar (back) */}
            <Bar heightPct={m.target} colorClass="bg-primary-fixed group-hover:opacity-80" />
            {/* Actual bar (front, offset upward to overlap) */}
            <div className="w-full flex justify-center -mt-8">
              <Bar heightPct={m.actual} colorClass="bg-primary" shadow />
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase mt-3">
              {m.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
