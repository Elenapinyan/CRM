import { FormGroup, ValidationErrors } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { BaseControl } from '../../shared/models/base-control/base-control';
import { DateTimepickerDateType, DateTimePickerFormGroup } from './interfaces/spr-date-timepicker.interface';
import * as i0 from "@angular/core";
export declare class SprDateTimepickerComponent extends BaseControl<FormGroup<DateTimePickerFormGroup>, string | null> {
    set minDate(minDate: NgbDate | string | null | undefined);
    set maxDate(maxDate: NgbDate | string | null | undefined);
    placeholder: import("@angular/core").InputSignal<string>;
    isDeselectAllowed: import("@angular/core").InputSignal<boolean>;
    dateDeselected: import("@angular/core").OutputEmitterRef<void>;
    dateChanged: import("@angular/core").OutputEmitterRef<DateTimepickerDateType>;
    mappedMinDate: NgbDate;
    mappedMaxDate: NgbDate;
    private readonly dateTimepickerAdapter;
    validate(): ValidationErrors | null;
    deselectDate(): void;
    onDateSelected(date: NgbDate): void;
    writeValue(value: string | null): void;
    protected initControl(): FormGroup<DateTimePickerFormGroup>;
    protected initControlListener(): Subscription;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprDateTimepickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprDateTimepickerComponent, "spr-date-timepicker", never, { "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "isDeselectAllowed": { "alias": "isDeselectAllowed"; "required": false; "isSignal": true; }; }, { "dateDeselected": "dateDeselected"; "dateChanged": "dateChanged"; }, never, never, true, never>;
}
