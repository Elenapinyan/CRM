import { InjectionToken } from '@angular/core';
import { DropdownOption } from '../../shared';

export const SelectionTranslationKeys = {
  SEARCH_ERROR_TITLE: 'SEARCH_ERROR_TITLE',
  SEARCH_ERROR_SUBTITLE: 'SEARCH_ERROR_SUBTITLE',
  SELECT_ALL: 'SELECT_ALL',
} as const;

export type SelectionTranslationKey = (typeof SelectionTranslationKeys)[keyof typeof SelectionTranslationKeys];

export type SelectionTranslations = {
  [K in SelectionTranslationKey]: string;
};

export const SELECTION_TRANSLATIONS = new InjectionToken<SelectionTranslations>('SELECTION_TRANSLATIONS');

export const DEFAULT_SELECTION_TRANSLATIONS: SelectionTranslations = {
  [SelectionTranslationKeys.SEARCH_ERROR_TITLE]: 'No search results',
  [SelectionTranslationKeys.SEARCH_ERROR_SUBTITLE]: 'Your search did not match any results',
  [SelectionTranslationKeys.SELECT_ALL]: 'Select All',
} as const;

export const SelectionTemplateTypes = {
  OPTION: 'option',
  SELECT_ALL: 'select-all',
  SEARCH_ERROR: 'search-error',
} as const;

export type SelectionTemplateType = (typeof SelectionTemplateTypes)[keyof typeof SelectionTemplateTypes];

interface OptionTemplateContext {
  $implicit: DropdownOption;
  isSelected: boolean;
}

interface SelectAllTemplateContext {
  $implicit: {
    text: string;
  };
  isSelected: boolean;
}

interface SearchErrorTemplateContext {
  $implicit: {
    title: string;
    subTitle: string;
  };
}

export type TemplateContext<Type extends SelectionTemplateType> = Type extends typeof SelectionTemplateTypes.OPTION
  ? OptionTemplateContext
  : Type extends typeof SelectionTemplateTypes.SELECT_ALL
    ? SelectAllTemplateContext
    : SearchErrorTemplateContext;
