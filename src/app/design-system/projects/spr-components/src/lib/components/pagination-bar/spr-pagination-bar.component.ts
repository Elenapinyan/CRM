import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NgbPagination,
  NgbPaginationFirst,
  NgbPaginationLast,
  NgbPaginationNext,
  NgbPaginationPages,
  NgbPaginationPrevious,
} from '@ng-bootstrap/ng-bootstrap';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../../shared/constants/table.constant';
import { SprPageSizeSelectorComponent } from '../page-size-selector/spr-page-size-selector.component';
import { ExportFormats } from '../table/enums/table.enum';
import { PageAndSizeInfo } from '../table/interfaces/table.interface';
import { PAGINATION_BAR_CONFIG_TOKEN } from './constants/pagination-bar.constant';
import { PaginationBarConfig, PaginationParams } from './interfaces/pagination-bar-config.interface';
import { CollectionSizePipe } from './pipes/collection-size.pipe';
import { SprInputComponent } from '../input/spr-input.component';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SprButtonComponent } from '../button/spr-button.component';

@Component({
  selector: 'spr-pagination-bar',
  templateUrl: 'spr-pagination-bar.component.html',
  styleUrls: ['spr-pagination-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgbPagination,
    NgbPaginationNext,
    NgbPaginationPrevious,
    SprPageSizeSelectorComponent,
    FormsModule,
    NgbPaginationFirst,
    NgbPaginationLast,
    NgbPaginationPages,
    CollectionSizePipe,
    SprInputComponent,
    ReactiveFormsModule,
    SprButtonComponent,
  ],
})
export class SprPaginationBarComponent implements OnInit, OnChanges {
  @Input() page = DEFAULT_PAGE_NUMBER;
  @Input() size = DEFAULT_PAGE_SIZE;
  @Input() maxPages = 3;
  @Input() paginationParams?: PaginationParams;
  @Input() paginationWithPageSize = true;
  @Input() isPaginationInputDisabled = false;
  @Input() withExportSection = false;
  @Input() withSearch = false;
  @Input() searchPlaceholder = 'Search...';
  @Input() searchMaxLength = 100;
  @Input() collectionSize = 0;
  @Input() isLoading = false;
  @Input() disabled = false;
  @Input() isFullField = true;
  @Input() withBoundaryLinks = true;

  @Output() updatePageSize = new EventEmitter<PageAndSizeInfo>();
  @Output() exportFormat = new EventEmitter<ExportFormats>();
  @Output() searchValue = new EventEmitter<string>();

  readonly exportFormats = ExportFormats;
  readonly exportLabel = this.paginationBarConfig.exportLabel;
  readonly searchControl: FormControl<string> = this.fb.nonNullable.control('', [Validators.maxLength(this.searchMaxLength)]);

  constructor(
    @Inject(PAGINATION_BAR_CONFIG_TOKEN) private readonly paginationBarConfig: PaginationBarConfig,
    private readonly fb: FormBuilder,
    private readonly destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.subscribeToSearchValueChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['searchMaxLength']) {
      this.searchControl.clearValidators();
      this.searchControl.addValidators([Validators.maxLength(this.searchMaxLength)]);
      this.searchControl.updateValueAndValidity();
    }
  }

  onPageChange(newPage: number): void {
    const page = newPage - 1;

    if (page === this.page) {
      return;
    }

    this.updatePageSize.emit({ page, size: this.size });
  }

  onSizeChange(newSize: number): void {
    if (newSize === this.size) {
      return;
    }

    this.updatePageSize.emit({ size: newSize, page: DEFAULT_PAGE_NUMBER });
  }

  exportAsFormat(format: ExportFormats): void {
    this.exportFormat.emit(format);
  }

  clearSearch(): void {
    this.searchControl.patchValue('');
  }

  private subscribeToSearchValueChanges(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
        filter(() => this.searchControl.valid),
      )
      .subscribe((value) => this.searchValue.emit(value));
  }
}
