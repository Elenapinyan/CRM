import { inject, Injectable, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastData, ToastItem, ToastItemDataAdvanced, ToastOptions, ToastType } from './toast.options';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly sanitizer = inject(DomSanitizer);

  readonly toasts = signal<ToastItem[]>([]);
  readonly toasts$ = toObservable(this.toasts);

  /**
   * Deprecated method.
   * @deprecated
   * `Use push(title: string, description?: string, type?: ToastType, options?: ToastOptions)`
   **/
  show(message: string, type: ToastType | null = null, options: ToastOptions = {}): void {
    const header = this.sanitizer.bypassSecurityTrustHtml(message).toString();
    const footer = options.footerMessage ? this.sanitizer.bypassSecurityTrustHtml(options.footerMessage).toString() : null;

    const toastItem = <ToastItem>{
      header,
      footer,
      type,
      options,
      id: this.getId(),
    };

    this.toasts.update((arr) => [...arr, toastItem]);
  }

  push(data: ToastData, options?: ToastOptions): void {
    const { header, description, footer, icon, type } = data;

    const toastItem = <ToastItem>{
      header,
      description,
      footer,
      icon,
      type,
      options: options ?? {},
      id: this.getId(),
    };

    this.toasts.update((arr) => [...arr, toastItem]);
  }

  showInfo(header: string, options?: ToastOptions): void {
    this.push({ header, type: ToastType.Info, icon: 'ds-icon-general-info', footer: options?.footerMessage }, options);
  }

  showError(header: string, options?: ToastOptions): void {
    this.push({ header, type: ToastType.Danger, icon: 'ds-icon-control-cross-circle', footer: options?.footerMessage }, options);
  }

  showWarning(header: string, options?: ToastOptions): void {
    this.push({ header, type: ToastType.Warning, icon: 'ds-icon-general-info', footer: options?.footerMessage }, options);
  }

  showSuccess(header: string, options?: ToastOptions): void {
    this.push({ header, type: ToastType.Success, icon: 'ds-icon-control-check-circle', footer: options?.footerMessage }, options);
  }

  showInfoCustom(data: ToastItemDataAdvanced, options?: Omit<ToastOptions, 'footerMessage'>): void {
    this.push({ ...data, type: ToastType.Info, icon: data?.icon ?? 'ds-icon-general-info' }, options);
  }

  showErrorCustom(data: ToastItemDataAdvanced, options?: Omit<ToastOptions, 'footerMessage'>): void {
    this.push({ ...data, type: ToastType.Danger, icon: data?.icon ?? 'ds-icon-control-cross-circle' }, options);
  }

  showWarningCustom(data: ToastItemDataAdvanced, options?: Omit<ToastOptions, 'footerMessage'>): void {
    this.push({ ...data, type: ToastType.Warning, icon: data?.icon ?? 'ds-icon-general-info' }, options);
  }

  showSuccessCustom(data: ToastItemDataAdvanced, options?: Omit<ToastOptions, 'footerMessage'>): void {
    this.push({ ...data, type: ToastType.Success, icon: data?.icon ?? 'ds-icon-control-check-circle' }, options);
  }

  remove(toast: ToastItem): void {
    this.toasts.update((toasts) => toasts.filter((t) => t !== toast));
  }

  clear(): void {
    this.toasts.set([]);
  }

  private getId(): string {
    return new Date().getTime().toString();
  }
}
