/** Column visibility panel + grid `colId` / `field` alignment. */
export interface SegmentsColumnPanelItem {
  colId: string;
  label: string;
  /** When true, column stays visible and checkbox is disabled. */
  locked: boolean;
}

export const SEGMENTS_COLUMN_PANEL_ITEMS: SegmentsColumnPanelItem[] = [
  { colId: 'id', label: 'ID', locked: true },
  { colId: 'type', label: 'Type', locked: false },
  { colId: 'name', label: 'Name', locked: true },
  { colId: 'players', label: 'Players', locked: false },
  { colId: 'state', label: 'State', locked: false },
  { colId: 'usage', label: 'Usage', locked: false },
  { colId: 'creator', label: 'Creator', locked: false },
  { colId: 'created', label: 'Created date', locked: false },
  { colId: 'modified', label: 'Modified date', locked: false },
];

/** Matches design: Players + State hidden by default; ID + Name always on. */
export const SEGMENTS_DEFAULT_COLUMN_VISIBILITY: Record<string, boolean> = {
  id: true,
  type: true,
  name: true,
  players: false,
  state: false,
  usage: true,
  creator: true,
  created: true,
  modified: true,
};
