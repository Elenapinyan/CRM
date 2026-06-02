import { FormControl } from '@angular/forms';
import { DateTimePickerKey } from '../enums/spr-date-timepicker-key.enum';
export type DateTimepickerDateType = string | null;
export type DateTimepickerTimeType = string | null;
export interface DateTimePickerFormGroup {
    [DateTimePickerKey.Date]: FormControl<DateTimepickerDateType>;
    [DateTimePickerKey.Time]: FormControl<DateTimepickerTimeType>;
}
export interface DateTimePickerFormGroupValue {
    [DateTimePickerKey.Date]: DateTimepickerDateType;
    [DateTimePickerKey.Time]: DateTimepickerTimeType;
}
export interface SprDateTimePickerAdapter {
    toModel(date: string): DateTimePickerFormGroupValue;
    fromModel(model: Partial<DateTimePickerFormGroupValue>): string;
}
