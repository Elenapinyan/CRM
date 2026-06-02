import type { WorkflowBonusOption } from './workflow-builder.model';

export const WORKFLOW_BONUS_OPTIONS: readonly WorkflowBonusOption[] = [
  { id: 'bonus-101', name: 'Welcome deposit 100%', type: 'Deposit', status: 'Active' },
  { id: 'bonus-102', name: 'Free spins Friday', type: 'Free spins', status: 'Active' },
  { id: 'bonus-103', name: 'Cashback weekend', type: 'Cashback', status: 'Scheduled' },
  { id: 'bonus-104', name: 'VIP reload 50%', type: 'Deposit', status: 'Active' },
  { id: 'bonus-105', name: 'Birthday bonus', type: 'Custom', status: 'Draft' },
];
