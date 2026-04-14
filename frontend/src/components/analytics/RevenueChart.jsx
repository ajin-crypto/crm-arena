import { cn } from '@/utils/cn'

// Revenue Performance by Month — CSS bar chart
// Each bar: grey forecast column behind, blue actual column on top
const MONTHS = [
  { label: 'Jul', forecastH: 128, actualH: 96 },
  { label: 'Aug', forecastH: 192, actualH: 144 },
  { label: 'Sep', forecastH: 256, actualH: 224 },
  { label: 'Oct', forecastH: 224, actualH: 160 },
  { label: 'Nov', forecastH: 160, actualH: 112 },
  { label: 'Dec', forecastH: 256, actualH: 16, isForecast: true },
]

export default function RevenueChart() {
  return (
    <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-headline font-bold text-on-surface">
          Revenue Performance by Month
        </h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs font-medium text-on-surface-variant">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-surface-container-highest" />
            <span className="text-xs font-medium text-on-surface-variant">Forecast</span>
          </div>
        </div>
      </div>

      {/* Bar chart — max height 256px (Sep is the tallest) */}
      <div className="h-64 flex items-end justify-between gap-4 px-2">
        {MONTHS.map((m) => (
          <div key={m.label} className="flex flex-col items-center flex-1 gap-2 group">
            <div className="w-full relative" style={{ height: `${m.forecastH}px` }}>
              {/* Forecast bar */}
              <div
                className={cn(
                  'absolute bottom-0 w-full bg-surface-container-highest rounded-t-lg h-full',
                  m.isForecast && 'opacity-40',
                )}
              />
              {/* Actual bar */}
              <div
                className="absolute bottom-0 w-full bg-primary rounded-t-lg group-hover:brightness-110 transition-all"
                style={{ height: `${m.actualH}px` }}
              />
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
              {m.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
