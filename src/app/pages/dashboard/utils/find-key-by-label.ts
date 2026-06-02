import type { WidgetInfoMap } from '../../../shared/dashboard/widget-info';

export function findKeyByLabel(widgetsInfo: WidgetInfoMap, label: string | null): string | undefined {
  if (!label) {
    return undefined;
  }

  for (const [key, info] of widgetsInfo.entries()) {
    if (info.label === label) {
      return key;
    }
  }

  return undefined;
}
