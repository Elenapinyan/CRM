import { TemplateRef } from '@angular/core';

type BaseModalData = {
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  disabledConfirmButton?: boolean;
  hideFooter?: boolean;
};

export type ConfirmModalDataWithTemplate = BaseModalData & {
  body: TemplateRef<unknown>;
  context?: Record<string, any>;
};

export type ConfirmModalData =
  | (BaseModalData & {
      body: string;
    })
  | ConfirmModalDataWithTemplate;
