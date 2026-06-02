import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {
  endOfDay,
  endOfMonth,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfYear,
  sub,
} from 'date-fns';
import {
  ngbDateToDate,
  PeriodVariants,
  type DatetimeRange,
  type PeriodVariantType,
} from '@platform-workspace/design-system-v2';

export function createDefaultDashboardDateRange(): DatetimeRange<NgbDateStruct> {
  return {
    date: {
      dateFrom: { year: 2026, month: 1, day: 1 },
      dateTo: { year: 2026, month: 1, day: 27 },
    },
    time: { timeFrom: null, timeTo: null },
  };
}

export function dateRangeToBounds(
  range: DatetimeRange<NgbDateStruct> | null | undefined,
): { from: Date; to: Date } | null {
  const dateFrom = range?.date?.dateFrom;
  const dateTo = range?.date?.dateTo;
  if (!dateFrom || !dateTo) {
    return null;
  }

  const from = ngbDateToDate(dateFrom);
  const to = ngbDateToDate(dateTo);
  if (!from || !to) {
    return null;
  }

  return from.getTime() <= to.getTime() ? { from, to } : { from: to, to: from };
}

export function formatDashboardPeriodLabel(
  range: DatetimeRange<NgbDateStruct> | null | undefined,
): string {
  const dateFrom = range?.date?.dateFrom;
  const dateTo = range?.date?.dateTo;
  if (!dateFrom || !dateTo) {
    return 'Not selected';
  }

  const pad = (value: number) => String(value).padStart(2, '0');
  return `${pad(dateFrom.day)}/${pad(dateFrom.month)}/${dateFrom.year} - ${pad(dateTo.day)}/${pad(dateTo.month)}/${dateTo.year}`;
}

function dateToNgbDateStruct(date: Date): NgbDateStruct {
  return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
}

export function boundsToDatetimeRange(bounds: {
  from: Date;
  to: Date;
}): DatetimeRange<NgbDateStruct> {
  return {
    date: {
      dateFrom: dateToNgbDateStruct(bounds.from),
      dateTo: dateToNgbDateStruct(bounds.to),
    },
    time: { timeFrom: null, timeTo: null },
  };
}

/** Mirrors DS DefaultDateRangeService for dashboard toolbar presets. */
export function getDashboardDateRangeForPeriod(
  period: PeriodVariantType,
): DatetimeRange<NgbDateStruct> | null {
  if (period === PeriodVariants.Lifetime || period === PeriodVariants.NotSelected) {
    return null;
  }

  const now = new Date();
  let start: Date;
  let end: Date;

  switch (period) {
    case PeriodVariants.Today:
      start = startOfDay(now);
      end = endOfDay(now);
      break;
    case PeriodVariants.Yesterday: {
      const yesterday = sub(now, { days: 1 });
      start = startOfDay(yesterday);
      end = endOfDay(yesterday);
      break;
    }
    case PeriodVariants.LastSevenDays:
      start = sub(now, { days: 7 });
      end = now;
      break;
    case PeriodVariants.ThisMonth:
      start = startOfMonth(now);
      end = now;
      break;
    case PeriodVariants.LastMonth: {
      const lastMonth = sub(now, { months: 1 });
      start = startOfMonth(lastMonth);
      end = endOfMonth(lastMonth);
      break;
    }
    case PeriodVariants.LastYear: {
      const lastYear = sub(now, { years: 1 });
      start = startOfYear(lastYear);
      end = endOfYear(lastYear);
      break;
    }
    default:
      return null;
  }

  return {
    date: {
      dateFrom: dateToNgbDateStruct(start),
      dateTo: dateToNgbDateStruct(end),
    },
    time: { timeFrom: null, timeTo: null },
  };
}

export function dashboardDateRangesEqual(
  a: DatetimeRange<NgbDateStruct> | null | undefined,
  b: DatetimeRange<NgbDateStruct> | null | undefined,
): boolean {
  return JSON.stringify(a?.date) === JSON.stringify(b?.date) && JSON.stringify(a?.time) === JSON.stringify(b?.time);
}
