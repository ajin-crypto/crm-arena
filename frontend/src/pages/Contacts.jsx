import AlphaFilter from '@/components/contacts/AlphaFilter'
import ContactsTable from '@/components/contacts/ContactsTable'
import ContactDetailSidebar from '@/components/contacts/ContactDetailSidebar'

export default function Contacts() {
  return (
    <div className="px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-headline font-black text-on-surface tracking-tight mb-2">
            Contacts Directory
          </h1>
          <p className="text-on-surface-variant max-w-lg text-sm">
            Manage your global network and key stakeholders with high-fidelity relationship tracking and strategic engagement tools.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button className="px-5 py-2.5 bg-surface-container-high text-on-surface rounded-full font-semibold text-sm hover:bg-surface-variant transition-colors active:scale-95">
            Export CSV
          </button>
          <button className="px-5 py-2.5 bg-primary text-on-primary rounded-full font-semibold text-sm shadow-md shadow-primary/10 active:scale-95 transition-transform flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">person_add</span>
            Add Contact
          </button>
        </div>
      </div>

      {/* Search + alpha filter + stats bento */}
      <AlphaFilter />

      {/* Table + sticky detail sidebar */}
      <div className="flex gap-8 items-start">
        <ContactsTable />
        <ContactDetailSidebar />
      </div>
    </div>
  )
}
