import type { SegmentFilterToken } from './segments-editor.model';
import {
  baseSentence,
  labelFromTokens,
  type SegmentFilterChipEdit,
  type SegmentFilterMenuOption,
  type SegmentFilterTypeHandler,
} from './segments-filter-shared';
import { isEqualityStringOperator, STRING_OPERATOR_OPTIONS } from './segments-filter-operators';

const ROLES = {
  operator: 'operator',
  value: 'value',
} as const;

interface StringFilterState {
  label: string;
  operator: string;
  value: string;
}

function defaultState(label: string): StringFilterState {
  return { label, operator: 'equal', value: '' };
}

function buildTokens(state: StringFilterState): SegmentFilterToken[] {
  const tokens: SegmentFilterToken[] = [...baseSentence(state.label)];

  if (isEqualityStringOperator(state.operator)) {
    tokens.push(
      { kind: 'chip', text: state.operator, role: ROLES.operator },
      { kind: 'text', text: 'to' },
      { kind: 'chip', text: state.value || '…', role: ROLES.value },
    );
  } else {
    tokens.push(
      { kind: 'chip', text: state.operator, role: ROLES.operator },
      { kind: 'chip', text: state.value || '…', role: ROLES.value },
    );
  }

  return tokens;
}

function parseTokens(tokens: SegmentFilterToken[]): StringFilterState {
  const state = defaultState(labelFromTokens(tokens));
  const op = tokens.find((t) => t.kind === 'chip' && t.role === ROLES.operator);
  if (op?.kind === 'chip') {
    state.operator = op.text;
  }
  const val = tokens.find((t) => t.kind === 'chip' && t.role === ROLES.value);
  if (val?.kind === 'chip' && val.text !== '…') {
    state.value = val.text;
  }
  return state;
}

export const stringFilterHandler: SegmentFilterTypeHandler = {
  defaultTokens(label: string): SegmentFilterToken[] {
    return buildTokens(defaultState(label));
  },

  applyChipEdit(tokens: SegmentFilterToken[], edit: SegmentFilterChipEdit): SegmentFilterToken[] {
    const state = parseTokens(tokens);
    if (edit.kind === 'menu' && edit.role === ROLES.operator) {
      state.operator = edit.option.value;
    } else if (edit.kind === 'text' && edit.role === ROLES.value) {
      state.value = edit.text;
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
    return token.kind === 'chip' && token.role === ROLES.value;
  },

  usesListPopover(): boolean {
    return false;
  },

  chipMenuOptions(role: string): readonly SegmentFilterMenuOption[] {
    if (role === ROLES.operator) {
      return STRING_OPERATOR_OPTIONS;
    }
    return [];
  },
};
