import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { InputSignal, Signal } from '@angular/core';
import { DateMaskType, TimeMaskType } from './datepicker.util';
import { MaskitoOptions } from '@maskito/core';
import * as i0 from "@angular/core";
export declare const dateRangeTimeMask: (dateFormat: DateMaskType, dateSeparator: string, timeFormat?: TimeMaskType) => MaskitoOptions;
export declare const dateTimeMask: (dateFormat: DateMaskType, dateSeparator: string, timeFormat?: TimeMaskType) => MaskitoOptions;
export declare const getTimeMask: (timeFormat: TimeMaskType) => MaskitoOptions;
export type DateMaskConfig = {
    mask: (withTime: boolean) => MaskitoOptions;
    rangeMask: (withTime: boolean) => MaskitoOptions;
    placeholder: string;
    datePlaceholder: string;
    timeMask?: MaskitoOptions | null;
    timePlaceholder?: string | null;
    fixPadsFn: (v: string) => string | null;
};
export declare abstract class SprDateParserFormatter<DateMask = DateMaskType, TimeMask = TimeMaskType> {
    protected abstract dateMask: InputSignal<DateMask> | Signal<DateMask>;
    protected abstract timeMask: InputSignal<TimeMask | undefined> | Signal<TimeMask | undefined>;
    protected dateSeparator: InputSignal<string> | Signal<string>;
    readonly inputMaskConfig: Signal<DateMaskConfig>;
    abstract parse(value: string): {
        date: NgbDateStruct | null;
        time: NgbTimeStruct | null;
    } | null;
    abstract format(date: NgbDateStruct | null, time?: NgbTimeStruct | null): string;
    abstract getInputMaskConfig(date: DateMask, time: TimeMask | undefined): DateMaskConfig;
}
export declare class SprYMDFormatter extends SprDateParserFormatter {
    protected dateMask: import("@angular/core").WritableSignal<DateMaskType>;
    protected timeMask: import("@angular/core").WritableSignal<TimeMaskType>;
    parse(value: string): {
        date: NgbDateStruct | null;
        time: NgbTimeStruct | null;
    } | null;
    format(date: NgbDateStruct | null, time?: NgbTimeStruct | null): string;
    getInputMaskConfig(date: DateMaskType, time: TimeMaskType | undefined): DateMaskConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprYMDFormatter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SprYMDFormatter>;
}
export declare class SprDMYFormatter extends SprDateParserFormatter {
    protected dateMask: import("@angular/core").WritableSignal<DateMaskType>;
    protected timeMask: import("@angular/core").WritableSignal<TimeMaskType>;
    parse(value: string): {
        date: NgbDateStruct | null;
        time: NgbTimeStruct | null;
    } | null;
    format(date: NgbDateStruct | null, time?: NgbTimeStruct | null): string;
    getInputMaskConfig(date: DateMaskType, time: TimeMaskType | undefined): DateMaskConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprDMYFormatter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SprDMYFormatter>;
}
export declare class SprDynamicFormatterDirective extends SprDateParserFormatter {
    dateMask: InputSignal<DateMaskType>;
    timeMask: InputSignal<TimeMaskType | undefined>;
    dateSeparator: InputSignal<string>;
    readonly inputMaskConfig: Signal<DateMaskConfig>;
    parse(value: string): {
        date: NgbDateStruct | null;
        time: NgbTimeStruct | null;
    } | null;
    format(date: NgbDateStruct | null, time?: NgbTimeStruct | null): string;
    getInputMaskConfig(date: DateMaskType, time: TimeMaskType | undefined): DateMaskConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprDynamicFormatterDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprDynamicFormatterDirective, "[sprDynamicDateFormatter]", never, { "dateMask": { "alias": "dateMask"; "required": false; "isSignal": true; }; "timeMask": { "alias": "timeMask"; "required": false; "isSignal": true; }; "dateSeparator": { "alias": "dateSeparator"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
