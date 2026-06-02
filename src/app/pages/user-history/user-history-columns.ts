import type { CrmListColumnPanelItem } from '../../shared/crm-list/crm-list-columns.model';

export const USER_HISTORY_COLUMN_PANEL_ITEMS: CrmListColumnPanelItem[] = [
  { colId: 'id', label: 'Event ID', locked: true },
  { colId: 'timestamp', label: 'Date & time', locked: false },
  { colId: 'action', label: 'Action', locked: false },
  { colId: 'entityKind', label: 'Section', locked: false },
  { colId: 'itemName', label: 'Item', locked: true },
  { colId: 'itemId', label: 'Item ID', locked: false },
  { colId: 'user', label: 'User', locked: false },
];

export const USER_HISTORY_DEFAULT_COLUMN_VISIBILITY: Record<string, boolean> = {
  id: true,
  timestamp: true,
  action: true,
  entityKind: true,
  itemName: true,
  itemId: true,
  user: true,
};
