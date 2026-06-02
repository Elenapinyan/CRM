import { SortType } from '../../../shared/enums/sort-type.enum';
import { DisplayedColumn, TableSortConfiguration } from '../interfaces/table.interface';
export declare const getTableSortType: (selectedColumn: DisplayedColumn, sortConfiguration: TableSortConfiguration) => SortType | null;
export declare const isSelectedColumn: (column: DisplayedColumn, sortConfiguration: TableSortConfiguration) => boolean;
