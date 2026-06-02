import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { getDate, getHours, getMinutes, getMonth, getSeconds, getYear } from 'date-fns';
import {
  DateRange,
  DateTime,
  DatetimeRange,
  getDateRangeUtil,
  getDateRangeInModel,
  PeriodVariants,
  PeriodVariantType,
  TimeRange,
} from '../datepicker.util';
import { Injectable } from '@angular/core';

export abstract class DateRangeService {
  abstract getDateRange(period: PeriodVariantType): DateTime<DateRange<NgbDate>, TimeRange> | null;
  protected abstract getDateRangeUtil(period: PeriodVariantType): { dateFrom: Date; dateTo: Date };
}

@Injectable()
export class DefaultDateRangeService extends DateRangeService {
  getDateRange(period: PeriodVariantType): DateTime<DateRange<NgbDate>, TimeRange> | null {
    if (period === PeriodVariants.Lifetime || period === PeriodVariants.NotSelected) {
      return null;
    }

    const { dateFrom, dateTo } = this.getDateRangeUtil(period);

    return {
      date: {
        dateFrom: new NgbDate(getYear(dateFrom), getMonth(dateFrom) + 1, getDate(dateFrom)),
        dateTo: new NgbDate(getYear(dateTo), getMonth(dateTo) + 1, getDate(dateTo)),
      },
      time: {
        timeFrom: { hour: getHours(dateFrom), minute: getMinutes(dateFrom), second: getSeconds(dateFrom) },
        timeTo: { hour: getHours(dateTo), minute: getMinutes(dateTo), second: getSeconds(dateTo) },
      },
    };
  }

  getDateRangeInModel(period: PeriodVariantType): DatetimeRange<string> {
    return getDateRangeInModel(period);
  }

  protected getDateRangeUtil(period: PeriodVariantType): { dateFrom: Date; dateTo: Date } {
    return getDateRangeUtil(period);
  }
}
