import { format, formatDistanceToNow } from 'date-fns'

export function formatDate(date, pattern = 'MMM d, yyyy') {
  return format(new Date(date), pattern)
}

export function timeAgo(date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}
