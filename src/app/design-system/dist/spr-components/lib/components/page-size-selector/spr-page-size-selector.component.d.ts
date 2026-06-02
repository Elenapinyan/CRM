import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DropdownOption } from '../../shared/interfaces/dropdown-option.interface';
import { PageSizeSelectorConfig } from './interfaces/page-size-selector-config.interface';
import * as i0 from "@angular/core";
export declare class SprPageSizeSelectorComponent implements OnChanges, OnInit, ControlValueAccessor {
    private readonly pageSizeSelectorConfig;
    set currentPageSize(size: number);
    sizes: number[];
    disabled: boolean;
    sizesOptions: DropdownOption[];
    value: number;
    constructor(pageSizeSelectorConfig: PageSizeSelectorConfig);
    onChange: (value?: number) => void;
    onTouched: () => void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    writeValue(value: number): void;
    registerOnChange(fn: (value?: number) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprPageSizeSelectorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprPageSizeSelectorComponent, "spr-page-size-selector", never, { "currentPageSize": { "alias": "currentPageSize"; "required": false; }; "sizes": { "alias": "sizes"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, true, never>;
}
