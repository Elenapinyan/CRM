import { DisplayedColumn, TableSortConfiguration } from '../interfaces/table.interface';
import * as i0 from "@angular/core";
export declare class DsTableDataService<Column extends DisplayedColumn = DisplayedColumn, Row extends {
    [key: string]: any;
} = {
    [key: string]: any;
}> {
    displayedColumns: Column[];
    displayedRows: Row[];
    sortConfiguration: TableSortConfiguration;
    private readonly sortSubj$;
    readonly sort$: import("rxjs").Observable<TableSortConfiguration<string>>;
    findColumnByColumnKey(columnKey: string): Column | undefined;
    sort(column: DisplayedColumn): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTableDataService<any, any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DsTableDataService<any, any>>;
}
