import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  computed,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged, filter } from 'rxjs';
import { NgbDateStruct, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {
  ngbDateToDate,
  PeriodVariants,
  type DatetimeRange,
  type ModalWithData,
  type PeriodVariantType,
} from '@platform-workspace/design-system-v2';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridOptions, ICellRendererParams } from 'ag-grid-community';

import { rmTheme } from '../../../../ag-grid/rm-grid.theme';
import { DashboardPeriodDatepickerComponent } from '../dashboard-period-datepicker/dashboard-period-datepicker.component';
import { DASHBOARD_DEFAULT_PERIOD } from '../../data/dashboard-period-options';
import {
  buildChartOptions,
  buildNetDepositChartForDateRange,
  netDepositDateRangeSeed,
  type ChartWidgetData,
} from '../../data/dashboard-mock-data';
import type { DashboardDateRangeBounds } from '../../services/dashboard-mock.service';
import { boundsToDatetimeRange, getDashboardDateRangeForPeriod } from '../../utils/dashboard-date-range.util';
import {
  type NetDepositDepositRow,
  type NetDepositDetailsTab,
  type NetDepositSummaryMetric,
  type NetDepositWithdrawalRow,
  buildNetDepositDepositRows,
  buildNetDepositSummaryMetrics,
  buildNetDepositWithdrawalRows,
} from '../../data/net-deposit-details.mock';

export interface NetDepositExpandModalData {
  periodLabel?: string;
  selectedPeriod?: PeriodVariantType | null;
  periodRange?: DashboardDateRangeBounds | null;
}

function usernameCellRenderer(params: ICellRendererParams): HTMLElement {
  const a = document.createElement('a');
  a.className = 'net-deposit-expand-modal__username-link';
  a.href = '#';
  a.textContent = String(params.value ?? '');
  return a;
}

function formatCurrency(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) {
    return '';
  }

  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

