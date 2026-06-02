import { FormControl } from '@angular/forms';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { BaseControl } from '../../shared';
import { SprDatepickerValueFormatter } from './interfaces/spr-datepicker.interface';
import * as i0 from "@angular/core";
export declare class SprDatepickerComponent extends BaseControl<FormControl<string | null>> {
    private readonly ngbCalendar;
    private readonly datepickerValueFormatter;
    set minDate(minDate: NgbDate | string | null | undefined);
    set maxDate(maxDate: NgbDate | string | null | undefined);
    placeholder: import("@angular/core").InputSignal<string>;
    deselect: import("@angular/core").InputSignal<boolean>;
    mappedMinDate: NgbDate;
    mappedMaxDate: NgbDate;
    constructor(ngbCalendar: NgbCalendar, datepickerValueFormatter: SprDatepickerValueFormatter);
    deselectDate(): void;
    protected initControlListener(): Subscription;
    protected initControl(): FormControl<string | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprDatepickerComponent, [null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprDatepickerComponent, "spr-datepicker", never, { "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "deselect": { "alias": "deselect"; "required": false; "isSignal": true; }; }, {}, never, ["[alternative]"], true, never>;
}
