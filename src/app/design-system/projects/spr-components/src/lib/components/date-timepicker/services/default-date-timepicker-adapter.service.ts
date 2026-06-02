import { Injectable } from '@angular/core';
import { DateTimePickerFormGroupValue, SprDateTimePickerAdapter } from '../interfaces/spr-date-timepicker.interface';

@Injectable()
export class SprDefaultDateTimepickerAdapter implements SprDateTimePickerAdapter {
  toModel(date: string): DateTimePickerFormGroupValue {
    const dateObj = date.split(/[ T]/);
    return {
      date: dateObj[0],
      time: dateObj?.[1]?.split('.')?.[0]?.replace('Z', '') || null,
    };
  }

  fromModel(model: Partial<DateTimePickerFormGroupValue>): string {
    if (!model.time) {
      return model.date || '';
    }

    return `${model.date}T${model.time}.000Z`;
  }
}
