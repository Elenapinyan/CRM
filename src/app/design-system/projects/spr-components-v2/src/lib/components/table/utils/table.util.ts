import { SortType } from '../../../shared/enums/sort-type.enum';
import { DisplayedColumn, TableSortConfiguration } from '../interfaces/table.interface';

const SORT_STEPS_ORDER = [null, SortType.Asc, SortType.Desc];

export const getTableSortType = (selectedColumn: DisplayedColumn, sortConfiguration: TableSortConfiguration): SortType | null => {
  if (sortConfiguration.sortType === null) {
    return SortType.Asc;
  }

  if (selectedColumn.columnKey === sortConfiguration.selectedColumn) {
    const currentSortStepIndex = SORT_STEPS_ORDER.indexOf(sortConfiguration.sortType);
    const nextSortStep = SORT_STEPS_ORDER[currentSortStepIndex + 1] || SORT_STEPS_ORDER[0];

    return nextSortStep;
  }

  return null;
};

export const isSelectedColumn = (column: DisplayedColumn, sortConfiguration: TableSortConfiguration): boolean => {
  return Boolean(sortConfiguration.selectedColumn === column.columnKey && sortConfiguration.sortType !== null);
};
