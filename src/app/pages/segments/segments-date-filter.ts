import { format, parse } from 'date-fns';

import type { SegmentFilterRow, SegmentFilterToken } from './segments-editor.model';

/** Editable chip roles for date filters (Figma CRM v2 + ng-crm datetime filter). */
export type SegmentFilterChipRole =
  | 'operator'
  | 'dateMode'
  | 'dynamicPreset'
  | 'dynamicPresetEnd'
  | 'customValue'
  | 'customUnit'
  | 'customValueEnd'
  | 'customUnitEnd'
  | 'staticDateTime'
  | 'staticDateTimeFrom'
  | 'staticDateTimeEnd';

import type { SegmentFilterChipEdit, SegmentFilterMenuOption, SegmentFilterTypeHandler } from './segments-filter-shared';

export type { SegmentFilterChipEdit, SegmentFilterMenuOption } from './segments-filter-shared';

/** Comparison operators — Figma node 716:15544. */
export const DATE_FILTER_OPERATOR_OPTIONS: readonly SegmentFilterMenuOption[] = [
  { value: 'equal', label: 'equal' },
  { value: 'not equal', label: 'not equal' },
  { value: 'greater', label: 'greater' },
  { value: 'greater or equal', label: 'greater or equal' },
  { value: 'less', label: 'less' },
  { value: 'less and equal', label: 'less and equal' },
  { value: 'within', label: 'within' },
  { value: 'not within', label: 'not within' },
] as const;

export const DATE_FILTER_MODE_OPTIONS: readonly SegmentFilterMenuOption[] = [
  { value: 'dynamic date', label: 'Dynamic date' },
  { value: 'static date', label: 'Static date' },
] as const;

export const DATE_FILTER_DYNAMIC_PRESET_OPTIONS: readonly SegmentFilterMenuOption[] = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'three days ago', label: 'Three days ago' },
  { value: 'week ago', label: 'Week ago' },
  { value: 'month ago', label: 'Month ago' },
  { value: 'custom', label: 'Custom' },
] as const;

export const DATE_FILTER_CUSTOM_UNIT_OPTIONS: readonly SegmentFilterMenuOption[] = [
  { value: 'days ago', label: 'days ago' },
  { value: 'months ago', label: 'months ago' },
  { value: 'years ago', label: 'years ago' },
] as const;

const MENU_CHIP_ROLES = new Set<SegmentFilterChipRole>([
  'operator',
  'dateMode',
  'dynamicPreset',
  'dynamicPresetEnd',
  'customUnit',
  'customUnitEnd',
]);

const STATIC_DATETIME_ROLES = new Set<SegmentFilterChipRole>([
  'staticDateTime',
  'staticDateTimeFrom',
  'staticDateTimeEnd',
]);

const CUSTOM_VALUE_ROLES = new Set<SegmentFilterChipRole>([
  'customValue',
  'customValueEnd',
]);

export type DateFilterMode = 'dynamic date' | 'static date';

export interface DynamicDateValue {
  preset: string;
  customValue: string;
  customUnit: string;
}

export interface DateFilterState {
  label: string;
  operator: string;
  dateMode: DateFilterMode;
  single: DynamicDateValue;
  from: DynamicDateValue;
  to: DynamicDateValue;
  staticSingle: Date;
  staticFrom: Date;
  staticTo: Date;
}

export function segmentFilterLabel(row: SegmentFilterRow): string {
  const labelToken = row.tokens.find((t) => t.kind === 'text' && t.emphasis);
  return labelToken?.kind === 'text' ? labelToken.text : '';
}

export function isDateFilterRow(row: SegmentFilterRow): boolean {
  return /date/i.test(segmentFilterLabel(row));
}

export function isDateFilterLabel(label: string): boolean {
  return /date/i.test(label);
}

export function isRangeOperator(operator: string): boolean {
  return operator === 'within' || operator === 'not within';
}

export function isMenuChipRole(role: SegmentFilterChipRole): boolean {
  return MENU_CHIP_ROLES.has(role);
}

export function isStaticDateTimeRole(role: SegmentFilterChipRole): boolean {
  return STATIC_DATETIME_ROLES.has(role);
}

export function isCustomValueRole(role: SegmentFilterChipRole): boolean {
  return CUSTOM_VALUE_ROLES.has(role);
}

export function defaultDynamicDateValue(): DynamicDateValue {
  return { preset: 'today', customValue: '7', customUnit: 'days ago' };
}

