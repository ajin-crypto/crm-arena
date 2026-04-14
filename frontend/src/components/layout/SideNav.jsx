import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '@/constants/navigation'
import { useLeadsStore } from '@/store/useLeadsStore'
import { cn } from '@/utils/cn'

export default function SideNav() {
  const openCreateModal = useLeadsStore((s) => s.openCreateModal)

  return (
    <aside className="hidden lg:flex h-screen w-64 fixed left-0 top-0 flex-col gap-2 p-4 pt-20 bg-surface-container-low z-40">
      {/* Section label */}
      <div className="px-4 mb-4">
        <h2 className="font-headline font-bold text-on-surface text-sm">Command Center</h2>
        <p className="text-xs text-on-surface-variant mt-0.5">Sales Intelligence</p>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 px-4 py-3 bg-surface-container-lowest text-primary rounded-lg shadow-sm font-bold transition-all text-sm'
                : 'flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-all group text-sm'
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={cn(
                    'material-symbols-outlined text-[20px]',
                    !isActive && 'group-hover:translate-x-1 transition-transform',
                  )}
                >
                  {item.icon}
                </span>
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Create New Lead CTA */}
      <div className="mt-auto px-2">
        <button
          onClick={openCreateModal}
          className="w-full hero-gradient text-on-primary font-headline font-semibold py-4 rounded-full flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform text-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Create New Lead
        </button>
      </div>
    </aside>
  )
}
