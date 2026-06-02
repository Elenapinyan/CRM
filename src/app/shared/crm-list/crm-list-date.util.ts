const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

function pad2(n: number): string {
  return n.toString().padStart(2, '0');
}

export function formatCrmListDate(day: number, month: number, year: number, hour: number, minute: number): string {
  return `${pad2(day)}-${MONTHS[month - 1]}-${year} ${pad2(hour)}:${pad2(minute)}`;
}

export function formatCrmListPageRefreshedAt(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}
