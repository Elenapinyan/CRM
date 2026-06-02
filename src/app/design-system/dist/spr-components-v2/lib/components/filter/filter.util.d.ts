import { ValueOf } from '../../shared/utils';
import { InjectionToken } from '@angular/core';
export declare const FilterTranslationsKeys: {
    readonly RESET: "reset";
    readonly APPLY: "apply";
};
export type FilterTranslationsKeysType = ValueOf<typeof FilterTranslationsKeys>;
export type FilterTranslations = {
    [K in FilterTranslationsKeysType]: string;
};
export declare const DEFAULT_FILTER_TRANSLATIONS: FilterTranslations;
export declare const FILTER_TRANSLATIONS: InjectionToken<FilterTranslations>;
