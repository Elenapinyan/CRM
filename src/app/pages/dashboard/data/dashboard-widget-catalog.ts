import { WidgetCategory } from '../../../shared/dashboard/widget-category.enum';
import type { WidgetMeta } from '../../../shared/dashboard/widget-meta';
import { WidgetType } from '../../../shared/dashboard/widget-type.enum';

/** Top-row compliance metrics (Figma widget node 1057:12277). */
export const DASHBOARD_COMPLIANCE_METRIC_LABELS = new Set(['newPlayers', 'activePlayers', 'registrations']);

export function isComplianceMetricWidget(label: string | undefined): boolean {
  return Boolean(label && DASHBOARD_COMPLIANCE_METRIC_LABELS.has(label));
}

export const DASHBOARD_NET_DEPOSIT_CHART_LABEL = 'amountDeposits';

export function isNetDepositChartWidget(label: string | undefined): boolean {
  return label === DASHBOARD_NET_DEPOSIT_CHART_LABEL;
}

export const DASHBOARD_WIDGET_LABELS: Record<string, string> = {
  newPlayers: 'Email opt in/out',
  activePlayers: 'SMS opt in/out',
  registrations: 'Self-excluded users',
  loginRate: 'Login rate',
  amountDeposits: 'Net deposit',
  sentMessages: 'Sent messages',
  registrationsOverTime: 'Registrations',
  triggeredCampaigns: 'Triggered campaigns',
  workflowStatuses: 'Workflow statuses',
  conversionClickRate: 'Conversion & click rate',
  overallStatuses: 'Overall statuses',
  depositsWithdrawals: 'Deposits / Withdrawals',
  ftdCount: 'FTD count',
  ftdAmount: 'FTD amount',
  countrySegmentation: 'Country segmentation',
  emailChart: 'Email performance',
  smsChart: 'SMS performance',
  pushNotificationChart: 'Push performance',
};

export const DASHBOARD_WIDGET_CATALOG: WidgetMeta[] = [
  { label: 'newPlayers', type: WidgetType.PAIR_VALUE, category: WidgetCategory.Players, isOnlyLifetime: true },
  { label: 'activePlayers', type: WidgetType.PAIR_VALUE, category: WidgetCategory.Players, isOnlyLifetime: true },
  { label: 'registrations', type: WidgetType.VALUE, category: WidgetCategory.Players, isOnlyLifetime: true },
  { label: 'loginRate', type: WidgetType.PAIR_VALUE, category: WidgetCategory.Players, isOnlyLifetime: false },
  { label: 'amountDeposits', type: WidgetType.CHART, category: WidgetCategory.Finance, isOnlyLifetime: false },
  { label: 'sentMessages', type: WidgetType.CHART, category: WidgetCategory.Communication, isOnlyLifetime: false },
  { label: 'registrationsOverTime', type: WidgetType.CHART, category: WidgetCategory.Players, isOnlyLifetime: false },
  { label: 'triggeredCampaigns', type: WidgetType.CHART, category: WidgetCategory.Campaigns, isOnlyLifetime: false },
  { label: 'workflowStatuses', type: WidgetType.CHART, category: WidgetCategory.Campaigns, isOnlyLifetime: false },
  { label: 'conversionClickRate', type: WidgetType.CHART, category: WidgetCategory.Communication, isOnlyLifetime: false },
  { label: 'overallStatuses', type: WidgetType.CHART, category: WidgetCategory.Communication, isOnlyLifetime: false },
  { label: 'depositsWithdrawals', type: WidgetType.CHART, category: WidgetCategory.Finance, isOnlyLifetime: false },
  { label: 'ftdCount', type: WidgetType.VALUE, category: WidgetCategory.Finance, isOnlyLifetime: true },
  { label: 'ftdAmount', type: WidgetType.VALUE, category: WidgetCategory.Finance, isOnlyLifetime: true },
  { label: 'countrySegmentation', type: WidgetType.CHART, category: WidgetCategory.Players, isOnlyLifetime: false },
  { label: 'emailChart', type: WidgetType.CHART, category: WidgetCategory.Communication, isOnlyLifetime: false },
  { label: 'smsChart', type: WidgetType.CHART, category: WidgetCategory.Communication, isOnlyLifetime: false },
  { label: 'pushNotificationChart', type: WidgetType.CHART, category: WidgetCategory.Communication, isOnlyLifetime: false },
];

export const DASHBOARD_CATEGORY_LABELS: Record<WidgetCategory, string> = {
  [WidgetCategory.Players]: 'Players',
  [WidgetCategory.Communication]: 'Communication',
  [WidgetCategory.Campaigns]: 'Campaigns',
  [WidgetCategory.Finance]: 'Finance',
};
