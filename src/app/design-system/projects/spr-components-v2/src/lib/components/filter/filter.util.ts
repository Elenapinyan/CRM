import { ValueOf } from '../../shared/utils';
import { InjectionToken } from '@angular/core';

export const FilterTranslationsKeys = {
  RESET: 'reset',
  APPLY: 'apply',
} as const;

export type FilterTranslationsKeysType = ValueOf<typeof FilterTranslationsKeys>;

export type FilterTranslations = {
  [K in FilterTranslationsKeysType]: string;
};

export const DEFAULT_FILTER_TRANSLATIONS: FilterTranslations = {
  [FilterTranslationsKeys.RESET]: 'Clear',
  [FilterTranslationsKeys.APPLY]: 'Apply',
};

export const FILTER_TRANSLATIONS = new InjectionToken<FilterTranslations>('FILTER_TRANSLATIONS');
