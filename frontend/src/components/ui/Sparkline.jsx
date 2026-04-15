/**
 * Sparkline – pure SVG inline line chart.
 * Props:
 *   data        number[]   – array of values
 *   className   string     – extra classes on the wrapper div (use text-* to set stroke colour)
 */
import { useId } from 'react'
import { cn } from '@/utils/cn'

export default function Sparkline({ data = [], className = '' }) {
  const gradId = useId()
  if (data.length < 2) return null

  const W = 400
  const H = 100
  const pad = 4
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (W - pad * 2)
    const y = H - pad - ((v - min) / range) * (H - pad * 2)
    return `${x},${y}`
  })

  const polyline = pts.join(' ')
  const area = `${pts[0].split(',')[0]},${H} ` + pts.join(' ') + ` ${pts[pts.length - 1].split(',')[0]},${H} Z`

  return (
    <div className={cn('w-full h-full text-primary', className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Area fill */}
        <polygon points={area} fill={`url(#${gradId})`} />
        {/* Line */}
        <polyline points={polyline} fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  )
}
