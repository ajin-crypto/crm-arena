import { NavLink } from 'react-router-dom'
import { useLeadsStore } from '@/store/useLeadsStore'
import { cn } from '@/utils/cn'

const BOTTOM_NAV = [
  { label: 'Home',      path: '/',          icon: 'dashboard',     end: true },
  { label: 'Leads',     path: '/leads',     icon: 'person_search', end: false },
  { label: 'Pipeline',  path: '/pipeline',  icon: 'view_kanban',   end: false, center: true },
  { label: 'Contacts',  path: '/contacts',  icon: 'contacts',      end: false },
  { label: 'Analytics', path: '/analytics', icon: 'bar_chart',     end: false },
]

export default function BottomNav() {
  const openCreateModal = useLeadsStore((s) => s.openCreateModal)

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-sm border-t border-outline-variant/20 flex items-center justify-around px-2 h-16 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
      {BOTTOM_NAV.map((item) => {
        if (item.center) {
          return (
            <button
              key={item.path}
              onClick={openCreateModal}
              className="relative -mt-8 w-14 h-14 hero-gradient rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
              aria-label="Create New Lead"
            >
              <span className="material-symbols-outlined text-on-primary text-[24px]">add</span>
            </button>
          )
        }
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors text-[10px] font-semibold',
                isActive ? 'text-primary' : 'text-on-surface-variant',
              )
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                {item.label}
              </>
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}
