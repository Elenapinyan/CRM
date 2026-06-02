import { ParentTransferListItem, TransferListItem } from '../transfer-list.util';
import { TransferListTemplateDirective } from '../transfer-list-template.directive';
import * as i0 from "@angular/core";
export declare class TransferListItemComponent {
    value: import("@angular/core").InputSignal<TransferListItem | ParentTransferListItem>;
    type: import("@angular/core").InputSignal<"source" | "target">;
    customTemplates: import("@angular/core").InputSignal<readonly TransferListTemplateDirective[]>;
    readonly moveItem: import("@angular/core").OutputEmitterRef<TransferListItem>;
    protected readonly contentTemplate: import("@angular/core").Signal<import("@angular/core").TemplateRef<import("../transfer-list.util").TransferListContext<TransferListItem>> | undefined>;
    protected readonly iconTemplate: import("@angular/core").Signal<import("@angular/core").TemplateRef<import("../transfer-list.util").TransferListContext<TransferListItem>> | undefined>;
    protected readonly isOpened: import("@angular/core").WritableSignal<boolean>;
    protected readonly isParentItem: (item: TransferListItem | ParentTransferListItem) => item is ParentTransferListItem;
    protected move(item: TransferListItem | ParentTransferListItem): void;
    protected toggleChildren(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TransferListItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TransferListItemComponent, "ds-transfer-list-item", never, { "value": { "alias": "value"; "required": true; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "customTemplates": { "alias": "customTemplates"; "required": false; "isSignal": true; }; }, { "moveItem": "moveItem"; }, never, never, true, never>;
}
