import type { SegmentFilterMenuOption } from './segments-filter-shared';

/**
 * Numeric / money comparison operators (ng-crm ValueFilterFormService.filterNumberOptions).
 * Labels match `filter_editor.option.*` in ng-crm en.json.
 */
export const NUMERIC_OPERATOR_OPTIONS: readonly SegmentFilterMenuOption[] = [
  { value: 'equal', label: 'equal' },
  { value: 'not equal', label: 'not equal' },
  { value: 'greater', label: 'greater' },
  { value: 'greater or equal', label: 'greater or equal' },
  { value: 'less', label: 'less' },
  { value: 'less or equal', label: 'less or equal' },
  { value: 'within', label: 'within' },
  { value: 'not within', label: 'not within' },
] as const;

/** Alias used by MONEY filters (same operator set as ng-crm filter-amount). */
export const MONEY_OPERATOR_OPTIONS = NUMERIC_OPERATOR_OPTIONS;

/** Show currency menu search when option count exceeds this (ng-crm CURRENCY_MAX_DISPLAYED_ITEMS). */
export const CURRENCY_MENU_SEARCH_THRESHOLD = 7;

export const LIST_OPERATOR_OPTIONS: readonly SegmentFilterMenuOption[] = [
  { value: 'one of', label: 'one of' },
  { value: 'none of', label: 'none of' },
] as const;

export const BOOLEAN_VALUE_OPTIONS: readonly SegmentFilterMenuOption[] = [
  { value: 'yes', label: 'yes' },
  { value: 'no', label: 'no' },
] as const;

export const STRING_OPERATOR_OPTIONS: readonly SegmentFilterMenuOption[] = [
  { value: 'equal', label: 'equal' },
  { value: 'not equal', label: 'not equal' },
  { value: 'contains', label: 'contains' },
  { value: 'not contains', label: 'not contains' },
  { value: 'starts with', label: 'starts with' },
  { value: 'ends with', label: 'ends with' },
] as const;

export const INTERVAL_UNIT_OPTIONS: readonly SegmentFilterMenuOption[] = [
  { value: 'minutes', label: 'minutes' },
  { value: 'hours', label: 'hours' },
  { value: 'days', label: 'days' },
] as const;

export const MONEY_EXACT_OPTIONS: readonly SegmentFilterMenuOption[] = [
  { value: 'exact', label: 'exact' },
  { value: 'equivalent', label: 'equivalent' },
] as const;

export function isRangeOperator(operator: string): boolean {
  return operator === 'within' || operator === 'not within';
}

export function isEqualityStringOperator(operator: string): boolean {
  return operator === 'equal' || operator === 'not equal';
}

/** Normalizes legacy operator labels to ng-crm-readable text. */
export function normalizeNumericOperator(operator: string): string {
  if (operator === 'less and equal') {
    return 'less or equal';
  }
  return operator;
}

/**
 * Prefix after the operator chip (ng-crm mapInitialPrefix + value-filter secondPrefix).
 * GREATER/LESS → "than"; BETWEEN/NOT_BETWEEN range start → "from"; others → "to".
 */
export function operatorPrefix(operator: string, rangeSlot: 'single' | 'from' | 'to' = 'single'): string {
  const op = normalizeNumericOperator(operator);
  if (isRangeOperator(op)) {
    return rangeSlot === 'from' ? 'from' : rangeSlot === 'to' ? 'to' : 'from';
  }
  switch (op) {
    case 'greater':
    case 'less':
      return 'than';
    default:
      return 'to';
  }
}
