import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

import type { WidgetMeta } from '../../../../shared/dashboard/widget-meta';
import { DASHBOARD_WIDGET_LABELS } from '../../data/dashboard-widget-catalog';

export type SidebarWidgetItem = {
  meta: WidgetMeta;
  displayLabel: string;
  categoryLabel: string;
};

@Component({
  selector: 'app-dashboard-sidebar-widget-card',
  templateUrl: './dashboard-sidebar-widget-card.component.html',
  styleUrl: './dashboard-sidebar-widget-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSidebarWidgetCardComponent {
  readonly widget = input.required<SidebarWidgetItem>();

  readonly plusClick = output<WidgetMeta>();
  readonly dragStart = output<DragEvent>();

  protected readonly isDragging = signal(false);

  protected onDragStart(event: DragEvent): void {
    this.isDragging.set(true);
    event.dataTransfer?.setData('text/plain', JSON.stringify(this.widget().meta));
    event.dataTransfer!.effectAllowed = 'move';
    this.dragStart.emit(event);
  }

  protected onDragEnd(): void {
    this.isDragging.set(false);
  }

  protected onPlusClick(event: MouseEvent): void {
    event.stopPropagation();
    this.plusClick.emit(this.widget().meta);
  }

  protected label(): string {
    return DASHBOARD_WIDGET_LABELS[this.widget().meta.label] ?? this.widget().meta.label;
  }
}
