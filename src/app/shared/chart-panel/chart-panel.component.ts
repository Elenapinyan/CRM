import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { EChartsCoreOption } from 'echarts/core';
import { NgxEchartsDirective } from 'ngx-echarts';

@Component({
  selector: 'app-chart-panel',
  imports: [NgxEchartsDirective],
  template: ` <div echarts [options]="options" class="chart-panel__host"></div> `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .chart-panel__host {
        height: 320px;
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartPanelComponent {
  @Input() options: EChartsCoreOption = {
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: { type: 'value' },
    series: [{ type: 'line', smooth: true, data: [120, 200, 150, 80, 70, 110, 130] }],
  };
}
