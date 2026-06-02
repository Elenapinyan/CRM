import { InjectionToken } from '@angular/core';
export interface CurrencyInputDefaultOptions {
    prefix: string;
    suffix: string;
    placeholder: string;
    isNegativeNumbersAcceptable: boolean;
    maxLength: number | null;
    readOnly: boolean;
    precision: number;
}
export declare const CURRENCY_INPUT_DEFAULT_OPTIONS: InjectionToken<CurrencyInputDefaultOptions>;
