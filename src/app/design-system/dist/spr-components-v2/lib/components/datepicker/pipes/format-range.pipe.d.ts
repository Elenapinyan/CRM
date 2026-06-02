import { PipeTransform } from '@angular/core';
import { DateRange, DateTime, TimeRange } from '../datepicker.util';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as i0 from "@angular/core";
export declare class FormatRangePipe implements PipeTransform {
    private readonly dateFormatter;
    private displayedValue;
    private lastValue;
    transform({ date, time }: DateTime<DateRange<NgbDateStruct> | null, TimeRange | null>, timepicker?: boolean): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormatRangePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FormatRangePipe, "formatRange", true>;
}
