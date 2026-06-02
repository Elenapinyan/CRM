import { PipeTransform } from '@angular/core';
import { PeriodSelectorFormValue } from '../interfaces/period-selector.interface';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as i0 from "@angular/core";
export declare class GetDisplayedDatePipe implements PipeTransform {
    private readonly ngbDateAdapter;
    private displayedValue;
    private lastValue;
    constructor(ngbDateAdapter: NgbDateAdapter<NgbDateStruct>);
    transform({ dateFrom, dateTo }: PeriodSelectorFormValue): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<GetDisplayedDatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<GetDisplayedDatePipe, "getDisplayedDate", true>;
}
