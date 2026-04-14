import { NavLink } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import { useLeadsStore } from '@/store/useLeadsStore'
import { NAV_ITEMS } from '@/constants/navigation'

export default function TopNav() {
  const { isDark, toggleTheme } = useAppStore()
  const openCreateModal = useLeadsStore((s) => s.openCreateModal)

  return (
    <header className="fixed top-0 w-full z-50 glass-header shadow-sm h-16 flex items-center justify-between px-6 lg:px-8">
      {/* Left: logo + desktop nav links */}
      <div className="flex items-center gap-8">
        <span className="text-xl font-black text-on-surface tracking-tighter font-headline select-none">
          CRM Arena
        </span>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                isActive
                  ? 'text-primary font-bold border-b-2 border-primary h-16 flex items-center px-3 font-headline text-sm transition-colors'
                  : 'text-on-surface-variant font-medium hover:bg-surface-container-low transition-colors px-3 py-1.5 rounded-lg text-sm'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Right: search + action icons + avatar */}
      <div className="flex items-center gap-3">
        {/* Search — hidden on small screens */}
        <div className="relative hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Global search..."
            className="pl-9 pr-4 py-2 bg-surface-container-highest border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-56 transition-all"
          />
        </div>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="p-2 hover:bg-surface-container-low rounded-full active:scale-95 transition-all text-on-surface-variant"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-surface-container-low rounded-full active:scale-95 transition-all text-on-surface-variant"
          aria-label="Toggle theme"
        >
          <span className="material-symbols-outlined text-[22px]">
            {isDark ? 'dark_mode' : 'light_mode'}
          </span>
        </button>

        {/* Settings */}
        <button
          aria-label="Settings"
          className="p-2 hover:bg-surface-container-low rounded-full active:scale-95 transition-all text-on-surface-variant"
        >
          <span className="material-symbols-outlined text-[22px]">settings</span>
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full border-2 border-primary-container bg-primary flex items-center justify-center">
          <span className="text-xs font-bold text-on-primary">AJ</span>
        </div>
      </div>
    </header>
  )
}
