import { useContactsStore } from '@/store/useContactsStore'
import Avatar from '@/components/ui/Avatar'
import { cn } from '@/utils/cn'

const ENGAGEMENT_STYLES = {
  Warm:    'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  Engaged: 'bg-secondary-container text-on-secondary-container',
  Stalled: 'bg-error-container text-on-error-container',
}

export default function ContactRow({ contact }) {
  const setSelectedContact = useContactsStore((s) => s.setSelectedContact)
  const selectedContact = useContactsStore((s) => s.selectedContact)
  const isSelected = selectedContact?.id === contact.id

  const { name, title, company, companyType, email, phone, lastTouch, engagement, online } = contact

  return (
    <div
      onClick={() => setSelectedContact(isSelected ? null : contact)}
      className={cn(
        'grid grid-cols-12 items-center px-6 py-4 rounded-xl transition-all cursor-pointer',
        isSelected
          ? 'bg-primary-fixed/40'
          : 'bg-surface-container-lowest hover:bg-primary-fixed/30',
      )}
    >
      {/* Col 1-4: Avatar + name + title */}
      <div className="col-span-4 flex items-center gap-4 min-w-0">
        <div className="relative flex-shrink-0">
          <Avatar name={name} size="lg" className="w-12 h-12 text-sm" />
          {/* Online status dot */}
          <div
            className={cn(
              'absolute bottom-0 right-0 w-3 h-3 border-2 border-surface-container-lowest rounded-full',
              online ? 'bg-tertiary' : 'bg-outline-variant',
            )}
          />
        </div>
        <div className="min-w-0">
          <p className="font-headline font-bold text-on-surface text-sm truncate">{name}</p>
          <p className="text-xs text-on-surface-variant truncate">{title}</p>
        </div>
      </div>

      {/* Col 5-7: Company + type */}
      <div className="col-span-3 min-w-0">
        <p className="text-sm font-semibold text-on-surface truncate">{company}</p>
        <p className="text-xs text-on-surface-variant truncate">{companyType}</p>
      </div>

      {/* Col 8-10: Email + phone */}
      <div className="col-span-3 min-w-0">
        <div className="flex items-center gap-2 text-xs text-on-surface mb-1">
          <span className="material-symbols-outlined text-[16px] text-primary flex-shrink-0">mail</span>
          <span className="truncate">{email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-on-surface">
          <span className="material-symbols-outlined text-[16px] text-primary flex-shrink-0">call</span>
          <span className="truncate">{phone}</span>
        </div>
      </div>

      {/* Col 11-12: Last touch + engagement badge */}
      <div className="col-span-2 text-right">
        <p className="text-xs font-bold text-on-surface">{lastTouch}</p>
        <span
          className={cn(
            'inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full uppercase',
            ENGAGEMENT_STYLES[engagement] ?? 'bg-surface-container-high text-on-surface-variant',
          )}
        >
          {engagement}
        </span>
      </div>
    </div>
  )
}
