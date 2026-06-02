export type SegmentType = 'dynamic' | 'static' | 'uploaded';
export type SegmentState = 'used' | 'not-used';

export interface Segment {
  id: number;
  type: SegmentType;
  name: string;
  players: number;
  state: SegmentState;
  usage: string | null;
  creator: string;
  created: string;
  modified: string;
}

/* ---- Sample rows matching design reference ---- */
const SAMPLE: Segment[] = [
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
  {
    id: 228689804,
    type: 'dynamic',
    name: '01.03 Retention Elite',
    players: 1230,
    state: 'not-used',
    usage: null,
    creator: 'Admin-admin',
    created: '23-Jun-2025 09:00',
    modified: '23-Jun-2025 09:00',
  },
  {
    id: 228689881,
    type: 'static',
    name: '01.03 Retention Reg',
    players: 1200,
    state: 'not-used',
    usage: null,
    creator: 'super_admin',
    created: '11-Jun-2024 11:31',
    modified: '11-Jun-2024 11:31',
  },
  {
    id: 89779446,
    type: 'static',
    name: '01.03_Players_VIP',
    players: 1240,
    state: 'used',
    usage: '2 workflows',
    creator: 'test-user',
    created: '10-Jun-2024 09:30',
    modified: '10-Jun-2024 09:30',
  },
  {
    id: 456678464,
    type: 'uploaded',
    name: '01.04 Predictor Round 79',
    players: 939,
    state: 'not-used',
    usage: null,
    creator: 'super_admin',
    created: '09-Jun-2024 11:20',
    modified: '09-Jun-2024 11:20',
  },
  {
    id: 456678321,
    type: 'uploaded',
    name: '01.04_Losers_Slot',
    players: 821,
    state: 'used',
    usage: '4 workflows',
    creator: 'super_admin',
    created: '09-May-2024 09:36',
    modified: '09-May-2024 09:36',
  },
  {
    id: 454284283,
    type: 'dynamic',
    name: '01.04_Losers_Sport',
    players: 727,
    state: 'not-used',
    usage: null,
    creator: 'super_admin',
    created: '11-Mar-2024 10:00',
    modified: '11-Mar-2024 10:00',
  },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;
const CREATORS = ['System', 'super_admin', 'analyst_01', 'ops_team', 'marketing', 'data_bot'] as const;
const NAME_PREFIXES = [
  'VIP cohort', 'Retention', 'High value', 'Import batch',
  'Dormant players', 'Weekend actives', 'North region',
  'Test segment', 'Lifecycle', 'Reactivation',
] as const;

function pad2(n: number): string {
  return n.toString().padStart(2, '0');
}

function fmtDate(day: number, month: number, year: number, h: number, m: number): string {
  return `${pad2(day)}-${MONTHS[month - 1]}-${year} ${pad2(h)}:${pad2(m)}`;
}

function makeRow(i: number): Segment {
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
    created: fmtDate((i % 27) + 1, (i % 12) + 1, 2023 + (i % 2), 9 + (i % 8), (i * 7) % 60),
    modified: fmtDate(((i + 3) % 27) + 1, ((i + 5) % 12) + 1, 2026, 8 + (i % 10), (i * 11) % 60),
  };
}

function buildSegments(): Segment[] {
  const rows: Segment[] = SAMPLE.map(r => ({ ...r }));
  for (let i = rows.length; i < 100; i++) rows.push(makeRow(i));
  return rows;
}

export const SEGMENTS: Segment[] = buildSegments();

export function computeFooterStats(rows: readonly Segment[]): {
  staticPlayers: number;
  dynamicPlayers: number;
  uploadedPlayers: number;
} {
  let staticPlayers = 0, dynamicPlayers = 0, uploadedPlayers = 0;
  for (const r of rows) {
    if (r.type === 'static')        staticPlayers   += r.players;
    else if (r.type === 'dynamic')  dynamicPlayers  += r.players;
    else if (r.type === 'uploaded') uploadedPlayers += r.players;
  }
  return { staticPlayers, dynamicPlayers, uploadedPlayers };
}
