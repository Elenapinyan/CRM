import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';

import {
  FILTER_CATEGORIES,
  type FilterCatalogItem,
  type FilterCategoryId,
  categoryLabel,
  filterCatalogItems,
  filterDescriptionContent,
  filterPickerBlocks,
  isFilterDescriptionRich,
  subsectionIconClass,
  subsectionIconToneClass,
  type FilterDescriptionSegment,
} from './segments-filter-catalog';

@Component({
  selector: 'app-segment-filter-picker',
  standalone: true,
  templateUrl: './segment-filter-picker.component.html',
  styleUrl: './segment-filter-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentFilterPickerComponent {
  readonly isOpen = input(false);

  readonly pick = output<FilterCatalogItem>();

  readonly dismissed = output<void>();

  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        untracked(() => {
          this.searchQuery.set('');
          this.activeCategory.set('all');
          this.hoveredItem.set(null);
        });
      }
    });
  }

  readonly categories = FILTER_CATEGORIES;

  readonly searchQuery = signal('');

  readonly activeCategory = signal<FilterCategoryId>('all');

  readonly visibleItems = computed(() =>
    filterCatalogItems(this.searchQuery(), this.activeCategory()),
  );

  readonly visibleBlocks = computed(() => filterPickerBlocks(this.visibleItems()));

  readonly listTitleCount = computed(() => this.visibleItems().length);

  readonly hoveredItem = signal<FilterCatalogItem | null>(null);

  readonly hoveredDescriptionContent = computed(() => {
    const item = this.hoveredItem();
    return item ? filterDescriptionContent(item) : null;
  });

  readonly hoveredDescriptionRich = computed(() => {
    const content = this.hoveredDescriptionContent();
    return content !== null && isFilterDescriptionRich(content) ? content : null;
  });

  protected isUnderlineSegment(
    segment: FilterDescriptionSegment,
  ): segment is { readonly underline: string } {
    return typeof segment === 'object' && segment !== null && 'underline' in segment;
  }

  readonly hoveredCategoryLabel = computed(() => {
    const item = this.hoveredItem();
    return item ? categoryLabel(item.categoryId) : null;
  });

  onSearchInput(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  setCategory(id: FilterCategoryId): void {
    this.activeCategory.set(id);
  }

  selectItem(item: FilterCatalogItem): void {
    this.pick.emit(item);
  }

  onRowEnter(item: FilterCatalogItem): void {
    this.hoveredItem.set(item);
  }

  subsectionIcon(categoryId: Exclude<FilterCategoryId, 'all'>, group?: string): string {
    return subsectionIconClass(categoryId, group);
  }

  subsectionIconTone(categoryId: Exclude<FilterCategoryId, 'all'>): string {
    return subsectionIconToneClass(categoryId);
  }

  onPanelsLeave(event: MouseEvent): void {
    const next = event.relatedTarget as Node | null;
    const panels = event.currentTarget as HTMLElement;
    if (next && panels.contains(next)) {
      return;
    }
    this.hoveredItem.set(null);
  }

  close(): void {
    this.dismissed.emit();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen()) {
      return;
    }
    const t = event.target as Node | null;
    if (!t) {
      return;
    }
    const root = this.host.nativeElement;
    if (root.contains(t)) {
      return;
    }
    this.close();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen()) {
      this.close();
    }
  }
}
