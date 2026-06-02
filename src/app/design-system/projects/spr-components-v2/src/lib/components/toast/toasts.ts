import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Signal, TemplateRef } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { DsToast } from './toast';
import { DsToastTemplateDirective } from './toast-template';
import { TOAST_CLASSES_BY_CONTEXT, ToastItem } from './toast.options';
import { ToastService } from './toast.service';

const isTemplateRef = (value: string | TemplateRef<unknown>): value is TemplateRef<unknown> => value instanceof TemplateRef;

@Component({
  selector: 'ds-toasts',
  templateUrl: './toasts.html',
  styleUrls: ['./toasts.scss'],
  imports: [NgbToastModule, DsToast, DsToastTemplateDirective, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsToasts {
  private readonly toastService = inject(ToastService);

  protected readonly toasts: Signal<ToastItem[]> = this.toastService.toasts;

  protected readonly classes = TOAST_CLASSES_BY_CONTEXT;
  protected readonly isTemplateRef = isTemplateRef;

  removeToast(toast: ToastItem): void {
    this.toastService.remove(toast);
  }
}
