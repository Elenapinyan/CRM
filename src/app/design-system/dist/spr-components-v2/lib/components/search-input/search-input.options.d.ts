import { InjectionToken } from '@angular/core';
export interface SearchInputDefaultOptions {
    placeholder: string;
    matchCase?: boolean;
    scrollToActiveMatch?: boolean;
}
export declare const SEARCH_INPUT_DEFAULT_OPTIONS: InjectionToken<SearchInputDefaultOptions>;
