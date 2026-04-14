import { useState } from 'react'
import ContactRow from './ContactRow'
import { useContactsStore } from '@/store/useContactsStore'
import { useContacts } from '@/hooks/useContacts'
import { SkeletonContactRow } from '@/components/ui/Skeleton'
import { cn } from '@/utils/cn'

const PAGE_SIZE = 6

export default function ContactsTable() {
  const [page, setPage] = useState(1)
  const { alphaFilter, search } = useContactsStore()

  const { data: filtered = [], isLoading, isError } = useContacts({ alpha: alphaFilter, search })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <div className="flex-1 min-w-0">
      {/* Table header */}
      <div className="grid grid-cols-12 px-6 py-3 bg-surface-container-low rounded-xl mb-3">
        {['Contact Name', 'Account / Title', 'Contact Info'].map((h, i) => (
          <div
            key={h}
            className={cn(
              'text-xs font-bold text-on-surface-variant uppercase tracking-wider',
              i === 0 ? 'col-span-4' : 'col-span-3',
            )}
          >
            {h}
          </div>
        ))}
        <div className="col-span-2 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">
          Last Touch
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {isLoading ? (
          Array.from({ length: PAGE_SIZE }, (_, i) => <SkeletonContactRow key={i} />)
        ) : isError ? (
          <div className="py-16 text-center text-error text-sm">
            Failed to load contacts. Is the backend running?
          </div>
        ) : paginated.length ? (
          paginated.map((c) => <ContactRow key={c.id} contact={c} />)
        ) : (
          <div className="py-16 text-center text-on-surface-variant text-sm">
            No contacts match your search.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs text-on-surface-variant">
          Showing{' '}
          <span className="font-bold text-on-surface">
            {filtered.length ? (safePage - 1) * PAGE_SIZE + 1 : 0}–{Math.min(safePage * PAGE_SIZE, filtered.length)}
          </span>{' '}
          of <span className="font-bold text-on-surface">{filtered.length.toLocaleString()}</span> contacts
        </p>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={
                p === safePage
                  ? 'w-8 h-8 flex items-center justify-center bg-primary text-on-primary text-xs font-bold rounded-lg'
                  : 'w-8 h-8 flex items-center justify-center hover:bg-surface-container-high text-on-surface text-xs font-bold rounded-lg transition-colors'
              }
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  )
}
