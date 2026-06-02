import type { DashboardItem } from '../../../shared/dashboard/dashboard-item.type';
import { WidgetType } from '../../../shared/dashboard/widget-type.enum';

/** Default layout aligned with Figma dashboard frame (948:25088). */
export const DASHBOARD_DEFAULT_LAYOUT: DashboardItem[] = [
  { label: 'newPlayers', type: WidgetType.PAIR_VALUE, position: { column: 0, row: 0 }, size: { width: 1, height: 1 } },
  { label: 'activePlayers', type: WidgetType.PAIR_VALUE, position: { column: 1, row: 0 }, size: { width: 1, height: 1 } },
  { label: 'registrations', type: WidgetType.VALUE, position: { column: 2, row: 0 }, size: { width: 1, height: 1 } },
  { label: 'loginRate', type: WidgetType.PAIR_VALUE, position: { column: 3, row: 0 }, size: { width: 1, height: 1 } },
  { label: 'amountDeposits', type: WidgetType.CHART, position: { column: 0, row: 1 }, size: { width: 2, height: 2 } },
  { label: 'sentMessages', type: WidgetType.CHART, position: { column: 2, row: 1 }, size: { width: 2, height: 2 } },
  { label: 'registrationsOverTime', type: WidgetType.CHART, position: { column: 0, row: 3 }, size: { width: 2, height: 2 } },
  { label: 'triggeredCampaigns', type: WidgetType.CHART, position: { column: 2, row: 3 }, size: { width: 2, height: 2 } },
  { label: 'workflowStatuses', type: WidgetType.CHART, position: { column: 0, row: 5 }, size: { width: 2, height: 2 } },
  { label: 'conversionClickRate', type: WidgetType.CHART, position: { column: 2, row: 5 }, size: { width: 2, height: 2 } },
  { label: 'overallStatuses', type: WidgetType.CHART, position: { column: 0, row: 7 }, size: { width: 2, height: 2 } },
  { label: 'depositsWithdrawals', type: WidgetType.CHART, position: { column: 2, row: 7 }, size: { width: 2, height: 2 } },
  { label: 'ftdCount', type: WidgetType.VALUE, isOnlyLifetime: true, position: { column: 0, row: 9 }, size: { width: 1, height: 1 } },
  { label: 'ftdAmount', type: WidgetType.VALUE, isOnlyLifetime: true, position: { column: 1, row: 9 }, size: { width: 1, height: 1 } },
  { label: 'countrySegmentation', type: WidgetType.CHART, position: { column: 2, row: 9 }, size: { width: 2, height: 2 } },
];
