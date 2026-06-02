export type SegmentType = 'dynamic' | 'static' | 'uploaded';

export interface FilterDef {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  dataType: 'number' | 'date' | 'string' | 'boolean' | 'enum';
  color: string;
  description: string;
}

export interface ActiveFilter {
  id: string;
  defId: string;
  name: string;
  color: string;
  dataType: FilterDef['dataType'];
  condition: string;
  value: string;
  value2?: string;
  unit: string;
  valueType: 'exact' | 'equivalent';
  playerCount: number;
}

export interface UploadedFile {
  id: string;
  name: string;
  playerCount: number;
}

export interface DraftSegment {
  name: string;
  description: string;
  type: SegmentType;
  logic: 'AND' | 'OR';
  filters: ActiveFilter[];
  files: UploadedFile[];
}
