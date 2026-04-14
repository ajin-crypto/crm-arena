import { useContactsStore } from '@/store/useContactsStore'
import Avatar from '@/components/ui/Avatar'
import { cn } from '@/utils/cn'

const RECENT_ACTIVITY = [
  { id: 1, text: 'Contract Renewal Discussed', time: 'Today at 10:45 AM', active: true },
  { id: 2, text: 'Attended Webinar: Future of ERP', time: 'Oct 24, 2023', active: false },
]

export default function ContactDetailSidebar() {
  const selectedContact = useContactsStore((s) => s.selectedContact)
  const setSelectedContact = useContactsStore((s) => s.setSelectedContact)

  if (!selectedContact) {
    return (
      <div className="hidden xl:flex w-80 sticky top-24 h-fit items-center justify-center">
        <div className="bg-surface-container-lowest rounded-2xl p-10 text-center shadow-sm">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 block mb-3">
            person
          </span>
          <p className="text-sm text-on-surface-variant font-medium">
            Select a contact to view details
          </p>
        </div>
      </div>
    )
  }

  const { name, title, company, email, phone } = selectedContact

  return (
    <div className="hidden xl:block w-80 sticky top-24 h-fit flex-shrink-0">
      <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
        {/* Gradient hero band */}
        <div className="relative h-32 hero-gradient">
          {/* Close button */}
          <button
            onClick={() => setSelectedContact(null)}
            className="absolute top-3 right-3 p-1.5 bg-surface-container-lowest/20 hover:bg-surface-container-lowest/40 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-on-primary text-sm">close</span>
          </button>

          {/* Avatar overlapping band */}
          <div className="absolute -bottom-10 left-6">
            <Avatar
              name={name}
              className="w-20 h-20 text-lg border-4 border-surface-container-lowest shadow-lg rounded-2xl"
            />
          </div>
        </div>

        {/* Body */}
        <div className="pt-14 p-6">
          {/* Name + company + more */}
          <div className="flex justify-between items-start mb-1">
            <div className="min-w-0">
              <h3 className="text-xl font-headline font-extrabold text-on-surface tracking-tight truncate">
                {name}
              </h3>
              <p className="text-sm font-medium text-primary truncate">{company}</p>
              <p className="text-xs text-on-surface-variant mt-0.5">{title}</p>
            </div>
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors flex-shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant text-xl">more_horiz</span>
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mb-6 mt-4">
            <button className="flex-1 py-2.5 bg-surface-container-high rounded-lg text-xs font-bold uppercase tracking-wider text-on-surface flex items-center justify-center gap-1.5 hover:bg-surface-container-highest transition-colors">
              <span className="material-symbols-outlined text-sm">mail</span>
              Email
            </button>
            <button className="flex-1 py-2.5 bg-surface-container-high rounded-lg text-xs font-bold uppercase tracking-wider text-on-surface flex items-center justify-center gap-1.5 hover:bg-surface-container-highest transition-colors">
              <span className="material-symbols-outlined text-sm">videocam</span>
              Meeting
            </button>
          </div>

          <div className="space-y-4">
            {/* Contact info */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-on-surface">
                <span className="material-symbols-outlined text-[15px] text-primary">mail</span>
                <span className="truncate">{email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-on-surface">
                <span className="material-symbols-outlined text-[15px] text-primary">call</span>
                <span>{phone}</span>
              </div>
            </div>

            {/* Bio & Insights */}
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">
                Bio &amp; Insights
              </p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {name.split(' ')[0]} leads strategic partnerships at {company}. Key decision maker for Q4 software budgets with a strong interest in AI-driven workflow optimization.
              </p>
            </div>

            {/* LTV + Probability mini KPIs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-container p-3 rounded-xl">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">
                  Lifetime Value
                </p>
                <p className="text-lg font-headline font-black text-on-surface">$245k</p>
              </div>
              <div className="bg-surface-container p-3 rounded-xl">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">
                  Probability
                </p>
                <p className="text-lg font-headline font-black text-tertiary">85%</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-surface-container-low p-4 rounded-xl">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-3">
                Recent Activity
              </p>
              <div className="space-y-3">
                {RECENT_ACTIVITY.map((a) => (
                  <div key={a.id} className="flex gap-3">
                    <div
                      className={cn(
                        'w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0',
                        a.active ? 'bg-primary' : 'bg-outline',
                      )}
                    />
                    <div>
                      <p className="text-xs font-bold text-on-surface">{a.text}</p>
                      <p className="text-[10px] text-on-surface-variant">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* View full profile */}
          <button className="w-full mt-5 py-3 bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-sm rounded-xl transition-colors">
            View Full Profile
          </button>
        </div>
      </div>
    </div>
  )
}
