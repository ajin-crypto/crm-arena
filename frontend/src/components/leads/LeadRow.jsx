import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'

const SOURCE_ICONS = {
  'Organic Search': 'public',
  'Referral':       'share',
  'Cold Outreach':  'mail',
  'Paid Ads':       'ads_click',
  'Webinar':        'groups',
  'Social Media':   'alternate_email',
  'LinkedIn':       'alternate_email',
}

export default function LeadRow({ lead, onClick }) {
  const { name, email, company, status, source, lastActivity } = lead

  return (
    <tr
      className="bg-surface-container-lowest hover:bg-primary-fixed/30 group transition-all cursor-default"
      onClick={() => onClick?.(lead)}
    >
      {/* Lead Name */}
      <td className="px-4 py-4 rounded-l-xl">
        <div className="flex items-center gap-3">
          <Avatar name={name} />
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-on-surface text-sm truncate">{name}</span>
            <span className="text-[11px] text-on-surface-variant truncate">{email}</span>
          </div>
        </div>
      </td>

      {/* Company */}
      <td className="px-4 py-4 font-medium text-on-surface text-sm whitespace-nowrap">
        {company}
      </td>

      {/* Status */}
      <td className="px-4 py-4">
        <Badge status={status} />
      </td>

      {/* Lead Source */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-2 text-on-surface-variant text-sm">
          <span className="material-symbols-outlined text-sm">
            {SOURCE_ICONS[source] ?? 'label'}
          </span>
          {source}
        </div>
      </td>

      {/* Last Activity */}
      <td className="px-4 py-4 text-on-surface-variant text-sm whitespace-nowrap">
        {lastActivity}
      </td>

      {/* Actions */}
      <td className="px-4 py-4 rounded-r-xl text-right">
        <button
          className="p-1.5 rounded-lg hover:bg-surface-container transition-colors opacity-0 group-hover:opacity-100"
          onClick={(e) => { e.stopPropagation() }}
          aria-label="More options"
        >
          <span className="material-symbols-outlined text-lg text-on-surface-variant">more_vert</span>
        </button>
      </td>
    </tr>
  )
}
