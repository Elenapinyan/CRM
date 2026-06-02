import { TemplateRef } from '@angular/core';
import { DsToastTemplateDirective } from './toast-template';

export enum ToastType {
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
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

export const TOAST_CLASSES_BY_CONTEXT: { [type in ToastType]: string } = {
  [ToastType.Success]: 'bg-success',
  [ToastType.Danger]: 'bg-danger',
  [ToastType.Warning]: 'bg-warning',
  [ToastType.Info]: 'bg-info',
};

export type ToastTemplateType = 'header' | 'description' | 'footer' | 'icon';

export function getToastData(templates: readonly DsToastTemplateDirective[]): ToastItemDataTemplates {
  const data = {} as ToastItemDataTemplates;

  return templates.reduce((pv, cv) => {
    switch (cv.type()) {
      case 'header':
        pv.header = cv.templateRef;
        return pv;
      case 'icon':
        pv.icon = cv.templateRef;
        return pv;
      case 'description':
        pv.description = cv.templateRef;
        return pv;
      case 'footer':
        pv.footer = cv.templateRef;
        return pv;
    }
  }, data);
}
