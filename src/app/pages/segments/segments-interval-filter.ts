import type { SegmentFilterToken } from './segments-editor.model';
import {
  baseSentence,
  labelFromTokens,
  type SegmentFilterChipEdit,
  type SegmentFilterMenuOption,
  type SegmentFilterTypeHandler,
} from './segments-filter-shared';
import {
  INTERVAL_UNIT_OPTIONS,
  isRangeOperator,
  NUMERIC_OPERATOR_OPTIONS,
  operatorPrefix,
} from './segments-filter-operators';

const ROLES = {
  operator: 'operator',
  value: 'value',
  valueFrom: 'valueFrom',
  valueTo: 'valueTo',
  unit: 'unit',
} as const;

interface IntervalFilterState {
  label: string;
  operator: string;
  value: string;
  valueFrom: string;
  valueTo: string;
  unit: string;
}

function defaultState(label: string): IntervalFilterState {
  return {
    label,
    operator: 'equal',
    value: '1',
    valueFrom: '1',
    valueTo: '7',
    unit: 'hours',
  };
}

function buildTokens(state: IntervalFilterState): SegmentFilterToken[] {
  const range = isRangeOperator(state.operator);
  const tokens: SegmentFilterToken[] = [
    ...baseSentence(state.label),
    { kind: 'chip', text: state.operator, role: ROLES.operator },
  ];

  if (range) {
    tokens.push(
      { kind: 'text', text: operatorPrefix(state.operator, 'from') },
      { kind: 'chip', text: state.valueFrom, role: ROLES.valueFrom },
      { kind: 'text', text: 'to' },
      { kind: 'chip', text: state.valueTo, role: ROLES.valueTo },
    );
  } else {
    const prefix = operatorPrefix(state.operator);
    if (prefix) {
      tokens.push({ kind: 'text', text: prefix });
    }
    tokens.push({ kind: 'chip', text: state.value, role: ROLES.value });
  }

  tokens.push({ kind: 'chip', text: state.unit, role: ROLES.unit });
  return tokens;
}

function parseTokens(tokens: SegmentFilterToken[]): IntervalFilterState {
  const state = defaultState(labelFromTokens(tokens));
  for (const token of tokens) {
    if (token.kind !== 'chip' || !token.role) continue;
    switch (token.role) {
      case ROLES.operator:
        state.operator = token.text;
        break;
      case ROLES.value:
        state.value = token.text;
        break;
      case ROLES.valueFrom:
        state.valueFrom = token.text;
        break;
      case ROLES.valueTo:
        state.valueTo = token.text;
        break;
      case ROLES.unit:
        state.unit = token.text;
        break;
    }
  }
  return state;
}

export const intervalFilterHandler: SegmentFilterTypeHandler = {
  defaultTokens(label: string): SegmentFilterToken[] {
    return buildTokens(defaultState(label));
  },

  applyChipEdit(tokens: SegmentFilterToken[], edit: SegmentFilterChipEdit): SegmentFilterToken[] {
    const state = parseTokens(tokens);
    if (edit.kind === 'menu') {
      if (edit.role === ROLES.operator) {
        state.operator = edit.option.value;
      } else if (edit.role === ROLES.unit) {
        state.unit = edit.option.value;
      }
    } else if (edit.kind === 'text') {
      if (edit.role === ROLES.value) {
        state.value = edit.text.trim() || '1';
      } else if (edit.role === ROLES.valueFrom) {
        state.valueFrom = edit.text.trim() || '1';
      } else if (edit.role === ROLES.valueTo) {
        state.valueTo = edit.text.trim() || '1';
      }
    }
    return buildTokens(state);
  },

  isEditableChip(token: SegmentFilterToken): boolean {
    return token.kind === 'chip' && !!token.role;
  },

  usesMenu(token: SegmentFilterToken): boolean {
    return token.kind === 'chip' && (token.role === ROLES.operator || token.role === ROLES.unit);
  },

  usesStaticPicker(): boolean {
    return false;
  },

  usesCustomValueEditor(token: SegmentFilterToken): boolean {
    return (
      token.kind === 'chip' &&
      (token.role === ROLES.value || token.role === ROLES.valueFrom || token.role === ROLES.valueTo)
    );
  },

  usesListPopover(): boolean {
    return false;
  },

  chipMenuOptions(role: string): readonly SegmentFilterMenuOption[] {
    if (role === ROLES.operator) {
      return NUMERIC_OPERATOR_OPTIONS;
    }
    if (role === ROLES.unit) {
      return INTERVAL_UNIT_OPTIONS;
    }
    return [];
  },
};
