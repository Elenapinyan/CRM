import type { DropdownOption } from '@platform-workspace/design-system-v2';

import type { WorkflowRecurrence, WorkflowTimezoneMode } from '../workflow-builder.model';

export const WORKFLOW_RECURRENCE_OPTIONS: readonly DropdownOption[] = [
  { text: 'One time', value: 'once' },
  { text: 'Daily', value: 'daily' },
  { text: 'Weekly', value: 'weekly' },
  { text: 'Monthly', value: 'monthly' },
  { text: 'Annually', value: 'annually' },
  { text: 'Custom', value: 'custom' },
] as const;

export const WORKFLOW_RECURRENCE_LABELS: Record<WorkflowRecurrence, string> = {
  once: 'One time',
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  annually: 'Annually',
  custom: 'Custom',
};

export interface WorkflowTimezoneOption {
  id: WorkflowTimezoneMode;
  title: string;
  description: string;
}

export const WORKFLOW_TIMEZONE_OPTIONS: readonly WorkflowTimezoneOption[] = [
  {
    id: 'current',
    title: 'Current time zone GMT +2',
    description: 'Send exactly at the scheduled time in your current time zone',
  },
  {
    id: 'player',
    title: "Player's time zone",
    description: "Adjust send to match the player's local time zone",
  },
  {
    id: 'optimal',
    title: 'Optimal time for player',
    description: 'Send when past activity predicts the highest engagement',
  },
] as const;
