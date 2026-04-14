// Maps lead status strings to Tailwind class combinations
export const LEAD_STATUS_STYLES = {
  NEW:        'bg-primary/10 text-primary',
  CONTACTED:  'bg-on-surface-variant/10 text-on-surface-variant',
  QUALIFIED:  'bg-tertiary/10 text-tertiary',
  LOST:       'bg-error/10 text-error',
}

export const LEAD_STATUSES = Object.keys(LEAD_STATUS_STYLES)
