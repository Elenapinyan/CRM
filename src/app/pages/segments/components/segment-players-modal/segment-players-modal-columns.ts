export interface SegmentPlayersColumnPanelItem {
  colId: string;
  label: string;
  locked: boolean;
}

export const SEGMENT_PLAYERS_COLUMN_PANEL_ITEMS: SegmentPlayersColumnPanelItem[] = [
  { colId: 'id', label: 'ID', locked: true },
  { colId: 'username', label: 'Username', locked: true },
  { colId: 'ggrEur', label: 'GGR, €', locked: false },
  { colId: 'firstName', label: 'First name', locked: false },
  { colId: 'lastName', label: 'Last name', locked: false },
  { colId: 'lastActivity', label: 'Last activity date', locked: false },
];

export const SEGMENT_PLAYERS_DEFAULT_COLUMN_VISIBILITY: Record<string, boolean> = {
  id: true,
  username: true,
  ggrEur: true,
  firstName: true,
  lastName: true,
  lastActivity: true,
};
