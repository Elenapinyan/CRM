import { TemplateRef } from '@angular/core';
import { TransferListContext, TransferListItem, TransferListTemplateType } from './transfer-list.util';
import * as i0 from "@angular/core";
export declare class TransferListTemplateDirective {
    readonly template: TemplateRef<TransferListContext<TransferListItem>>;
    dsTransferListTemplate: import("@angular/core").InputSignal<TransferListTemplateType>;
    static ngTemplateContextGuard(directive: TransferListTemplateDirective, context: unknown): context is TransferListContext<TransferListItem>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TransferListTemplateDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TransferListTemplateDirective, "[dsTransferListTemplate]", never, { "dsTransferListTemplate": { "alias": "dsTransferListTemplate"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}
