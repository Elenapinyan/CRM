import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  input,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  RendererFactory2,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { SLEEPY_OPTIONS } from '../constants/editor.constant';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../constants/table.constant';
import { BaseControl } from './base-control/base-control';
import { DropdownFilterPayload } from './interfaces/dropdown-store.interface';

@Directive()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class BaseDropdownControl<T, O, D extends Array<any>> extends BaseControl<FormControl<T>, O> implements OnChanges, OnInit {
  @Input() options: D = [] as unknown as D;
  @Input() withSearch = true;
  @Input() container: 'body' | null = null;
  @Input() dropdownPlaceholder = '';

  /**
   * The height of the dropdown option in pixels is intended to calculate the minimum buffer size for virtual scroll
   */
  @Input() dropdownItemHeight = 36;

  /**
   * Maximum number of displayed options in dropdown without scrolling
   */
  @Input() maxDisplayedItems = 4;
  @Input() filterStrategy: 'local' | 'api' = 'local';

  @Input() page = DEFAULT_PAGE_NUMBER;
  @Input() size = DEFAULT_PAGE_SIZE;
  @Input() totalCount!: number;
  @Input() isLoading = false;

  @Output() pageChange = new EventEmitter<DropdownFilterPayload>();
  @Output() searchChange = new EventEmitter<DropdownFilterPayload>();
  @Output() blurred = new EventEmitter<void>();

  inputDebounceTime = input(200);

  minWidth: number = 0;
  searchControl!: FormControl<string>;
  bufferPxSize = this.dropdownItemHeight * this.maxDisplayedItems;
  isOpen = false;

  private maxItems = this.maxDisplayedItems;

  protected resizeListener!: () => void | null;
  protected readonly renderer2: Renderer2;

  protected readonly elementRef = inject(ElementRef<HTMLElement>);
  protected readonly rendererFactory2 = inject(RendererFactory2);

  constructor() {
    super();
    this.renderer2 = this.rendererFactory2.createRenderer(null, null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['maxDisplayedItems']?.currentValue) {
      this.maxItems = this.maxDisplayedItems;
    }

    if (changes['options']?.currentValue) {
      this.updateSelectedOptionOnOptionsChange(this.options, this.ngControl?.value);

      if (this.options.length && this.options.length < this.maxDisplayedItems) {
        this.maxItems = this.options.length;
      } else {
        this.maxItems = this.maxDisplayedItems;
      }

      this.bufferPxSize = this.dropdownItemHeight * this.maxItems;
    }

    if (changes['dropdownItemHeight'] || changes['maxDisplayedItems']) {
      this.bufferPxSize = this.dropdownItemHeight * this.maxItems;
    }
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.initSearchControl();
    this.initResizeListener();
  }

  clearSearchControl(): void {
    this.searchControl?.setValue('', SLEEPY_OPTIONS);
    this.cdRef.markForCheck();
  }

  onScrolledIndexChange(index: number): void {
    if (this.filterStrategy === 'local') {
      return;
    }

    const isBottom = index === this.options.length - this.maxItems - 1;
    if (isBottom && this.options.length !== this.totalCount && !this.isLoading) {
      this.page = this.page + 1;
      this.pageChange.emit({
        page: this.page,
        size: this.size,
        name: this.withSearch ? this.searchControl.value : '',
      });
    }
  }

  onOpenChange(isOpen: boolean): void {
    this.isOpen = isOpen;
    if (isOpen) {
      this.initResizeListener();
    } else {
      this.stopResizeListener();
      if (this.withSearch) {
        this.clearSearchControl();
      }
      this.cvaOnTouched();
    }

    this.blurred.emit();
  }

  override writeValue(value: O): void {
    this.updateSelectedOptionsOnValueChange(this.options, value);
  }

  protected abstract updateSelectedOptionsOnValueChange(options: D, value: O): void;

  protected abstract updateSelectedOptionOnOptionsChange(options: D, value: O): void;

  protected override initControl(): FormControl<T> {
    return this.formBuilder.nonNullable.control<T>(null as T);
  }

  private stopResizeListener(): void {
    if (this.resizeListener) {
      this.resizeListener();
    }
  }

  private initSearchControl(): void {
    if (this.withSearch) {
      this.searchControl = this.formBuilder.nonNullable.control('');

      if (this.filterStrategy === 'api') {
        this.searchControl.valueChanges
          .pipe(debounceTime(this.inputDebounceTime()), takeUntilDestroyed(this.destroyRef))
          .subscribe((name) => {
            this.page = 0;

            this.searchChange.emit({
              name,
              page: this.page,
              size: this.size,
            });
          });
      }
    }
  }

  private initResizeListener(): void {
    this.minWidth = this.elementRef.nativeElement.clientWidth;
    this.resizeListener = this.renderer2.listen(window, 'resize', () => {
      this.minWidth = this.elementRef.nativeElement.clientWidth;
      this.cdRef.markForCheck();
    });
  }
}
