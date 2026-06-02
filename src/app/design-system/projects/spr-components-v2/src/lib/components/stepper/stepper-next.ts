import { Directive, inject } from '@angular/core';
import { DsStepperDirective } from './stepper';

@Directive({
  selector: '[dsStepperNext]',
  host: {
    '[class]': '["stepper-next", "stepper-action"]',
    '(click)': 'stepper.next()',
  },
})
export class DsStepperNextDirective {
  protected readonly stepper = inject(DsStepperDirective);
}
