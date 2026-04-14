import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Leads     = lazy(() => import('@/pages/Leads'))
const Pipeline  = lazy(() => import('@/pages/Pipeline'))
const Contacts  = lazy(() => import('@/pages/Contacts'))
const Analytics = lazy(() => import('@/pages/Analytics'))

// Minimal skeleton shown during page-level code-split loading
function PageFallback() {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<PageFallback />}>
        <AppLayout />
      </Suspense>
    ),
    children: [
      { index: true,        element: <Dashboard /> },
      { path: 'leads',      element: <Leads /> },
      { path: 'pipeline',   element: <Pipeline /> },
      { path: 'contacts',   element: <Contacts /> },
      { path: 'analytics',  element: <Analytics /> },
    ],
  },
])

export default router
