import type { CrmListColumnPanelItem } from '../../shared/crm-list/crm-list-columns.model';

export const COHORTS_COLUMN_PANEL_ITEMS: CrmListColumnPanelItem[] = [
  { colId: 'id', label: 'ID', locked: true },
  { colId: 'name', label: 'Name', locked: true },
  { colId: 'description', label: 'Description', locked: false },
  { colId: 'creator', label: 'Creator', locked: false },
  { colId: 'created', label: 'Created', locked: false },
  { colId: 'modified', label: 'Modified', locked: false },
];

export const COHORTS_DEFAULT_COLUMN_VISIBILITY: Record<string, boolean> = {
  id: true,
  name: true,
  description: true,
  creator: true,
  created: true,
  modified: true,
};
