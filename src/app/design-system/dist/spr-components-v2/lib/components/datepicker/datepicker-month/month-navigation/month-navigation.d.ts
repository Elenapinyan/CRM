import { NgbDate, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import * as i0 from "@angular/core";
export declare class DsMonthNavigation {
    datepicker: import("@angular/core").InputSignal<NgbDatepicker>;
    month: import("@angular/core").InputSignal<number>;
    year: import("@angular/core").InputSignal<number>;
    protected readonly years: import("@angular/core").Signal<{
        text: string;
        value: number;
    }[]>;
    protected readonly months: import("@angular/core").Signal<{
        text: string;
        value: number;
    }[]>;
    protected readonly selectedCalendar: import("@angular/core").WritableSignal<NgbDate | null>;
    constructor();
    protected navigate(year: number, month: number, day?: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsMonthNavigation, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsMonthNavigation, "ds-month-navigation", never, { "datepicker": { "alias": "datepicker"; "required": true; "isSignal": true; }; "month": { "alias": "month"; "required": true; "isSignal": true; }; "year": { "alias": "year"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}
