import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import type { SegmentFilterMenuOption } from './segments-filter-shared';

@Component({
  selector: 'app-segment-filter-chip-menu',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './segment-filter-chip-menu.component.html',
  styleUrl: './segment-filter-chip-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentFilterChipMenuComponent {
  readonly options = input.required<readonly SegmentFilterMenuOption[]>();

  /** Chip label used to mark the selected row item. */
  readonly selectedValue = input.required<string>();

  /** When true, shows a search field (use for long lists such as currency). */
  readonly withSearch = input(false);

  readonly pick = output<SegmentFilterMenuOption>();

  protected readonly searchQuery = signal('');

  protected readonly filteredOptions = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) {
      return this.options();
    }
    return this.options().filter(
      (option) =>
        option.label.toLowerCase().includes(query) || option.value.toLowerCase().includes(query),
    );
  });

  protected isSelected(option: SegmentFilterMenuOption): boolean {
    const selected = this.selectedValue().trim().toLowerCase();
    return selected === option.value || selected === option.label.toLowerCase();
  }

  protected onPick(option: SegmentFilterMenuOption, event: MouseEvent): void {
    event.stopPropagation();
    this.pick.emit(option);
  }

  protected onSearchInput(value: string): void {
    this.searchQuery.set(value);
  }
}
