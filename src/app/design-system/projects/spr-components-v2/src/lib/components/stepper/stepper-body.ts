import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DsStepperDirective } from './stepper';

@Component({
  selector: 'ds-stepper-body, [dsStepperBody]',
  template: `<ng-template [ngTemplateOutlet]="stepper.selectedStep()?.content ?? null" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: {
    class: 'stepper-body',
    '[class]': '"stepper-orientation--" + stepper.orientation',
  },
})
export class DsStepperBody {
  protected readonly stepper = inject(DsStepperDirective);
}
