import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DateRange, PeriodSelectorVariantType } from '../interfaces/period-selector.interface';
import { getDate, getMonth, getYear } from 'date-fns';
import { PeriodVariants } from '../enums/period-selector-variants.enum';
import { Injectable } from '@angular/core';
import { getDateRangeUtil, getDateRangeInModel } from '../utils/get-date-range.util';

export abstract class DateRangeService {
  abstract getDateRange(period: PeriodSelectorVariantType): Required<DateRange<NgbDate>> | null;
  protected abstract getDateRangeUtil(period: PeriodSelectorVariantType): Required<DateRange<Date>>;
}

@Injectable()
export class DefaultDateRangeService extends DateRangeService {
  getDateRange(period: PeriodSelectorVariantType): Required<DateRange<NgbDate>> | null {
    if (period === PeriodVariants.Lifetime || period === PeriodVariants.NotSelected) {
      return null;
    }
    const { dateFrom, dateTo } = this.getDateRangeUtil(period);
    return {
      dateFrom: new NgbDate(getYear(dateFrom), getMonth(dateFrom) + 1, getDate(dateFrom)),
      dateTo: new NgbDate(getYear(dateTo), getMonth(dateTo) + 1, getDate(dateTo)),
    };
  }

  getDateRangeInModel(period: PeriodSelectorVariantType): DateRange {
    return getDateRangeInModel(period);
  }

  protected getDateRangeUtil(period: PeriodSelectorVariantType): Required<DateRange<Date>> {
    return getDateRangeUtil(period);
  }
}
