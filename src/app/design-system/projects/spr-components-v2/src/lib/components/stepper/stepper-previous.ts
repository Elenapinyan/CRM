import { Directive, inject } from '@angular/core';
import { DsStepperDirective } from './stepper';

@Directive({
  selector: '[dsStepperPrevious]',
  host: {
    '[class]': '["stepper-previous", "stepper-action"]',
    '(click)': 'stepper.previous()',
  },
})
export class DsStepperPreviousDirective {
  protected readonly stepper = inject(DsStepperDirective);
}
