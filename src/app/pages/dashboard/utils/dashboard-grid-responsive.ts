import type { KtdGridLayout } from '@katoid/angular-grid-layout';

import { rowAutoFlowCompact } from './grid-compact-layout';

/** Breakpoints aligned with dashboard reference HTML. */
export const DASHBOARD_GRID_BREAKPOINTS = {
  desktop: 1025,
  tablet: 768,
  mobile: 480,
  narrow: 360,
} as const;

export function getDashboardGridCols(containerWidth: number): number {
  if (containerWidth <= DASHBOARD_GRID_BREAKPOINTS.narrow) {
    return 1;
  }

  if (containerWidth <= DASHBOARD_GRID_BREAKPOINTS.mobile) {
    return 2;
  }

  if (containerWidth <= DASHBOARD_GRID_BREAKPOINTS.tablet) {
    return 2;
  }

  if (containerWidth < DASHBOARD_GRID_BREAKPOINTS.desktop) {
    return 2;
  }

  return 4;
}

export function getDashboardRowHeight(containerWidth: number): number {
  if (containerWidth <= DASHBOARD_GRID_BREAKPOINTS.mobile) {
    return 120;
  }

  if (containerWidth <= DASHBOARD_GRID_BREAKPOINTS.tablet) {
    return 130;
  }

  return 140;
}

export function adaptLayoutToCols(layout: KtdGridLayout, columnsCount: number): KtdGridLayout {
  const normalized = layout
    .filter((item) => item.id !== 'placeholder-item')
    .map((item) => {
      const w = Math.max(1, Math.min(item.w, columnsCount));
      const x = Math.min(Math.max(0, item.x), Math.max(0, columnsCount - w));

      return { ...item, w, x };
    });

  return rowAutoFlowCompact(normalized, columnsCount);
}
