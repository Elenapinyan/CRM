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

export const CURRENCY_INPUT_DEFAULT_OPTIONS = new InjectionToken<CurrencyInputDefaultOptions>('Currency input default options', {
  factory: (): CurrencyInputDefaultOptions => ({
    prefix: '',
    suffix: '',
    placeholder: '',
    isNegativeNumbersAcceptable: false,
    maxLength: null,
    readOnly: false,
    precision: 0,
  }),
});
