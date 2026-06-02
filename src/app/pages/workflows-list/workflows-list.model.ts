export type WorkflowStatus = 'draft' | 'in-progress' | 'scheduled' | 'completed' | 'paused' | 'canceled';

export type WorkflowType = 'trigger' | 'scheduled' | 'manual';

export interface WorkflowRow {
  id: number;
  status: WorkflowStatus;
  name: string;
  players: number;
  type: WorkflowType;
  creator: string;
  created: string;
  modified: string;
}

export interface WorkflowFooterStats {
  draft: number;
  'in-progress': number;
  scheduled: number;
  completed: number;
  paused: number;
  canceled: number;
}
