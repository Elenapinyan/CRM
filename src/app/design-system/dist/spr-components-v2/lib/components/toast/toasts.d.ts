import { Signal, TemplateRef } from '@angular/core';
import { ToastItem } from './toast.options';
import * as i0 from "@angular/core";
export declare class DsToasts {
    private readonly toastService;
    protected readonly toasts: Signal<ToastItem[]>;
    protected readonly classes: {
        success: string;
        danger: string;
        warning: string;
        info: string;
    };
    protected readonly isTemplateRef: (value: string | TemplateRef<unknown>) => value is TemplateRef<unknown>;
    removeToast(toast: ToastItem): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsToasts, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsToasts, "ds-toasts", never, {}, {}, never, never, true, never>;
}
