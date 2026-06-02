import type { FilterCategoryId } from './segments-filter-catalog';
import type { SegmentFilterType } from './segments-filter-type.enum';

/** One token in the inline “sentence” filter row (Figma CRM v2 filter preview). */
export type SegmentFilterToken =
  | { kind: 'text'; text: string; emphasis?: boolean }
  | { kind: 'chip'; text: string; role?: string };

export interface SegmentFilterRow {
  id: string;
  categoryId: Exclude<FilterCategoryId, 'all'>;
  /** Subsection group from the picker (e.g. Bet, GGR). */
  group: string;
  /** ng-crm filter definition key (e.g. bet_amount_activity). */
  apiKey: string;
  filterType: SegmentFilterType;
  tokens: SegmentFilterToken[];
  /** Players matching this filter alone (shown in the row badge). */
  playerCount: number;
}
