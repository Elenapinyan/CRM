import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DateRange, DateTime, DatetimeRange, PeriodVariantType, TimeRange } from '../datepicker.util';
import * as i0 from "@angular/core";
export declare abstract class DateRangeService {
    abstract getDateRange(period: PeriodVariantType): DateTime<DateRange<NgbDate>, TimeRange> | null;
    protected abstract getDateRangeUtil(period: PeriodVariantType): {
        dateFrom: Date;
        dateTo: Date;
    };
}
export declare class DefaultDateRangeService extends DateRangeService {
    getDateRange(period: PeriodVariantType): DateTime<DateRange<NgbDate>, TimeRange> | null;
    getDateRangeInModel(period: PeriodVariantType): DatetimeRange<string>;
    protected getDateRangeUtil(period: PeriodVariantType): {
        dateFrom: Date;
        dateTo: Date;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<DefaultDateRangeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DefaultDateRangeService>;
}
