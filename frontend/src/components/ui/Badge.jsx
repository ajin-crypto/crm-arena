import { cn } from '@/utils/cn'

const STYLES = {
  QUALIFIED: 'bg-tertiary/10 text-tertiary',
  NEW:       'bg-primary/10 text-primary',
  CONTACTED: 'bg-on-surface-variant/10 text-on-surface-variant',
  LOST:      'bg-error/10 text-error',
}

/**
 * Badge – status pill for leads/contacts/pipeline.
 * Props:
 *   status   string  – 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'LOST'
 *   className string
 */
export default function Badge({ status, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide',
        STYLES[status] ?? 'bg-surface-container-high text-on-surface-variant',
        className,
      )}
    >
      {status}
    </span>
  )
}
