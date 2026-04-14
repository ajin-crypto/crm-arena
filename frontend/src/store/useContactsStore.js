import { create } from 'zustand'

export const useContactsStore = create((set) => ({
  contacts: [],
  selectedContact: null,
  alphaFilter: 'ALL',
  search: '',

  setContacts: (contacts) => set({ contacts }),
  setSelectedContact: (contact) => set({ selectedContact: contact }),
  setAlphaFilter: (letter) => set({ alphaFilter: letter }),
  setSearch: (search) => set({ search }),
}))
