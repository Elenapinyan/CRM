import type { CrmListColumnPanelItem } from '../../shared/crm-list/crm-list-columns.model';

export const WORKFLOWS_COLUMN_PANEL_ITEMS: CrmListColumnPanelItem[] = [
  { colId: 'id', label: 'ID', locked: true },
  { colId: 'status', label: 'Status', locked: false },
  { colId: 'name', label: 'Name', locked: true },
  { colId: 'players', label: 'Players', locked: false },
  { colId: 'type', label: 'Type', locked: false },
  { colId: 'creator', label: 'Creator', locked: false },
  { colId: 'created', label: 'Created', locked: false },
  { colId: 'modified', label: 'Modified', locked: false },
];

export const WORKFLOWS_DEFAULT_COLUMN_VISIBILITY: Record<string, boolean> = {
  id: true,
  status: true,
  name: true,
  players: true,
  type: true,
  creator: true,
  created: true,
  modified: true,
};
