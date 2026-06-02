import { OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseControl } from '../../shared';
import * as i0 from "@angular/core";
export declare class DsNumericInputComponent extends BaseControl<FormControl<string>, string> implements OnChanges {
    private readonly renderer2;
    /**
     * Default options for the numeric input component
     */
    private readonly numericInputDefaultOptions;
    /**
     * String content to be displayed as a prefix inside the input field
     */
    readonly numericPrefix: import("@angular/core").InputSignal<string>;
    /**
     * The text to display as the placeholder for the input
     */
    readonly placeholder: import("@angular/core").InputSignal<string>;
    /**
     * The amount to increment or decrement the input value when using step controls
     */
    readonly step: import("@angular/core").InputSignal<number>;
    /**
     * Determine whether negative numbers are allowed as valid numeric input
     */
    readonly isNegativeNumbersAcceptable: import("@angular/core").InputSignal<boolean>;
    /**
     * Limit of characters to enter
     */
    readonly maxLength: import("@angular/core").InputSignal<number | null>;
    /**
     * Option to make input readonly
     */
    readonly readOnly: import("@angular/core").InputSignal<boolean>;
    /**
     * Control the number of decimal places for numeric inputs. 0 - for integer number
     */
    readonly precision: import("@angular/core").InputSignal<number>;
    readonly blurEvent: import("@angular/core").OutputEmitterRef<FocusEvent>;
    private readonly inputElement;
    ngOnChanges(changes: SimpleChanges): void;
    onBlur(event: FocusEvent): void;
    writeValue(value: number | string | null): void;
    protected initControl(): FormControl<string>;
    /**
     * Initialize control listener to format input value and emit changes
     */
    protected initControlListener(): void;
    /**
     * Change the input value by a specified step amount.
     * @param {number} step - the amount to change the input value by (positive or negative)
     */
    protected changeStep(step: number): void;
    /**
     * Format the input value based on the specified precision and negative number acceptance.
     * @param {string} value - input value
     * @param {number} precision - number of decimal places (0 - for integer number)
     * @param {boolean} isNegativeNumbersAcceptable - whether negative numbers are allowed
     * @returns {string}
     */
    private formatValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsNumericInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsNumericInputComponent, "ds-numeric-input", never, { "numericPrefix": { "alias": "numericPrefix"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "step": { "alias": "step"; "required": false; "isSignal": true; }; "isNegativeNumbersAcceptable": { "alias": "isNegativeNumbersAcceptable"; "required": false; "isSignal": true; }; "maxLength": { "alias": "maxLength"; "required": false; "isSignal": true; }; "readOnly": { "alias": "readOnly"; "required": false; "isSignal": true; }; "precision": { "alias": "precision"; "required": false; "isSignal": true; }; }, { "blurEvent": "blurEvent"; }, never, never, true, never>;
}
