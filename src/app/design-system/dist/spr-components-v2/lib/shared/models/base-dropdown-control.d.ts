import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseControl } from './base-control';
import { DropdownFilterPayload } from './interfaces/dropdown-store.interface';
import * as i0 from "@angular/core";
export declare abstract class BaseDropdownControl<T, O, D extends unknown[]> extends BaseControl<FormControl<T>, O> implements OnChanges, OnInit {
    options: import("@angular/core").InputSignal<D>;
    withSearch: import("@angular/core").InputSignal<boolean>;
    dropdownPlaceholder: import("@angular/core").InputSignal<string>;
    filterStrategy: import("@angular/core").InputSignal<"local" | "api">;
    page: import("@angular/core").ModelSignal<number>;
    size: import("@angular/core").InputSignal<number>;
    totalCount: import("@angular/core").InputSignal<number | undefined>;
    isLoading: import("@angular/core").InputSignal<boolean>;
    inputDebounceTime: import("@angular/core").InputSignal<number>;
    /**
     * The height of the dropdown option in pixels is intended to calculate the minimum buffer size for virtual scroll
     */
    dropdownItemHeight: import("@angular/core").InputSignal<number>;
    /**
     * Maximum number of displayed options in dropdown without scrolling
     */
    maxDisplayedItems: import("@angular/core").InputSignal<number>;
    /**
     * Enables/disables dynamic dropdown width by option inside
     */
    widthByContent: import("@angular/core").InputSignal<boolean>;
    readonly searchChange: import("@angular/core").OutputEmitterRef<DropdownFilterPayload>;
    readonly blurred: import("@angular/core").OutputEmitterRef<void>;
    searchControl: FormControl<string>;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    onScrolledToBottom(): void;
    onOpenChange(isOpen: boolean): void;
    writeValue(value: O): void;
    protected abstract updateSelectedOptionsOnValueChange(options: D, value: O): void;
    protected abstract updateSelectedOptionOnOptionsChange(options: D, value: O): void;
    protected initControl(): FormControl<T>;
    private initSearchControl;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseDropdownControl<any, any, any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BaseDropdownControl<any, any, any>, never, never, { "options": { "alias": "options"; "required": false; "isSignal": true; }; "withSearch": { "alias": "withSearch"; "required": false; "isSignal": true; }; "dropdownPlaceholder": { "alias": "dropdownPlaceholder"; "required": false; "isSignal": true; }; "filterStrategy": { "alias": "filterStrategy"; "required": false; "isSignal": true; }; "page": { "alias": "page"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "totalCount": { "alias": "totalCount"; "required": false; "isSignal": true; }; "isLoading": { "alias": "isLoading"; "required": false; "isSignal": true; }; "inputDebounceTime": { "alias": "inputDebounceTime"; "required": false; "isSignal": true; }; "dropdownItemHeight": { "alias": "dropdownItemHeight"; "required": false; "isSignal": true; }; "maxDisplayedItems": { "alias": "maxDisplayedItems"; "required": false; "isSignal": true; }; "widthByContent": { "alias": "widthByContent"; "required": false; "isSignal": true; }; }, { "page": "pageChange"; "searchChange": "searchChange"; "blurred": "blurred"; }, never, never, true, never>;
}