export function defaultDateFilterState(label: string): DateFilterState {
  const now = startOfToday();
  return {
    label,
    operator: 'equal',
    dateMode: 'dynamic date',
    single: defaultDynamicDateValue(),
    from: { preset: 'custom', customValue: '7', customUnit: 'days ago' },
    to: defaultDynamicDateValue(),
    staticSingle: now,
    staticFrom: now,
    staticTo: now,
  };
}

export function defaultDateFilterTokens(label: string): SegmentFilterToken[] {
  return buildDateFilterTokens(defaultDateFilterState(label));
}

export function chipMenuOptions(role: SegmentFilterChipRole): readonly SegmentFilterMenuOption[] {
  switch (role) {
    case 'operator':
      return DATE_FILTER_OPERATOR_OPTIONS;
    case 'dateMode':
      return DATE_FILTER_MODE_OPTIONS;
    case 'dynamicPreset':
    case 'dynamicPresetEnd':
      return DATE_FILTER_DYNAMIC_PRESET_OPTIONS;
    case 'customUnit':
    case 'customUnitEnd':
      return DATE_FILTER_CUSTOM_UNIT_OPTIONS;
    default:
      return [];
  }
}

export function normalizeChipDisplayText(value: string, role: SegmentFilterChipRole): string {
  if (role === 'dateMode') {
    return value.toLowerCase();
  }
  if (role === 'dynamicPreset' || role === 'dynamicPresetEnd') {
    return value.toLowerCase();
  }
  if (role === 'customUnit' || role === 'customUnitEnd') {
    return value.toLowerCase();
  }
  if (isStaticDateTimeRole(role)) {
    return value;
  }
  return value;
}

export function formatStaticDateTime(date: Date): string {
  return `${format(date, 'dd-MM-yyyy')} ${format(date, 'HH:mm')}`;
}

export function parseStaticDateTime(text: string): Date {
  const trimmed = text.trim();
  const parsed = parse(trimmed, 'dd-MM-yyyy HH:mm', new Date());
  if (!Number.isNaN(parsed.getTime())) {
    return parsed;
  }
  const parsedDateOnly = parse(trimmed.split(' ')[0] ?? trimmed, 'dd-MM-yyyy', new Date());
  if (!Number.isNaN(parsedDateOnly.getTime())) {
    return parsedDateOnly;
  }
  return startOfToday();
}

export function parseDateFilterTokens(tokens: SegmentFilterToken[]): DateFilterState {
  const labelToken = tokens.find((t) => t.kind === 'text' && t.emphasis);
  const label = labelToken?.kind === 'text' ? labelToken.text : '';
  const state = defaultDateFilterState(label);

  const operatorChip = tokens.find((t) => t.kind === 'chip' && t.role === 'operator');
  if (operatorChip?.kind === 'chip') {
    state.operator = operatorChip.text;
  }

  const modeChip = tokens.find((t) => t.kind === 'chip' && t.role === 'dateMode');
  if (modeChip?.kind === 'chip') {
    state.dateMode = parseDateModeChipText(modeChip.text);
  }

  const range = isRangeOperator(state.operator);

  if (state.dateMode === 'static date') {
    if (range) {
      const fromChip = tokens.find((t) => t.kind === 'chip' && t.role === 'staticDateTimeFrom');
      const toChip = tokens.find((t) => t.kind === 'chip' && t.role === 'staticDateTimeEnd');
      if (fromChip?.kind === 'chip') {
        state.staticFrom = parseStaticDateTime(fromChip.text);
      }
      if (toChip?.kind === 'chip') {
        state.staticTo = parseStaticDateTime(toChip.text);
      }
    } else {
      const chip = tokens.find((t) => t.kind === 'chip' && t.role === 'staticDateTime');
      if (chip?.kind === 'chip') {
        state.staticSingle = parseStaticDateTime(chip.text);
      }
    }
    return state;
  }

  if (range) {
    const fromIndex = tokens.findIndex((t) => t.kind === 'text' && t.text === 'from');
    const toIndex = tokens.findIndex((t) => t.kind === 'text' && t.text === 'to');
    if (fromIndex >= 0) {
      state.from = parseDynamicSegment(tokens, fromIndex + 1, 'dynamicPreset', 'customValue', 'customUnit');
    }
    if (toIndex >= 0) {
      state.to = parseDynamicSegment(tokens, toIndex + 1, 'dynamicPresetEnd', 'customValueEnd', 'customUnitEnd');
    }
  } else {
    const modeIndex = tokens.findIndex((t) => t.kind === 'chip' && t.role === 'dateMode');
    const start = modeIndex >= 0 ? modeIndex + 1 : 0;
    state.single = parseDynamicSegment(tokens, start, 'dynamicPreset', 'customValue', 'customUnit');
  }

  return state;
}

