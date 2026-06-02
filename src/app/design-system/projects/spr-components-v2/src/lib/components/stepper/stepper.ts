import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  Directive,
  forwardRef,
  Input,
  numberAttribute,
  QueryList,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CdkStepper } from '@angular/cdk/stepper';
import { DsStep } from './step';
import { DsStepperHeader } from './stepper-header';
import { DsStepperBody } from './stepper-body';

@Directive({
  selector: '[dsStepper]',
  exportAs: 'dsStepper',
  providers: [{ provide: CdkStepper, useExisting: forwardRef(() => DsStepperDirective) }],
  host: {
    class: 'stepper',
  },
})
export class DsStepperDirective extends CdkStepper {
  // We need this overriding because cdk stepper is not yet completely rewritten using signals.
  @Input({ transform: numberAttribute })
  override get selectedIndex(): number {
    return this.selectedStepIndex();
  }

  selectedStepIndex = signal(0);

  selectedStep = computed(() => {
    return this.steps ? this.steps.toArray()[this.selectedStepIndex()] : undefined;
  });

  override readonly steps: QueryList<DsStep> = new QueryList<DsStep>();

  override set selectedIndex(index: number) {
    super.selectedIndex = index;
    this.selectedStepIndex.set(index);
  }
}

@Component({
  selector: 'ds-stepper',
  templateUrl: 'stepper.html',
  styleUrl: 'stepper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: CdkStepper, useExisting: forwardRef(() => DsStepperDirective) },
    { provide: DsStepperDirective, useExisting: forwardRef(() => DsStepper) },
  ],
  imports: [NgTemplateOutlet, DsStepperHeader, DsStepperBody],
  host: {
    '[class]': '"stepper-orientation--" + orientation',
  },
})
export class DsStepper extends DsStepperDirective {
  @ContentChild(DsStepperHeader) customHeader?: DsStepperHeader;
}
