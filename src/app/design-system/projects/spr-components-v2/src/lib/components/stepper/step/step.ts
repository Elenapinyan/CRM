import { booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, forwardRef, input, Input, signal } from '@angular/core';
import { CdkStep } from '@angular/cdk/stepper';
import { SprStepHeaderCustomDirective } from './step-header-custom';

@Component({
  selector: 'ds-step',
  templateUrl: 'step.html',
  styleUrl: 'step.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: CdkStep, useExisting: forwardRef(() => DsStep) }],
})
export class DsStep extends CdkStep {
  // We need this overriding because cdk stepper is not yet completely rewritten using signals.
  @Input({ transform: booleanAttribute })
  override get hasError(): boolean {
    return super.hasError;
  }

  @Input() description: string | null = null;

  @ContentChild(SprStepHeaderCustomDirective) stepHeaderCustom?: SprStepHeaderCustomDirective;

  readonly invalid = signal<boolean>(false);

  disabled = input<boolean>(false);

  override set hasError(value: boolean) {
    super.hasError = value;

    this.invalid.set(value);
  }
}
