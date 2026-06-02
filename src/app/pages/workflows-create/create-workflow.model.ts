export interface CreateWorkflowResult {
  name: string;
  description: string;
}

export interface NewWorkflowDraft {
  name: string;
  description: string;
  createdAt: Date;
}

export function formatWorkflowCreatedLabel(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}
