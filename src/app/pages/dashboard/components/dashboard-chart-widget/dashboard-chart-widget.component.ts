import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import type { EChartsCoreOption } from 'echarts/core';
import { NgxEchartsDirective } from 'ngx-echarts';

import { buildChartOptions, type ChartWidgetData } from '../../data/dashboard-mock-data';
import { DashboardWidgetHeaderComponent } from '../dashboard-widget-header/dashboard-widget-header.component';

@Component({
  selector: 'app-dashboard-chart-widget',
  imports: [DashboardWidgetHeaderComponent, NgxEchartsDirective],
  templateUrl: './dashboard-chart-widget.component.html',
  styleUrl: './dashboard-chart-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardChartWidgetComponent {
  readonly label = input.required<string>();
  readonly data = input.required<ChartWidgetData>();
  readonly isCustomizing = input(false);
  readonly periodLabel = input('Today');

  readonly dragStart = output<MouseEvent>();
  readonly deleteWidget = output<void>();

  protected readonly chartOptions = computed<EChartsCoreOption>(() => buildChartOptions(this.data()));
}
