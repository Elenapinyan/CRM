import { Directive, inject, TemplateRef } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

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

@Directive({ selector: '[sprCustomMonthDay]' })
export class DatepickerCustomDayDirective<T = unknown> {
  readonly templateRef = inject<TemplateRef<T>>(TemplateRef);

  static ngTemplateContextGuard<T>(dir: DatepickerCustomDayDirective<T>, ctx: unknown): ctx is SprDayTemplateContext {
    return true;
  }
}
