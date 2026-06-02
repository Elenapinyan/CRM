export type WorkflowNodeType = 'segment' | 'trigger' | 'bonus' | 'exit';

export const WORKFLOW_EXIT_NODE_ID = '__workflow_exit__';

export type WorkflowBuilderTabId = 'builder' | 'analytics' | 'players' | 'logs';

export type WorkflowSettingsTabId = 'scheduler' | 'frequency' | 'goal' | 'limits';

export interface WorkflowNodeData {
  label: string;
  segmentName?: string;
  triggerName?: string;
  bonusId?: string;
  bonusName?: string;
}

export interface WorkflowBonusOption {
  id: string;
  name: string;
  type: string;
  status: string;
}

export type WorkflowTimezoneMode = 'current' | 'player' | 'optimal';

export type WorkflowRecurrence = 'once' | 'daily' | 'weekly' | 'monthly' | 'annually' | 'custom';

export interface WorkflowSchedulerSettings {
  timezoneMode: WorkflowTimezoneMode;
  startDateTime: Date | null;
  endDateTime: Date | null;
  startsImmediately: boolean;
  recurrence: WorkflowRecurrence;
}

export interface WorkflowFrequencySettings {
  pattern: WorkflowRecurrence;
  interval: number;
}

export interface WorkflowGoalSettings {
  metric: string;
  target: number;
}

export interface WorkflowLimitsSettings {
  maxPlayers: number;
  maxRuns: number;
}

export interface WorkflowSettings {
  scheduler: WorkflowSchedulerSettings;
  frequency: WorkflowFrequencySettings;
  goal: WorkflowGoalSettings;
  limits: WorkflowLimitsSettings;
}

export const WORKFLOW_BUILDER_TABS: readonly {
  id: WorkflowBuilderTabId;
  label: string;
}[] = [
  { id: 'builder', label: 'Builder' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'players', label: 'Players' },
  { id: 'logs', label: 'Logs' },
];

export const WORKFLOW_SETTINGS_TABS: readonly {
  id: WorkflowSettingsTabId;
  label: string;
}[] = [
  { id: 'scheduler', label: 'Scheduler' },
  { id: 'frequency', label: 'Frequency' },
  { id: 'goal', label: 'Goal' },
  { id: 'limits', label: 'Limits' },
];

export const WORKFLOW_PALETTE_DRAG_TYPE = 'application/x-workflow-node-type';

export const DEFAULT_WORKFLOW_SETTINGS: WorkflowSettings = {
  scheduler: {
    timezoneMode: 'current',
    startDateTime: null,
    endDateTime: null,
    startsImmediately: false,
    recurrence: 'once',
  },
  frequency: {
    pattern: 'once',
    interval: 1,
  },
  goal: {
    metric: 'conversion',
    target: 0,
  },
  limits: {
    maxPlayers: 10000,
    maxRuns: 1,
  },
};
