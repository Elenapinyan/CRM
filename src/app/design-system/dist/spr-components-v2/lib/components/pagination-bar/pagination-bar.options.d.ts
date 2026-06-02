import { InjectionToken } from '@angular/core';
export type PaginationParams = {
    hasNext: boolean;
    hasPrevious: boolean;
    first: boolean;
    last: boolean;
};
export type Pagination = {
    page: number;
    size: number;
};
export declare const DEFAULT_PAGE_NUMBER = 0;
export declare const DEFAULT_PAGE_SIZE = 25;
export declare const DEFAULT_PAGE_SIZES: number[];
type ShowingOfParams = {
    showing: number;
    of: number;
};
type OfPagesParams = {
    of: number;
};
export type PaginationTranslationsConfig = {
    /**
     * @eg Rows per page
     **/
    rowsPerPage: () => string;
    /**
     * @eg Showing 25 of 110 items
     **/
    showingOf: (params: ShowingOfParams) => string;
    /**
     * @eg 10 of 11 pages
     **/
    ofPages: (params: OfPagesParams) => string;
};
export declare const DEFAULT_PAGINATION_TRANSLATIONS_CONFIG: PaginationTranslationsConfig;
export declare const PAGINATION_TRANSLATIONS_CONFIG: InjectionToken<PaginationTranslationsConfig>;
export {};
