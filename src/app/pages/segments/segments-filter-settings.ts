import type { SegmentFilterRow, SegmentFilterToken } from './segments-editor.model';

export type SegmentFilterSettings = Pick<SegmentFilterRow, 'categoryId' | 'group' | 'apiKey' | 'filterType' | 'tokens'>;

function normalizeToken(token: SegmentFilterToken): string {
  if (token.kind === 'text') {
    return `t:${token.text}:${token.emphasis ? 1 : 0}`;
  }
  return `c:${token.text}:${token.role ?? ''}`;
}

/** Stable key for “same filter configuration” (ignores row id and player count). */
export function filterSettingsKey(settings: SegmentFilterSettings): string {
  const tokens = settings.tokens.map(normalizeToken).join('|');
  return `${settings.categoryId}\0${settings.group}\0${settings.apiKey}\0${settings.filterType}\0${tokens}`;
}

export function areFilterSettingsEqual(a: SegmentFilterSettings, b: SegmentFilterSettings): boolean {
  return filterSettingsKey(a) === filterSettingsKey(b);
}

export function randomPlayerCount(): number {
  return Math.floor(1_000 + Math.random() * 89_000);
}

/** Reuse an existing row’s count when settings match; otherwise assign a new random count. */
export function playerCountForFilterSettings(
  rows: readonly SegmentFilterRow[],
  settings: SegmentFilterSettings,
  excludeId?: string,
): number {
  const match = rows.find((row) => row.id !== excludeId && areFilterSettingsEqual(row, settings));
  return match?.playerCount ?? randomPlayerCount();
}
