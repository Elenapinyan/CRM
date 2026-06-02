import { Directive, inject, input, TemplateRef } from '@angular/core';
import { ToastItem, ToastTemplateType } from './toast.options';

@Directive({ selector: '[dsToastTemplate]' })
export class DsToastTemplateDirective<T = ToastItem> {
  public readonly templateRef = inject(TemplateRef<T>);

  /**
   * This property accepts the type of custom templates available.
   **/
  type = input.required<ToastTemplateType>({ alias: 'dsToastTemplate' });

  static ngTemplateContextGuard<T>(dir: DsToastTemplateDirective<T>, ctx: unknown): ctx is { $implicit: T; index: number } {
    return true;
  }
}
