import { create } from 'zustand'
import { PIPELINE_STAGES } from '@/constants/pipelineStages'

const initialColumns = PIPELINE_STAGES.reduce((acc, stage) => {
  acc[stage.id] = { ...stage, deals: [] }
  return acc
}, {})

export const usePipelineStore = create((set) => ({
  columns: initialColumns,
  activeId: null,

  setDeals: (stageId, deals) =>
    set((state) => ({
      columns: {
        ...state.columns,
        [stageId]: { ...state.columns[stageId], deals },
      },
    })),
  moveDeal: (dealId, fromStage, toStage) =>
    set((state) => {
      const from = state.columns[fromStage]
      const to = state.columns[toStage]
      const deal = from.deals.find((d) => d.id === dealId)
      if (!deal) return state
      return {
        columns: {
          ...state.columns,
          [fromStage]: { ...from, deals: from.deals.filter((d) => d.id !== dealId) },
          [toStage]: { ...to, deals: [...to.deals, { ...deal, stage: toStage }] },
        },
      }
    }),
  setActiveId: (id) => set({ activeId: id }),
}))
