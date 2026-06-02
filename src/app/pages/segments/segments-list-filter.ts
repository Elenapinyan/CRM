import type { SegmentFilterToken } from './segments-editor.model';
import {
  baseSentence,
  labelFromTokens,
  type SegmentFilterChipEdit,
  type SegmentFilterMenuOption,
  type SegmentFilterTypeHandler,
} from './segments-filter-shared';
import { LIST_OPERATOR_OPTIONS } from './segments-filter-operators';
import {
  defaultListSelection,
  listOptionLabels,
  listOptionsForApiKey,
} from './segments-list-options.mock';

const ROLES = {
  operator: 'operator',
  selection: 'selection',
} as const;

interface ListFilterState {
  label: string;
  operator: string;
  apiKey?: string;
  selectedKeys: readonly string[];
}

function defaultState(label: string, apiKey?: string): ListFilterState {
  return {
    label,
    operator: 'one of',
    apiKey,
    selectedKeys: defaultListSelection(apiKey),
  };
}

function buildTokens(state: ListFilterState): SegmentFilterToken[] {
  const display = listOptionLabels(state.apiKey, state.selectedKeys);
  return [
    ...baseSentence(state.label),
    { kind: 'chip', text: state.operator, role: ROLES.operator },
    { kind: 'chip', text: display || '…', role: ROLES.selection },
  ];
}

function parseTokens(tokens: SegmentFilterToken[], apiKey?: string): ListFilterState {
  const state = defaultState(labelFromTokens(tokens), apiKey);
  const op = tokens.find((t) => t.kind === 'chip' && t.role === ROLES.operator);
  if (op?.kind === 'chip') {
    state.operator = op.text;
  }
  const sel = tokens.find((t) => t.kind === 'chip' && t.role === ROLES.selection);
  if (sel?.kind === 'chip' && sel.text.includes(' options')) {
    const count = parseInt(sel.text, 10);
    if (!Number.isNaN(count)) {
      state.selectedKeys = listOptionsForApiKey(apiKey).slice(0, count).map((o) => o.key);
    }
  } else if (sel?.kind === 'chip' && sel.text && sel.text !== '…') {
    const options = listOptionsForApiKey(apiKey);
    state.selectedKeys = sel.text.split(', ').map((label) => {
      const match = options.find((o) => o.label === label.trim());
      return match?.key ?? label.trim();
    });
  }
  return state;
}

export const listFilterHandler: SegmentFilterTypeHandler = {
  defaultTokens(label: string, apiKey?: string): SegmentFilterToken[] {
    return buildTokens(defaultState(label, apiKey));
  },

  applyChipEdit(tokens: SegmentFilterToken[], edit: SegmentFilterChipEdit, apiKey?: string): SegmentFilterToken[] {
    const state = parseTokens(tokens, apiKey);
    if (edit.kind === 'menu' && edit.role === ROLES.operator) {
      state.operator = edit.option.value;
    } else if (edit.kind === 'multiselect' && edit.role === ROLES.selection) {
      state.selectedKeys = edit.values;
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

  usesCustomValueEditor(): boolean {
    return false;
  },

  usesListPopover(token: SegmentFilterToken): boolean {
    return token.kind === 'chip' && token.role === ROLES.selection;
  },

  chipMenuOptions(role: string, apiKey?: string): readonly SegmentFilterMenuOption[] {
    if (role === ROLES.operator) {
      return LIST_OPERATOR_OPTIONS;
    }
    if (role === ROLES.selection) {
      return listOptionsForApiKey(apiKey).map((o) => ({
        value: o.key,
        label: o.label,
      }));
    }
    return [];
  },
};

export function listSelectionKeys(tokens: SegmentFilterToken[], apiKey?: string): readonly string[] {
  return parseTokens(tokens, apiKey).selectedKeys;
}
