import { TemplateRef } from '@angular/core';
import { ModalVariant } from '../modal/modal.options';

type BaseModalData = {
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  disabledConfirmButton?: boolean;
  hideFooter?: boolean;
  headerVariant?: ModalVariant;
  footerVariant?: ModalVariant;
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
