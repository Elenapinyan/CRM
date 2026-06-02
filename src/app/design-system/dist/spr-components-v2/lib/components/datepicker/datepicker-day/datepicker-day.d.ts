import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from '../datepicker.util';
import * as i0 from "@angular/core";
export declare class DsDatepickerDay {
    date: import("@angular/core").InputSignal<NgbDate>;
    selectedDate: import("@angular/core").InputSignal<NgbDateStruct | null>;
    maxDate: import("@angular/core").InputSignal<NgbDateStruct>;
    focused: import("@angular/core").InputSignal<boolean>;
    rangeMode: import("@angular/core").InputSignal<boolean>;
    selectedRange: import("@angular/core").InputSignal<DateRange<NgbDateStruct> | null>;
    maxRangeInDays: import("@angular/core").InputSignal<number | null>;
    hoveredDate: import("@angular/core").ModelSignal<NgbDate | null>;
    readonly isSelectedDate: import("@angular/core").Signal<boolean>;
    readonly isTodayDate: import("@angular/core").Signal<boolean>;
    readonly isFaded: import("@angular/core").Signal<boolean | null>;
    readonly isRange: import("@angular/core").Signal<boolean | null>;
    readonly isOutOfRange: import("@angular/core").Signal<boolean>;
    readonly isDisabled: import("@angular/core").Signal<boolean>;
    private readonly todayDate;
    private getTodayNgbDate;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsDatepickerDay, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsDatepickerDay, "ds-datepicker-day", never, { "date": { "alias": "date"; "required": true; "isSignal": true; }; "selectedDate": { "alias": "selectedDate"; "required": false; "isSignal": true; }; "maxDate": { "alias": "maxDate"; "required": true; "isSignal": true; }; "focused": { "alias": "focused"; "required": false; "isSignal": true; }; "rangeMode": { "alias": "rangeMode"; "required": false; "isSignal": true; }; "selectedRange": { "alias": "selectedRange"; "required": false; "isSignal": true; }; "maxRangeInDays": { "alias": "maxRangeInDays"; "required": false; "isSignal": true; }; "hoveredDate": { "alias": "hoveredDate"; "required": false; "isSignal": true; }; }, { "hoveredDate": "hoveredDateChange"; }, never, never, true, never>;
}
