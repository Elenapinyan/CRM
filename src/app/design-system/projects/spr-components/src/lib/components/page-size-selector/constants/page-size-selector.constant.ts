import { InjectionToken } from '@angular/core';
import { PageSizeSelectorConfig } from '../interfaces/page-size-selector-config.interface';

export const DEFAULT_PAGE_SIZE_SELECTOR_SIZES = [25, 50, 75, 100, 150, 200];

export const PAGE_SIZE_SELECTOR_CONFIG_TOKEN = new InjectionToken<PageSizeSelectorConfig>('PAGE_SIZE_SELECTOR_CONFIG_TOKEN');
