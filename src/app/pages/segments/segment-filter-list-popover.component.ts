import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsCheckboxComponent } from '@platform-workspace/design-system-v2';

import type { ListFilterOption } from './segments-list-options.mock';

@Component({
  selector: 'app-segment-filter-list-popover',
  standalone: true,
  imports: [FormsModule, DsCheckboxComponent],
  templateUrl: './segment-filter-list-popover.component.html',
  styleUrl: './segment-filter-list-popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentFilterListPopoverComponent {
  readonly options = input.required<readonly ListFilterOption[]>();

  readonly selectedKeys = input.required<readonly string[]>();

  readonly confirm = output<readonly string[]>();

  protected readonly searchQuery = signal('');

  protected readonly filteredOptions = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) {
      return this.options();
    }
    return this.options().filter(
      (option) =>
        option.label.toLowerCase().includes(query) || option.key.toLowerCase().includes(query),
    );
  });

  protected isSelected(key: string): boolean {
    return this.selectedKeys().includes(key);
  }

  protected onItemClick(key: string): void {
    const current = this.selectedKeys();
    let next: readonly string[];

    if (current.includes(key)) {
      const removed = current.filter((k) => k !== key);
      next = removed.length ? removed : this.fallbackSelection();
    } else {
      next = [...current, key];
    }

    this.confirm.emit(next);
  }

  protected onSearchInput(value: string): void {
    this.searchQuery.set(value);
  }

  private fallbackSelection(): readonly string[] {
    const first = this.options()[0];
    return first ? [first.key] : [];
  }
}
