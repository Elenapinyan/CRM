import { ChangeDetectionStrategy, Component, computed, forwardRef, inject, input } from '@angular/core';
import { DsBadge } from '../../badge';
import { DsButton } from '../../button';
import { DsFilter } from '../filter';
import { SPR_FILTER_HEADER_ACCESSOR } from '../../../shared/utils';

@Component({
  selector: 'ds-filter-inner-header',
  templateUrl: './filter-inner-header.html',
  styleUrl: './filter-inner-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DsBadge, DsButton],
  providers: [{ provide: SPR_FILTER_HEADER_ACCESSOR, useExisting: forwardRef(() => DsFilterInnerHeader) }],
})
export class DsFilterInnerHeader {
  private readonly filter = inject(DsFilter, { optional: true });

  protected readonly filterValueCount = computed(() => {
    const filter = this.filter;

    if (!filter) {
      return 0;
    }

    const value = this.filter.pureValue();

    if (Array.isArray(value)) {
      return value.length;
    }

    return 0;
  });

  protected readonly counterValue = computed(() => {
    const value = this.counter();

    if (value) {
      return value.toString();
    }

    const innerCount = this.filterValueCount();

    if (innerCount) {
      return innerCount.toString();
    }

    return '';
  });

  text = input<string | null>(null);
  counter = input<string | number | null | undefined>(null);

  clear(): void {
    if (!this.filter) {
      return;
    }

    this.filter.resetValue();

    this.filter.closeMenu();
  }
}
