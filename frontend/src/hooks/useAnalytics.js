import { useQuery } from '@tanstack/react-query'
import api from '@/services/api'

export function useAnalyticsSummary() {
  return useQuery({
    queryKey: ['analytics', 'summary'],
    queryFn: () => api.get('/analytics/summary').then((r) => r.data),
    staleTime: 60_000,   // analytics can stay fresh for 1 minute
  })
}

export function useLeadsFunnel() {
  return useQuery({
    queryKey: ['analytics', 'funnel'],
    queryFn: () => api.get('/analytics/leads/funnel').then((r) => r.data),
    staleTime: 60_000,
  })
}
