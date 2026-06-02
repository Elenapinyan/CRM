import { ToastData, ToastItem, ToastItemDataAdvanced, ToastOptions, ToastType } from './toast.options';
import * as i0 from "@angular/core";
export declare class ToastService {
    private readonly sanitizer;
    readonly toasts: import("@angular/core").WritableSignal<ToastItem[]>;
    readonly toasts$: import("rxjs").Observable<ToastItem[]>;
    /**
     * Deprecated method.
     * @deprecated
     * `Use push(title: string, description?: string, type?: ToastType, options?: ToastOptions)`
     **/
    show(message: string, type?: ToastType | null, options?: ToastOptions): void;
    push(data: ToastData, options?: ToastOptions): void;
    showInfo(header: string, options?: ToastOptions): void;
    showError(header: string, options?: ToastOptions): void;
    showWarning(header: string, options?: ToastOptions): void;
    showSuccess(header: string, options?: ToastOptions): void;
    showInfoCustom(data: ToastItemDataAdvanced, options?: Omit<ToastOptions, 'footerMessage'>): void;
    showErrorCustom(data: ToastItemDataAdvanced, options?: Omit<ToastOptions, 'footerMessage'>): void;
    showWarningCustom(data: ToastItemDataAdvanced, options?: Omit<ToastOptions, 'footerMessage'>): void;
    showSuccessCustom(data: ToastItemDataAdvanced, options?: Omit<ToastOptions, 'footerMessage'>): void;
    remove(toast: ToastItem): void;
    clear(): void;
    private getId;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ToastService>;
}
