export type NetDepositDetailsTab = 'deposits' | 'withdrawals';

export type NetDepositSummaryMetric = {
  label: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
  markerClass: 'deposits' | 'withdrawals' | 'net-deposit';
};

export type NetDepositDepositRow = {
  id: string;
  username: string;
  lastDepositDate: string;
  depositsCount: number;
  totalDepositEur: number;
  avgDepositEur: number;
};

export type NetDepositWithdrawalRow = {
  id: string;
  username: string;
  lastDepositDate: string;
  totalWithdrawalEur: number;
};

const DEPOSIT_USERNAMES = [
  'asmith',
  'bjohnson',
  'cwilliams',
  'dbrown',
  'edavis',
  'fmiller',
  'gmoore',
  'htaylor',
  'ijackson',
  'kwhite',
  'lthomas',
  'mharris',
  'nclark',
] as const;

const WITHDRAWAL_USERNAMES = [
  'asmith',
  'bjohnson',
  'cwilliams',
  'dbrown',
  'edavis',
  'fmiller',
  'gmoore',
  'htaylor',
  'ijackson',
  'kwhite',
  'lthomas',
  'mharris',
  'nclark',
] as const;

const DEPOSIT_IDS = [
  '456678321',
  '25356742',
  '228689804',
  '228689881',
  '6121552801',
  '89779446',
  '6121552801',
  '456678464',
  '6121552801',
  '6121552801',
  '456678321',
  '25356742',
  '228689804',
] as const;

function formatDepositDate(dayOffset: number): string {
  const day = String(Math.min(27, 1 + dayOffset)).padStart(2, '0');

  return `01-Jan-2026 ${day === '01' ? '09' : '10'}:${String((dayOffset * 3) % 60).padStart(2, '0')}`;
}

function seededRandom(seed: number): () => number {
  let state = seed >>> 0;

  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
}

function formatEuroSummary(value: number): string {
  return `€${value.toLocaleString('en-US')}`;
}

function formatDeltaPct(rng: () => number, positive: boolean): string {
  const pct = (rng() * 18 + 0.4).toFixed(1);
  return `${positive ? '+' : '-'}${pct}%`;
}

/** Randomized summary totals for the selected date range (prototype). */
export function buildNetDepositSummaryMetrics(seed: number): NetDepositSummaryMetric[] {
  const rng = seededRandom(seed);
  const deposits = Math.round(28_000 + rng() * 38_000);
  const withdrawals = Math.round(18_000 + rng() * 22_000);
  const net = deposits - withdrawals;
  const depositsDeltaPositive = rng() > 0.25;
  const withdrawalsDeltaPositive = rng() < 0.45;
  const netDeltaPositive = net >= 0 ? rng() > 0.2 : rng() < 0.35;

  return [
    {
      label: 'Deposits',
      value: formatEuroSummary(deposits),
      delta: formatDeltaPct(rng, depositsDeltaPositive),
      deltaPositive: depositsDeltaPositive,
      markerClass: 'deposits',
    },
    {
      label: 'Withdrawals',
      value: formatEuroSummary(withdrawals),
      delta: formatDeltaPct(rng, withdrawalsDeltaPositive),
      deltaPositive: withdrawalsDeltaPositive,
      markerClass: 'withdrawals',
    },
    {
      label: 'Net deposit',
      value: formatEuroSummary(net),
      delta: formatDeltaPct(rng, netDeltaPositive),
      deltaPositive: netDeltaPositive,
      markerClass: 'net-deposit',
    },
  ];
}

export const NET_DEPOSIT_EXPAND_SUMMARY: readonly NetDepositSummaryMetric[] = [
  {
    label: 'Deposits',
    value: '€45,200',
    delta: '+12.4%',
    deltaPositive: true,
    markerClass: 'deposits',
  },
  {
    label: 'Withdrawals',
    value: '€28,800',
    delta: '-8.2%',
    deltaPositive: false,
    markerClass: 'withdrawals',
  },
  {
    label: 'Net deposit',
    value: '€13,100',
    delta: '+12.4%',
    deltaPositive: true,
    markerClass: 'net-deposit',
  },
];

export const NET_DEPOSIT_EXPAND_DATE_RANGE_LABEL = '01/01/2026 - 27/01/2026';

export function buildNetDepositDepositRows(): NetDepositDepositRow[] {
  return DEPOSIT_USERNAMES.map((username, index) => {
    const depositsCount = 3 + (index % 9);
    const avgDepositEur = 1145.15 + index * 37.4;
    const totalDepositEur = Math.round(avgDepositEur * depositsCount * 100) / 100;

    return {
      id: DEPOSIT_IDS[index] ?? DEPOSIT_IDS[0],
      username,
      lastDepositDate: formatDepositDate(index),
      depositsCount,
      totalDepositEur,
      avgDepositEur: Math.round(avgDepositEur * 100) / 100,
    };
  });
}

export function buildNetDepositWithdrawalRows(): NetDepositWithdrawalRow[] {
  return WITHDRAWAL_USERNAMES.map((username, index) => ({
    id: DEPOSIT_IDS[index] ?? DEPOSIT_IDS[0],
    username,
    lastDepositDate: formatDepositDate(index + 2),
    totalWithdrawalEur: Math.round((8845.31 - index * 412.5) * 100) / 100,
  }));
}
