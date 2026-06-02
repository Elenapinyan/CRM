import { DateTimePickerFormGroupValue, SprDateTimePickerAdapter } from '../interfaces/spr-date-timepicker.interface';
import * as i0 from "@angular/core";
export declare class SprDefaultDateTimepickerAdapter implements SprDateTimePickerAdapter {
    toModel(date: string): DateTimePickerFormGroupValue;
    fromModel(model: Partial<DateTimePickerFormGroupValue>): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprDefaultDateTimepickerAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SprDefaultDateTimepickerAdapter>;
}
