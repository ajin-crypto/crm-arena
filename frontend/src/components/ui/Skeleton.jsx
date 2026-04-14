import { cn } from '@/utils/cn'

/** Animated shimmer block — use for loading placeholders. */
export function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'animate-pulse bg-surface-container-high rounded-lg',
        className,
      )}
    />
  )
}

/** Full table-row skeleton for leads / contacts tables. */
export function SkeletonRow({ cols = 6 }) {
  return (
    <tr>
      {Array.from({ length: cols }, (_, i) => (
        <td key={i} className="px-4 py-4">
          <Skeleton className="h-4 rounded" style={{ width: `${60 + (i % 3) * 20}%` }} />
        </td>
      ))}
    </tr>
  )
}

/** Grid-row skeleton for the contacts grid layout. */
export function SkeletonContactRow() {
  return (
    <div className="grid grid-cols-12 items-center px-6 py-4 rounded-xl bg-surface-container-lowest">
      <div className="col-span-4 flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-2xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-2.5 w-1/2" />
        </div>
      </div>
      <div className="col-span-3 space-y-2">
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-2.5 w-1/2" />
      </div>
      <div className="col-span-3 space-y-2">
        <Skeleton className="h-2.5 w-4/5" />
        <Skeleton className="h-2.5 w-3/5" />
      </div>
      <div className="col-span-2 flex flex-col items-end gap-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
    </div>
  )
}

/** KPI card skeleton for dashboard / analytics bento. */
export function SkeletonKpiCard({ wide = false }) {
  return (
    <div
      className={cn(
        'bg-surface-container-lowest rounded-xl p-8 shadow-sm space-y-4',
        wide && 'md:col-span-2',
      )}
    >
      <div className="flex justify-between items-start">
        <Skeleton className="h-2.5 w-24" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-3 w-full" />
    </div>
  )
}

/** Kanban deal card skeleton. */
export function SkeletonDealCard() {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm space-y-3">
      <Skeleton className="h-3 w-3/4" />
      <Skeleton className="h-2.5 w-1/2" />
      <div className="flex justify-between items-center pt-1">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  )
}