export function buildDateFilterTokens(state: DateFilterState): SegmentFilterToken[] {
  const range = isRangeOperator(state.operator);
  const tokens: SegmentFilterToken[] = [
    { kind: 'text', text: state.label, emphasis: true },
    { kind: 'text', text: 'is' },
    { kind: 'chip', text: state.operator, role: 'operator' },
    { kind: 'chip', text: dateModeChipText(state.dateMode, range), role: 'dateMode' },
  ];

  if (state.dateMode === 'static date') {
    if (range) {
      tokens.push(
        { kind: 'text', text: 'from' },
        {
          kind: 'chip',
          text: formatStaticDateTime(state.staticFrom),
          role: 'staticDateTimeFrom',
        },
        { kind: 'text', text: 'to' },
        {
          kind: 'chip',
          text: formatStaticDateTime(state.staticTo),
          role: 'staticDateTimeEnd',
        },
      );
    } else {
      tokens.push({
        kind: 'chip',
        text: formatStaticDateTime(state.staticSingle),
        role: 'staticDateTime',
      });
    }
    return tokens;
  }

  if (range) {
    tokens.push(
      { kind: 'text', text: 'from' },
      ...buildDynamicValueTokens(state.from, 'dynamicPreset', 'customValue', 'customUnit'),
      { kind: 'text', text: 'to' },
      ...buildDynamicValueTokens(state.to, 'dynamicPresetEnd', 'customValueEnd', 'customUnitEnd'),
    );
  } else {
    tokens.push(...buildDynamicValueTokens(state.single, 'dynamicPreset', 'customValue', 'customUnit'));
  }

  return tokens;
}

export function applyDateFilterChipEdit(tokens: SegmentFilterToken[], edit: SegmentFilterChipEdit): SegmentFilterToken[] {
  const state = parseDateFilterTokens(tokens);

  if (edit.kind === 'menu') {
    applyMenuEdit(state, edit.role as SegmentFilterChipRole, edit.option);
  } else if (edit.kind === 'datetime') {
    applyDateTimeEdit(state, edit.role as SegmentFilterChipRole, edit.date);
  } else if (edit.kind === 'text') {
    applyCustomValueEdit(state, edit.role as SegmentFilterChipRole, edit.text);
  }

  return buildDateFilterTokens(state);
}

function applyMenuEdit(state: DateFilterState, role: SegmentFilterChipRole, option: SegmentFilterMenuOption): void {
  const range = isRangeOperator(state.operator);

  switch (role) {
    case 'operator': {
      const wasRange = range;
      const nowRange = isRangeOperator(option.value);
      state.operator = option.value;
      if (!wasRange && nowRange) {
        state.from = { ...state.single };
        if (state.dateMode === 'dynamic date') {
          state.to = defaultDynamicDateValue();
        } else {
          state.staticFrom = state.staticSingle;
          state.staticTo = startOfToday();
        }
      } else if (wasRange && !nowRange) {
        state.single = { ...state.from };
        if (state.dateMode === 'static date') {
          state.staticSingle = state.staticFrom;
        }
      }
      break;
    }
    case 'dateMode': {
      const nextMode = option.value as DateFilterMode;
      state.dateMode = nextMode;
      if (nextMode === 'static date') {
        const now = startOfToday();
        state.staticSingle = now;
        state.staticFrom = now;
        state.staticTo = now;
      }
      break;
    }
    case 'dynamicPreset':
      if (range) {
        applyPresetToValue(state.from, option.value);
      } else {
        applyPresetToValue(state.single, option.value);
      }
      break;
    case 'dynamicPresetEnd':
      applyPresetToValue(state.to, option.value);
      break;
    case 'customUnit':
      if (range) {
        state.from.customUnit = option.value;
      } else {
        state.single.customUnit = option.value;
      }
      break;
    case 'customUnitEnd':
      state.to.customUnit = option.value;
      break;
  }
}

function applyDateTimeEdit(state: DateFilterState, role: SegmentFilterChipRole, date: Date): void {
  switch (role) {
    case 'staticDateTime':
      state.staticSingle = date;
      break;
    case 'staticDateTimeFrom':
      state.staticFrom = date;
      break;
    case 'staticDateTimeEnd':
      state.staticTo = date;
      break;
  }
}

