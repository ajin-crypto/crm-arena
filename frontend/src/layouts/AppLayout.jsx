import { Outlet } from 'react-router-dom'
import TopNav from '@/components/layout/TopNav'
import SideNav from '@/components/layout/SideNav'
import BottomNav from '@/components/layout/BottomNav'

export default function AppLayout() {
  return (
    <div className="bg-surface min-h-screen font-body text-on-surface">
      <TopNav />
      <SideNav />
      <main className="lg:ml-64 pt-16 pb-20 md:pb-0 min-h-screen">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
