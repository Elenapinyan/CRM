import { filterSettingsKey } from '../../segments-filter-settings';
import type { SegmentFilterRow } from '../../segments-editor.model';
import type { SegmentPlayerRow } from './segment-players-modal.model';

const FIRST_NAMES = [
  'Emma',
  'Edwin',
  'Olivia',
  'Liam',
  'Sophia',
  'Noah',
  'Ava',
  'Ethan',
  'Mia',
  'Lucas',
  'Isabella',
  'Mason',
  'Charlotte',
  'Logan',
  'Amelia',
] as const;

const LAST_NAMES = [
  'Johnson',
  'Smith',
  'Williams',
  'Brown',
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
  'Rodriguez',
  'Martinez',
  'Hernandez',
  'Lopez',
  'Wilson',
  'Anderson',
  'Thomas',
] as const;

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pseudoRandom(seed: number, index: number): number {
  const x = Math.sin(seed * 12_989 + index * 78_233) * 10_000;
  return x - Math.floor(x);
}

function formatLastActivity(seed: number, index: number): string {
  const day = 1 + Math.floor(pseudoRandom(seed, index * 3) * 28);
  const month = 1 + Math.floor(pseudoRandom(seed, index * 5) * 12);
  const year = 2025 + Math.floor(pseudoRandom(seed, index * 7) * 2);
  const hour = Math.floor(pseudoRandom(seed, index * 11) * 24);
  const minute = Math.floor(pseudoRandom(seed, index * 13) * 60);
  const monthLabel = new Date(year, month - 1, day).toLocaleString('en-GB', { month: 'short' });
  return `${String(day).padStart(2, '0')}-${monthLabel}-${year} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function buildUsername(firstName: string, lastName: string, index: number): string {
  if (index % 5 === 0) {
    return `${firstName.slice(0, 2)}${lastName.slice(0, 3)}`;
  }
  if (index % 7 === 0) {
    return `${firstName.toLowerCase()}_${lastName.toLowerCase().slice(0, 1)}${index + 1}`;
  }
  return firstName.toLowerCase();
}

export function buildSegmentPlayersSeed(
  scope: 'filter' | 'segment' | 'uploaded-file',
  filterRow?: SegmentFilterRow,
  filterRows?: SegmentFilterRow[],
  logic?: 'and' | 'or',
  uploadedFileId?: string,
): string {
  if (scope === 'uploaded-file' && uploadedFileId) {
    return `uploaded-file:${uploadedFileId}`;
  }

  if (scope === 'filter' && filterRow) {
    return filterSettingsKey(filterRow);
  }

  const keys = (filterRows ?? []).map((row) => filterSettingsKey(row)).sort().join('\n');
  return `segment:${logic ?? 'and'}:${keys}`;
}

export function buildSegmentPlayerRows(seed: string, playerCount: number): SegmentPlayerRow[] {
  const hash = hashSeed(seed);
  const rowCount = Math.min(Math.max(playerCount, 0), 250);
  const rows: SegmentPlayerRow[] = [];

  for (let index = 0; index < rowCount; index++) {
    const firstName = FIRST_NAMES[Math.floor(pseudoRandom(hash, index * 17) * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(pseudoRandom(hash, index * 19) * LAST_NAMES.length)];
    const id = String(456_000_000 + ((hash + index * 997) % 999_999));
    const ggrEur = Math.round((12 + pseudoRandom(hash, index * 23) * 420) * 100) / 100;

    rows.push({
      id,
      username: buildUsername(firstName, lastName, index),
      ggrEur,
      firstName,
      lastName,
      lastActivity: formatLastActivity(hash, index),
    });
  }

  return rows;
}
