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

export const NUMERIC_INPUT_DEFAULT_OPTIONS = new InjectionToken<NumericInputDefaultOptions>('Numeric input default options', {
  factory: (): NumericInputDefaultOptions => ({
    placeholder: '',
    isNegativeNumbersAcceptable: false,
    maxLength: null,
    readOnly: false,
    precision: 0,
    step: 1,
    prefix: '',
  }),
});
