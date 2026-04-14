import { create } from 'zustand'

export const useLeadsStore = create((set) => ({
  leads: [],
  filters: { status: 'ALL', owner: 'ALL', search: '' },
  selectedLead: null,
  isCreateModalOpen: false,

  setLeads: (leads) => set({ leads }),
  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),
  setSelectedLead: (lead) => set({ selectedLead: lead }),
  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false }),
}))
