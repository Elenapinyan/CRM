import { InjectionToken } from '@angular/core';
import { PaginationBarConfig } from '../interfaces/pagination-bar-config.interface';

export const PAGINATION_BAR_CONFIG_TOKEN = new InjectionToken<PaginationBarConfig>('PAGINATION_BAR_CONFIG_TOKEN');
