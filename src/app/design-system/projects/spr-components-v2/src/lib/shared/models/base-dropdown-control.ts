import { Directive, input, model, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../constants/table.constant';
import { BaseControl } from './base-control';
import { DropdownFilterPayload } from './interfaces/dropdown-store.interface';

@Directive()
export abstract class BaseDropdownControl<T, O, D extends unknown[]> extends BaseControl<FormControl<T>, O> implements OnChanges, OnInit {
  options = input<D>([] as unknown[] as D);
  withSearch = input(true);
  dropdownPlaceholder = input('');
  filterStrategy = input<'local' | 'api'>('local');

  page = model(DEFAULT_PAGE_NUMBER);
  size = input(DEFAULT_PAGE_SIZE);
  totalCount = input<number>();
  isLoading = input<boolean>(false);
  inputDebounceTime = input(200);

  /**
   * The height of the dropdown option in pixels is intended to calculate the minimum buffer size for virtual scroll
   */
  dropdownItemHeight = input(32);

  /**
   * Maximum number of displayed options in dropdown without scrolling
   */
  maxDisplayedItems = input(10);

  /**
   * Enables/disables dynamic dropdown width by option inside
   */
  widthByContent = input<boolean>(false);

  readonly searchChange = output<DropdownFilterPayload>();
  readonly blurred = output<void>();
  searchControl!: FormControl<string>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']?.currentValue) {
      this.updateSelectedOptionOnOptionsChange(this.options(), this.ngControl?.value);
    }
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.initSearchControl();
  }

  onScrolledToBottom(): void {
    if (this.filterStrategy() === 'local') {
      return;
    }

    if (this.options().length !== this.totalCount() && !this.isLoading) {
      this.page.set(this.page() + 1);
    }
  }

  onOpenChange(isOpen: boolean): void {
    if (!isOpen) {
      this.cvaOnTouched();
      this.blurred.emit();
    }
  }

  override writeValue(value: O): void {
    this.updateSelectedOptionsOnValueChange(this.options(), value);
  }

  protected abstract updateSelectedOptionsOnValueChange(options: D, value: O): void;

  protected abstract updateSelectedOptionOnOptionsChange(options: D, value: O): void;

  protected override initControl(): FormControl<T> {
    return this.formBuilder.nonNullable.control<T>(null as T);
  }

  private initSearchControl(): void {
    if (this.withSearch()) {
      this.searchControl = this.formBuilder.nonNullable.control('');

      if (this.filterStrategy() === 'api') {
        this.searchControl.valueChanges
          .pipe(debounceTime(this.inputDebounceTime()), takeUntilDestroyed(this.destroyRef))
          .subscribe((name) => {
            this.page.set(0);

            this.searchChange.emit({
              name,
              page: this.page(),
              size: this.size(),
            });
          });
      }
    }
  }
}
