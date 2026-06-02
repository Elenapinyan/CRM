import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { ToastType } from '../enums/toast-type.enum';
import { ToastItem, ToastOptions } from '../interfaces/toast.interface';

@Injectable({
  providedIn: 'root',
})
export class SprToastService {
  private readonly toastsSubj$ = new BehaviorSubject<ToastItem[]>([]);
  readonly toasts$ = this.toastsSubj$.asObservable();

  constructor(private readonly sanitizer: DomSanitizer) {}

  show(originalMessage: string, context: ToastType | null = null, options: ToastOptions = {}): void {
    const message = this.sanitizer.bypassSecurityTrustHtml(originalMessage);
    const footerMessage = options.footerMessage ? this.sanitizer.bypassSecurityTrustHtml(options.footerMessage) : null;
    const toastItem = <ToastItem>{
      message,
      context,
      options: {
        ...options,
        footerMessage,
      },
    };
    this.toastsSubj$.next([...this.toastsSubj$.getValue(), toastItem]);
  }

  showError(message: string, options?: ToastOptions): void {
    this.show(message, ToastType.Danger, { ...options, header: 'Error' });
  }

  showWarning(message: string, options?: ToastOptions): void {
    this.show(message, ToastType.Warning, { ...options, header: 'Warning' });
  }

  showServerError(status: string, message: string, options?: ToastOptions): void {
    this.show(message, ToastType.Danger, { ...options, header: `Error status: ${status}` });
  }

  showSuccess(message: string, options?: ToastOptions): void {
    this.show(message, ToastType.Success, { ...options });
  }

  remove(toast: ToastItem): void {
    const filteredToasts = this.toastsSubj$.getValue().filter((t) => t !== toast);
    this.toastsSubj$.next(filteredToasts);
  }

  clear(): void {
    this.toastsSubj$.next([]);
  }
}
