import { InjectionToken, Provider, Signal } from '@angular/core';
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
export declare const SPR_FILTER_ACCESSOR: InjectionToken<FilterValueAccessor>;
export declare const SPR_FILTER_HEADER_ACCESSOR: InjectionToken<void>;
export declare const SPR_FILTER_CUSTOM_FOOTER_IMPLEMENTATION: InjectionToken<boolean>;
/**
 * Provider to make your custom component work as a filter.
 * Should be used together with `FilterValueAccessor` interface.
 **/
export declare function provideFilterValueAccessor<Type>(component: Type): Provider;
