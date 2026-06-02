import { formatCrmListDate } from '../../shared/crm-list/crm-list-date.util';
import type {
  CommunicationFooterStats,
  CommunicationTemplateRow,
  TemplateChannel,
  TemplateState,
} from './communication-list.model';

export const COMMUNICATION_LIST_TOTAL_ROWS = 100;

const CREATORS = ['System', 'super_admin', 'marketing', 'ops_team', 'analyst_01'] as const;

const NAME_PREFIXES = [
  'Welcome email',
  'VIP SMS',
  'Push re-engagement',
  'In-app banner',
  'Chat greeting',
  'Retention offer',
  'Password reset',
  'Bonus reminder',
] as const;

const CHANNELS: TemplateChannel[] = ['email', 'sms', 'push', 'in-app', 'chat'];

export const COMMUNICATION_LIST_SAMPLE: CommunicationTemplateRow[] = [
  {
    id: 91023456,
    type: 'email',
    name: '0.7.09 Retention ELITE',
    state: 'active',
    usage: '3 workflows',
    creator: 'System',
    created: '23-Aug-2024 11:11',
    modified: '20-Feb-2026 18:02',
  },
  {
    id: 91023455,
    type: 'sms',
    name: 'VIP welcome SMS',
    state: 'active',
    usage: '1 workflow',
    creator: 'marketing',
    created: '15-Jan-2024 09:30',
    modified: '12-Feb-2026 14:22',
  },
  {
    id: 91022001,
    type: 'push',
    name: 'Weekend promo push',
    state: 'inactive',
    usage: null,
    creator: 'super_admin',
    created: '02-Dec-2023 16:45',
    modified: '01-Feb-2026 08:10',
  },
  {
    id: 91021088,
    type: 'in-app',
    name: 'Lifecycle banner v2',
    state: 'active',
    usage: '2 workflows',
    creator: 'ops_team',
    created: '10-Jun-2024 13:00',
    modified: '19-Feb-2026 19:45',
  },
];

function templateRowForIndex(i: number): CommunicationTemplateRow {
  const type = CHANNELS[i % CHANNELS.length];
  const state: TemplateState = i % 5 === 0 ? 'inactive' : 'active';
  const wf = (i % 4) + 1;
  return {
    id: 91_000_000 + i * 5237,
    type,
    name: `${NAME_PREFIXES[i % NAME_PREFIXES.length]} ${i + 1}`,
    state,
    usage: state === 'active' ? `${wf} workflow${wf === 1 ? '' : 's'}` : null,
    creator: CREATORS[i % CREATORS.length],
    created: formatCrmListDate((i % 27) + 1, (i % 12) + 1, 2023 + (i % 2), 9 + (i % 8), (i * 7) % 60),
    modified: formatCrmListDate(((i + 3) % 27) + 1, ((i + 5) % 12) + 1, 2026, 8 + (i % 10), (i * 11) % 60),
  };
}

export function buildCommunicationRowsList(): CommunicationTemplateRow[] {
  const rows: CommunicationTemplateRow[] = COMMUNICATION_LIST_SAMPLE.map((r) => ({ ...r }));
  for (let i = rows.length; i < COMMUNICATION_LIST_TOTAL_ROWS; i++) {
    rows.push(templateRowForIndex(i));
  }
  return rows;
}

export function computeCommunicationFooterStats(rows: readonly CommunicationTemplateRow[]): CommunicationFooterStats {
  const stats: CommunicationFooterStats = { email: 0, sms: 0, push: 0, 'in-app': 0, chat: 0, telegram: 0 };
  for (const r of rows) {
    stats[r.type]++;
  }
  return stats;
}