function applyCustomValueEdit(state: DateFilterState, role: SegmentFilterChipRole, text: string): void {
  const value = text.trim() || '1';
  switch (role) {
    case 'customValue':
      state.single.customValue = value;
      state.from.customValue = value;
      break;
    case 'customValueEnd':
      state.to.customValue = value;
      break;
  }
}

function applyPresetToValue(target: DynamicDateValue, preset: string): void {
  target.preset = preset;
  if (preset === 'custom' && !target.customValue) {
    target.customValue = '7';
    target.customUnit = target.customUnit || 'days ago';
  }
}

function buildDynamicValueTokens(
  value: DynamicDateValue,
  presetRole: SegmentFilterChipRole,
  valueRole: SegmentFilterChipRole,
  unitRole: SegmentFilterChipRole,
): SegmentFilterToken[] {
  if (value.preset === 'custom') {
    return [
      { kind: 'chip', text: 'custom', role: presetRole },
      { kind: 'chip', text: value.customValue, role: valueRole },
      { kind: 'chip', text: value.customUnit, role: unitRole },
    ];
  }
  return [{ kind: 'chip', text: value.preset, role: presetRole }];
}

function parseDynamicSegment(
  tokens: SegmentFilterToken[],
  startIndex: number,
  presetRole: SegmentFilterChipRole,
  valueRole: SegmentFilterChipRole,
  unitRole: SegmentFilterChipRole,
): DynamicDateValue {
  const result = defaultDynamicDateValue();
  const slice = tokens.slice(startIndex);

  const presetChip = slice.find((t) => t.kind === 'chip' && t.role === presetRole);
  if (!presetChip || presetChip.kind !== 'chip') {
    return result;
  }

  const presetText = presetChip.text.toLowerCase();
  if (presetText === 'custom') {
    result.preset = 'custom';
    const valueChip = slice.find((t) => t.kind === 'chip' && t.role === valueRole);
    const unitChip = slice.find((t) => t.kind === 'chip' && t.role === unitRole);
    if (valueChip?.kind === 'chip') {
      result.customValue = valueChip.text;
    }
    if (unitChip?.kind === 'chip') {
      result.customUnit = unitChip.text;
    }
    return result;
  }

  result.preset = presetText;
  return result;
}

function parseDateModeChipText(text: string): DateFilterMode {
  const normalized = text.toLowerCase().replace(/\s+/g, ' ');
  if (normalized.startsWith('static')) {
    return 'static date';
  }
  return 'dynamic date';
}

function dateModeChipText(mode: DateFilterMode, range: boolean): string {
  if (mode === 'dynamic date') {
    return range ? 'dynamic dates' : 'dynamic date';
  }
  return range ? 'static dates' : 'static date';
}

function startOfToday(): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

function createDateFilterHandler(): SegmentFilterTypeHandler {
  return {
    defaultTokens(label: string): SegmentFilterToken[] {
      return defaultDateFilterTokens(label);
    },

    applyChipEdit(tokens: SegmentFilterToken[], edit: SegmentFilterChipEdit): SegmentFilterToken[] {
      const state = parseDateFilterTokens(tokens);

      if (edit.kind === 'menu') {
        applyMenuEdit(state, edit.role as SegmentFilterChipRole, edit.option);
      } else if (edit.kind === 'datetime') {
        applyDateTimeEdit(state, edit.role as SegmentFilterChipRole, edit.date);
      } else if (edit.kind === 'text') {
        applyCustomValueEdit(state, edit.role as SegmentFilterChipRole, edit.text);
      }

      return buildDateFilterTokens(state);
    },

    isEditableChip(token: SegmentFilterToken): boolean {
      return token.kind === 'chip' && !!token.role;
    },

    usesMenu(token: SegmentFilterToken): boolean {
      return token.kind === 'chip' && isMenuChipRole(token.role as SegmentFilterChipRole);
    },

    usesStaticPicker(token: SegmentFilterToken): boolean {
      return token.kind === 'chip' && isStaticDateTimeRole(token.role as SegmentFilterChipRole);
    },

    usesCustomValueEditor(token: SegmentFilterToken): boolean {
      return token.kind === 'chip' && isCustomValueRole(token.role as SegmentFilterChipRole);
    },

    usesListPopover(): boolean {
      return false;
    },

    chipMenuOptions(role: string): readonly SegmentFilterMenuOption[] {
      return chipMenuOptions(role as SegmentFilterChipRole);
    },
  };
}

export const dateFilterHandler = createDateFilterHandler();
export const dateTimeFilterHandler = createDateFilterHandler();
