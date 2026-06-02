import { booleanFilterHandler } from './segments-boolean-filter';
import {
  applyDateFilterChipEdit,
  chipMenuOptions,
  dateFilterHandler,
  dateTimeFilterHandler,
  defaultDateFilterTokens,
  isCustomValueRole,
  isMenuChipRole,
  isStaticDateTimeRole,
  normalizeChipDisplayText,
  type SegmentFilterChipRole,
} from './segments-date-filter';
import type { SegmentFilterToken } from './segments-editor.model';
import { SegmentFilterType } from './segments-filter-type.enum';
import type { SegmentFilterChipEdit, SegmentFilterMenuOption, SegmentFilterTypeHandler } from './segments-filter-shared';
import { intervalFilterHandler } from './segments-interval-filter';
import { listFilterHandler } from './segments-list-filter';
import { decimalFilterHandler, integerFilterHandler } from './segments-number-filter';
import { moneyFilterHandler } from './segments-money-filter';
import { stringFilterHandler } from './segments-string-filter';

const HANDLERS: Readonly<Record<SegmentFilterType, SegmentFilterTypeHandler>> = {
  [SegmentFilterType.BOOLEAN]: booleanFilterHandler,
  [SegmentFilterType.STRING]: stringFilterHandler,
  [SegmentFilterType.LIST]: listFilterHandler,
  [SegmentFilterType.INTEGER]: integerFilterHandler,
  [SegmentFilterType.DECIMAL]: decimalFilterHandler,
  [SegmentFilterType.MONEY]: moneyFilterHandler,
  [SegmentFilterType.DATE]: dateFilterHandler,
  [SegmentFilterType.DATE_TIME]: dateTimeFilterHandler,
  [SegmentFilterType.INTERVAL]: intervalFilterHandler,
};

export function getFilterHandler(filterType: SegmentFilterType): SegmentFilterTypeHandler {
  const handler = HANDLERS[filterType];
  if (!handler) {
    throw new Error(`No handler registered for filter type [${filterType}]`);
  }
  return handler;
}

export function defaultFilterTokens(
  filterType: SegmentFilterType,
  label: string,
  apiKey?: string,
): SegmentFilterToken[] {
  return getFilterHandler(filterType).defaultTokens(label, apiKey);
}

export function applyFilterChipEdit(
  filterType: SegmentFilterType,
  tokens: SegmentFilterToken[],
  edit: SegmentFilterChipEdit,
  apiKey?: string,
): SegmentFilterToken[] {
  return getFilterHandler(filterType).applyChipEdit(tokens, edit, apiKey);
}

export function isEditableFilterChip(filterType: SegmentFilterType, token: SegmentFilterToken): boolean {
  return getFilterHandler(filterType).isEditableChip(token);
}

export function filterChipUsesMenu(filterType: SegmentFilterType, token: SegmentFilterToken): boolean {
  return getFilterHandler(filterType).usesMenu(token);
}

export function filterChipUsesStaticPicker(filterType: SegmentFilterType, token: SegmentFilterToken): boolean {
  return getFilterHandler(filterType).usesStaticPicker(token);
}

export function filterChipUsesCustomValueEditor(filterType: SegmentFilterType, token: SegmentFilterToken): boolean {
  return getFilterHandler(filterType).usesCustomValueEditor(token);
}

export function filterChipUsesListPopover(filterType: SegmentFilterType, token: SegmentFilterToken): boolean {
  return getFilterHandler(filterType).usesListPopover(token);
}

export function filterChipMenuOptions(
  filterType: SegmentFilterType,
  role: string,
  apiKey?: string,
): readonly SegmentFilterMenuOption[] {
  return getFilterHandler(filterType).chipMenuOptions(role, apiKey);
}

export function normalizeFilterChipDisplayText(
  filterType: SegmentFilterType,
  value: string,
  role: string,
): string {
  if (filterType === SegmentFilterType.DATE || filterType === SegmentFilterType.DATE_TIME) {
    return normalizeChipDisplayText(value, role as SegmentFilterChipRole);
  }
  return value;
}

/** Supported filter types for map validation. */
export const SUPPORTED_FILTER_TYPES: readonly SegmentFilterType[] = Object.values(SegmentFilterType);

export {
  applyDateFilterChipEdit,
  chipMenuOptions,
  defaultDateFilterTokens,
  isCustomValueRole,
  isMenuChipRole,
  isStaticDateTimeRole,
};
