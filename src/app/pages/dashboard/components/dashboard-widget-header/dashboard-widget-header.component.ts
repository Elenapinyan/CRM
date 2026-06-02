import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dashboard-widget-header',
  templateUrl: './dashboard-widget-header.component.html',
  styleUrl: './dashboard-widget-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardWidgetHeaderComponent {
  readonly label = input.required<string>();
  readonly periodLabel = input('Today');
  readonly isCustomizing = input(false);
  readonly showInfo = input(true);

  readonly dragStart = output<MouseEvent>();
  readonly deleteWidget = output<void>();
}
