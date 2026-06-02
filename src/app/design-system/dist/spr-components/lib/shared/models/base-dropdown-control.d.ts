import { ElementRef, EventEmitter, OnChanges, OnInit, Renderer2, RendererFactory2, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseControl } from './base-control/base-control';
import { DropdownFilterPayload } from './interfaces/dropdown-store.interface';
import * as i0 from "@angular/core";
export declare abstract class BaseDropdownControl<T, O, D extends Array<any>> extends BaseControl<FormControl<T>, O> implements OnChanges, OnInit {
    options: D;
    withSearch: boolean;
    container: 'body' | null;
    dropdownPlaceholder: string;
    /**
     * The height of the dropdown option in pixels is intended to calculate the minimum buffer size for virtual scroll
     */
    dropdownItemHeight: number;
    /**
     * Maximum number of displayed options in dropdown without scrolling
     */
    maxDisplayedItems: number;
    filterStrategy: 'local' | 'api';
    page: number;
    size: number;
    totalCount: number;
    isLoading: boolean;
    pageChange: EventEmitter<DropdownFilterPayload>;
    searchChange: EventEmitter<DropdownFilterPayload>;
    blurred: EventEmitter<void>;
    inputDebounceTime: import("@angular/core").InputSignal<number>;
    minWidth: number;
    searchControl: FormControl<string>;
    bufferPxSize: number;
    isOpen: boolean;
    private maxItems;
    protected resizeListener: () => void | null;
    protected readonly renderer2: Renderer2;
    protected readonly elementRef: ElementRef<any>;
    protected readonly rendererFactory2: RendererFactory2;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    clearSearchControl(): void;
    onScrolledIndexChange(index: number): void;
    onOpenChange(isOpen: boolean): void;
    writeValue(value: O): void;
    protected abstract updateSelectedOptionsOnValueChange(options: D, value: O): void;
    protected abstract updateSelectedOptionOnOptionsChange(options: D, value: O): void;
    protected initControl(): FormControl<T>;
    private stopResizeListener;
    private initSearchControl;
    private initResizeListener;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseDropdownControl<any, any, any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BaseDropdownControl<any, any, any>, never, never, { "options": { "alias": "options"; "required": false; }; "withSearch": { "alias": "withSearch"; "required": false; }; "container": { "alias": "container"; "required": false; }; "dropdownPlaceholder": { "alias": "dropdownPlaceholder"; "required": false; }; "dropdownItemHeight": { "alias": "dropdownItemHeight"; "required": false; }; "maxDisplayedItems": { "alias": "maxDisplayedItems"; "required": false; }; "filterStrategy": { "alias": "filterStrategy"; "required": false; }; "page": { "alias": "page"; "required": false; }; "size": { "alias": "size"; "required": false; }; "totalCount": { "alias": "totalCount"; "required": false; }; "isLoading": { "alias": "isLoading"; "required": false; }; "inputDebounceTime": { "alias": "inputDebounceTime"; "required": false; "isSignal": true; }; }, { "pageChange": "pageChange"; "searchChange": "searchChange"; "blurred": "blurred"; }, never, never, true, never>;
}
