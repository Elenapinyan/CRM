import type { WidgetType } from './widget-type.enum';

export type DashboardItem = {
  label: string;
  type: WidgetType;
  isOnlyLifetime?: boolean;
  position: { column: number; row: number };
  size: { width: number; height: number };
};
