import { InjectionToken } from '@angular/core';
export interface NumericInputDefaultOptions {
    placeholder: string;
    isNegativeNumbersAcceptable: boolean;
    maxLength: number | null;
    readOnly: boolean;
    precision: number;
    step: number;
    prefix: string;
}
export declare const NUMERIC_INPUT_DEFAULT_OPTIONS: InjectionToken<NumericInputDefaultOptions>;
