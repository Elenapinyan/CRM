import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NgClassDirectiveAllowedTypes } from '../../../shared/interfaces/ng-class.interface';
import { DisplayedColumn } from '../interfaces/table.interface';
import { SprTableDataService } from '../services/spr-table-data.service';
import { SprTableRowDirective } from './spr-table-row.directive';
import * as i0 from "@angular/core";
export declare class SprTableDataCellDirective implements OnInit {
    private readonly tableDataService;
    private readonly tableRow;
    private readonly renderer2;
    private readonly elementRef;
    get classes(): NgClassDirectiveAllowedTypes;
    constructor(tableDataService: SprTableDataService, tableRow: SprTableRowDirective, renderer2: Renderer2, elementRef: ElementRef<HTMLElement>);
    get currentColumn(): DisplayedColumn | undefined;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprTableDataCellDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprTableDataCellDirective, "td[sprTableDataCell]", never, {}, {}, never, never, true, never>;
}
