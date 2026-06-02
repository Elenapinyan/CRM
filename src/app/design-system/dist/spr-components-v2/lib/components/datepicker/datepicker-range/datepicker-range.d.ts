import { OnInit, TemplateRef } from '@angular/core';
import { NgbDate, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { DropdownOption } from '../../../shared';
import { DateRange, DateTime, DatetimeRange, PeriodVariants, PeriodVariantType, TimeRange } from '../datepicker.util';
import { SprBaseDatepicker } from '../base-datepicker';
import { MaskitoOptions } from '@maskito/core';
import { FilterValueAccessor } from '../../../shared/utils';
import * as i0 from "@angular/core";
export declare class DsDatepickerRange<DateType = DatetimeRange<unknown>> extends SprBaseDatepicker<DateType | null, DateRange<NgbDateStruct>, TimeRange> implements FilterValueAccessor, OnInit {
    private readonly destroyRef;
    private readonly formatRangePipe;
    private readonly dateRangeService;
    private readonly dateRangeAdapter;
    private readonly dateParserFormatter;
    protected readonly translations: import("../datepicker.util").DatepickerRangeTranslation;
    /**
     * See FilterValueAccessor interface for information
     **/
    protected readonly autoApplyDisabled: import("@angular/core").WritableSignal<boolean>;
    /**
     * See FilterValueAccessor interface for information
     **/
    readonly filterValue: import("@angular/core").Signal<string | null>;
    protected readonly periodStartDate: import("@angular/core").WritableSignal<NgbDateStruct | null>;
    protected readonly startDate: import("@angular/core").Signal<NgbDate>;
    protected readonly maskedPlaceholder: import("@angular/core").Signal<string>;
    protected readonly maskConfig: import("@angular/core").Signal<import("../date-formatter").DateMaskConfig>;
    protected readonly inputMask: import("@angular/core").Signal<MaskitoOptions | null>;
    protected readonly appliedDatetimeRange: import("@angular/core").WritableSignal<DateTime<DateRange<NgbDateStruct> | null, TimeRange | null>>;
    protected readonly PeriodVariants: typeof PeriodVariants;
    protected readonly TimePlaceholder: {
        readonly H: "HH";
        readonly HM: "HH:MM";
        readonly HMS: "HH:MM:SS";
    };
    protected dateSelectedFromSelectOption: boolean;
    protected hoveredDate: NgbDate | null;
    showFooter: import("@angular/core").InputSignal<boolean>;
    footerCustomTemplate: import("@angular/core").InputSignal<TemplateRef<unknown> | undefined>;
    maxRangeInDays: import("@angular/core").InputSignal<number | null>;
    selectOptions: import("@angular/core").InputSignal<DropdownOption[]>;
    isDeselectAllowed: import("@angular/core").InputSignal<boolean>;
    placeholder: import("@angular/core").InputSignal<string>;
    markDisabledFn: import("@angular/core").InputSignal<(date: NgbDateStruct) => boolean>;
    selectedRange: import("@angular/core").ModelSignal<PeriodVariantType | null>;
    inline: import("@angular/core").InputSignal<boolean>;
    tooltipClassForLabel: import("@angular/core").InputSignal<string | null>;
    readonly dateDeselected: import("@angular/core").OutputEmitterRef<void>;
    readonly dateSelected: import("@angular/core").OutputEmitterRef<NgbDate>;
    readonly rangeConfirmed: import("@angular/core").OutputEmitterRef<DateType | null>;
    readonly rangeCanceled: import("@angular/core").OutputEmitterRef<void>;
    constructor();
    ngOnInit(): void;
    close(datepicker: NgbInputDatepicker, emitCanceledEvent?: boolean): void;
    selectDate(date: NgbDate): void;
    apply(triggerOnChange?: boolean): void;
    resetValue(): void;
    disableAutoApply(value: boolean): void;
    writeValue(value: DateType | null): void;
    /**
     * This method fixes incorrect date values and pads after manual input.
     **/
    protected fixDateOnChange(event: Event): void;
    protected selectOption(option: DropdownOption): void;
    protected setHoveredDate(date: NgbDate | null): void;
    private postFixDatetime;
    private getUpdatedRange;
    private initControlListener;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsDatepickerRange<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsDatepickerRange<any>, "ds-datepicker-range", never, { "showFooter": { "alias": "showFooter"; "required": false; "isSignal": true; }; "footerCustomTemplate": { "alias": "footerCustomTemplate"; "required": false; "isSignal": true; }; "maxRangeInDays": { "alias": "maxRangeInDays"; "required": false; "isSignal": true; }; "selectOptions": { "alias": "selectOptions"; "required": false; "isSignal": true; }; "isDeselectAllowed": { "alias": "isDeselectAllowed"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "markDisabledFn": { "alias": "markDisabledFn"; "required": false; "isSignal": true; }; "selectedRange": { "alias": "selectedRange"; "required": false; "isSignal": true; }; "inline": { "alias": "inline"; "required": false; "isSignal": true; }; "tooltipClassForLabel": { "alias": "tooltipClassForLabel"; "required": false; "isSignal": true; }; }, { "selectedRange": "selectedRangeChange"; "dateDeselected": "dateDeselected"; "dateSelected": "dateSelected"; "rangeConfirmed": "rangeConfirmed"; "rangeCanceled": "rangeCanceled"; }, never, never, true, never>;
}
