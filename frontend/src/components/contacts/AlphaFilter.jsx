import { useContactsStore } from '@/store/useContactsStore'
import { cn } from '@/utils/cn'

const LETTERS = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')]

export default function AlphaFilter() {
  const { alphaFilter, setAlphaFilter, search, setSearch } = useContactsStore()

  return (
    <div className="grid grid-cols-12 gap-6 mb-8">
      {/* Search + alpha pills — 8 cols */}
      <div className="col-span-12 md:col-span-8 bg-surface-container-lowest p-4 rounded-xl flex items-center gap-4 shadow-sm">
        {/* Search input */}
        <div className="relative flex-1 min-w-0">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company, or email..."
            className="w-full bg-surface-container-low border-none rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-on-surface-variant/50"
          />
        </div>

        {/* Alphabet pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 flex-shrink-0">
          {LETTERS.map((letter) => (
            <button
              key={letter}
              onClick={() => setAlphaFilter(letter)}
              className={cn(
                'px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex-shrink-0',
                alphaFilter === letter
                  ? 'bg-primary-fixed text-on-primary-fixed font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container-high',
              )}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Stats panel — 4 cols */}
      <div className="col-span-12 md:col-span-4 bg-surface-container-lowest p-4 rounded-xl flex items-center justify-around shadow-sm">
        <div className="text-center">
          <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest mb-1">
            Active
          </p>
          <p className="text-2xl font-headline font-black text-on-surface">1,429</p>
        </div>
        <div className="h-10 w-px bg-outline-variant/30" />
        <div className="text-center">
          <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest mb-1">
            New Today
          </p>
          <div className="flex items-center gap-1 justify-center">
            <p className="text-2xl font-headline font-black text-on-surface">12</p>
            <span className="text-[10px] text-tertiary bg-tertiary-fixed px-1.5 py-0.5 rounded font-bold">
              +4%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
