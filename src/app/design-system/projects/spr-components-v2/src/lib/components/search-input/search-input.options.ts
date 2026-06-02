import { InjectionToken } from '@angular/core';

export interface SearchInputDefaultOptions {
  placeholder: string;
  matchCase?: boolean;
  scrollToActiveMatch?: boolean;
}

export const SEARCH_INPUT_DEFAULT_OPTIONS = new InjectionToken<SearchInputDefaultOptions>('Search input default options', {
  factory: (): SearchInputDefaultOptions => ({
    placeholder: '',
    matchCase: false,
    scrollToActiveMatch: false,
  }),
});
