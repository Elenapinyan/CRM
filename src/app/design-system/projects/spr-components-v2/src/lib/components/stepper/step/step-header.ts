import { ChangeDetectionStrategy, Component, input, output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CdkStepHeader } from '@angular/cdk/stepper';
import { DsStep } from './step';

@Component({
  selector: 'ds-step-header, [dsStepHeader]',
  templateUrl: 'step-header.html',
  styleUrl: 'step-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  hostDirectives: [CdkStepHeader],
  host: {
    class: 'step-header',
    '[class.step-header--default-template]': '!customTemplate()',
    '[class.step-header--active]': 'isActive() && !isInvalid()',
    '[class.step-header--completed]': 'isCompleted() && !isActive() && !isInvalid()',
    '[class.step-header--invalid]': 'isInvalid()',
    '[class.step-header--disabled]': 'isDisabled()',
    '[class.step-header--last]': 'isLastStep()',
  },
})
export class DsStepHeader {
  step = input.required<DsStep>();
  index = input<number>(0);
  customTemplate = input<TemplateRef<unknown>>();
  isActive = input<boolean>(false);
  isInvalid = input<boolean>(false);
  isCompleted = input<boolean>(false);
  isDisabled = input<boolean>(false);
  isLastStep = input<boolean>(false);

  active = output<DsStep>();
}
