/** Column visibility panel + grid `colId` / `field` alignment. */
export interface CrmListColumnPanelItem {
  colId: string;
  label: string;
  /** When true, column stays visible and checkbox is disabled. */
  locked: boolean;
}
