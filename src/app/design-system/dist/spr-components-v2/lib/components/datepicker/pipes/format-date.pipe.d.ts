import { PipeTransform } from '@angular/core';
import { DateTime } from '../datepicker.util';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import * as i0 from "@angular/core";
export declare class FormatDatePipe implements PipeTransform {
    private readonly dateFormatter;
    private displayedValue;
    private lastValue;
    transform(dateTime: DateTime<NgbDateStruct | null, NgbTimeStruct | null> | null, timepicker?: boolean): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormatDatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FormatDatePipe, "formatDate", true>;
}
