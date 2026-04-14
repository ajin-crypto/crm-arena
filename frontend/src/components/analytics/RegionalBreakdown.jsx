// Revenue by Region — SVG donut chart + legend
// Donut uses stroke-dasharray on a circle r=16, circumference ≈ 100.5
// We simplify by treating circumference as 100 for dasharray (the mockup does this)
const REGIONS = [
  { label: 'North America', value: '$1.26M', color: 'stroke-primary',           dot: 'bg-primary',           dasharray: '45, 100', dashoffset: '0'    },
  { label: 'Europe (EMEA)', value: '$700k',  color: 'stroke-tertiary',          dot: 'bg-tertiary',          dasharray: '25, 100', dashoffset: '-45'  },
  { label: 'APAC',          value: '$840k',  color: 'stroke-primary-container', dot: 'bg-primary-container', dasharray: '30, 100', dashoffset: '-70'  },
]

export default function RegionalBreakdown() {
  return (
    <div className="bg-surface-container-low p-8 rounded-xl flex flex-col">
      <h3 className="text-xl font-headline font-bold text-on-surface mb-6">Revenue by Region</h3>

      <div className="flex-1 flex flex-col gap-6">
        {/* SVG donut */}
        <div className="relative w-40 h-40 mx-auto mb-2">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            {/* Track */}
            <circle
              className="stroke-surface-container-highest"
              cx="18" cy="18" r="16"
              fill="none" strokeWidth="3"
            />
            {/* Segments */}
            {REGIONS.map((r) => (
              <circle
                key={r.label}
                className={r.color}
                cx="18" cy="18" r="16"
                fill="none"
                strokeWidth="4"
                strokeDasharray={r.dasharray}
                strokeDashoffset={r.dashoffset}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-headline font-bold tracking-tight text-on-surface">100%</span>
            <span className="text-[10px] text-on-surface-variant uppercase font-bold">Total Share</span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-4">
          {REGIONS.map((r) => (
            <div key={r.label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${r.dot}`} />
                <span className="text-sm font-medium text-on-surface">{r.label}</span>
              </div>
              <span className="text-sm font-bold text-on-surface">{r.value}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="mt-8 text-primary font-bold text-sm flex items-center justify-center gap-2 hover:underline transition-opacity hover:opacity-80">
        Detailed Regional Report
        <span className="material-symbols-outlined text-base">arrow_forward</span>
      </button>
    </div>
  )
}
