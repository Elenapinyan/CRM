import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DateRange, PeriodSelectorVariantType } from '../interfaces/period-selector.interface';
export declare class DateRangeService {
    static getDateRange(period: PeriodSelectorVariantType): {
        dateFrom: NgbDate;
        dateTo: NgbDate;
    } | null;
    static getDateRangeInModel(period: PeriodSelectorVariantType): DateRange;
    private static getDateRangeUtil;
}
