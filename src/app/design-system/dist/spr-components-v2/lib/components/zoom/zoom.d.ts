import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class Zoom implements ControlValueAccessor {
    /**
     * Property to specify the step.
     * @default `1`
     **/
    step: import("@angular/core").InputSignal<number>;
    /**
     * Property to specify the minimal possible value.
     * @default `0`
     **/
    min: import("@angular/core").InputSignal<number>;
    /**
     * Property to specify the maximal possible value.
     * @default `100`
     **/
    max: import("@angular/core").InputSignal<number>;
    /**
     * Property to specify the unit near to value.
     * @default '%'
     **/
    unit: import("@angular/core").InputSignal<string>;
    protected readonly value: import("@angular/core").WritableSignal<number>;
    protected readonly inputValue: import("@angular/core").WritableSignal<number | null>;
    protected readonly disabled: import("@angular/core").WritableSignal<boolean>;
    inputValueChanged(value: number): void;
    updateValue(): void;
    increase(): void;
    decrease(): void;
    writeValue(value: number): void;
    setDisabledState(isDisabled: boolean): void;
    registerOnChange(fn: () => void): void;
    registerOnTouched(fn: () => void): void;
    protected onChange: (value: number) => void;
    protected onTouched: (value: number) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Zoom, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Zoom, "ds-zoom, [ds-zoom], [dsZoom]", never, { "step": { "alias": "step"; "required": false; "isSignal": true; }; "min": { "alias": "min"; "required": false; "isSignal": true; }; "max": { "alias": "max"; "required": false; "isSignal": true; }; "unit": { "alias": "unit"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
