import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DEFAULT_TABLE_SORT_CONFIGURATION } from '../constants/table.constant';
import { DisplayedColumn, TableSortConfiguration } from '../interfaces/table.interface';
import { getTableSortType } from '../utils/table.util';

@Injectable()
export class SprTableDataService<
  Column extends DisplayedColumn = DisplayedColumn,
  Row extends { [key: string]: any } = { [key: string]: any },
> {
  displayedColumns: Column[] = [];
  displayedRows: Row[] = [];

  sortConfiguration: TableSortConfiguration = DEFAULT_TABLE_SORT_CONFIGURATION;

  private readonly sortSubj$ = new Subject<TableSortConfiguration>();
  readonly sort$ = this.sortSubj$.asObservable();

  findColumnByColumnKey(columnKey: string): Column | undefined {
    return this.displayedColumns.find((column) => column.columnKey === columnKey);
  }

  sort(column: DisplayedColumn): void {
    const sortType = getTableSortType(column, this.sortConfiguration);
    this.sortConfiguration = {
      sortType,
      selectedColumn: sortType !== null ? column.columnKey : null,
    };

    this.sortSubj$.next(this.sortConfiguration);
  }
}
