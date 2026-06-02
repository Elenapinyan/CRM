export type TransferListItem = {
  name: string;
  value: string;
  icon?: string;
  category?: string;
};

export type ParentTransferListItem = TransferListItem & {
  children: TransferListItem[];
};

export type TransferListGroup = {
  key: string;
  items: TransferListItem[];
};

export const TransferListTemplateTypes = {
  SOURCE_ITEM: 'sourceItem',
  SOURCE_ITEM_CONTENT: 'sourceItemContent',
  SOURCE_ITEM_BUTTON_ICON: 'sourceItemButtonIcon',
  SOURCE_MOVE_ALL_BUTTON: 'sourceMoveAllButton',
  TARGET_ITEM: 'targetItem',
  TARGET_ITEM_CONTENT: 'targetItemContent',
  TARGET_ITEM_BUTTON_ICON: 'targetItemButtonIcon',
  TARGET_MOVE_ALL_BUTTON: 'targetMoveAllButton',
} as const;

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

export const isParentItem = (item: TransferListItem | ParentTransferListItem): item is ParentTransferListItem =>
  item.hasOwnProperty('children');
