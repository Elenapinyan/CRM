import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateRange, DateTime, DatetimeRange } from './datepicker.util';
import * as i0 from "@angular/core";
export declare abstract class SprDateRangeAdapter<D> {
    abstract fromModel(value: D | null): DatetimeRange<NgbDateStruct>;
    abstract toModel(range: DatetimeRange<NgbDateStruct>): D | null;
}
export declare abstract class SprDatetimeAdapter<D> {
    abstract fromModel(value: D | null): DateTime<NgbDateStruct | null, NgbTimeStruct | null>;
    abstract toModel(datetime: DateTime<NgbDateStruct | null, NgbTimeStruct | null>): D | null;
}
export declare class SprBaseDateRangeAdapter extends SprDateRangeAdapter<DatetimeRange<NgbDateStruct>> {
    fromModel(value: DatetimeRange<NgbDateStruct>): DatetimeRange<NgbDateStruct>;
    toModel(range: DatetimeRange<NgbDateStruct>): DatetimeRange<NgbDateStruct>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprBaseDateRangeAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SprBaseDateRangeAdapter>;
}
export declare class SprDefaultDateRangeAdapter extends SprDateRangeAdapter<DateRange<Date>> {
    fromModel(value: DateRange<Date>): DatetimeRange<NgbDateStruct>;
    toModel(range: DatetimeRange<NgbDateStruct>): DateRange<Date>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprDefaultDateRangeAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SprDefaultDateRangeAdapter>;
}
export declare class SprBaseDatetimeAdapter extends SprDatetimeAdapter<DateTime<NgbDateStruct | null, NgbTimeStruct | null>> {
    fromModel(value: DateTime<NgbDateStruct | null, NgbTimeStruct | null>): DateTime<NgbDateStruct | null, NgbTimeStruct | null>;
    toModel(range: DateTime<NgbDateStruct | null, NgbTimeStruct | null>): DateTime<NgbDateStruct | null, NgbTimeStruct | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprBaseDatetimeAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SprBaseDatetimeAdapter>;
}
export declare class SprDefaultDatetimeAdapter extends SprDatetimeAdapter<Date> {
    fromModel(value: Date | null): DateTime<NgbDateStruct | null, NgbTimeStruct | null>;
    toModel(dateTime: DateTime<NgbDateStruct | null, NgbTimeStruct | null>): Date | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprDefaultDatetimeAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SprDefaultDatetimeAdapter>;
}
