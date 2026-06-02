export interface CreateCohortResult {
  name: string;
  description: string;
}

export interface NewCohortDraft {
  name: string;
  description: string;
  createdAt: Date;
}

export function formatCohortCreatedLabel(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}
