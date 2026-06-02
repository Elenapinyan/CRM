import { PipeTransform } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PeriodSelectorFormValue } from '../interfaces/period-selector.interface';
import * as i0 from "@angular/core";
export declare class IsInsidePipe implements PipeTransform {
    transform(date: NgbDate, formValue: PeriodSelectorFormValue): boolean | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsInsidePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IsInsidePipe, "isInside", true>;
}
