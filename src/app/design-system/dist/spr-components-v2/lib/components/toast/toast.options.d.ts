import { TemplateRef } from '@angular/core';
import { DsToastTemplateDirective } from './toast-template';
export declare enum ToastType {
    Success = "success",
    Danger = "danger",
    Warning = "warning",
    Info = "info"
}
export type ToastOptions = {
    autohide?: boolean;
    delay?: number;
    /**
     * @deprecated
     * This property is deprecated. Use `footer` property instead.
     **/
    footerMessage?: string;
};
type BaseToastItem = {
    type?: ToastType;
    options: ToastOptions;
    id: string;
};
export type ToastItemData = {
    header: string;
    description?: string;
    footer?: string;
    icon?: string;
};
export type ToastItemDataCustom = {
    header: string | TemplateRef<unknown>;
    description?: string | TemplateRef<unknown>;
    footer?: string | TemplateRef<unknown>;
    icon?: string | TemplateRef<unknown>;
};
export type ToastItemDataTemplates = {
    header: TemplateRef<unknown>;
    description?: TemplateRef<unknown>;
    footer?: TemplateRef<unknown>;
    icon?: TemplateRef<unknown>;
};
export type ToastItemDataAdvanced = ToastItemData | ToastItemDataCustom;
export type ToastItem = ToastItemDataAdvanced & BaseToastItem;
export type ToastData = ToastItemDataAdvanced & {
    type?: ToastType;
};
export declare const TOAST_CLASSES_BY_CONTEXT: {
    [type in ToastType]: string;
};
export type ToastTemplateType = 'header' | 'description' | 'footer' | 'icon';
export declare function getToastData(templates: readonly DsToastTemplateDirective[]): ToastItemDataTemplates;
export {};
