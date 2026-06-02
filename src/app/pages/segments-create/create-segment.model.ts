export type CreateSegmentType = 'dynamic' | 'static' | 'uploaded';

export const CREATE_SEGMENT_TYPES: readonly CreateSegmentType[] = ['dynamic', 'static', 'uploaded'] as const;

export const CREATE_SEGMENT_TYPE_LABELS: Record<CreateSegmentType, string> = {
  dynamic: 'Dynamic',
  static: 'Static',
  uploaded: 'Uploaded',
};

export const CREATE_SEGMENT_TYPE_INFO: Record<CreateSegmentType, string> = {
  dynamic:
    'A living segment that automatically updates. Players are added or removed as their data changes to match your filters.',
  static:
    'A frozen snapshot of players. This list captures exactly who matched your filters at the time of creation and will not change automatically.',
  uploaded:
    'A fixed segment imported from a CSV, XLSX, or XLS files. Players are securely matched to your database using their ID, email, or username.',
};

export interface CreateSegmentResult {
  type: CreateSegmentType;
  name: string;
  description: string;
}

/** @deprecated Use {@link CreateSegmentResult} */
export type CreateSegmentModalResult = CreateSegmentResult;

export interface NewSegmentDraft {
  type: CreateSegmentType;
  name: string;
  description: string;
  createdAt: Date;
}

export function formatSegmentCreatedLabel(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
    .format(date)
    .replace(',', '');
}

export function segmentTypePillClass(type: CreateSegmentType): string {
  switch (type) {
    case 'dynamic':
      return 'segments-pill--cyan';
    case 'static':
      return 'segments-pill--yellow';
    case 'uploaded':
      return 'segments-pill--pink';
  }
}

export function segmentTypeIconClass(type: CreateSegmentType): string {
  switch (type) {
    case 'dynamic':
      return 'ds-icon ds-icon-general-wave';
    case 'static':
      return 'ds-icon ds-icon-general-anchor';
    case 'uploaded':
      return 'ds-icon ds-icon-control-upload';
  }
}
