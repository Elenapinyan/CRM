import { ToastType } from '../enums/toast-type.enum';
export interface ToastOptions {
    header?: string;
    autohide?: boolean;
    delay?: number;
    footerMessage?: string;
}
export interface ToastItem {
    message: string;
    context: ToastType;
    options: ToastOptions;
}
