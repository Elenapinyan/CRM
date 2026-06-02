import { ChangeDetectionStrategy, Component, computed, contentChildren, input } from '@angular/core';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { DsAutocloseBase } from '../../shared/models';
import { AppearanceAnimations } from '../../shared/animations';
import { DsToastTemplateDirective } from './toast-template';
import { getToastData, ToastItem } from './toast.options';
import { DsButton } from '../button';

@Component({
  selector: 'ds-toast, [ds-toast], [dsToast]',
  templateUrl: 'toast.html',
  styleUrl: 'toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-toast',
  },
  animations: [AppearanceAnimations],
  imports: [NgTemplateOutlet, DsButton, AsyncPipe],
})
export class DsToast extends DsAutocloseBase {
  item = input<ToastItem>();

  protected templates = contentChildren(DsToastTemplateDirective);

  readonly data = computed(() => {
    const templates = this.templates();

    return getToastData(templates);
  });
}
