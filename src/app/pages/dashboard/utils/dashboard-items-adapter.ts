import { v4 as uuidv4 } from 'uuid';

import type { DashboardItem } from '../../../shared/dashboard/dashboard-item.type';
import { widgetSize } from '../../../shared/dashboard/widget-size';
import { WidgetType } from '../../../shared/dashboard/widget-type.enum';
import type { CrmGridLayoutItem } from '../types/crm-grid-layout-item.type';

export function dashboardItemsAdapter(items: DashboardItem[]): CrmGridLayoutItem[] {
  return items.map((item) => {
    const size = widgetSize((item.type as WidgetType) || WidgetType.VALUE);
    return {
      id: uuidv4(),
      x: item.position.column,
      y: item.position.row,
      w: item.size.width || size.w,
      h: item.size.height || size.h,
      label: item.label,
      type: item.type,
      isOnlyLifetime: item.isOnlyLifetime,
    };
  });
}
