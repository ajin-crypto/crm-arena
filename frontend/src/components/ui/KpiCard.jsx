import { cn } from '@/utils/cn'
import Sparkline from './Sparkline'

/**
 * KpiCard – reusable KPI tile following Kinetic Blue design.
 * Props:
 *   label          string   – uppercase label
 *   value          string   – large metric value
 *   trend          string   – e.g. "+12%"
 *   trendUp        bool     – true = green, false = red
 *   sparklineData  number[] – optional sparkline data
 *   colSpan        bool     – if true, spans 2 cols (hero card)
 *   children               – optional footer content
 *   className      string
 */
export default function KpiCard({
  label,
  value,
  trend,
  trendUp = true,
  sparklineData,
  colSpan = false,
  children,
  className,
}) {
  return (
    <div
      className={cn(
        'bg-surface-container-lowest rounded-full p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow',
        colSpan && 'md:col-span-2',
        className,
      )}
    >
      {/* Top row: label + value + trend badge */}
      <div className="flex justify-between items-start z-10 relative">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-1">
            {label}
          </p>
          <h2
            className={cn(
              'font-headline font-extrabold text-on-surface',
              colSpan ? 'text-5xl' : 'text-4xl',
            )}
          >
            {value}
          </h2>
        </div>

        {trend && (
          <span
            className={cn(
              'px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 flex-shrink-0',
              trendUp
                ? 'bg-tertiary/10 text-tertiary'
                : 'bg-error/10 text-error',
            )}
          >
            <span className="material-symbols-outlined text-sm">
              {trendUp ? 'trending_up' : 'trending_down'}
            </span>
            {trend}
          </span>
        )}
      </div>

      {/* Footer slot */}
      {children && (
        <div className="z-10 relative mt-4">
          {children}
        </div>
      )}

      {/* Sparkline overlay (hero cards only) */}
      {sparklineData && (
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity">
          <Sparkline data={sparklineData} />
        </div>
      )}
    </div>
  )
}
