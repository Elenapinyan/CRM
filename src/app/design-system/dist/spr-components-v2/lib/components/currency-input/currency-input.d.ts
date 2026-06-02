import { OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseControl } from '../../shared';
import * as i0 from "@angular/core";
export declare class DsCurrencyInputComponent extends BaseControl<FormControl<string>, string> implements OnChanges {
    private readonly renderer2;
    /**
     * Default options for the currency input component
     */
    private readonly currencyInputDefaultOptions;
    /**
     * String content to be displayed as a prefix inside the input field
     */
    readonly currencyPrefix: import("@angular/core").InputSignal<string>;
    /**
     * String content to be displayed as a suffix inside the input field
     */
    readonly currencySuffix: import("@angular/core").InputSignal<string>;
    /**
     * The text to display as the placeholder for the input
     */
    readonly placeholder: import("@angular/core").InputSignal<string>;
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
    private readonly inputElement;
    ngOnChanges(changes: SimpleChanges): void;
    writeValue(value: number | string | null): void;
    protected initControl(): FormControl<string>;
    /**
     * Initialize control listener to format input value and emit changes
     */
    protected initControlListener(): void;
    /**
     * Format the input value based on the specified precision and negative number acceptance.
     * @param {string} value - input value
     * @param {number} precision - number of decimal places (0 - for integer number)
     * @param {boolean} isNegativeNumbersAcceptable - whether negative numbers are allowed
     * @returns {string}
     */
    private formatValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsCurrencyInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsCurrencyInputComponent, "ds-currency-input", never, { "currencyPrefix": { "alias": "currencyPrefix"; "required": false; "isSignal": true; }; "currencySuffix": { "alias": "currencySuffix"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "isNegativeNumbersAcceptable": { "alias": "isNegativeNumbersAcceptable"; "required": false; "isSignal": true; }; "maxLength": { "alias": "maxLength"; "required": false; "isSignal": true; }; "readOnly": { "alias": "readOnly"; "required": false; "isSignal": true; }; "precision": { "alias": "precision"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
