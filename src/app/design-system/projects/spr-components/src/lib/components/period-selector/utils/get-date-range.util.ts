import { DateRange, PeriodSelectorVariantType } from '../interfaces/period-selector.interface';
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  getDate,
  getMonth,
  getYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  sub,
} from 'date-fns';
import { PeriodVariants } from '../enums/period-selector-variants.enum';

export const getDateRangeUtil = (period: PeriodSelectorVariantType): Required<DateRange<Date>> => {
  const now = new Date();
  let start: Date;
  let end: Date;

  switch (period) {
    case PeriodVariants.All:
      start = new Date('2020-01-01');
      end = now;
      break;
    case PeriodVariants.Today:
      start = startOfDay(now);
      end = endOfDay(now);
      break;
    case PeriodVariants.LastWeek: {
      const lastWeek = sub(now, { weeks: 1 });
      start = startOfWeek(lastWeek, { weekStartsOn: 1 });
      end = endOfWeek(lastWeek, { weekStartsOn: 1 });
      break;
    }
    case PeriodVariants.LastMonth: {
      const lastMonth = sub(now, { months: 1 });
      start = startOfMonth(lastMonth);
      end = endOfMonth(lastMonth);
      break;
    }
    case PeriodVariants.LastThreeMonth: {
      const lastMonth = sub(now, { months: 1 });
      const thirdMonth = sub(now, { months: 3 });
      start = startOfMonth(thirdMonth);
      end = endOfMonth(lastMonth);
      break;
    }
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
    case PeriodVariants.LastThirtyDays:
      start = sub(now, { days: 30 });
      end = now;
      break;
    case PeriodVariants.ThisMonth:
      start = startOfMonth(now);
      end = now;
      break;
    case PeriodVariants.Week:
      start = startOfWeek(now, { weekStartsOn: 1 });
      end = now;
      break;
    case PeriodVariants.LastYear: {
      const lastYear = sub(now, { years: 1 });
      start = startOfYear(lastYear);
      end = endOfYear(lastYear);
      break;
    }
    default:
      throw new Error(`Unknown period: ${period}`);
  }

  return {
    dateFrom: start,
    dateTo: end,
  };
};

export const getDateRangeInModel = (period: PeriodSelectorVariantType): DateRange => {
  const { dateFrom, dateTo } = getDateRangeUtil(period);

  return {
    dateFrom: `${getYear(dateFrom)}-${String(getMonth(dateFrom) + 1).padStart(2, '0')}-${String(getDate(dateFrom)).padStart(
      2,
      '0',
    )}T00:00:00.000Z`,
    dateTo: `${getYear(dateTo)}-${String(getMonth(dateTo) + 1).padStart(2, '0')}-${String(getDate(dateTo)).padStart(2, '0')}T23:59:59.000Z`,
  };
};
