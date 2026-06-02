import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { date2NgbDate, DateRange, DateTime, DatetimeRange, ngbDateToDate } from './datepicker.util';
import { Injectable } from '@angular/core';

export abstract class SprDateRangeAdapter<D> {
  abstract fromModel(value: D | null): DatetimeRange<NgbDateStruct>;
  abstract toModel(range: DatetimeRange<NgbDateStruct>): D | null;
}

export abstract class SprDatetimeAdapter<D> {
  abstract fromModel(value: D | null): DateTime<NgbDateStruct | null, NgbTimeStruct | null>;
  abstract toModel(datetime: DateTime<NgbDateStruct | null, NgbTimeStruct | null>): D | null;
}

@Injectable()
export class SprBaseDateRangeAdapter extends SprDateRangeAdapter<DatetimeRange<NgbDateStruct>> {
  override fromModel(value: DatetimeRange<NgbDateStruct>): DatetimeRange<NgbDateStruct> {
    return value;
  }

  override toModel(range: DatetimeRange<NgbDateStruct>): DatetimeRange<NgbDateStruct> {
    return range;
  }
}

@Injectable()
export class SprDefaultDateRangeAdapter extends SprDateRangeAdapter<DateRange<Date>> {
  override fromModel(value: DateRange<Date>): DatetimeRange<NgbDateStruct> {
    const ngbDateFrom = date2NgbDate(value.dateFrom);
    const ngbDateTo = date2NgbDate(value.dateTo);

    const dateFrom = ngbDateFrom.date;
    const dateTo = ngbDateTo.date;

    const timeFrom = ngbDateFrom.time;
    const timeTo = ngbDateTo.time;

    return {
      date: {
        dateFrom,
        dateTo,
      },
      time: {
        timeFrom,
        timeTo,
      },
    };
  }

  override toModel(range: DatetimeRange<NgbDateStruct>): DateRange<Date> {
    return {
      dateFrom: ngbDateToDate(range.date.dateFrom, range.time?.timeFrom),
      dateTo: ngbDateToDate(range.date.dateTo, range.time?.timeTo),
    };
  }
}

@Injectable()
export class SprBaseDatetimeAdapter extends SprDatetimeAdapter<DateTime<NgbDateStruct | null, NgbTimeStruct | null>> {
  override fromModel(value: DateTime<NgbDateStruct | null, NgbTimeStruct | null>): DateTime<NgbDateStruct | null, NgbTimeStruct | null> {
    return value;
  }

  override toModel(range: DateTime<NgbDateStruct | null, NgbTimeStruct | null>): DateTime<NgbDateStruct | null, NgbTimeStruct | null> {
    return range;
  }
}

@Injectable()
export class SprDefaultDatetimeAdapter extends SprDatetimeAdapter<Date> {
  override fromModel(value: Date | null): DateTime<NgbDateStruct | null, NgbTimeStruct | null> {
    const ngbDate = date2NgbDate(value);

    return {
      date: ngbDate.date,
      time: ngbDate.time,
    };
  }

  override toModel(dateTime: DateTime<NgbDateStruct | null, NgbTimeStruct | null>): Date | null {
    return ngbDateToDate(dateTime.date, dateTime.time);
  }
}
