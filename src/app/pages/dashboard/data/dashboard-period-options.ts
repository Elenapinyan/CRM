import { PeriodVariants, type DropdownOption } from '@platform-workspace/design-system-v2';

/** Preset periods for dashboard toolbar datepicker (DS PeriodVariants values). */
export const DASHBOARD_PERIOD_SELECT_OPTIONS: DropdownOption[] = [
  { text: 'Today', value: PeriodVariants.Today },
  { text: 'Yesterday', value: PeriodVariants.Yesterday },
  { text: 'Last 7 days', value: PeriodVariants.LastSevenDays },
  { text: 'This month', value: PeriodVariants.ThisMonth },
  { text: 'Last Month', value: PeriodVariants.LastMonth },
  { text: 'Last Year', value: PeriodVariants.LastYear },
  { text: 'Lifetime', value: PeriodVariants.Lifetime },
];

export const DASHBOARD_DEFAULT_PERIOD = PeriodVariants.Today;
