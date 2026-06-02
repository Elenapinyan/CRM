import type { SegmentFilterToken } from './segments-editor.model';
import {
  baseSentence,
  labelFromTokens,
  type SegmentFilterChipEdit,
  type SegmentFilterMenuOption,
  type SegmentFilterTypeHandler,
} from './segments-filter-shared';
import { BOOLEAN_VALUE_OPTIONS } from './segments-filter-operators';

const VALUE_ROLE = 'booleanValue';

interface BooleanFilterState {
  label: string;
  value: string;
}

function defaultState(label: string): BooleanFilterState {
  return { label, value: 'yes' };
}

function buildTokens(state: ReturnType<typeof defaultState>): SegmentFilterToken[] {
  return [
    ...baseSentence(state.label),
    { kind: 'chip', text: state.value, role: VALUE_ROLE },
  ];
}

function parseTokens(tokens: SegmentFilterToken[]) {
  const state = defaultState(labelFromTokens(tokens));
  const chip = tokens.find((t) => t.kind === 'chip' && t.role === VALUE_ROLE);
  if (chip?.kind === 'chip') {
    state.value = chip.text === 'no' ? 'no' : 'yes';
  }
  return state;
}

export const booleanFilterHandler: SegmentFilterTypeHandler = {
  defaultTokens(label: string): SegmentFilterToken[] {
    return buildTokens(defaultState(label));
  },

  applyChipEdit(tokens: SegmentFilterToken[], edit: SegmentFilterChipEdit): SegmentFilterToken[] {
    const state = parseTokens(tokens);
    if (edit.kind === 'menu' && edit.role === VALUE_ROLE) {
      state.value = edit.option.value === 'no' ? 'no' : 'yes';
    }
    return buildTokens(state);
  },

  isEditableChip(token: SegmentFilterToken): boolean {
    return token.kind === 'chip' && token.role === VALUE_ROLE;
  },

  usesMenu(): boolean {
    return true;
  },

  usesStaticPicker(): boolean {
    return false;
  },

  usesCustomValueEditor(): boolean {
    return false;
  },

  usesListPopover(): boolean {
    return false;
  },

  chipMenuOptions(role: string): readonly SegmentFilterMenuOption[] {
    if (role === VALUE_ROLE) {
      return BOOLEAN_VALUE_OPTIONS;
    }
    return [];
  },
};

export function isBooleanFilterLabel(_label: string): boolean {
  return true;
}
