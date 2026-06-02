import { DomSanitizer } from '@angular/platform-browser';
import { ToastType } from '../enums/toast-type.enum';
import { ToastItem, ToastOptions } from '../interfaces/toast.interface';
import * as i0 from "@angular/core";
export declare class SprToastService {
    private readonly sanitizer;
    private readonly toastsSubj$;
    readonly toasts$: import("rxjs").Observable<ToastItem[]>;
    constructor(sanitizer: DomSanitizer);
    show(originalMessage: string, context?: ToastType | null, options?: ToastOptions): void;
    showError(message: string, options?: ToastOptions): void;
    showWarning(message: string, options?: ToastOptions): void;
    showServerError(status: string, message: string, options?: ToastOptions): void;
    showSuccess(message: string, options?: ToastOptions): void;
    remove(toast: ToastItem): void;
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprToastService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SprToastService>;
}
