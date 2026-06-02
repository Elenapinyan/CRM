import type { SegmentRow, SegmentState, SegmentType } from './segments-list.model';

/** First rows match the design reference; the list is extended to {@link SEGMENTS_LIST_TOTAL_ROWS}. */
export const SEGMENTS_LIST_SAMPLE: SegmentRow[] = [
  {
    id: 25356742,
    type: 'dynamic',
    name: '0.7.09 Retention ELITE',
    players: 1139,
    state: 'used',
    usage: '1 workflow',
    creator: 'System',
    created: '23-Aug-2024 11:11',
    modified: '20-Feb-2026 18:02',
  },
  {
    id: 25356741,
    type: 'static',
    name: 'VIP cohort Q1',
    players: 420,
    state: 'used',
    usage: '4 workflows',
    creator: 'super_admin',
    created: '15-Jan-2024 09:30',
    modified: '12-Feb-2026 14:22',
  },
  {
    id: 25356001,
    type: 'uploaded',
    name: 'Import batch 12',
    players: 612,
    state: 'not-used',
    usage: null,
    creator: 'super_admin',
    created: '02-Dec-2023 16:45',
    modified: '01-Feb-2026 08:10',
  },
  {
    id: 25110088,
    type: 'dynamic',
    name: 'High value — last 30d',
    players: 700,
    state: 'used',
    usage: '2 workflows',
    creator: 'System',
    created: '10-Jun-2024 13:00',
    modified: '19-Feb-2026 19:45',
  },
];

export const SEGMENTS_LIST_PAGE_SIZE = 20;

export const SEGMENTS_LIST_TOTAL_ROWS = 100;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

const CREATORS = ['System', 'super_admin', 'analyst_01', 'ops_team', 'marketing', 'data_bot'] as const;

const NAME_PREFIXES = [
  'VIP cohort',
  'Retention',
  'High value',
  'Import batch',
  'Dormant players',
  'Weekend actives',
  'North region',
  'Test segment',
  'Lifecycle',
  'Reactivation',
] as const;

function pad2(n: number): string {
  return n.toString().padStart(2, '0');
}

function formatSegmentDate(day: number, month: number, year: number, hour: number, minute: number): string {
  return `${pad2(day)}-${MONTHS[month - 1]}-${year} ${pad2(hour)}:${pad2(minute)}`;
}

function segmentRowForIndex(i: number): SegmentRow {
  const types: SegmentType[] = ['dynamic', 'static', 'uploaded'];
  const type = types[i % types.length];
  const state: SegmentState = i % 4 === 0 ? 'not-used' : 'used';
  const players = 20 + ((i * 37) % 95);
  const wf = (i % 5) + 1;
  return {
    id: 25_000_000 + i * 7919,
    type,
    name: `${NAME_PREFIXES[i % NAME_PREFIXES.length]} ${i + 1}`,
    players,
    state,
    usage: state === 'used' ? `${wf} workflow${wf === 1 ? '' : 's'}` : null,
    creator: CREATORS[i % CREATORS.length],
    created: formatSegmentDate((i % 27) + 1, (i % 12) + 1, 2023 + (i % 2), 9 + (i % 8), (i * 7) % 60),
    modified: formatSegmentDate(((i + 3) % 27) + 1, ((i + 5) % 12) + 1, 2026, 8 + (i % 10), (i * 11) % 60),
  };
}

/** Full catalog (100 rows): design samples first, then generated rows. */
export function buildSegmentRowsList(): SegmentRow[] {
  const rows: SegmentRow[] = SEGMENTS_LIST_SAMPLE.map((r) => ({ ...r }));
  for (let i = rows.length; i < SEGMENTS_LIST_TOTAL_ROWS; i++) {
    rows.push(segmentRowForIndex(i));
  }
  return rows;
}

export function computeSegmentsFooterStats(rows: readonly SegmentRow[]): {
  staticPlayers: number;
  dynamicPlayers: number;
  uploadedPlayers: number;
} {
  let staticPlayers = 0;
  let dynamicPlayers = 0;
  let uploadedPlayers = 0;
  for (const r of rows) {
    if (r.type === 'static') {
      staticPlayers += r.players;
    } else if (r.type === 'dynamic') {
      dynamicPlayers += r.players;
    } else if (r.type === 'uploaded') {
      uploadedPlayers += r.players;
    }
  }
  return { staticPlayers, dynamicPlayers, uploadedPlayers };
}
