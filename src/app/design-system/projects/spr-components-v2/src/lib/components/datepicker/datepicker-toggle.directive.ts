import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { BaseDatepicker } from './base-datepicker';

@Directive({
  selector: '[sprDatepickerToggle]',
  host: {
    '(click)': 'toggle()',
  },
})
export class DatepickerToggleDirective {
  private readonly elementRef = inject(ElementRef);

  sprDatepickerToggle = input.required<BaseDatepicker>();

  constructor() {
    effect(() => {
      const el = this.elementRef.nativeElement;

      this.sprDatepickerToggle().setCustomTemplateTarget(el);
    });
  }

  toggle(): void {
    const dp = this.sprDatepickerToggle();

    if (!dp) {
      return;
    }

    dp.toggle();
  }
}
