import { SortType } from '../../../shared/enums/sort-type.enum';
import { NgClassDirectiveAllowedTypes } from '../../../shared/interfaces/ng-class.interface';
export interface PageAndSizeInfo {
    page: number;
    size: number;
}
export interface DisplayedColumn<T = string> {
    columnKey: T;
    text: string;
    settings?: TableColumnSettings;
}
interface TableColumnSettings {
    headColumnClasses?: NgClassDirectiveAllowedTypes;
    bodyColumnClasses?: NgClassDirectiveAllowedTypes;
    isSortable?: boolean;
}
export interface TableSortConfiguration<T = string> {
    sortType: SortType | null;
    selectedColumn: T | null;
}
export type EntireTableSortData = TableSortConfiguration & PageAndSizeInfo;
export type CellSizeType = 'sm' | 'md' | 'lg';
export {};
