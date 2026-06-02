import { NgbDate, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormControlRecord } from '../../shared';
import { InjectionToken } from '@angular/core';
export declare const DEFAULT_INPUT_NOT_SELECTED_PLACEHOLDER = "Not selected";
export declare const DEFAULT_DATE_SEPARATOR = "-";
export declare const DateTypes: {
    readonly YMD: "YMD";
    readonly DMY: "DMY";
};
export declare const TimeTypes: {
    readonly H: "H";
    readonly HM: "HM";
    readonly HMS: "HMS";
};
export declare const DateMasks: {
    readonly YMD: readonly [RegExp, RegExp, RegExp, RegExp, "-", RegExp, RegExp, "-", RegExp, RegExp];
    readonly DMY: readonly [RegExp, RegExp, "-", RegExp, RegExp, "-", RegExp, RegExp, RegExp, RegExp];
};
export declare const TimeMasks: {
    readonly H: readonly [RegExp, RegExp];
    readonly HM: readonly [RegExp, RegExp, ":", RegExp, RegExp];
    readonly HMS: readonly [RegExp, RegExp, ":", RegExp, RegExp, ":", RegExp, RegExp];
};
export declare const DatePlaceholder: {
    YMD: string;
    DMY: string;
};
export declare const TimePlaceholder: {
    readonly H: "HH";
    readonly HM: "HH:MM";
    readonly HMS: "HH:MM:SS";
};
export type DateMaskType = (typeof DateTypes)[keyof typeof DateTypes];
export type TimeMaskType = (typeof TimeTypes)[keyof typeof TimeTypes];
export declare enum PeriodVariants {
    Today = "today",
    Yesterday = "yesterday",
    Week = "week",
    LastSevenDays = "last_7_days",
    LastWeek = "last_week",
    ThisMonth = "this_month",
    LastMonth = "last_month",
    LastThirtyDays = "last_30_days",
    LastThreeMonth = "last_three_month",
    LastYear = "last_year",
    Lifetime = "lifetime",
    All = "all",
    Custom = "custom",
    NotSelected = "notSelected"
}
export type PeriodVariantType = (typeof PeriodVariants)[keyof typeof PeriodVariants];
export type DateRange<D = unknown> = {
    dateFrom: D | null;
    dateTo: D | null;
};
export type TimeRange = {
    timeFrom: NgbTimeStruct | null;
    timeTo: NgbTimeStruct | null;
};
export type DatetimeRange<D = unknown> = DateTime<DateRange<D>, TimeRange>;
export type DateTime<DateType, TimeType> = {
    date: DateType;
    time?: TimeType;
};
export type TimeRangeFormGroup = FormControlRecord<TimeRange>;
export type DateTimeFormGroup<DateType, TimeType> = FormControlRecord<Required<DateTime<DateType, TimeType>>>;
export type DatepickerRangeTranslation = {
    cancel: string;
    apply: string;
    startTime: string;
    endTime: string;
};
export declare const DATEPICKER_RANGE_TRANSLATIONS: InjectionToken<DatepickerRangeTranslation>;
export declare const fixYMDDatePads: (v: string, dateSeparator?: string) => string;
export declare const fixDMYDatePads: (v: string, dateSeparator?: string) => string;
export declare const fixTimePads: (time: string) => string;
export declare const timeEquals: (prev: NgbTimeStruct, curr: NgbTimeStruct) => boolean;
export declare const getDiffInDays: (startDate: NgbDateStruct, endDate: NgbDateStruct) => number;
export declare const getMaxNgbDate: (date: NgbDate, dateFrom: NgbDateStruct, maxRangeInDays: number | null) => NgbDate | null;
export declare const getMinNgbDate: (date: NgbDate, dateFrom: NgbDateStruct, maxRangeInDays: number | null) => NgbDate | null;
export declare const date2NgbDate: (date: Date | null) => {
    date: NgbDate | null;
    time: NgbTimeStruct | null;
};
export declare const string2NgbDate: (value: string | null) => {
    date: NgbDate | null;
    time: NgbTimeStruct | null;
} | null;
export declare const unknown2NgbDate: (value: Date | NgbDateStruct | string | null) => NgbDate | null;
export declare const ngbDateToDate: (date: NgbDateStruct | null, time?: NgbTimeStruct | null) => Date | null;
export declare const stringDMY2datetime: (value: string, dateSeparator?: string) => {
    date: NgbDateStruct | null;
    time: NgbTimeStruct | null;
} | null;
export declare const stringYMD2datetime: (value: string, dateSeparator?: string) => {
    date: NgbDateStruct | null;
    time: NgbTimeStruct | null;
} | null;
export declare const datetime2DMYString: (date: NgbDateStruct | null, time?: NgbTimeStruct | null, timeType?: TimeMaskType, dateSeparator?: string) => string;
export declare const datetime2YMDString: (date: NgbDateStruct | null, time?: NgbTimeStruct | null, timeType?: TimeMaskType, dateSeparator?: string) => string;
export declare const fixNgbTimePads: (time: NgbTimeStruct) => {
    hour: string;
    minutes: string;
    seconds: string;
};
export declare const getDateRangeUtil: (period: PeriodVariantType) => {
    dateFrom: Date;
    dateTo: Date;
};
export declare const getDateRangeInModel: (period: PeriodVariantType) => DatetimeRange<string>;
