import type { SegmentFilterToken } from './segments-editor.model';
import {
  baseSentence,
  labelFromTokens,
  type SegmentFilterChipEdit,
  type SegmentFilterMenuOption,
  type SegmentFilterTypeHandler,
} from './segments-filter-shared';
import { MONEY_CURRENCY_OPTIONS } from './segments-money-currencies.mock';
import {
  isRangeOperator,
  MONEY_EXACT_OPTIONS,
  MONEY_OPERATOR_OPTIONS,
  normalizeNumericOperator,
  operatorPrefix,
} from './segments-filter-operators';

const ROLES = {
  operator: 'operator',
  amount: 'amount',
  amountFrom: 'amountFrom',
  amountTo: 'amountTo',
  currency: 'currency',
  exact: 'exact',
} as const;

interface MoneyFilterState {
  label: string;
  operator: string;
  amount: string;
  amountFrom: string;
  amountTo: string;
  currency: string;
  exact: string;
}

function defaultState(label: string): MoneyFilterState {
  return {
    label,
    operator: 'greater or equal',
    amount: '0',
    amountFrom: '0',
    amountTo: '0',
    currency: MONEY_CURRENCY_OPTIONS[0]?.value ?? 'EUR',
    exact: 'exact',
  };
}

function buildTokens(state: MoneyFilterState): SegmentFilterToken[] {
  const operator = normalizeNumericOperator(state.operator);
  const range = isRangeOperator(operator);
  const tokens: SegmentFilterToken[] = [
    ...baseSentence(state.label),
    { kind: 'chip', text: operator, role: ROLES.operator },
  ];

  if (range) {
    tokens.push(
      { kind: 'text', text: operatorPrefix(operator, 'from') },
      { kind: 'chip', text: state.amountFrom, role: ROLES.amountFrom },
      { kind: 'text', text: 'to' },
      { kind: 'chip', text: state.amountTo, role: ROLES.amountTo },
    );
  } else {
    const prefix = operatorPrefix(operator);
    if (prefix) {
      tokens.push({ kind: 'text', text: prefix });
    }
    tokens.push({ kind: 'chip', text: state.amount, role: ROLES.amount });
  }

  tokens.push(
    { kind: 'chip', text: state.currency, role: ROLES.currency },
    { kind: 'chip', text: state.exact, role: ROLES.exact },
    { kind: 'text', text: 'value' },
  );

  return tokens;
}

function parseTokens(tokens: SegmentFilterToken[]): MoneyFilterState {
  const state = defaultState(labelFromTokens(tokens));
  for (const token of tokens) {
    if (token.kind !== 'chip' || !token.role) continue;
    switch (token.role) {
      case ROLES.operator:
        state.operator = normalizeNumericOperator(token.text);
        break;
      case ROLES.amount:
        state.amount = token.text;
        break;
      case ROLES.amountFrom:
        state.amountFrom = token.text;
        break;
      case ROLES.amountTo:
        state.amountTo = token.text;
        break;
      case ROLES.currency:
        state.currency = token.text;
        break;
      case ROLES.exact:
        state.exact = token.text;
        break;
    }
  }
  return state;
}

export const moneyFilterHandler: SegmentFilterTypeHandler = {
  defaultTokens(label: string): SegmentFilterToken[] {
    return buildTokens(defaultState(label));
  },

  applyChipEdit(tokens: SegmentFilterToken[], edit: SegmentFilterChipEdit): SegmentFilterToken[] {
    const state = parseTokens(tokens);
    if (edit.kind === 'menu') {
      switch (edit.role) {
        case ROLES.operator: {
          const wasRange = isRangeOperator(state.operator);
          state.operator = edit.option.value;
          if (!wasRange && isRangeOperator(state.operator)) {
            state.amountFrom = state.amount;
          }
          break;
        }
        case ROLES.currency:
          state.currency = edit.option.value;
          break;
        case ROLES.exact:
          state.exact = edit.option.value;
          break;
      }
    } else if (edit.kind === 'text') {
      if (edit.role === ROLES.amount) {
        state.amount = edit.text.trim() || '0';
      } else if (edit.role === ROLES.amountFrom) {
        state.amountFrom = edit.text.trim() || '0';
      } else if (edit.role === ROLES.amountTo) {
        state.amountTo = edit.text.trim() || '0';
      }
    }
    return buildTokens(state);
  },

  isEditableChip(token: SegmentFilterToken): boolean {
    return token.kind === 'chip' && !!token.role;
  },

  usesMenu(token: SegmentFilterToken): boolean {
    return (
      token.kind === 'chip' &&
      (token.role === ROLES.operator || token.role === ROLES.currency || token.role === ROLES.exact)
    );
  },

  usesStaticPicker(): boolean {
    return false;
  },

  usesCustomValueEditor(token: SegmentFilterToken): boolean {
    return (
      token.kind === 'chip' &&
      (token.role === ROLES.amount || token.role === ROLES.amountFrom || token.role === ROLES.amountTo)
    );
  },

  usesListPopover(): boolean {
    return false;
  },

  chipMenuOptions(role: string): readonly SegmentFilterMenuOption[] {
    switch (role) {
      case ROLES.operator:
        return MONEY_OPERATOR_OPTIONS;
      case ROLES.currency:
        return MONEY_CURRENCY_OPTIONS;
      case ROLES.exact:
        return MONEY_EXACT_OPTIONS;
      default:
        return [];
    }
  },
};

/** Sample GGR row matching Figma preview. */
export function defaultMoneyFilterTokens(label: string, amount = '42.50'): SegmentFilterToken[] {
  return buildTokens({ ...defaultState(label), amount });
}
