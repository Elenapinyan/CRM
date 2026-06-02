import type { SegmentFilterRow } from '../../segments-editor.model';

export interface SegmentPlayerRow {
  id: string;
  username: string;
  ggrEur: number;
  firstName: string;
  lastName: string;
  lastActivity: string;
}

export interface SegmentPlayersModalData {
  playerCount: number;
  scope: 'filter' | 'segment' | 'uploaded-file';
  filterRow?: SegmentFilterRow;
  filterRows?: SegmentFilterRow[];
  logic?: 'and' | 'or';
  uploadedFileId?: string;
  uploadedFileName?: string;
}
