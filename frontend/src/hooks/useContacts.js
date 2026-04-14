import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/services/api'

const KEY = 'contacts'

export function useContacts(filters = {}) {
  const params = {}
  if (filters.alpha && filters.alpha !== 'ALL') params.alpha = filters.alpha
  if (filters.search) params.search = filters.search
  if (filters.engagement) params.engagement = filters.engagement

  return useQuery({
    queryKey: [KEY, filters],
    queryFn: () => api.get('/contacts', { params }).then((r) => r.data),
  })
}

export function useCreateContact() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data) => api.post('/contacts', data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}

export function useUpdateContact() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }) => api.patch(`/contacts/${id}`, data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}

export function useDeleteContact() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => api.delete(`/contacts/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}
