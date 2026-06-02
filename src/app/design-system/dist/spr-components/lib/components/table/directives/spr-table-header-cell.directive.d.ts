import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NgClassDirectiveAllowedTypes } from '../../../shared/interfaces/ng-class.interface';
import { DisplayedColumn } from '../interfaces/table.interface';
import { SprTableDataService } from '../services/spr-table-data.service';
import { SprTableHeaderDirective } from './spr-table-header.directive';
import * as i0 from "@angular/core";
export declare class SprTableHeaderCellDirective implements OnInit {
    private readonly tableDataService;
    private readonly tableHeader;
    private readonly renderer2;
    private readonly elementRef;
    get classes(): NgClassDirectiveAllowedTypes;
    get isSortable(): boolean;
    get isDescSort(): boolean;
    get isAscSort(): boolean;
    get isSorted(): boolean;
    constructor(tableDataService: SprTableDataService, tableHeader: SprTableHeaderDirective, renderer2: Renderer2, elementRef: ElementRef<HTMLElement>);
    get column(): DisplayedColumn | undefined;
    get isSelectedColumn(): boolean;
    onClick(): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprTableHeaderCellDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprTableHeaderCellDirective, "th[sprTableHeaderCell]", never, {}, {}, never, never, true, never>;
}
