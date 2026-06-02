import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged, filter } from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PeriodVariants, type DatetimeRange, type PeriodVariantType } from '@platform-workspace/design-system-v2';
import {
  KtdDragEnd,
  KtdDragStart,
  KtdGridComponent,
  KtdGridItemComponent,
  KtdGridLayout,
  KtdGridLayoutItem,
  KtdGridModule,
  ktdTrackById,
} from '@katoid/angular-grid-layout';
import { BehaviorSubject, catchError, debounceTime, EMPTY, finalize, fromEvent, map, merge } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import type { WidgetInfoMap } from '../../shared/dashboard/widget-info';
import type { WidgetMeta } from '../../shared/dashboard/widget-meta';
import { widgetSize } from '../../shared/dashboard/widget-size';
import { WidgetType } from '../../shared/dashboard/widget-type.enum';
import { DashboardPeriodDatepickerComponent } from './components/dashboard-period-datepicker/dashboard-period-datepicker.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardWidgetComponent } from './components/dashboard-widget/dashboard-widget.component';
import { DASHBOARD_WIDGET_LABELS } from './data/dashboard-widget-catalog';
import { DashboardMockService } from './services/dashboard-mock.service';
import type { CrmGridLayoutItem } from './types/crm-grid-layout-item.type';
import { dashboardItemsAdapter } from './utils/dashboard-items-adapter';
import { findKeyByLabel } from './utils/find-key-by-label';
import {
  adaptLayoutToCols,
  getDashboardGridCols,
  getDashboardRowHeight,
} from './utils/dashboard-grid-responsive';
import { rowAutoFlowCompact } from './utils/grid-compact-layout';
import { gridLayoutAdapter } from './utils/grid-layout-adapter';
import {
  DASHBOARD_DEFAULT_PERIOD,
  DASHBOARD_PERIOD_SELECT_OPTIONS,
} from './data/dashboard-period-options';
import {
  dashboardDateRangesEqual,
  dateRangeToBounds,
  formatDashboardPeriodLabel,
  getDashboardDateRangeForPeriod,
} from './utils/dashboard-date-range.util';
import type { DashboardDateRangeBounds } from './services/dashboard-mock.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    KtdGridModule,
    DashboardWidgetComponent,
    DashboardSidebarComponent,
    DashboardPeriodDatepickerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(KtdGridComponent) grid?: KtdGridComponent;
  @ViewChild('gridWrap', { read: ElementRef }) gridWrap?: ElementRef<HTMLElement>;
  @ViewChild('gridContainer', { read: ElementRef }) gridContainer?: ElementRef<HTMLElement>;

  @HostBinding('class.dashboard-page--customizing')
  get customizingHostClass(): boolean {
    return this.isCustomizing();
  }

  protected readonly selectedPeriod = signal<PeriodVariantType | null>(DASHBOARD_DEFAULT_PERIOD);
  protected readonly dateRangeControl = new FormControl<DatetimeRange<NgbDateStruct> | null>(null);
  protected readonly dashboardDateRange = signal<DashboardDateRangeBounds>({
    from: new Date(),
    to: new Date(),
  });
  protected readonly periodLabel = signal('Today');

  protected readonly layout = signal<CrmGridLayoutItem[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly isCustomizing = signal(false);
  protected readonly isSaving = signal(false);
  protected readonly isResetDisabled = signal(true);
  protected readonly viewReady = signal(false);

  protected readonly hasWidgets = computed(() => this.layout().length > 0);

  protected readonly layoutWasUpdated = computed(() => this.initialStateHash() !== this.currentStateHash());

  protected readonly displayedWidgets$ = new BehaviorSubject<string[]>([]);

  protected readonly gridCols = signal(4);
  protected readonly rowHeight = signal(140);
  protected readonly gridGap = 16;

  protected trackGridItem = (index: number, item: CrmGridLayoutItem): string =>
    ktdTrackById(index, { id: item.id });

  protected displayLabel(label: string | undefined): string {
    return label ? DASHBOARD_WIDGET_LABELS[label] ?? label : 'Widget';
  }

  widgetsInfo: WidgetInfoMap = new Map();

  private readonly dashboardService = inject(DashboardMockService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);

  private readonly initialStateHash = signal('');
  private readonly currentStateHash = signal('');

  private tempLayout = '[]';
  private tempWidgetsInfo!: WidgetInfoMap;

  private draggingWidgetData: WidgetMeta | null = null;
  private isDragging = false;
  private draggedItemId: string | null = null;
  private lastDragEnterTarget: EventTarget | null = null;

  private initialDateRange!: DatetimeRange<NgbDateStruct>;
  private readonly initialPeriod = DASHBOARD_DEFAULT_PERIOD;

  constructor() {
    const todayRange = getDashboardDateRangeForPeriod(DASHBOARD_DEFAULT_PERIOD);
    if (todayRange) {
      this.initialDateRange = todayRange;
    }

    this.dateRangeControl.valueChanges
      .pipe(
        filter(
          (range): range is DatetimeRange<NgbDateStruct> =>
            !!range?.date?.dateFrom && !!range?.date?.dateTo,
        ),
        distinctUntilChanged((prev, next) => dashboardDateRangesEqual(prev, next)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((range) => {
        const period = this.selectedPeriod();
        if (period === PeriodVariants.Lifetime) {
          this.applyLifetimePeriod();
          return;
        }

        this.applyDashboardDateRange(range, period ?? PeriodVariants.Custom);
      });
  }
  private desktopLayout: CrmGridLayoutItem[] = [];
  private gridWrapResizeObserver?: ResizeObserver;

  ngOnInit(): void {
    if (this.initialDateRange) {
      this.onSelectedPeriodChange(DASHBOARD_DEFAULT_PERIOD);
    }

    this.dashboardService
      .getMyDashboard()
      .pipe(
        map((items) => dashboardItemsAdapter(items)),
        finalize(() => {
          this.isLoading.set(false);
          this.cdr.markForCheck();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (items) => {
          items.forEach((item) => {
            this.widgetsInfo.set(item.id, {
              type: item.type,
              label: item.label,
              isOnlyLifetime: item.isOnlyLifetime,
            });
          });
          this.updateDisplayedWidgets();
          this.desktopLayout = items.map((item) => ({ ...item }));
          this.setLayout(items, { skipResponsive: true });
          this.updateResponsiveGrid();
          this.cdr.markForCheck();
        },
        error: () => {
          this.setLayout([]);
        },
      });

    merge(fromEvent(window, 'resize'), fromEvent(window, 'orientationchange'))
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(60))
      .subscribe(() => {
        this.updateResponsiveGrid();
      });
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      this.viewReady.set(true);
      this.updateResponsiveGrid();
      this.observeGridWrapResize();
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.gridWrapResizeObserver?.disconnect();
    this.isCustomizing.set(false);
  }

  private observeGridWrapResize(): void {
    const el = this.gridWrap?.nativeElement;
    if (!el || typeof ResizeObserver === 'undefined') {
      return;
    }

    this.gridWrapResizeObserver?.disconnect();
    this.gridWrapResizeObserver = new ResizeObserver(() => {
      this.updateResponsiveGrid();
    });
    this.gridWrapResizeObserver.observe(el);
  }

  protected setLayout(next: CrmGridLayoutItem[], options?: { skipResponsive?: boolean }): void {
    if (!options?.skipResponsive && this.gridCols() === 4) {
      this.desktopLayout = next.map((item) => ({ ...item }));
    }

    this.layout.set(next);
    this.cdr.markForCheck();
    setTimeout(() => this.grid?.resize());
  }

  private updateResponsiveGrid(): void {
    const width = this.gridWrap?.nativeElement?.clientWidth ?? window.innerWidth;
    const nextRowHeight = getDashboardRowHeight(width);
    const rowHeightChanged = nextRowHeight !== this.rowHeight();

    if (this.isCustomizing()) {
      if (rowHeightChanged) {
        this.rowHeight.set(nextRowHeight);
        this.cdr.markForCheck();
        setTimeout(() => this.grid?.resize());
      }
      return;
    }

    const nextCols = getDashboardGridCols(width);
    const colsChanged = nextCols !== this.gridCols();

    if (colsChanged) {
      this.gridCols.set(nextCols);
      const source =
        nextCols >= 4 && this.desktopLayout.length > 0
          ? this.desktopLayout
          : this.layout().length > 0
            ? this.layout()
            : this.desktopLayout;
      const adapted = adaptLayoutToCols(source, nextCols);
      this.layout.set(adapted);
    }

    if (rowHeightChanged) {
      this.rowHeight.set(nextRowHeight);
    }

    if (colsChanged || rowHeightChanged) {
      this.cdr.markForCheck();
    }

    setTimeout(() => this.grid?.resize());
  }

  protected startCustomize(): void {
    this.tempLayout = JSON.stringify(this.layout());
    this.tempWidgetsInfo = new Map(this.widgetsInfo);
    this.initialStateHash.set(this.buildWidgetsFingerprint(this.widgetsInfo));
    this.isCustomizing.set(true);
    this.syncCurrentState();
    this.cdr.markForCheck();
    setTimeout(() => this.grid?.resize(), 100);
  }

  protected cancelCustomize(): void {
    this.isCustomizing.set(false);
    this.setLayout(JSON.parse(this.tempLayout) as CrmGridLayoutItem[]);
    this.widgetsInfo = new Map(this.tempWidgetsInfo);
    this.updateDisplayedWidgets();
    this.syncCurrentState();
    setTimeout(() => this.grid?.resize(), 100);
  }

  protected saveCustomize(): void {
    this.isSaving.set(true);
    this.dashboardService
      .saveMyDashboard(gridLayoutAdapter(this.layout(), this.widgetsInfo))
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(() => {
          this.setLayout(JSON.parse(this.tempLayout) as CrmGridLayoutItem[]);
          this.widgetsInfo = new Map(this.tempWidgetsInfo);
          this.updateDisplayedWidgets();
          this.isSaving.set(false);
          return EMPTY;
        }),
      )
      .subscribe(() => {
        this.isCustomizing.set(false);
        this.isSaving.set(false);
        this.initialStateHash.set(this.buildWidgetsFingerprint(this.widgetsInfo));
        this.syncCurrentState();
        setTimeout(() => this.grid?.resize(), 100);
      });
  }

  protected resetFilters(): void {
    this.onSelectedPeriodChange(this.initialPeriod);
  }

  protected onSelectedPeriodChange(period: PeriodVariantType | null): void {
    this.selectedPeriod.set(period);

    if (period === PeriodVariants.Lifetime) {
      this.applyLifetimePeriod();
      return;
    }

    if (period === PeriodVariants.Custom) {
      const range = this.dateRangeControl.value;
      if (range?.date?.dateFrom && range?.date?.dateTo) {
        this.applyDashboardDateRange(range, PeriodVariants.Custom);
      }
      return;
    }

    if (!period || period === PeriodVariants.NotSelected) {
      return;
    }

    const range = getDashboardDateRangeForPeriod(period);
    if (!range) {
      return;
    }

    this.dateRangeControl.setValue(range, { emitEvent: true });
  }

  protected onDateRangeConfirmed(range: DatetimeRange | null): void {
    if (!range?.date?.dateFrom || !range?.date?.dateTo) {
      if (this.selectedPeriod() === PeriodVariants.Lifetime) {
        this.applyLifetimePeriod();
      }
      return;
    }

    this.selectedPeriod.set(PeriodVariants.Custom);
    this.dateRangeControl.setValue(range as DatetimeRange<NgbDateStruct>, { emitEvent: true });
  }

  private applyLifetimePeriod(): void {
    const from = new Date(2020, 0, 1);
    const to = new Date();
    this.dashboardDateRange.set({ from, to });
    this.periodLabel.set('Lifetime');
    this.isResetDisabled.set(this.selectedPeriod() === this.initialPeriod);
  }

  private applyDashboardDateRange(
    range: DatetimeRange<NgbDateStruct>,
    period: PeriodVariantType | null,
  ): void {
    const bounds = dateRangeToBounds(range);
    if (!bounds) {
      return;
    }

    this.dashboardDateRange.set(bounds);
    const presetLabel = DASHBOARD_PERIOD_SELECT_OPTIONS.find((option) => option.value === period)?.text;
    this.periodLabel.set(
      presetLabel && period !== PeriodVariants.Custom
        ? presetLabel
        : formatDashboardPeriodLabel(range),
    );
    this.isResetDisabled.set(
      period === this.initialPeriod && dashboardDateRangesEqual(range, this.initialDateRange),
    );
  }

  protected onWidgetAdd(widget: WidgetMeta): void {
    if (!widget.label) {
      return;
    }

    const newItem = this.findNextPosition(widget.type);
    this.setLayout([...this.layout(), newItem]);
    this.widgetsInfo.set(newItem.id, {
      label: widget.label,
      type: widget.type,
      isOnlyLifetime: widget.isOnlyLifetime || false,
    });
    this.updateDisplayedWidgets();
    this.syncCurrentState();
  }

  protected onWidgetDelete(widgetLabel: string): void {
    const itemId = findKeyByLabel(this.widgetsInfo, widgetLabel);
    const layoutItemToDelete = this.layout().find((item) => item.id === itemId);
    if (!layoutItemToDelete || !itemId) {
      console.error('Unable to find widget by provided label.');
      return;
    }

    this.widgetsInfo.delete(itemId);
    const layoutAfterDelete = this.layout().filter((item) => item.id !== itemId);
    this.setLayout(layoutAfterDelete);
    this.checkAndApplyDenseCompaction(this.layout());
    this.updateDisplayedWidgets();
    this.syncCurrentState();
  }

  protected onWidgetFailure(failedWidgetLabel: string): void {
    const itemKeyToRemove = findKeyByLabel(this.widgetsInfo, failedWidgetLabel);
    if (!itemKeyToRemove) {
      return;
    }

    this.widgetsInfo.delete(itemKeyToRemove);
    this.setLayout(this.layout().filter((item) => item.id !== itemKeyToRemove));
    const displayed = this.displayedWidgets$.getValue();
    this.displayedWidgets$.next(displayed.filter((label) => label !== failedWidgetLabel));
    this.syncCurrentState();
  }

  protected onWidgetDragStart(event: MouseEvent, gridItem: KtdGridItemComponent): void {
    gridItem.startDragManually(event);
  }

  protected handleWidgetDragStart(event: DragEvent): void {
    const widget = JSON.parse(event.dataTransfer?.getData('text/plain') || '{}') as WidgetMeta;
    if (!widget?.type) {
      return;
    }

    const size = widgetSize(widget.type);
    this.draggingWidgetData = { ...widget, w: size.w, h: size.h };
  }

  protected onGridDragEnter(event: DragEvent): void {
    event.preventDefault();
    this.lastDragEnterTarget = event.target;

    if (this.isDragging) {
      return;
    }

    this.isDragging = true;
    if (!this.draggingWidgetData) {
      return;
    }

    this.createPlaceholder(event);
  }

  protected onGridDragOver(event: DragEvent): void {
    event.preventDefault();

    if (!this.isDragging || !this.draggingWidgetData || !this.gridContainer) {
      return;
    }

    const gridRect = this.gridContainer.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - gridRect.left;
    const mouseY = event.clientY - gridRect.top;

    const cellWidth = gridRect.width / this.gridCols();
    const cellHeight = this.rowHeight();

    const gridX = Math.floor(mouseX / cellWidth);
    const gridY = Math.floor(mouseY / cellHeight);

    const currentLayout = this.layout();
    const placeholderIndex = currentLayout.findIndex((item) => item.id === 'placeholder-item');
    if (placeholderIndex === -1) {
      return;
    }

    const newLayout = [...currentLayout];
    const placeholder = { ...newLayout[placeholderIndex] };
    placeholder.x = Math.min(Math.max(0, gridX), this.gridCols() - placeholder.w);
    placeholder.y = Math.max(0, gridY);
    newLayout[placeholderIndex] = placeholder;
    this.setLayout(newLayout);
  }

  protected onGridDragLeave(event: DragEvent): void {
    if (
      !this.gridContainer?.nativeElement.contains(event.relatedTarget as Node) &&
      event.target === this.lastDragEnterTarget
    ) {
      this.isDragging = false;
      this.removePlaceholder();
    }
  }

  protected onGridDrop(event: DragEvent): void {
    event.preventDefault();

    if (!this.draggingWidgetData) {
      return;
    }

    const currentLayout = this.layout();
    const placeholderIndex = currentLayout.findIndex((item) => item.id === 'placeholder-item');
    if (placeholderIndex !== -1) {
      const placeholder = currentLayout[placeholderIndex];
      const newItem: CrmGridLayoutItem = {
        id: uuidv4(),
        x: placeholder.x,
        y: placeholder.y,
        w: placeholder.w,
        h: placeholder.h,
      };

      this.widgetsInfo.delete('placeholder-item');
      this.widgetsInfo.set(newItem.id, {
        label: this.draggingWidgetData.label,
        type: this.draggingWidgetData.type,
        isOnlyLifetime: this.draggingWidgetData.isOnlyLifetime || false,
      });

      const newLayout = currentLayout.filter((item) => item.id !== 'placeholder-item');
      newLayout.push(newItem);
      this.setLayout(newLayout);
      this.checkAndApplyDenseCompaction([...this.layout()]);
      this.updateDisplayedWidgets();
    }

    this.isDragging = false;
    this.draggingWidgetData = null;
    this.lastDragEnterTarget = null;
    this.syncCurrentState();
  }

  @HostListener('document:dragend')
  protected onDocumentDragEnd(): void {
    this.isDragging = false;
    this.draggingWidgetData = null;
    this.lastDragEnterTarget = null;
    this.removePlaceholder();
    this.checkAndApplyDenseCompaction(this.layout());
    this.updateDisplayedWidgets();
    this.syncCurrentState();
  }

  protected ktdGridOnDragStart(event: KtdDragStart): void {
    this.draggedItemId = event.layoutItem.id;
  }

  protected ktdGridOnDragEnd(event: KtdDragEnd): void {
    this.checkAndApplyDenseCompaction(event.layout);
    this.updateDisplayedWidgets();
    this.syncCurrentState();
  }

  protected findNextPosition(widgetType: WidgetType): KtdGridLayoutItem {
    const { w, h } = widgetSize(widgetType);
    const layout = this.layout();
    const occupied = new Set<string>();

    layout.forEach((item) => {
      for (let dx = 0; dx < item.w; dx++) {
        for (let dy = 0; dy < item.h; dy++) {
          occupied.add(`${item.x + dx},${item.y + dy}`);
        }
      }
    });

    for (let y = 0; ; y++) {
      for (let x = 0; x <= this.gridCols() - w; x++) {
        let valid = true;

        for (let dx = 0; dx < w; dx++) {
          for (let dy = 0; dy < h; dy++) {
            if (occupied.has(`${x + dx},${y + dy}`)) {
              valid = false;
              break;
            }
          }
          if (!valid) {
            break;
          }
        }

        if (valid) {
          return { id: uuidv4(), x, y, w, h };
        }
      }
    }
  }

  private createPlaceholder(event: DragEvent): void {
    if (!this.draggingWidgetData || !this.gridContainer) {
      return;
    }

    const { w, h } = this.draggingWidgetData;
    if (!w || !h) {
      return;
    }

    const gridRect = this.gridContainer.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - gridRect.left;
    const mouseY = event.clientY - gridRect.top;

    const cellWidth = gridRect.width / this.gridCols();
    const cellHeight = this.rowHeight();

    const gridX = Math.floor(mouseX / cellWidth);
    const gridY = Math.floor(mouseY / cellHeight);

    const placeholderItem: CrmGridLayoutItem = {
      isPlaceholder: true,
      id: 'placeholder-item',
      x: Math.min(Math.max(0, gridX), this.gridCols() - w),
      y: Math.max(0, gridY),
      w,
      h,
    };

    this.removePlaceholder();
    this.setLayout([...this.layout(), placeholderItem]);
    this.widgetsInfo.set('placeholder-item', {
      label: 'Placeholder',
      type: 'placeholder',
      isOnlyLifetime: false,
    });
  }

  private removePlaceholder(): void {
    const currentLayout = this.layout();
    const newLayout = currentLayout.filter((item) => item.id !== 'placeholder-item');
    if (newLayout.length !== currentLayout.length) {
      this.setLayout(newLayout);
      this.widgetsInfo.delete('placeholder-item');
    }
    this.syncCurrentState();
  }

  private updateDisplayedWidgets(): void {
    this.displayedWidgets$.next(
      Array.from(this.widgetsInfo.values())
        .map((info) => info.label || '')
        .filter((label) => label && label !== 'Placeholder'),
    );
  }

  private checkAndApplyDenseCompaction(layout: KtdGridLayout): void {
    const compacted = rowAutoFlowCompact(
      rowAutoFlowCompact(layout, this.gridCols(), this.draggedItemId || undefined),
      this.gridCols(),
    );
    this.setLayout(compacted);
    this.draggedItemId = null;
  }

  private buildWidgetsFingerprint(widgetsInfo: WidgetInfoMap): string {
    const layout = this.layout();
    return Array.from(widgetsInfo.entries())
      .filter(([id]) => id !== 'placeholder-item')
      .map(([id, widget]) => {
        const layoutForWidget = layout.find((item) => item.id === id);
        return `${widget.type}|${widget.label ?? ''}|${widget.isOnlyLifetime ? 1 : 0}|${layoutForWidget?.x}|${layoutForWidget?.y}`;
      })
      .sort()
      .join(';;');
  }

  private syncCurrentState(): void {
    this.currentStateHash.set(this.buildWidgetsFingerprint(this.widgetsInfo));
  }
}
