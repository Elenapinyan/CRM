import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../../shared/constants/table.constant';
import { SortType } from '../../shared/enums/sort-type.enum';
import { NgClassDirectiveAllowedTypes } from '../../shared/interfaces/ng-class.interface';
import { DsInnerHeaderComponent } from '../inner-header/inner-header.component';
import { PaginationBar, PaginationParams } from '../pagination-bar';
import { DsSpinnerComponent } from '../spinner/spinner.component';
import { DsTableDataCellDirective } from './directives/table-data-cell.directive';
import { DsTableHeaderCellDirective } from './directives/table-header-cell.directive';
import { DsTableHeaderDirective } from './directives/table-header.directive';
import { DsTableRowDirective } from './directives/table-row.directive';
import { ExportFormats } from './enums/table.enum';
import { CellSizeType, DisplayedColumn, EntireTableSortData, PageAndSizeInfo, TableSortConfiguration } from './interfaces/table.interface';
import { GetHeaderTemplatePipe } from './pipes/get-header-template.pipe';
import { GetRowTemplatePipe } from './pipes/get-row-template.pipe';
import { DsTableDataService } from './services/table-data.service';

@Component({
  selector: 'ds-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss'],
  imports: [
    // Modules
    CommonModule,
    FormsModule,
    // Components
    PaginationBar,
    DsSpinnerComponent,
    DsInnerHeaderComponent,
    // Directives
    DsTableHeaderDirective,
    DsTableHeaderCellDirective,
    DsTableRowDirective,
    DsTableDataCellDirective,
    // Pipes
    GetHeaderTemplatePipe,
    GetRowTemplatePipe,
  ],
  providers: [DsTableDataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsTableComponent<Column extends DisplayedColumn, Row extends { [key: string]: any }> implements OnInit {
  @Input() set displayedColumns(columns: Column[]) {
    this.tableDataService.displayedColumns = columns;
  }

  @Input() set displayedRows(rows: Row[]) {
    this.tableDataService.displayedRows = rows;
  }

  @Input() set sortConfiguration(sortConfiguration: TableSortConfiguration) {
    this.tableDataService.sortConfiguration = sortConfiguration;
  }

  /**
   * Pagination inputs.
   **/
  @Input() page = DEFAULT_PAGE_NUMBER;
  @Input() size = DEFAULT_PAGE_SIZE;
  @Input() maxPages = 3;
  @Input() paginationParams?: PaginationParams;
  @Input() paginationWithPageSize = true;
  @Input() isPaginationInputDisabled = false;
  @Input() withExportSection = false;
  @Input() withBoundaryLinks = true;
  @Input() withPagination = false;
  @Input() collectionSize = 0;
  @Input() isLoading = false;
  @Input() isHovering = true;
  @Input() withSearch = false;
  @Input() searchPlaceholder = 'Search...';
  @Input() searchMaxLength = 100;

  /**
   * Table inputs.
   **/
  @Input() title = '';
  @Input() tableClasses: NgClassDirectiveAllowedTypes;

  @Input() cellSize: CellSizeType = 'lg';

  /**
   * Pagination and sort outputs.
   **/
  @Output() updatePageSize = new EventEmitter<PageAndSizeInfo>();
  @Output() updateSort = new EventEmitter<EntireTableSortData>();

  /**
   * exportFormat output.
   **/
  @Output() exportFormat = new EventEmitter<ExportFormats>();

  /**
   * click outputs
   */
  @Output() rowClicked = new EventEmitter<Row>();

  /**
   * search value outputs
   */
  @Output() searchChanges = new EventEmitter<string>();

  @ContentChildren(DsTableHeaderDirective) readonly headerTemplates!: QueryList<DsTableHeaderDirective<Column>>;
  @ContentChildren(DsTableRowDirective) readonly rowTemplates!: QueryList<DsTableRowDirective<Row>>;

  readonly exportFormats = ExportFormats;
  readonly sort = SortType;

  constructor(
    private readonly tableDataService: DsTableDataService<Column, Row>,
    private readonly destroyRef: DestroyRef,
    private readonly cdRef: ChangeDetectorRef,
  ) {}

  get displayedColumns(): Column[] {
    return this.tableDataService.displayedColumns;
  }

  get displayedRows(): Row[] {
    return this.tableDataService.displayedRows;
  }

  ngOnInit(): void {
    this.initSortListener();
  }

  onUpdatePageSize(pageAndSizeInfo: PageAndSizeInfo): void {
    this.updatePageSize.emit(pageAndSizeInfo);
  }

  exportAsFormat(format: ExportFormats): void {
    this.exportFormat.emit(format);
  }

  onSearch(value: string): void {
    this.searchChanges.emit(value);
  }

  private initSortListener(): void {
    this.tableDataService.sort$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((sortConfiguration) => {
      this.updateSort.emit({ ...sortConfiguration, page: DEFAULT_PAGE_NUMBER, size: this.size });

      this.cdRef.markForCheck();
    });
  }
}
