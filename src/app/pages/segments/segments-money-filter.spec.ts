import { defaultMoneyFilterTokens, moneyFilterHandler } from './segments-money-filter';
import { MONEY_CURRENCY_OPTIONS } from './segments-money-currencies.mock';
import { SegmentFilterType } from './segments-filter-type.enum';
import { applyFilterChipEdit } from './segments-filter-registry';

describe('segments-money-filter', () => {
  it('builds readable tokens with operator, amount, currency, exact, and value suffix', () => {
    const tokens = defaultMoneyFilterTokens('Total GGR', '42.50');
    const texts = tokens.map((t) => (t.kind === 'chip' ? t.text : t.text));
    expect(texts).toContain('greater or equal');
    expect(texts).toContain('42.50');
    expect(texts).toContain(MONEY_CURRENCY_OPTIONS[0].value);
    expect(texts).toContain('exact');
    expect(texts).toContain('value');
  });

  it('uses ng-crm operator labels including less or equal', () => {
    const options = moneyFilterHandler.chipMenuOptions('operator');
    expect(options.map((o) => o.label)).toEqual([
      'equal',
      'not equal',
      'greater',
      'greater or equal',
      'less',
      'less or equal',
      'within',
      'not within',
    ]);
  });

  it('uses than prefix for greater and to prefix for greater or equal', () => {
    const tokens = defaultMoneyFilterTokens('Average bet amount', '10');
    const opIdx = tokens.findIndex((t) => t.kind === 'chip' && t.role === 'operator');
    const afterOp = tokens.slice(opIdx + 1, opIdx + 3);
    expect(afterOp[0]).toEqual({ kind: 'text', text: 'to' });

    const updated = applyFilterChipEdit(
      SegmentFilterType.MONEY,
      tokens,
      {
        kind: 'menu',
        rowId: 'r1',
        chipIndex: opIdx,
        role: 'operator',
        option: { value: 'greater', label: 'greater' },
      },
    );
    const opIdx2 = updated.findIndex((t) => t.kind === 'chip' && t.role === 'operator');
    expect(updated[opIdx2 + 1]).toEqual({ kind: 'text', text: 'than' });
  });

  it('exposes exact and equivalent menu options', () => {
    const options = moneyFilterHandler.chipMenuOptions('exact');
    expect(options).toEqual([
      { value: 'exact', label: 'exact' },
      { value: 'equivalent', label: 'equivalent' },
    ]);
  });
});
