import type { CrmListColumnPanelItem } from '../../shared/crm-list/crm-list-columns.model';

export const COMMUNICATION_COLUMN_PANEL_ITEMS: CrmListColumnPanelItem[] = [
  { colId: 'id', label: 'ID', locked: true },
  { colId: 'type', label: 'Type', locked: false },
  { colId: 'name', label: 'Name', locked: true },
  { colId: 'state', label: 'State', locked: false },
  { colId: 'usage', label: 'Usage', locked: false },
  { colId: 'creator', label: 'Creator', locked: false },
  { colId: 'created', label: 'Created', locked: false },
  { colId: 'modified', label: 'Modified', locked: false },
];

export const COMMUNICATION_DEFAULT_COLUMN_VISIBILITY: Record<string, boolean> = {
  id: true,
  type: true,
  name: true,
  state: false,
  usage: true,
  creator: true,
  created: true,
  modified: true,
};
