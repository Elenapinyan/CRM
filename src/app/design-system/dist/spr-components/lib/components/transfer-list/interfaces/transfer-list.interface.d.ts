export interface TransferListItem {
    name: string;
    icon: string;
    value: string;
}
export declare const TransferListTemplateTypes: {
    readonly SOURCE_ITEM: "sourceItem";
    readonly SOURCE_ITEM_CONTENT: "sourceItemContent";
    readonly SOURCE_ITEM_BUTTON_ICON: "sourceItemButtonIcon";
    readonly SOURCE_MOVE_ALL_BUTTON: "sourceMoveAllButton";
    readonly TARGET_ITEM: "targetItem";
    readonly TARGET_ITEM_CONTENT: "targetItemContent";
    readonly TARGET_ITEM_BUTTON_ICON: "targetItemButtonIcon";
    readonly TARGET_MOVE_ALL_BUTTON: "targetMoveAllButton";
};
export type TransferListTemplateType = (typeof TransferListTemplateTypes)[keyof typeof TransferListTemplateTypes];
export interface TransferListContext<T extends TransferListItem> {
    $implicit: T | undefined;
    move: (item: T) => void;
    moveAll: () => void;
}
export interface TransferListOutput {
    sourceList: TransferListItem[];
    targetList: TransferListItem[];
    direction: 'source' | 'target';
}
export interface TransferListOutputSingle extends TransferListOutput {
    item: TransferListItem;
}
