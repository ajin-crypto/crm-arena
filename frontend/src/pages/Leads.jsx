import LeadFilterBar from '@/components/leads/LeadFilterBar'
import LeadsTable from '@/components/leads/LeadsTable'
import CreateLeadModal from '@/components/leads/CreateLeadModal'
import { useLeadsStore } from '@/store/useLeadsStore'

export default function Leads() {
  const openCreateModal = useLeadsStore((s) => s.openCreateModal)

  return (
    <div className="px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
            Leads Management
          </h1>
          <p className="text-on-surface-variant mt-1 text-sm">
            Nurturing{' '}
            <span className="font-bold text-primary">1,248 active leads</span>{' '}
            across your pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Import */}
          <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high text-on-surface font-semibold rounded-full hover:bg-surface-container-highest transition-all active:scale-95 text-sm">
            <span className="material-symbols-outlined text-sm">download</span>
            Import
          </button>

          {/* Create New Lead */}
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-6 py-2.5 hero-gradient text-on-primary font-bold rounded-full shadow-lg shadow-primary/20 hover:brightness-110 transition-all active:scale-95 text-sm"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Create New Lead
          </button>
        </div>
      </div>

      {/* Filter bar + Conversion rate KPI */}
      <LeadFilterBar />

      {/* Data table */}
      <LeadsTable />

      {/* Create lead modal — rendered at page level so it's above everything */}
      <CreateLeadModal />
    </div>
  )
}
