export type SegmentType = 'dynamic' | 'static' | 'uploaded';
export type SegmentState = 'used' | 'not-used';

export interface SegmentRow {
  id: number;
  type: SegmentType;
  name: string;
  players: number;
  state: SegmentState;
  /** e.g. "1 workflow" or null for em dash */
  usage: string | null;
  creator: string;
  created: string;
  modified: string;
}
