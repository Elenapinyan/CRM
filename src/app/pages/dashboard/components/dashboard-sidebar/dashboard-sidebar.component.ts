import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, OnInit, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import type { WidgetMeta } from '../../../../shared/dashboard/widget-meta';
import {
  DASHBOARD_CATEGORY_LABELS,
  DASHBOARD_WIDGET_CATALOG,
  DASHBOARD_WIDGET_LABELS,
} from '../../data/dashboard-widget-catalog';
import { DashboardMockService } from '../../services/dashboard-mock.service';
import {
  DashboardSidebarWidgetCardComponent,
  type SidebarWidgetItem,
} from '../dashboard-sidebar-widget-card/dashboard-sidebar-widget-card.component';

type WidgetGroup = { categoryLabel: string; widgets: SidebarWidgetItem[] };

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [ReactiveFormsModule, DashboardSidebarWidgetCardComponent],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSidebarComponent implements OnInit {
  readonly displayedWidgets$ = input.required<BehaviorSubject<string[]>>();

  readonly plusClick = output<WidgetMeta>();
  readonly dragStart = output<DragEvent>();

  private readonly dashboardService = inject(DashboardMockService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly quickSearchControl = new FormControl('', { nonNullable: true });
  protected readonly isLoaded = signal(false);
  protected readonly availableWidgets = signal<SidebarWidgetItem[]>([]);

  protected readonly groupedWidgets = computed<WidgetGroup[]>(() => {
    const search = this.quickSearchControl.value.trim().toLowerCase();
    const displayed = new Set(this.displayedWidgets$().getValue());
    const widgets = this.availableWidgets().filter((w) => {
      if (displayed.has(w.meta.label)) {
        return false;
      }
      if (!search) {
        return true;
      }
      return w.displayLabel.toLowerCase().includes(search);
    });

    const groups = new Map<string, SidebarWidgetItem[]>();
    widgets.forEach((widget) => {
      const list = groups.get(widget.categoryLabel) ?? [];
      list.push(widget);
      groups.set(widget.categoryLabel, list);
    });

    return Array.from(groups.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([categoryLabel, items]) => ({
        categoryLabel,
        widgets: items.sort((a, b) => a.displayLabel.localeCompare(b.displayLabel)),
      }));
  });

  ngOnInit(): void {
    this.dashboardService
      .getWidgetsList()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((catalog) => {
        const items = catalog.map((meta) => ({
          meta,
          displayLabel: DASHBOARD_WIDGET_LABELS[meta.label] ?? meta.label,
          categoryLabel: DASHBOARD_CATEGORY_LABELS[meta.category],
        }));
        this.availableWidgets.set(items.length ? items : this.fallbackCatalog());
        this.isLoaded.set(true);
      });

    this.displayedWidgets$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        // Trigger recomputation when displayed set changes.
        this.availableWidgets.update((items) => [...items]);
      });
  }

  protected onPlusClick(meta: WidgetMeta): void {
    this.plusClick.emit(meta);
    const displayed = this.displayedWidgets$().getValue();
    if (!displayed.includes(meta.label)) {
      this.displayedWidgets$().next([...displayed, meta.label]);
    }
  }

  private fallbackCatalog(): SidebarWidgetItem[] {
    return DASHBOARD_WIDGET_CATALOG.map((meta) => ({
      meta,
      displayLabel: DASHBOARD_WIDGET_LABELS[meta.label] ?? meta.label,
      categoryLabel: DASHBOARD_CATEGORY_LABELS[meta.category],
    }));
  }
}
