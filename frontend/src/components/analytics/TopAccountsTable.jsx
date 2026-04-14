import { cn } from '@/utils/cn'

const ACCOUNTS = [
  {
    name: 'Astra Global Systems',
    initial: 'A',
    owner: 'Sarah Jenkins',
    value: '$245,000',
    status: 'Closed Won',
    statusStyle: 'bg-tertiary/10 text-tertiary',
    lastTouch: '2 hours ago',
  },
  {
    name: 'Vortex Media',
    initial: 'V',
    owner: 'Mark Thompson',
    value: '$182,500',
    status: 'Negotiation',
    statusStyle: 'bg-primary/10 text-primary',
    lastTouch: 'Yesterday',
  },
  {
    name: 'Luminar Logistics',
    initial: 'L',
    owner: 'Sarah Jenkins',
    value: '$125,000',
    status: 'Proposal Sent',
    statusStyle: 'bg-primary/10 text-primary',
    lastTouch: '3 days ago',
  },
  {
    name: 'Nexus Financial',
    initial: 'N',
    owner: 'James Park',
    value: '$98,000',
    status: 'Negotiation',
    statusStyle: 'bg-primary/10 text-primary',
    lastTouch: '5 days ago',
  },
  {
    name: 'Orion Health Systems',
    initial: 'O',
    owner: 'Mark Thompson',
    value: '$72,500',
    status: 'Closed Won',
    statusStyle: 'bg-tertiary/10 text-tertiary',
    lastTouch: '1 week ago',
  },
]

export default function TopAccountsTable() {
  return (
    <div className="mt-12 bg-surface-container-lowest p-8 rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-headline font-bold text-on-surface">Top Performing Accounts</h3>
        <button className="px-4 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-sm font-medium transition-colors text-on-surface">
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-1">
          <thead>
            <tr className="bg-surface-container-low">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant rounded-l-lg">
                Account Name
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Owner
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant text-right">
                Deal Value
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant rounded-r-lg">
                Last Touch
              </th>
            </tr>
          </thead>
          <tbody>
            {ACCOUNTS.map((acct) => (
              <tr
                key={acct.name}
                className="group hover:bg-primary-fixed/30 transition-all"
              >
                <td className="px-6 py-4 rounded-l-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                      {acct.initial}
                    </div>
                    <span className="text-sm font-bold text-on-surface">{acct.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-on-surface-variant font-medium">
                  {acct.owner}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-right text-on-surface">
                  {acct.value}
                </td>
                <td className="px-6 py-4">
                  <span className={cn('px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-tight', acct.statusStyle)}>
                    {acct.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-on-surface-variant rounded-r-lg">
                  {acct.lastTouch}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
