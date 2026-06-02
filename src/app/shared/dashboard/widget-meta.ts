import type { WidgetCategory } from './widget-category.enum';
import type { WidgetType } from './widget-type.enum';

export type WidgetMeta = {
  label: string;
  type: WidgetType;
  category: WidgetCategory;
  isOnlyLifetime: boolean;
  w?: number;
  h?: number;
};
