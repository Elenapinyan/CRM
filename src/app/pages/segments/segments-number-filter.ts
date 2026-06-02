import type { SegmentFilterToken } from './segments-editor.model';
import {
  baseSentence,
  labelFromTokens,
  type SegmentFilterChipEdit,
  type SegmentFilterMenuOption,
  type SegmentFilterTypeHandler,
} from './segments-filter-shared';
import {
  isRangeOperator,
  normalizeNumericOperator,
  NUMERIC_OPERATOR_OPTIONS,
  operatorPrefix,
} from './segments-filter-operators';

const ROLES = {
  operator: 'operator',
  value: 'value',
  valueFrom: 'valueFrom',
  valueTo: 'valueTo',
} as const;

interface NumberFilterState {
  label: string;
  operator: string;
  value: string;
  valueFrom: string;
  valueTo: string;
}

function defaultState(label: string): NumberFilterState {
  return {
    label,
    operator: 'equal',
    value: '0',
    valueFrom: '0',
    valueTo: '0',
  };
}

function buildTokens(state: NumberFilterState): SegmentFilterToken[] {
  const operator = normalizeNumericOperator(state.operator);
  const range = isRangeOperator(operator);
  const tokens: SegmentFilterToken[] = [
    ...baseSentence(state.label),
    { kind: 'chip', text: operator, role: ROLES.operator },
  ];

  if (range) {
    tokens.push(
      { kind: 'text', text: operatorPrefix(operator, 'from') },
      { kind: 'chip', text: state.valueFrom, role: ROLES.valueFrom },
      { kind: 'text', text: 'to' },
      { kind: 'chip', text: state.valueTo, role: ROLES.valueTo },
    );
  } else {
    const prefix = operatorPrefix(operator);
    if (prefix) {
      tokens.push({ kind: 'text', text: prefix });
    }
    tokens.push({ kind: 'chip', text: state.value, role: ROLES.value });
  }

  return tokens;
}

function parseTokens(tokens: SegmentFilterToken[]): NumberFilterState {
  const state = defaultState(labelFromTokens(tokens));
  const op = tokens.find((t) => t.kind === 'chip' && t.role === ROLES.operator);
  if (op?.kind === 'chip') {
    state.operator = normalizeNumericOperator(op.text);
  }
  const val = tokens.find((t) => t.kind === 'chip' && t.role === ROLES.value);
  if (val?.kind === 'chip') {
    state.value = val.text;
  }
  const from = tokens.find((t) => t.kind === 'chip' && t.role === ROLES.valueFrom);
  if (from?.kind === 'chip') {
    state.valueFrom = from.text;
  }
  const to = tokens.find((t) => t.kind === 'chip' && t.role === ROLES.valueTo);
  if (to?.kind === 'chip') {
    state.valueTo = to.text;
  }
  return state;
}

function createNumberHandler(): SegmentFilterTypeHandler {
  return {
    defaultTokens(label: string): SegmentFilterToken[] {
      return buildTokens(defaultState(label));
    },

    applyChipEdit(tokens: SegmentFilterToken[], edit: SegmentFilterChipEdit): SegmentFilterToken[] {
      const state = parseTokens(tokens);
      if (edit.kind === 'menu' && edit.role === ROLES.operator) {
        const wasRange = isRangeOperator(state.operator);
        state.operator = edit.option.value;
        if (!wasRange && isRangeOperator(state.operator)) {
          state.valueFrom = state.value;
        }
      } else if (edit.kind === 'text') {
        if (edit.role === ROLES.value) {
          state.value = edit.text.trim() || '0';
        } else if (edit.role === ROLES.valueFrom) {
          state.valueFrom = edit.text.trim() || '0';
        } else if (edit.role === ROLES.valueTo) {
          state.valueTo = edit.text.trim() || '0';
        }
      }
      return buildTokens(state);
    },

    isEditableChip(token: SegmentFilterToken): boolean {
      return token.kind === 'chip' && !!token.role;
    },

    usesMenu(token: SegmentFilterToken): boolean {
      return token.kind === 'chip' && token.role === ROLES.operator;
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
      return [];
    },
  };
}

export const integerFilterHandler = createNumberHandler();
export const decimalFilterHandler = createNumberHandler();
