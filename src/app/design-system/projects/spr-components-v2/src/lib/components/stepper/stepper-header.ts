import { ChangeDetectionStrategy, Component, ContentChild, inject, TemplateRef, ViewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DsStepperDirective } from './stepper';
import { DsStepHeader, SprStepHeaderCustomDirective } from './step';

@Component({
  selector: 'ds-stepper-header, [sprStepperHeader]',
  templateUrl: 'stepper-header.html',
  styleUrl: 'stepper-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DsStepHeader, NgTemplateOutlet],
  host: {
    class: 'stepper-header',
    '[class]': '"stepper-orientation--" + stepper.orientation',
  },
})
export class DsStepperHeader {
  @ViewChild('stepsTemplate', { static: true }) templateRef!: TemplateRef<unknown>;

  @ContentChild(SprStepHeaderCustomDirective) stepHeaderCustom?: SprStepHeaderCustomDirective;

  protected readonly stepper = inject(DsStepperDirective);

  activateStep(index: number): void {
    const steps = this.stepper.steps.toArray();

    steps[index]?.select();
  }
}
