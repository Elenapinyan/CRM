import { WidgetType } from './widget-type.enum';

export type WidgetSizeObject = { w: number; h: number };

export function widgetSize(type: WidgetType): WidgetSizeObject {
  switch (type) {
    case WidgetType.TABLE:
      return { w: 4, h: 2 };
    case WidgetType.CHART:
      return { w: 2, h: 2 };
    case WidgetType.VALUE:
    case WidgetType.PAIR_VALUE:
    default:
      return { w: 1, h: 1 };
  }
}
