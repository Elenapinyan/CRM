import { Directive, inject, input, TemplateRef } from '@angular/core';
import { TransferListContext, TransferListItem, TransferListTemplateType } from './transfer-list.util';

@Directive({ selector: '[dsTransferListTemplate]' })
export class TransferListTemplateDirective {
  readonly template = inject<TemplateRef<TransferListContext<TransferListItem>>>(TemplateRef);

  dsTransferListTemplate = input.required<TransferListTemplateType>();

  static ngTemplateContextGuard(
    directive: TransferListTemplateDirective,
    context: unknown,
  ): context is TransferListContext<TransferListItem> {
    return true;
  }
}
