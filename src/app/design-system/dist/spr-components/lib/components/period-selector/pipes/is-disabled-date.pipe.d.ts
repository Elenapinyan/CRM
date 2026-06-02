import { PipeTransform } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as i0 from "@angular/core";
export declare class IsDisabledDatePipe implements PipeTransform {
    transform(date: NgbDate, today: NgbDateStruct): boolean | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsDisabledDatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IsDisabledDatePipe, "isDisabledDate", true>;
}
