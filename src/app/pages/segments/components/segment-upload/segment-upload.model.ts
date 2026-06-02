export type UploadColumnMappingField = 'id' | 'username' | 'phone' | 'email';

export const UPLOAD_COLUMN_MAPPING_OPTIONS: readonly {
  value: UploadColumnMappingField;
  label: string;
}[] = [
  { value: 'id', label: 'ID' },
  { value: 'username', label: 'username' },
  { value: 'phone', label: 'phone' },
  { value: 'email', label: 'email' },
] as const;

export interface UploadColumnMapping {
  colId: string;
  field: UploadColumnMappingField | null;
}

export interface UploadFilePreviewRow {
  [key: string]: string;
}

export interface UploadedSegmentFileDraft {
  id: string;
  fileName: string;
  playerCount: number;
  rows: UploadFilePreviewRow[];
  columnMappings: UploadColumnMapping[];
  /** When true the file already has a valid identifier mapping (October / September in Figma). */
  preValidated?: boolean;
}

export interface UploadedSegmentFile {
  id: string;
  fileName: string;
  playerCount: number;
}

export interface SegmentFieldsMappingModalData {
  files: UploadedSegmentFileDraft[];
}

export interface SegmentFieldsMappingModalResult {
  files: UploadedSegmentFile[];
}

export interface SegmentFieldsMappingHeaderParams {
  colId: string;
  columnIndex: number;
  mappingField: UploadColumnMappingField | null;
  onMappingSelect: (colId: string, field: UploadColumnMappingField) => void;
}
