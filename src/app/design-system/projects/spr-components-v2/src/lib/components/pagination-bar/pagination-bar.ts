import { ChangeDetectionStrategy, Component, computed, inject, input, model, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZES,
  DEFAULT_PAGINATION_TRANSLATIONS_CONFIG,
  Pagination,
  PAGINATION_TRANSLATIONS_CONFIG,
  PaginationParams,
} from './pagination-bar.options';
import { DsButton } from '../button';
import { DsOpenMenuDirective, DsOpenMenuItemDirective } from '../open-menu';

@Component({
  selector: 'ds-pagination-bar',
  templateUrl: 'pagination-bar.html',
  styleUrl: 'pagination-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule, DsButton, DsOpenMenuDirective, DsOpenMenuItemDirective],
})
export class PaginationBar {
  readonly page = model<number>(DEFAULT_PAGE_NUMBER);
  readonly size = model<number>(DEFAULT_PAGE_SIZE);
  readonly sizes = model<number[]>(DEFAULT_PAGE_SIZES);
  readonly total = input<number>(0);

  readonly paginationParams = input<PaginationParams>();
  readonly disabled = input(false);
  readonly translationsConfig = input(inject(PAGINATION_TRANSLATIONS_CONFIG, { optional: true }) ?? DEFAULT_PAGINATION_TRANSLATIONS_CONFIG);

  readonly paginationChanges = output<Pagination>();
  readonly searchValue = output<string>();

  protected readonly pages = computed(() => {
    const pagesArr = new Array(Math.ceil(this.total() / this.size())).fill(0);

    return pagesArr.map((_, i) => i);
  });

  protected readonly pagesSectionTranslation = computed(() => this.translationsConfig().ofPages({ of: this.pages().length }));
  protected readonly rowsPerPageTranslation = computed(() => this.translationsConfig().rowsPerPage());
  protected readonly showingTranslation = computed(() => {
    const of = this.total();
    const currentPagesSize = (this.page() + 1) * this.size();
    const showing = currentPagesSize > of ? of : currentPagesSize;

    return this.translationsConfig().showingOf({ showing, of });
  });

  changePage(page: number): void {
    if (page === this.page() || page < 0) {
      return;
    }

    this.page.set(page);

    this.paginationChanges.emit({ page, size: this.size() });
  }

  changeSize(size: number): void {
    if (size === this.size()) {
      return;
    }

    this.size.set(size);
    this.page.set(0);

    this.paginationChanges.emit({ page: this.page(), size });
  }
}
