import type { KtdGridLayout } from '@katoid/angular-grid-layout';

import type { DashboardItem } from '../../../shared/dashboard/dashboard-item.type';
import type { WidgetInfoMap } from '../../../shared/dashboard/widget-info';
import { WidgetType } from '../../../shared/dashboard/widget-type.enum';

export function gridLayoutAdapter(layout: KtdGridLayout, widgetsInfo: WidgetInfoMap): DashboardItem[] {
  return layout
    .filter((item) => item.id !== 'placeholder-item')
    .map((item) => ({
      position: { column: item.x, row: item.y },
      size: { width: item.w, height: item.h },
      label: widgetsInfo.get(item.id)?.label || '',
      type: (widgetsInfo.get(item.id)?.type as WidgetType) || WidgetType.VALUE,
      isOnlyLifetime: widgetsInfo.get(item.id)?.isOnlyLifetime || false,
    }));
}
