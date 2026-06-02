import type { GridApi } from 'ag-grid-community';

/** Number of columns with an active header/column filter (1 column = 1 filter). */
export function countActiveColumnFilters(api: GridApi): number {
  const columns = api.getColumns();
  if (!columns?.length) {
    return 0;
  }

  let count = 0;
  for (const column of columns) {
    if (column.isFilterActive()) {
      count += 1;
    }
  }
  return count;
}

/** Clears all column filters; does not affect quick filter / external search. */
export function clearAllColumnFilters(api: GridApi): void {
  api.setFilterModel(null);
}
