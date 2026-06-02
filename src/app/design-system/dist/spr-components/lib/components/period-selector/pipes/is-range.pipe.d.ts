import { PipeTransform } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PeriodSelectorFormValue } from '../interfaces/period-selector.interface';
import * as i0 from "@angular/core";
export declare class IsRangePipe implements PipeTransform {
    transform(date: NgbDate, formValue: PeriodSelectorFormValue, hovered: NgbDate | null): boolean | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsRangePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IsRangePipe, "isRange", true>;
}
