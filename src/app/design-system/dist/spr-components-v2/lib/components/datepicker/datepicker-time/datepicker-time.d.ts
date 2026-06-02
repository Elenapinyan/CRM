import { BaseControlValueAccessor } from '../../../shared/utils';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { MaskitoOptions } from '@maskito/core';
import * as i0 from "@angular/core";
export declare class DsDatepickerTime extends BaseControlValueAccessor<NgbTimeStruct | null> {
    label: import("@angular/core").InputSignal<string | null>;
    timeMask: import("@angular/core").InputSignal<MaskitoOptions | null>;
    timePlaceholder: import("@angular/core").InputSignal<string>;
    protected readonly timeValue: import("@angular/core").WritableSignal<string | null>;
    protected readonly ngbTime: import("@angular/core").Signal<NgbTimeStruct | null>;
    constructor();
    writeValue(value: NgbTimeStruct | null): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsDatepickerTime, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsDatepickerTime, "ds-datepicker-time", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; "timeMask": { "alias": "timeMask"; "required": false; "isSignal": true; }; "timePlaceholder": { "alias": "timePlaceholder"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
