import { cn } from '@/utils/cn'

const RING_COLORS = [
  'bg-primary/10 text-primary',
  'bg-tertiary/10 text-tertiary',
  'bg-secondary/10 text-secondary',
  'bg-error/10 text-error',
]

function colorIndex(name = '') {
  return name.charCodeAt(0) % RING_COLORS.length
}

/**
 * Avatar – initials fallback with colour derived from name.
 * Props:
 *   name      string  – used for initials + colour
 *   initials  string  – override initials (defaults to first 2 chars)
 *   size      string  – 'sm' | 'md' (default 'md')
 *   className string
 */
export default function Avatar({ name = '', initials, size = 'md', className }) {
  const letters = initials || name.slice(0, 2).toUpperCase()
  const color = RING_COLORS[colorIndex(name)]

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-bold flex-shrink-0',
        size === 'sm' ? 'w-7 h-7 text-[10px]' : 'w-8 h-8 text-xs',
        color,
        className,
      )}
    >
      {letters}
    </div>
  )
}