@Component({
  selector: 'app-net-deposit-expand-modal',
  imports: [AgGridAngular, ReactiveFormsModule, DashboardPeriodDatepickerComponent],
  templateUrl: './net-deposit-expand-modal.component.html',
  styleUrl: './net-deposit-expand-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetDepositExpandModalComponent
  implements ModalWithData<NetDepositExpandModalData>, OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('chartHost') chartHost?: ElementRef<HTMLDivElement>;

  @Input({ required: true }) modalData!: NetDepositExpandModalData;
  @Input() modalSettings?: NgbModalOptions;
  @Input({ required: true }) closeAction!: () => void;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly selectedPeriod = signal<PeriodVariantType | null>(DASHBOARD_DEFAULT_PERIOD);
  protected readonly dateRangeControl = new FormControl<DatetimeRange<NgbDateStruct> | null>(null);
  protected readonly summaryMetrics = signal<NetDepositSummaryMetric[]>([]);
  protected readonly chartYAxisLabel = 'Amount, €';

  protected readonly activeTab = signal<NetDepositDetailsTab>('deposits');

  protected readonly depositRows = buildNetDepositDepositRows();
  protected readonly withdrawalRows = buildNetDepositWithdrawalRows();

  protected readonly chartData = signal<ChartWidgetData | null>(null);

  protected readonly rowData = computed(() =>
    this.activeTab() === 'deposits' ? this.depositRows : this.withdrawalRows,
  );

  protected readonly columnDefs = computed((): ColDef[] => {
    if (this.activeTab() === 'deposits') {
      return this.depositColumnDefs;
    }

    return this.withdrawalColumnDefs;
  });

  protected readonly gridOptions: GridOptions = {
    theme: rmTheme,
    suppressCellFocus: true,
    rowHeight: 48,
    headerHeight: 52,
    defaultColDef: {
      sortable: true,
      filter: false,
      resizable: true,
    },
  };

  private readonly depositColumnDefs: ColDef<NetDepositDepositRow>[] = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 120 },
    {
      field: 'username',
      headerName: 'Username',
      flex: 1,
      minWidth: 120,
      cellRenderer: usernameCellRenderer,
    },
    { field: 'lastDepositDate', headerName: 'Last deposit date', flex: 1, minWidth: 160 },
    {
      field: 'depositsCount',
      headerName: 'Deposits count',
      flex: 1,
      minWidth: 120,
      type: 'rightAligned',
    },
    {
      field: 'totalDepositEur',
      headerName: 'Total deposit, €',
      flex: 1,
      minWidth: 130,
      type: 'rightAligned',
      valueFormatter: (params) => formatCurrency(params.value as number),
    },
    {
      field: 'avgDepositEur',
      headerName: 'Avg deposit, €',
      flex: 1,
      minWidth: 120,
      type: 'rightAligned',
      valueFormatter: (params) => formatCurrency(params.value as number),
    },
  ];

  private readonly withdrawalColumnDefs: ColDef<NetDepositWithdrawalRow>[] = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 160 },
    {
      field: 'username',
      headerName: 'Username',
      flex: 1,
      minWidth: 160,
      cellRenderer: usernameCellRenderer,
    },
    { field: 'lastDepositDate', headerName: 'Last deposit date', flex: 1, minWidth: 200 },
    {
      field: 'totalWithdrawalEur',
      headerName: 'Total withdrawal, €',
      flex: 1,
      minWidth: 180,
      type: 'rightAligned',
      valueFormatter: (params) => formatCurrency(params.value as number),
    },
  ];

  private chartInstance?: {
    dispose(): void;
    resize(): void;
    setOption(option: unknown, opts?: { notMerge?: boolean }): void;
  };
  private resizeObserver?: ResizeObserver;
  private chartRenderPending = false;

  constructor() {
    this.dateRangeControl.valueChanges
      .pipe(
        filter(
          (range): range is DatetimeRange<NgbDateStruct> =>
            !!range?.date?.dateFrom && !!range?.date?.dateTo,
        ),
        distinctUntilChanged(
          (prev, next) =>
            JSON.stringify(prev?.date) === JSON.stringify(next?.date) &&
            JSON.stringify(prev?.time) === JSON.stringify(next?.time),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((range) => this.onDateRangeConfirmed(range));
  }

  ngOnInit(): void {
    this.initializePeriodFromModalData();
  }

  ngAfterViewInit(): void {
    const host = this.chartHost?.nativeElement;
    if (!host) {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      if (this.chartInstance) {
        this.chartInstance.resize();
        return;
      }

      void this.renderChart();
    });
    this.resizeObserver.observe(host);
    void this.renderChart();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.disposeChart();
  }

  protected onClose(): void {
    this.closeAction();
  }

  protected selectTab(tab: NetDepositDetailsTab): void {
    this.activeTab.set(tab);
  }

  protected onSelectedPeriodChange(period: PeriodVariantType | null): void {
    this.selectedPeriod.set(period);

    if (period === PeriodVariants.Lifetime) {
      this.applyDateRange(new Date(2020, 0, 1), new Date());
      return;
    }

    if (!period || period === PeriodVariants.Custom) {
      return;
    }

    const range = getDashboardDateRangeForPeriod(period);
    if (!range) {
      return;
    }

    this.dateRangeControl.setValue(range, { emitEvent: false });
    this.onDateRangeConfirmed(range);
  }

  protected onDateRangeConfirmed(range: DatetimeRange | null): void {
    const dateFrom = range?.date?.dateFrom;
    const dateTo = range?.date?.dateTo;
    if (!dateFrom || !dateTo) {
      if (this.selectedPeriod() === PeriodVariants.Lifetime) {
        this.applyDateRange(new Date(2020, 0, 1), new Date());
      }
      return;
    }

    this.selectedPeriod.set(PeriodVariants.Custom);

    const from = ngbDateToDate(dateFrom as NgbDateStruct);
    const to = ngbDateToDate(dateTo as NgbDateStruct);
    if (!from || !to) {
      return;
    }

    this.applyDateRange(from, to);
  }

  private initializePeriodFromModalData(): void {
    const period = this.modalData?.selectedPeriod ?? DASHBOARD_DEFAULT_PERIOD;
    this.selectedPeriod.set(period);

    const bounds = this.modalData?.periodRange;
    if (bounds) {
      const range = boundsToDatetimeRange(bounds);
      this.dateRangeControl.setValue(range, { emitEvent: false });
      this.applyDateRange(bounds.from, bounds.to);
      return;
    }

    if (period === PeriodVariants.Lifetime) {
      this.applyDateRange(new Date(2020, 0, 1), new Date());
      return;
    }

    const presetRange = getDashboardDateRangeForPeriod(period);
    if (presetRange) {
      this.dateRangeControl.setValue(presetRange, { emitEvent: false });
      const from = ngbDateToDate(presetRange.date.dateFrom);
      const to = ngbDateToDate(presetRange.date.dateTo);
      if (from && to) {
        this.applyDateRange(from, to);
      }
    }
  }

  private applyDateRange(from: Date, to: Date): void {
    const start = from.getTime() <= to.getTime() ? from : to;
    const end = from.getTime() <= to.getTime() ? to : from;
    const seed = netDepositDateRangeSeed(start, end);

    this.chartData.set(buildNetDepositChartForDateRange(start, end));
    this.summaryMetrics.set(buildNetDepositSummaryMetrics(seed));
    this.cdr.markForCheck();

    if (this.chartHost?.nativeElement) {
      void this.renderChart();
    }
  }

  private async renderChart(attempt = 0): Promise<void> {
    if (this.chartRenderPending) {
      return;
    }

    const host = this.chartHost?.nativeElement;
    const data = this.chartData();
    if (!host || !data) {
      return;
    }

    if (host.clientHeight < 16 || host.clientWidth < 16) {
      if (attempt < 24) {
        requestAnimationFrame(() => void this.renderChart(attempt + 1));
      }
      return;
    }

    this.chartRenderPending = true;

    try {
      const echarts = await import('echarts');
      this.disposeChart();
      const chart = echarts.init(host, undefined, { renderer: 'canvas' });
      chart.setOption(buildChartOptions(data, { netDepositVariant: 'expanded' }), { notMerge: true });
      requestAnimationFrame(() => {
        chart.resize();
        this.cdr.markForCheck();
      });
      this.chartInstance = chart;
    } finally {
      this.chartRenderPending = false;
    }
  }

  private disposeChart(): void {
    this.chartInstance?.dispose();
    this.chartInstance = undefined;
  }
}
