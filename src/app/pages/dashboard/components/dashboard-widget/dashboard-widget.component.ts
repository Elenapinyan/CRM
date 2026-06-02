import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { WidgetInfo } from '../../../../shared/dashboard/widget-info';
import { WidgetType } from '../../../../shared/dashboard/widget-type.enum';
import { buildChartOptions, type ChartWidgetData, type MetricWidgetData } from '../../data/dashboard-mock-data';
import {
  DASHBOARD_WIDGET_LABELS,
  isComplianceMetricWidget,
  isNetDepositChartWidget,
} from '../../data/dashboard-widget-catalog';
import { ModalService, type PeriodVariantType } from '@platform-workspace/design-system-v2';

import {
  NetDepositExpandModalComponent,
  type NetDepositExpandModalData,
} from '../net-deposit-expand-modal/net-deposit-expand-modal.component';
import { DashboardMockService, type DashboardDateRangeBounds } from '../../services/dashboard-mock.service';

@Component({
  selector: 'app-dashboard-widget',
  imports: [],
  templateUrl: './dashboard-widget.component.html',
  styleUrl: './dashboard-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardWidgetComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartHost') chartHost?: ElementRef<HTMLDivElement>;

  readonly widgetInfo = input<WidgetInfo>();
  readonly isCustomizing = input(false);
  readonly periodLabel = input('Today');
  readonly periodRange = input<DashboardDateRangeBounds | null>(null);
  readonly selectedPeriod = input<PeriodVariantType | null>(null);

  readonly dragStart = output<MouseEvent>();
  readonly widgetDelete = output<string>();
  readonly innerError = output<string>();

  private readonly dashboardService = inject(DashboardMockService);
  private readonly modalService = inject(ModalService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);

  protected readonly widgetType = WidgetType;
  protected readonly isLoaded = signal(false);
  protected readonly metricData = signal<MetricWidgetData | null>(null);
  protected readonly chartData = signal<ChartWidgetData | null>(null);

  protected readonly displayLabel = computed(() => {
    const key = this.widgetInfo()?.label;
    return key ? DASHBOARD_WIDGET_LABELS[key] ?? key : 'Widget';
  });

  protected readonly isPairMetric = computed(() => Boolean(this.metricData()?.pairValues?.length));

  protected readonly isComplianceMetric = computed(() => isComplianceMetricWidget(this.widgetInfo()?.label));

  protected readonly isNetDepositChart = computed(() => isNetDepositChartWidget(this.widgetInfo()?.label));

  protected readonly netDepositYAxisLabel = computed(
    () => this.chartData()?.yAxisLabel ?? 'Amount, €',
  );

  protected readonly isChartWidget = computed(() => this.widgetInfo()?.type === WidgetType.CHART);

  protected readonly isPositiveDelta = computed(() =>
    (this.metricData()?.difference ?? '').trim().startsWith('+'),
  );

  protected readonly metricPeriodLabel = computed(() => {
    const data = this.metricData();
    return data?.isOnlyLifetime ? 'Lifetime' : this.periodLabel();
  });

  private chartInstance?: {
    dispose(): void;
    resize(): void;
    setOption(option: unknown, opts?: { notMerge?: boolean }): void;
  };
  private resizeObserver?: ResizeObserver;
  private chartRenderPending = false;

  constructor() {
    effect(() => {
      if (!this.isLoaded() || !this.isChartWidget() || !this.chartData()) {
        return;
      }

      this.scheduleChartRender();
    });

    effect((onCleanup) => {
      const label = this.widgetInfo()?.label;
      const range = this.periodRange();
      if (!label || !range) {
        return;
      }

      const subscription = this.dashboardService.getWidgetData(label, range).subscribe({
        next: (data) => {
          const isChart = this.widgetInfo()?.type === WidgetType.CHART;
          if (isChart) {
            this.chartData.set(data as ChartWidgetData);
          } else {
            this.metricData.set(data as MetricWidgetData);
          }
          this.isLoaded.set(true);
          this.cdr.markForCheck();
          if (isChart) {
            this.scheduleChartRender();
          }
        },
        error: () => {
          this.innerError.emit(label);
          this.isLoaded.set(true);
          this.cdr.markForCheck();
        },
      });

      onCleanup(() => subscription.unsubscribe());
    });
  }

  ngAfterViewInit(): void {
    const host = this.chartHost?.nativeElement;
    if (!host) {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      if (!this.isLoaded() || !this.isChartWidget() || !this.chartData()) {
        return;
      }

      if (this.chartInstance) {
        const host = this.chartHost?.nativeElement;
        if (host && host.clientHeight < 16) {
          this.disposeChart();
          void this.renderChart();
          return;
        }

        this.chartInstance.resize();
        return;
      }

      this.scheduleChartRender();
    });
    this.resizeObserver.observe(host);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.disposeChart();
  }

  protected onDelete(): void {
    const label = this.widgetInfo()?.label;
    if (label) {
      this.widgetDelete.emit(label);
    }
  }

  protected onExpandNetDeposit(): void {
    if (!this.isNetDepositChart()) {
      return;
    }

    this.modalService
      .open<NetDepositExpandModalData>(NetDepositExpandModalComponent, {
        modalData: {
          periodLabel: this.periodLabel(),
          selectedPeriod: this.selectedPeriod(),
          periodRange: this.periodRange(),
        },
        settings: {
          keyboard: true,
          backdrop: true,
          centered: true,
          scrollable: false,
          size: 'xl',
          windowClass: 'net-deposit-expand-modal ds-component',
          backdropClass: 'ds-component',
        },
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  private scheduleChartRender(): void {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        void this.renderChart();
      });
    });
  }

  private async renderChart(attempt = 0): Promise<void> {
    if (this.chartRenderPending) {
      return;
    }

    const host = this.chartHost?.nativeElement;
    const data = this.chartData();
    if (!host || !data || !this.isChartWidget()) {
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
      chart.setOption(buildChartOptions(data), { notMerge: true });
      requestAnimationFrame(() => chart.resize());
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
