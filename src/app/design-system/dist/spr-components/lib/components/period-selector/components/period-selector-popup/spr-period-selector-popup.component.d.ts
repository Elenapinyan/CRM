import { AfterViewInit, EventEmitter } from '@angular/core';
import { NgbDate, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { SprBasePeriodSelector } from '../../spr-base-period-selector.directive';
import * as i0 from "@angular/core";
export declare class SprPeriodSelectorPopupComponent extends SprBasePeriodSelector implements AfterViewInit {
    calendarOpened: EventEmitter<void>;
    calendarClosed: EventEmitter<void>;
    datepicker: NgbInputDatepicker;
    ngAfterViewInit(): void;
    setHoveredDate(date: NgbDate | null): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprPeriodSelectorPopupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprPeriodSelectorPopupComponent, "spr-period-selector-popup", never, {}, { "calendarOpened": "calendarOpened"; "calendarClosed": "calendarClosed"; }, never, never, true, never>;
}
