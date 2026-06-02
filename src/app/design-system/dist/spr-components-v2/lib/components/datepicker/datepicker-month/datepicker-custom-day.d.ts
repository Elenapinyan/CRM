import { TemplateRef } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as i0 from "@angular/core";
export interface SprDayTemplateContext {
    $implicit: NgbDate;
    currentMonth: number;
    currentYear: number;
    data?: any;
    date: NgbDate;
    disabled: boolean;
    focused: boolean;
    selected: boolean;
    today: boolean;
}
export declare class DatepickerCustomDayDirective<T = unknown> {
    readonly templateRef: TemplateRef<T>;
    static ngTemplateContextGuard<T>(dir: DatepickerCustomDayDirective<T>, ctx: unknown): ctx is SprDayTemplateContext;
    static ɵfac: i0.ɵɵFactoryDeclaration<DatepickerCustomDayDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DatepickerCustomDayDirective<any>, "[sprCustomMonthDay]", never, {}, {}, never, never, true, never>;
}
