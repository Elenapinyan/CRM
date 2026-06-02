import { ControlValueAccessor, NgModel } from '@angular/forms';
import { AmountPickerValue } from './amount-picker.options';
import * as i0 from "@angular/core";
export declare class AmountPicker implements ControlValueAccessor {
    private readonly destroyRef;
    readonly min: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly max: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly step: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly precision: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly currencyPrefix: import("@angular/core").InputSignal<string>;
    readonly currencySuffix: import("@angular/core").InputSignal<string>;
    protected readonly startInputModel: import("@angular/core").Signal<NgModel | undefined>;
    protected readonly endInputModel: import("@angular/core").Signal<NgModel | undefined>;
    protected readonly startValue: import("@angular/core").WritableSignal<number>;
    protected readonly endValue: import("@angular/core").WritableSignal<number>;
    protected readonly isDisabled: import("@angular/core").WritableSignal<boolean>;
    protected readonly sliderValue: import("@angular/core").Signal<number[]>;
    private readonly startInput$;
    private readonly endInput$;
    constructor();
    onChange: (value: AmountPickerValue) => void;
    onTouched: () => void;
    writeValue(value: AmountPickerValue): void;
    registerOnChange(fn: () => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    protected onStartInputChange(rawValue: string | null): void;
    protected onEndInputChange(rawValue: string | null): void;
    protected onSliderChange(value: AmountPickerValue): void;
    /**
     * Final validation: enforces min/max limits and ensures start <= end.
     */
    protected onBlur(): void;
    private emitValues;
    private normalizeValueFromStringToNumber;
    /**
     * Checks for incomplete inputs like "1." or "1,".
     * Used to pause validation while typing.
     */
    private isIntermediateInputState;
    /**
     * Updates the UI input only if the validation logic changed the value (clamped).
     * Avoids unnecessary updates that could disrupt typing.
     */
    private syncInputView;
    private processStartInput;
    private processEndInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<AmountPicker, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AmountPicker, "ds-amount-picker", never, { "min": { "alias": "min"; "required": false; "isSignal": true; }; "max": { "alias": "max"; "required": false; "isSignal": true; }; "step": { "alias": "step"; "required": false; "isSignal": true; }; "precision": { "alias": "precision"; "required": false; "isSignal": true; }; "currencyPrefix": { "alias": "currencyPrefix"; "required": false; "isSignal": true; }; "currencySuffix": { "alias": "currencySuffix"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
