const ACTIVITIES = [
  {
    id: 1,
    type: 'closed',
    icon: 'check_circle',
    iconBg: 'bg-tertiary/10',
    iconColor: 'text-tertiary',
    title: 'Deal Closed',
    body: 'Project Aurora with TechNova Systems',
    meta: '2 hours ago',
    tag: '+$125,000',
    tagColor: 'text-tertiary',
  },
  {
    id: 2,
    type: 'lead',
    icon: 'person_add',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    title: 'New Lead',
    body: 'Sarah Connor from CyberDyne',
    meta: '4 hours ago · Assigned to Mike Ross',
  },
  {
    id: 3,
    type: 'meeting',
    icon: 'mail',
    iconBg: 'bg-secondary-container',
    iconColor: 'text-secondary',
    title: 'Meeting Scheduled',
    body: 'Proposal review with Global Logix',
    meta: 'Tomorrow at 10:00 AM',
  },
  {
    id: 4,
    type: 'risk',
    icon: 'warning',
    iconBg: 'bg-error-container',
    iconColor: 'text-error',
    title: 'Deal At Risk',
    body: 'Orion Corp (No contact in 15 days)',
    meta: 'Yesterday · High Priority',
  },
]

export default function ActivityFeed() {
  return (
    <div className="bg-surface-container-low rounded-full p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-headline font-bold text-xl text-on-surface">Recent Activity</h3>
        <button className="text-primary text-sm font-bold hover:underline">View All</button>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {ACTIVITIES.map((a) => (
          <div key={a.id} className="flex gap-4">
            {/* Icon circle */}
            <div
              className={`w-10 h-10 rounded-full ${a.iconBg} flex items-center justify-center flex-shrink-0`}
            >
              <span className={`material-symbols-outlined ${a.iconColor} text-xl`}>
                {a.icon}
              </span>
            </div>

            {/* Content */}
            <div className="min-w-0">
              <p className="text-sm font-medium text-on-surface leading-snug">
                <span className="font-bold">{a.title}:</span>{' '}
                <span className="text-on-surface-variant">{a.body}</span>
              </p>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <p className="text-xs text-on-surface-variant">{a.meta}</p>
                {a.tag && (
                  <span className={`text-xs font-bold ${a.tagColor}`}>{a.tag}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
