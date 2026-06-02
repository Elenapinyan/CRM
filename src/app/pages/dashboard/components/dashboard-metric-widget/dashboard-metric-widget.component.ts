import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import type { MetricWidgetData } from '../../data/dashboard-mock-data';
import { DashboardWidgetHeaderComponent } from '../dashboard-widget-header/dashboard-widget-header.component';

@Component({
  selector: 'app-dashboard-metric-widget',
  imports: [DashboardWidgetHeaderComponent],
  templateUrl: './dashboard-metric-widget.component.html',
  styleUrl: './dashboard-metric-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMetricWidgetComponent {
  readonly label = input.required<string>();
  readonly data = input.required<MetricWidgetData>();
  readonly isCustomizing = input(false);
  readonly periodLabel = input('Today');

  readonly dragStart = output<MouseEvent>();
  readonly deleteWidget = output<void>();

  protected readonly isPair = computed(() => Boolean(this.data().pairValues?.length));
  protected readonly isPositiveDelta = computed(() => (this.data().difference ?? '').trim().startsWith('+'));
}
