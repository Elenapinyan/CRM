import { Directive } from '@angular/core';
import { CdkStepLabel } from '@angular/cdk/stepper';
import { DsStep } from './step';

@Directive({ selector: '[sprStepHeaderCustom]' })
export class SprStepHeaderCustomDirective<T = DsStep> extends CdkStepLabel {
  static ngTemplateContextGuard<T>(dir: SprStepHeaderCustomDirective<T>, ctx: unknown): ctx is { $implicit: T; index: number } {
    return true;
  }
}
