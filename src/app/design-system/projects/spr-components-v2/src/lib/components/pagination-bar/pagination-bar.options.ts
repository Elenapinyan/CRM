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

export const DEFAULT_PAGE_NUMBER = 0;
export const DEFAULT_PAGE_SIZE = 25;
export const DEFAULT_PAGE_SIZES = [25, 50, 75, 100];

type ShowingOfParams = { showing: number; of: number };
type OfPagesParams = { of: number };

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

export const DEFAULT_PAGINATION_TRANSLATIONS_CONFIG: PaginationTranslationsConfig = {
  rowsPerPage: () => 'Rows per page',
  showingOf: (params) => `Showing ${params.showing} of ${params.of}`,
  ofPages: (params) => `of ${params.of} pages`,
};

export const PAGINATION_TRANSLATIONS_CONFIG = new InjectionToken<PaginationTranslationsConfig>('PAGINATION_TRANSLATIONS_CONFIG');
