import { FILTER_CATALOG } from './segments-filter-catalog';
import { FILTER_TYPE_MAP, resolveFilterMapping } from './segments-filter-type-map';
import { SUPPORTED_FILTER_TYPES } from './segments-filter-registry';
import { SegmentFilterType } from './segments-filter-type.enum';

describe('segments-filter-type-map', () => {
  it('maps every catalog item to apiKey and filterType', () => {
    for (const item of FILTER_CATALOG) {
      const mapping = resolveFilterMapping(item.id);
      expect(mapping.apiKey).withContext(item.id).toBeTruthy();
      expect(mapping.filterType).withContext(item.id).toBeTruthy();
      expect(FILTER_TYPE_MAP[item.id]).toEqual(mapping);
    }
  });

  it('uses only supported filter types', () => {
    const supported = new Set(SUPPORTED_FILTER_TYPES);
    for (const item of FILTER_CATALOG) {
      const { filterType } = resolveFilterMapping(item.id);
      expect(supported.has(filterType)).withContext(item.id).toBeTrue();
    }
  });

  it('maps unique catalog id to one apiKey', () => {
    expect(Object.keys(FILTER_TYPE_MAP).length).toBe(FILTER_CATALOG.length);
  });

  it('allows shared apiKey across groups within a category', () => {
    const casinoNgr = FILTER_CATALOG.filter((i) => i.id === 'cg-kpi-ngr' || i.id === 'cg-ggr-ngr');
    expect(casinoNgr.length).toBe(2);
    expect(resolveFilterMapping('cg-kpi-ngr').apiKey).toBe('bonus_casino_ngr');
    expect(resolveFilterMapping('cg-ggr-ngr').apiKey).toBe('bonus_casino_ngr');
  });

  it('includes expected types in the map', () => {
    const types = new Set(Object.values(FILTER_TYPE_MAP).map((m) => m.filterType));
    expect(types.has(SegmentFilterType.MONEY)).toBeTrue();
    expect(types.has(SegmentFilterType.DATE_TIME)).toBeTrue();
    expect(types.has(SegmentFilterType.LIST)).toBeTrue();
    expect(types.has(SegmentFilterType.BOOLEAN)).toBeTrue();
  });
});
