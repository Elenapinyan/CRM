import { ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MultiSwitcherOption } from './interfaces/multi-switcher.interface';
import { DropdownOptionValue } from '../../shared/interfaces/dropdown-option.interface';
import * as i0 from "@angular/core";
export declare class SprMultiSwitcherComponent implements ControlValueAccessor {
    private readonly cdRef;
    options: MultiSwitcherOption<DropdownOptionValue>[] | undefined;
    switcherId: string;
    currentSelectedValue: DropdownOptionValue;
    isDisabled: boolean;
    isError: boolean;
    constructor(cdRef: ChangeDetectorRef);
    onChange: (value: DropdownOptionValue) => void;
    onTouched: () => void;
    onSwitcherChange(value: DropdownOptionValue): void;
    writeValue(value: DropdownOptionValue): void;
    registerOnChange(fn: (_: DropdownOptionValue) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprMultiSwitcherComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprMultiSwitcherComponent, "spr-multi-switcher", never, { "options": { "alias": "options"; "required": false; }; "switcherId": { "alias": "switcherId"; "required": false; }; }, {}, never, never, true, never>;
}
