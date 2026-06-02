import { OnInit } from '@angular/core';
import { NgbDate, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { SprBaseDatepicker } from '../base-datepicker';
import { SprDateParserFormatter } from '../date-formatter';
import { FilterValueAccessor } from '../../../shared/utils';
import * as i0 from "@angular/core";
export declare class DsDatepicker<DateType = unknown> extends SprBaseDatepicker<DateType | null, NgbDateStruct, NgbTimeStruct> implements FilterValueAccessor, OnInit {
    private readonly destroyRef;
    private readonly formatDatePipe;
    private readonly dateTimepickerAdapter;
    protected readonly dateParserFormatter: SprDateParserFormatter;
    /**
     * See FilterValueAccessor interface for information
     **/
    protected readonly autoApplyDisabled: import("@angular/core").WritableSignal<boolean>;
    protected readonly inputPlaceholder: import("@angular/core").Signal<string>;
    protected readonly TimePlaceholder: {
        readonly H: "HH";
        readonly HM: "HH:MM";
        readonly HMS: "HH:MM:SS";
    };
    private valueTouched;
    readonly filterValue: import("@angular/core").Signal<string | null>;
    placeholder: import("@angular/core").InputSignal<string>;
    isDeselectAllowed: import("@angular/core").InputSignal<boolean>;
    inline: import("@angular/core").InputSignal<boolean>;
    tooltipClassForLabel: import("@angular/core").InputSignal<string | null>;
    dateDeselected: import("@angular/core").OutputEmitterRef<void>;
    dateChanged: import("@angular/core").OutputEmitterRef<DateType | null>;
    ngOnInit(): void;
    selectDate(date: NgbDate): void;
    resetValue(): void;
    apply(): void;
    disableAutoApply(value: boolean): void;
    writeValue(value: DateType | null): void;
    protected valueChanged(event: Event): void;
    private initControlListener;
    private getNormalizedValue;
    private getParsedValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsDatepicker<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsDatepicker<any>, "ds-datepicker", never, { "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "isDeselectAllowed": { "alias": "isDeselectAllowed"; "required": false; "isSignal": true; }; "inline": { "alias": "inline"; "required": false; "isSignal": true; }; "tooltipClassForLabel": { "alias": "tooltipClassForLabel"; "required": false; "isSignal": true; }; }, { "dateDeselected": "dateDeselected"; "dateChanged": "dateChanged"; }, never, never, true, never>;
}
