import { forwardRef, InjectionToken, Provider, Signal } from '@angular/core';

/**
 * This interface should be used in case when custom filter realization is needed.
 * Should be used together with provideFilterValueAccessor.
 **/
export type FilterValueAccessor = {
  /**
   * Component value to display in a filter toggle
   * @Types `string | string[]`
   **/
  filterValue: Signal<string | string[] | null>;

  /**
   * Reset control value.
   **/
  resetValue(): void;

  /**
   * Manual apply and emit changes.
   **/
  apply(): void;

  /**
   * Method to enable/disable automatic value changes emitting in your component.
   **/
  disableAutoApply(value: boolean): void;
};

export const SPR_FILTER_ACCESSOR = new InjectionToken<FilterValueAccessor>('SPR_FILTER_ACCESSOR');
export const SPR_FILTER_HEADER_ACCESSOR = new InjectionToken<void>('SPR_FILTER_HEADER_ACCESSOR');
export const SPR_FILTER_CUSTOM_FOOTER_IMPLEMENTATION = new InjectionToken<boolean>('SPR_FILTER_CUSTOM_FOOTER_IMPLEMENTATION');

/**
 * Provider to make your custom component work as a filter.
 * Should be used together with `FilterValueAccessor` interface.
 **/
export function provideFilterValueAccessor<Type>(component: Type): Provider {
  return {
    provide: SPR_FILTER_ACCESSOR,
    useExisting: forwardRef(() => component),
    multi: true,
  };
}
