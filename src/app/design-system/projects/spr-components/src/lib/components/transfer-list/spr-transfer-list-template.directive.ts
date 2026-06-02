import { Directive, inject, input, TemplateRef } from '@angular/core';
import { TransferListContext, TransferListItem, TransferListTemplateType } from './transfer-list.util';

@Directive({ selector: '[sprTransferListTemplate]' })
export class SprTransferListTemplateDirective {
  readonly template = inject<TemplateRef<TransferListContext<TransferListItem>>>(TemplateRef);

  sprTransferListTemplate = input.required<TransferListTemplateType>();

  static ngTemplateContextGuard(
    directive: SprTransferListTemplateDirective,
    context: unknown,
  ): context is TransferListContext<TransferListItem> {
    return true;
  }
}
