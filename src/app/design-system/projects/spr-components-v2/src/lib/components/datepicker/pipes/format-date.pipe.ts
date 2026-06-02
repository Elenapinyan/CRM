import { inject, Pipe, PipeTransform } from '@angular/core';
import { DateTime } from '../datepicker.util';
import { SprDateParserFormatter, SprDMYFormatter } from '../date-formatter';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  private readonly dateFormatter = inject(SprDateParserFormatter, { optional: true }) ?? inject(SprDMYFormatter);

  private displayedValue: string = '';
  private lastValue!: DateTime<NgbDateStruct, NgbTimeStruct | null> | null;

  transform(dateTime: DateTime<NgbDateStruct | null, NgbTimeStruct | null> | null, timepicker: boolean = false): string {
    if (!dateTime || !dateTime?.date) {
      return '';
    }

    const { date, time } = dateTime;

    if (this.lastValue && this.lastValue.date === date && this.lastValue.time === time) {
      return this.displayedValue;
    }

    this.lastValue = { date, time };

    this.displayedValue = `${this.dateFormatter.format(date, timepicker ? time : null)}`;

    return this.displayedValue;
  }
}
