import { formatCrmListDate } from '../../shared/crm-list/crm-list-date.util';
import type { CohortRow } from './cohorts-list.model';

export const COHORTS_LIST_TOTAL_ROWS = 24;

const CREATORS = ['System', 'super_admin', 'marketing', 'analyst_01'] as const;

const SAMPLE: CohortRow[] = [
  {
    id: 12045001,
    name: 'First deposit retention',
    description: 'Players who made a first deposit and returned within 7 days.',
    creator: 'System',
    created: '12-Jan-2024 10:15',
    modified: '18-May-2026 14:02',
  },
  {
    id: 12044988,
    name: 'VIP reactivation Q1',
    description: 'High-value players re-engaged after 30 days inactive.',
    creator: 'marketing',
    created: '03-Mar-2024 16:40',
    modified: '17-May-2026 09:22',
  },
  {
    id: 12044102,
    name: 'Registration to bet',
    description: 'Conversion from sign-up to first real-money bet.',
    creator: 'analyst_01',
    created: '22-Nov-2023 08:05',
    modified: '10-Apr-2026 11:48',
  },
];

const NAMES = [
  'Weekend deposit cohort',
  'Sports bettors week 1',
  'Casino onboarding funnel',
  'Churn win-back test',
  'Bonus activation path',
] as const;

export function buildCohortRowsList(): CohortRow[] {
  const rows: CohortRow[] = SAMPLE.map((r) => ({ ...r }));
  for (let i = rows.length; i < COHORTS_LIST_TOTAL_ROWS; i++) {
    const baseName = NAMES[i % NAMES.length];
    rows.push({
      id: 12_000_000 + i * 4099,
      name: `${baseName} ${i + 1}`,
      description: `Cohort analysis for ${baseName.toLowerCase()} — prototype data.`,
      creator: CREATORS[i % CREATORS.length],
      created: formatCrmListDate((i % 27) + 1, (i % 12) + 1, 2023 + (i % 2), 9 + (i % 8), (i * 5) % 60),
      modified: formatCrmListDate(((i + 2) % 27) + 1, ((i + 4) % 12) + 1, 2026, 10 + (i % 8), (i * 9) % 60),
    });
  }
  return rows;
}
