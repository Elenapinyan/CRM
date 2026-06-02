import { TemplateRef } from '@angular/core';
import { TransferListContext, TransferListItem, TransferListTemplateType } from '../interfaces/transfer-list.interface';
import * as i0 from "@angular/core";
export declare class SprTransferListTemplateDirective {
    template: TemplateRef<TransferListContext<TransferListItem>>;
    sprTransferListTemplate: TransferListTemplateType;
    constructor(template: TemplateRef<TransferListContext<TransferListItem>>);
    static ngTemplateContextGuard(directive: SprTransferListTemplateDirective, context: unknown): context is TransferListContext<TransferListItem>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprTransferListTemplateDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprTransferListTemplateDirective, "[sprTransferListTemplate]", never, { "sprTransferListTemplate": { "alias": "sprTransferListTemplate"; "required": true; }; }, {}, never, never, true, never>;
}
