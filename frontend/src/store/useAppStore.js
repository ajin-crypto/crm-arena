import { create } from 'zustand'

const THEME_KEY = 'crm-theme'

// Apply theme to <html> and persist to localStorage
function applyTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark)
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
}

// Read persisted theme on init; fall back to system preference
const storedTheme = localStorage.getItem(THEME_KEY)
const initDark =
  storedTheme != null
    ? storedTheme === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches

applyTheme(initDark)

export const useAppStore = create((set) => ({
  isDark: initDark,
  toggleTheme: () =>
    set((state) => {
      const next = !state.isDark
      applyTheme(next)
      return { isDark: next }
    }),
}))
