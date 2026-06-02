import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NgClassDirectiveAllowedTypes } from '../../../shared/interfaces/ng-class.interface';
import { DisplayedColumn } from '../interfaces/table.interface';
import { DsTableDataService } from '../services/table-data.service';
import { DsTableRowDirective } from './table-row.directive';
import * as i0 from "@angular/core";
export declare class DsTableDataCellDirective implements OnInit {
    private readonly tableDataService;
    private readonly tableRow;
    private readonly renderer2;
    private readonly elementRef;
    get classes(): NgClassDirectiveAllowedTypes;
    constructor(tableDataService: DsTableDataService, tableRow: DsTableRowDirective, renderer2: Renderer2, elementRef: ElementRef<HTMLElement>);
    get currentColumn(): DisplayedColumn | undefined;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTableDataCellDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsTableDataCellDirective, "td[dsTableDataCell]", never, {}, {}, never, never, true, never>;
}
