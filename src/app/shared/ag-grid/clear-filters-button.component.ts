import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import type { GridApi } from 'ag-grid-community';

import { clearAllColumnFilters, countActiveColumnFilters } from './ag-grid-filter.utils';

@Component({
  selector: 'app-clear-filters-button',
  imports: [],
  templateUrl: './clear-filters-button.component.html',
  styleUrl: './clear-filters-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClearFiltersButtonComponent {
  readonly gridApi = input<GridApi | null>(null);

  protected readonly activeFilterCount = signal(0);

  protected readonly ariaLabel = computed(() => {
    const count = this.activeFilterCount();
    if (count === 0) {
      return 'Clear all column filters';
    }
    return `Clear all column filters, ${count} active`;
  });

  constructor() {
    effect((onCleanup) => {
      const api = this.gridApi();
      if (!api) {
        this.activeFilterCount.set(0);
        return;
      }

      const refresh = (): void => {
        this.activeFilterCount.set(countActiveColumnFilters(api));
      };

      refresh();
      api.addEventListener('filterChanged', refresh);
      onCleanup(() => api.removeEventListener('filterChanged', refresh));
    });
  }

  protected onClear(): void {
    const api = this.gridApi();
    if (!api || this.activeFilterCount() === 0) {
      return;
    }
    clearAllColumnFilters(api);
  }
}
