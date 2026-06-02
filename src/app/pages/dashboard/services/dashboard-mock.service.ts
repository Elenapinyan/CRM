import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import type { DashboardItem } from '../../../shared/dashboard/dashboard-item.type';
import type { WidgetMeta } from '../../../shared/dashboard/widget-meta';
import { DASHBOARD_DEFAULT_LAYOUT } from '../data/dashboard-default-layout';
import { DASHBOARD_WIDGET_CATALOG } from '../data/dashboard-widget-catalog';
import {
  getChartWidgetData,
  getChartWidgetDataForDateRange,
  getMetricWidgetData,
  getMetricWidgetDataForDateRange,
  type ChartWidgetData,
  type MetricWidgetData,
} from '../data/dashboard-mock-data';

export type DashboardDateRangeBounds = { from: Date; to: Date };

const STORAGE_KEY = 'crm-prototype-dashboard-layout';

@Injectable({ providedIn: 'root' })
export class DashboardMockService {
  getWidgetsList(): Observable<WidgetMeta[]> {
    return of(DASHBOARD_WIDGET_CATALOG).pipe(delay(120));
  }

  getMyDashboard(): Observable<DashboardItem[]> {
    const stored = this.readStoredLayout();
    const layout = this.normalizeLayout(stored ?? DASHBOARD_DEFAULT_LAYOUT);
    return of(layout).pipe(delay(150));
  }

  saveMyDashboard(items: DashboardItem[]): Observable<void> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return of(void 0).pipe(delay(200));
  }

  getWidgetData(
    label: string,
    range?: DashboardDateRangeBounds,
  ): Observable<MetricWidgetData | ChartWidgetData> {
    const meta = DASHBOARD_WIDGET_CATALOG.find((w) => w.label === label);
    if (meta?.type === 'CHART') {
      const data = range
        ? getChartWidgetDataForDateRange(label, range.from, range.to)
        : getChartWidgetData(label);
      return of(data).pipe(delay(80));
    }

    const data = range
      ? getMetricWidgetDataForDateRange(label, range.from, range.to)
      : getMetricWidgetData(label);
    return of(data).pipe(delay(80));
  }

  private readStoredLayout(): DashboardItem[] | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return null;
      }
      return JSON.parse(raw) as DashboardItem[];
    } catch {
      return null;
    }
  }

  /** Reconcile stored layouts with current catalog metadata (types, lifetime flags). */
  private normalizeLayout(items: DashboardItem[]): DashboardItem[] {
    return items.map((item) => {
      const meta = DASHBOARD_WIDGET_CATALOG.find((widget) => widget.label === item.label);
      if (!meta) {
        return item;
      }

      return {
        ...item,
        type: meta.type,
        isOnlyLifetime: meta.isOnlyLifetime ?? item.isOnlyLifetime,
      };
    });
  }
}
