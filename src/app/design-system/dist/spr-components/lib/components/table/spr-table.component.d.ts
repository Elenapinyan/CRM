import { ChangeDetectorRef, DestroyRef, EventEmitter, OnInit, QueryList } from '@angular/core';
import { SortType } from '../../shared/enums/sort-type.enum';
import { NgClassDirectiveAllowedTypes } from '../../shared/interfaces/ng-class.interface';
import { PaginationParams } from '../pagination-bar/interfaces/pagination-bar-config.interface';
import { SprTableHeaderDirective } from './directives/spr-table-header.directive';
import { SprTableRowDirective } from './directives/spr-table-row.directive';
import { ExportFormats } from './enums/table.enum';
import { CellSizeType, DisplayedColumn, EntireTableSortData, PageAndSizeInfo, TableSortConfiguration } from './interfaces/table.interface';
import { SprTableDataService } from './services/spr-table-data.service';
import * as i0 from "@angular/core";
export declare class SprTableComponent<Column extends DisplayedColumn, Row extends {
    [key: string]: any;
}> implements OnInit {
    private readonly tableDataService;
    private readonly destroyRef;
    private readonly cdRef;
    set displayedColumns(columns: Column[]);
    set displayedRows(rows: Row[]);
    set sortConfiguration(sortConfiguration: TableSortConfiguration);
    /**
     * Pagination inputs.
     **/
    page: number;
    size: number;
    maxPages: number;
    paginationParams?: PaginationParams;
    paginationWithPageSize: boolean;
    isPaginationInputDisabled: boolean;
    withExportSection: boolean;
    withBoundaryLinks: boolean;
    withPagination: boolean;
    collectionSize: number;
    isLoading: boolean;
    isHovering: boolean;
    withSearch: boolean;
    searchPlaceholder: string;
    searchMaxLength: number;
    /**
     * Table inputs.
     **/
    title: string;
    tableClasses: NgClassDirectiveAllowedTypes;
    cellSize: CellSizeType;
    /**
     * Pagination and sort outputs.
     **/
    updatePageSize: EventEmitter<PageAndSizeInfo>;
    updateSort: EventEmitter<EntireTableSortData>;
    /**
     * exportFormat output.
     **/
    exportFormat: EventEmitter<ExportFormats>;
    /**
     * click outputs
     */
    rowClicked: EventEmitter<Row>;
    /**
     * search value outputs
     */
    searchChanges: EventEmitter<string>;
    readonly headerTemplates: QueryList<SprTableHeaderDirective<Column>>;
    readonly rowTemplates: QueryList<SprTableRowDirective<Row>>;
    readonly exportFormats: typeof ExportFormats;
    readonly sort: typeof SortType;
    constructor(tableDataService: SprTableDataService<Column, Row>, destroyRef: DestroyRef, cdRef: ChangeDetectorRef);
    get displayedColumns(): Column[];
    get displayedRows(): Row[];
    ngOnInit(): void;
    onUpdatePageSize(pageAndSizeInfo: PageAndSizeInfo): void;
    exportAsFormat(format: ExportFormats): void;
    onSearch(value: string): void;
    private initSortListener;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprTableComponent<any, any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprTableComponent<any, any>, "spr-table", never, { "displayedColumns": { "alias": "displayedColumns"; "required": false; }; "displayedRows": { "alias": "displayedRows"; "required": false; }; "sortConfiguration": { "alias": "sortConfiguration"; "required": false; }; "page": { "alias": "page"; "required": false; }; "size": { "alias": "size"; "required": false; }; "maxPages": { "alias": "maxPages"; "required": false; }; "paginationParams": { "alias": "paginationParams"; "required": false; }; "paginationWithPageSize": { "alias": "paginationWithPageSize"; "required": false; }; "isPaginationInputDisabled": { "alias": "isPaginationInputDisabled"; "required": false; }; "withExportSection": { "alias": "withExportSection"; "required": false; }; "withBoundaryLinks": { "alias": "withBoundaryLinks"; "required": false; }; "withPagination": { "alias": "withPagination"; "required": false; }; "collectionSize": { "alias": "collectionSize"; "required": false; }; "isLoading": { "alias": "isLoading"; "required": false; }; "isHovering": { "alias": "isHovering"; "required": false; }; "withSearch": { "alias": "withSearch"; "required": false; }; "searchPlaceholder": { "alias": "searchPlaceholder"; "required": false; }; "searchMaxLength": { "alias": "searchMaxLength"; "required": false; }; "title": { "alias": "title"; "required": false; }; "tableClasses": { "alias": "tableClasses"; "required": false; }; "cellSize": { "alias": "cellSize"; "required": false; }; }, { "updatePageSize": "updatePageSize"; "updateSort": "updateSort"; "exportFormat": "exportFormat"; "rowClicked": "rowClicked"; "searchChanges": "searchChanges"; }, ["headerTemplates", "rowTemplates"], never, true, never>;
}
