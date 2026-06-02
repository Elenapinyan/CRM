import { formatCrmListDate } from '../../shared/crm-list/crm-list-date.util';
import type { WorkflowFooterStats, WorkflowRow, WorkflowStatus, WorkflowType } from './workflows-list.model';

export const WORKFLOWS_LIST_TOTAL_ROWS = 100;

const CREATORS = ['System', 'super_admin', 'analyst_01', 'ops_team', 'marketing'] as const;

const NAME_PREFIXES = [
  'Retention ELITE',
  'VIP welcome',
  'Reactivation',
  'Birthday bonus',
  'Dormant win-back',
  'Weekend promo',
  'Lifecycle stage 2',
  'Churn prevention',
] as const;

const WORKFLOW_STATUSES: WorkflowStatus[] = [
  'in-progress',
  'completed',
  'scheduled',
  'draft',
  'paused',
  'canceled',
];
const WORKFLOW_TYPES: WorkflowType[] = ['trigger', 'scheduled', 'manual'];

export const WORKFLOWS_LIST_SAMPLE: WorkflowRow[] = [
  {
    id: 18492031,
    status: 'draft',
    name: '0.7.09 Retention ELITE',
    players: 1139,
    type: 'trigger',
    creator: 'System',
    created: '23-Aug-2024 11:11',
    modified: '20-Feb-2026 18:02',
  },
  {
    id: 18492030,
    status: 'in-progress',
    name: 'VIP welcome series',
    players: 420,
    type: 'trigger',
    creator: 'super_admin',
    created: '15-Jan-2024 09:30',
    modified: '12-Feb-2026 14:22',
  },
  {
    id: 18491002,
    status: 'scheduled',
    name: 'Weekend actives push',
    players: 612,
    type: 'scheduled',
    creator: 'marketing',
    created: '02-Dec-2023 16:45',
    modified: '01-Feb-2026 08:10',
  },
  {
    id: 18490555,
    status: 'paused',
    name: 'North region test',
    players: 700,
    type: 'manual',
    creator: 'analyst_01',
    created: '10-Jun-2024 13:00',
    modified: '19-Feb-2026 19:45',
  },
  {
    id: 18490500,
    status: 'completed',
    name: 'Lifecycle wrap-up',
    players: 903,
    type: 'trigger',
    creator: 'System',
    created: '01-Mar-2024 10:00',
    modified: '18-Feb-2026 09:15',
  },
  {
    id: 18490499,
    status: 'canceled',
    name: 'Legacy promo sunset',
    players: 98,
    type: 'manual',
    creator: 'ops_team',
    created: '12-Nov-2023 14:20',
    modified: '05-Jan-2026 11:30',
  },
];

function workflowRowForIndex(i: number): WorkflowRow {
  const status = WORKFLOW_STATUSES[i % WORKFLOW_STATUSES.length];
  const type = WORKFLOW_TYPES[i % WORKFLOW_TYPES.length];
  const players = 40 + ((i * 41) % 1200);
  return {
    id: 18_000_000 + i * 6121,
    status,
    name: `${NAME_PREFIXES[i % NAME_PREFIXES.length]} ${i + 1}`,
    players,
    type,
    creator: CREATORS[i % CREATORS.length],
    created: formatCrmListDate((i % 27) + 1, (i % 12) + 1, 2023 + (i % 2), 9 + (i % 8), (i * 7) % 60),
    modified: formatCrmListDate(((i + 3) % 27) + 1, ((i + 5) % 12) + 1, 2026, 8 + (i % 10), (i * 11) % 60),
  };
}

export function buildWorkflowRowsList(): WorkflowRow[] {
  const rows: WorkflowRow[] = WORKFLOWS_LIST_SAMPLE.map((r) => ({ ...r }));
  for (let i = rows.length; i < WORKFLOWS_LIST_TOTAL_ROWS; i++) {
    rows.push(workflowRowForIndex(i));
  }
  return rows;
}

export function computeWorkflowFooterStats(rows: readonly WorkflowRow[]): WorkflowFooterStats {
  const stats: WorkflowFooterStats = {
    draft: 0,
    'in-progress': 0,
    scheduled: 0,
    completed: 0,
    paused: 0,
    canceled: 0,
  };
  for (const r of rows) {
    stats[r.status]++;
  }
  return stats;
}
