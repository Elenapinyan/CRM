import { ControlValueAccessor } from '@angular/forms';
import { DropdownOptionValue } from '../../shared/interfaces/dropdown-option.interface';
import { MultiSwitcherOption, MultiSwitcherSize } from './multi-switcher.options';
import * as i0 from "@angular/core";
export declare class DsMultiSwitcherComponent implements ControlValueAccessor {
    readonly options: import("@angular/core").InputSignal<MultiSwitcherOption<DropdownOptionValue>[]>;
    readonly switcherId: import("@angular/core").InputSignal<string>;
    readonly size: import("@angular/core").InputSignal<MultiSwitcherSize>;
    protected readonly currentSelectedValue: import("@angular/core").WritableSignal<DropdownOptionValue>;
    protected readonly isDisabled: import("@angular/core").WritableSignal<boolean>;
    onChange: (value: DropdownOptionValue) => void;
    onTouched: () => void;
    onSwitcherChange(value: DropdownOptionValue): void;
    writeValue(value: DropdownOptionValue): void;
    registerOnChange(fn: (_: DropdownOptionValue) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsMultiSwitcherComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsMultiSwitcherComponent, "ds-multi-switcher", never, { "options": { "alias": "options"; "required": false; "isSignal": true; }; "switcherId": { "alias": "switcherId"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
