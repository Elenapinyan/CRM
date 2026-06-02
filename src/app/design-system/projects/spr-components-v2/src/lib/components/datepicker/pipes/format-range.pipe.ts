import { inject, Pipe, PipeTransform } from '@angular/core';
import { DateRange, DateTime, DatetimeRange, TimeRange } from '../datepicker.util';
import { SprDateParserFormatter, SprDMYFormatter } from '../date-formatter';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Pipe({
  name: 'formatRange',
})
export class FormatRangePipe implements PipeTransform {
  private readonly dateFormatter = inject(SprDateParserFormatter, { optional: true }) ?? inject(SprDMYFormatter);

  private displayedValue: string = '';
  private lastValue!: DatetimeRange | null;

  transform({ date, time }: DateTime<DateRange<NgbDateStruct> | null, TimeRange | null>, timepicker: boolean = false): string {
    if (!date || (!date?.dateFrom && !date?.dateTo)) {
      return '';
    }

    const { dateFrom, dateTo } = date;
    const timeFrom = time?.timeFrom ?? null;
    const timeTo = time?.timeTo ?? null;

    if (
      this.lastValue &&
      this.lastValue.date.dateFrom === dateFrom &&
      this.lastValue.date.dateTo === dateTo &&
      this.lastValue?.time?.timeFrom === timeFrom &&
      this.lastValue?.time?.timeTo === timeTo
    ) {
      return this.displayedValue;
    }

    this.lastValue = { date: { dateFrom, dateTo }, time: { timeFrom, timeTo } };

    if (dateFrom && dateTo) {
      this.displayedValue = `${this.dateFormatter.format(dateFrom, timepicker ? timeFrom : null)} - ${this.dateFormatter.format(dateTo, timepicker ? timeTo : null)}`;
    }

    if (dateFrom && !dateTo) {
      this.displayedValue = this.dateFormatter.format(dateFrom, timepicker ? timeFrom : null);
    }

    return this.displayedValue;
  }
}
