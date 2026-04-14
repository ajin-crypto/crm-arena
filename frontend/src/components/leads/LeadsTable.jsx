import { useState } from 'react'
import LeadRow from './LeadRow'
import { useLeadsStore } from '@/store/useLeadsStore'
import { useLeads } from '@/hooks/useLeads'
import { SkeletonRow } from '@/components/ui/Skeleton'

const PAGE_SIZE = 5

export default function LeadsTable() {
  const [page, setPage] = useState(1)
  const { filters, setSelectedLead } = useLeadsStore()

  const { data, isLoading, isError } = useLeads(filters)
  const leads = Array.isArray(data) ? data : []

  const totalPages = Math.max(1, Math.ceil(leads.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paginated = leads.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <div className="bg-surface-container rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-separate border-spacing-y-2 px-4 py-2">
          {/* Header */}
          <thead>
            <tr className="text-on-surface-variant uppercase text-[10px] font-bold tracking-widest">
              <th className="px-4 py-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-on-surface transition-colors select-none">
                  Lead Name
                  <span className="material-symbols-outlined text-xs">arrow_downward</span>
                </div>
              </th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Lead Source</th>
              <th className="px-4 py-3">Last Activity</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {isLoading ? (
              Array.from({ length: PAGE_SIZE }, (_, i) => <SkeletonRow key={i} cols={6} />)
            ) : isError ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-error text-sm">
                  Failed to load leads. Is the backend running?
                </td>
              </tr>
            ) : paginated.length ? (
              paginated.map((lead) => (
                <LeadRow key={lead.id} lead={lead} onClick={setSelectedLead} />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-on-surface-variant text-sm">
                  No leads match the current filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 bg-surface-container-low border-t border-outline-variant/10">
        <span className="text-xs text-on-surface-variant font-medium">
          Showing{' '}
          <span className="text-on-surface font-bold">
            {leads.length ? (safePage - 1) * PAGE_SIZE + 1 : 0}–{Math.min(safePage * PAGE_SIZE, leads.length)}
          </span>{' '}
          of <span className="text-on-surface font-bold">{leads.length.toLocaleString()}</span> leads
        </span>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="p-2 bg-surface-container-lowest rounded-lg shadow-sm text-on-surface-variant hover:text-primary transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={
                p === safePage
                  ? 'px-3 py-1 bg-primary text-on-primary text-xs font-bold rounded-lg shadow-sm'
                  : 'px-3 py-1 bg-surface-container-lowest text-on-surface-variant text-xs font-bold rounded-lg hover:bg-surface-container transition-all'
              }
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="p-2 bg-surface-container-lowest rounded-lg shadow-sm text-on-surface-variant hover:text-primary transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  )
}
