import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NgClassDirectiveAllowedTypes } from '../../../shared/interfaces/ng-class.interface';
import { DisplayedColumn } from '../interfaces/table.interface';
import { DsTableDataService } from '../services/table-data.service';
import { DsTableHeaderDirective } from './table-header.directive';
import * as i0 from "@angular/core";
export declare class DsTableHeaderCellDirective implements OnInit {
    private readonly tableDataService;
    private readonly tableHeader;
    private readonly renderer2;
    private readonly elementRef;
    get classes(): NgClassDirectiveAllowedTypes;
    get isSortable(): boolean;
    get isDescSort(): boolean;
    get isAscSort(): boolean;
    get isSorted(): boolean;
    constructor(tableDataService: DsTableDataService, tableHeader: DsTableHeaderDirective, renderer2: Renderer2, elementRef: ElementRef<HTMLElement>);
    get column(): DisplayedColumn | undefined;
    get isSelectedColumn(): boolean;
    onClick(): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTableHeaderCellDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsTableHeaderCellDirective, "th[dsTableHeaderCell]", never, {}, {}, never, never, true, never>;
}
