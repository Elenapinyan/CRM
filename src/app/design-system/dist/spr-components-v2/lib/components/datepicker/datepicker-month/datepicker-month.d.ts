import { OnInit } from '@angular/core';
import { NgbDate, NgbDatepicker, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { BaseControlValueAccessor } from '../../../shared/utils';
import { TimeRange } from '../datepicker.util';
import { DatepickerCustomDayDirective } from './datepicker-custom-day';
import { MaskitoOptions } from '@maskito/core';
import * as i0 from "@angular/core";
export declare class DsDatepickerMonth extends BaseControlValueAccessor<TimeRange | NgbTimeStruct | null> implements OnInit {
    private readonly fb;
    private readonly destroyRef;
    protected readonly translations: import("../datepicker.util").DatepickerRangeTranslation;
    datepicker: import("@angular/core").InputSignal<NgbDatepicker>;
    startFrom: import("@angular/core").InputSignal<NgbDateStruct | null>;
    timepicker: import("@angular/core").InputSignal<boolean>;
    timeMask: import("@angular/core").InputSignal<MaskitoOptions | null>;
    timePlaceholder: import("@angular/core").InputSignal<string>;
    altSelectors: import("@angular/core").InputSignal<boolean>;
    protected readonly columns: import("@angular/core").Signal<string>;
    protected readonly customDay: import("@angular/core").Signal<DatepickerCustomDayDirective<any> | undefined>;
    protected readonly formGroup: import("@angular/forms").FormGroup<{
        timeFrom: import("@angular/forms").FormControl<NgbTimeStruct | null>;
        timeTo: import("@angular/forms").FormControl<NgbTimeStruct | null>;
    }>;
    constructor();
    ngOnInit(): void;
    writeValue(value: TimeRange | NgbTimeStruct | null): void;
    protected navigateNext(datepicker: NgbDatepicker): void;
    protected navigatePrev(datepicker: NgbDatepicker): void;
    protected toStringDate(value: NgbDate | null): string;
    private isTimeRange;
    private initFormGroupValueChanges;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsDatepickerMonth, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsDatepickerMonth, "ds-datepicker-month", never, { "datepicker": { "alias": "datepicker"; "required": true; "isSignal": true; }; "startFrom": { "alias": "startFrom"; "required": false; "isSignal": true; }; "timepicker": { "alias": "timepicker"; "required": false; "isSignal": true; }; "timeMask": { "alias": "timeMask"; "required": false; "isSignal": true; }; "timePlaceholder": { "alias": "timePlaceholder"; "required": false; "isSignal": true; }; "altSelectors": { "alias": "altSelectors"; "required": false; "isSignal": true; }; }, {}, ["customDay"], never, true, never>;
}
