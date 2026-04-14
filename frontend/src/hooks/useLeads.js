import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/services/api'

const KEY = 'leads'

// ─── Queries ─────────────────────────────────────────────────────────────────

export function useLeads(filters = {}) {
  const params = {}
  if (filters.status && filters.status !== 'ALL') params.status = filters.status
  if (filters.owner && filters.owner !== 'ALL') params.owner = filters.owner

  return useQuery({
    queryKey: [KEY, filters],
    queryFn: () => api.get('/leads', { params }).then((r) => r.data),
  })
}

export function useLead(id) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => api.get(`/leads/${id}`).then((r) => r.data),
    enabled: !!id,
  })
}

// ─── Mutations ───────────────────────────────────────────────────────────────

export function useCreateLead() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data) => api.post('/leads', data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}

export function useUpdateLead() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }) => api.patch(`/leads/${id}`, data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}

export function useDeleteLead() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => api.delete(`/leads/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}
