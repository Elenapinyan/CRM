import { InjectionToken } from '@angular/core';
import { DropdownOption } from '../interfaces';
import { COMMON_TRANSLATION_PREFIX } from './translation-prefixes.constant';

export const NOT_SELECTED_ITEM = {
  text: COMMON_TRANSLATION_PREFIX + 'Not Selected',
  value: '',
};

export const NOT_SELECTED_FILTER = {
  text: COMMON_TRANSLATION_PREFIX + 'All',
  value: '',
};

export const NOT_SELECTED_FILTER_TOKEN = new InjectionToken<DropdownOption>('NOT_SELECTED_FILTER_TOKEN');
