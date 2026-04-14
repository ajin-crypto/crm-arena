import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/services/api'

const KEY = 'pipeline'

export function usePipeline(stage) {
  const params = stage ? { stage } : {}
  return useQuery({
    queryKey: [KEY, stage],
    queryFn: () => api.get('/pipeline', { params }).then((r) => r.data),
  })
}

export function useCreateOpportunity() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data) => api.post('/pipeline', data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}

export function useUpdateOpportunity() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }) => api.patch(`/pipeline/${id}`, data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}

export function useMoveOpportunity() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, stage }) =>
      api.patch(`/pipeline/${id}/move`, null, { params: { stage } }).then((r) => r.data),
    // Optimistic: invalidate after server confirms
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}

export function useDeleteOpportunity() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => api.delete(`/pipeline/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}
