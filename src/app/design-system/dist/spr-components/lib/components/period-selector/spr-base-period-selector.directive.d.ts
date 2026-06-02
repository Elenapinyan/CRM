import { EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbDate, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { DateRange, PeriodSelectorFooterSettings, PeriodSelectorFormGroup } from './interfaces/period-selector.interface';
import { BaseControl } from '../../shared';
import * as i0 from "@angular/core";
export declare class SprBasePeriodSelector extends BaseControl<FormGroup<PeriodSelectorFormGroup>, DateRange | null> implements OnInit {
    set footerSettings(settings: PeriodSelectorFooterSettings | undefined);
    maxRangeInDays: number | null;
    rangeConfirmed: EventEmitter<DateRange | null>;
    rangeCanceled: EventEmitter<void>;
    fullFooterSettings: Required<PeriodSelectorFooterSettings>;
    hoveredDate: NgbDate | null;
    maxDate: NgbDate;
    startDate: NgbDate;
    private alreadyAppliedDateForNgbDatePicker;
    private alreadyAppliedDate;
    private dateValueReadyToEmit;
    protected dateSelectedFromSelectOption: boolean;
    ngOnInit(): void;
    onDateSelection(date: NgbDate, custom?: boolean): void;
    writeValue(value: DateRange | null): void;
    onApply(triggerOnChange?: boolean): void;
    onClose(datepicker: NgbInputDatepicker, closeOnButton?: boolean): void;
    protected initControlListener(): void;
    protected initControl(): FormGroup<PeriodSelectorFormGroup>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprBasePeriodSelector, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprBasePeriodSelector, never, never, { "footerSettings": { "alias": "footerSettings"; "required": false; }; "maxRangeInDays": { "alias": "maxRangeInDays"; "required": false; }; }, { "rangeConfirmed": "rangeConfirmed"; "rangeCanceled": "rangeCanceled"; }, never, never, true, never>;
}
