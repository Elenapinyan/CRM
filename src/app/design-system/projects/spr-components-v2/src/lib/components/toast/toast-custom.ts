import { computed, contentChildren, Directive, inject, input } from '@angular/core';
import { ToastService } from './toast.service';
import { DsToastTemplateDirective } from './toast-template';
import { getToastData } from './toast.options';

/**
 * Aggregator directive. It can contain multiple toasts templates.
 **/
@Directive({
  selector: '[dsToastCustom]',
  exportAs: 'dsToastCustom',
  host: {
    '(click)': 'show()',
  },
})
export class DsToastCustomDirective {
  private readonly toastService = inject(ToastService);

  /**
   * This property can be used to filter multiple directives retrieved via @ViewChildren or @ContentChildren
   **/
  id = input<string | null>(null);

  protected templates = contentChildren(DsToastTemplateDirective);

  readonly data = computed(() => {
    const templates = this.templates();

    return getToastData(templates);
  });

  show(): void {
    const toastData = this.data();

    if (!toastData) {
      return;
    }

    this.toastService.push(toastData);
  }
}
