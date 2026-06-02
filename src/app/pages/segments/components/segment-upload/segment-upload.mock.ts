import type { UploadFilePreviewRow, UploadedSegmentFileDraft } from './segment-upload.model';

const SAMPLE_USERNAMES = ['EmJoh', 'Edwin', '111144fsaf', 'Olivia', 'Ava', 'Liam', 'Noah', 'Mia', 'Lucas', 'Ella'];
const SAMPLE_FIRST_NAMES = ['Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Mia', 'Charlotte', 'Amelia', 'Harper', 'Evelyn'];
const SAMPLE_DATES = [
  '01-Jan-2026 09:00',
  '02-Jan-2026 08:30',
  '03-Jan-2026 09:50',
  '04-Jan-2026 09:00',
  '05-Jan-2026 08:00',
  '06-Jan-2026 09:00',
  '07-Jan-2026 08:10',
  '08-Jan-2026 08:10',
  '09-Jan-2026 08:10',
  '10-Jan-2026 08:00',
];

export function buildUploadPreviewRows(seed = 0): UploadFilePreviewRow[] {
  return Array.from({ length: 10 }, (_, index) => {
    const ggr = (48.55 + index * 31.7 + seed * 4.2).toFixed(2);
    return {
      col1: String(456678321 + index * 17 + seed * 1000),
      col2: SAMPLE_USERNAMES[index] ?? `user${index}`,
      col3: ggr,
      col4: SAMPLE_FIRST_NAMES[index] ?? `Name${index}`,
      col5: SAMPLE_FIRST_NAMES[(index + 2) % SAMPLE_FIRST_NAMES.length] ?? `Alt${index}`,
      col6: SAMPLE_DATES[index] ?? '01-Jan-2026 09:00',
    };
  });
}

export function buildDefaultUploadFileDrafts(): UploadedSegmentFileDraft[] {
  return [
    {
      id: 'upload-november',
      fileName: 'November.xls',
      playerCount: 23_543,
      rows: buildUploadPreviewRows(0),
      columnMappings: [
        { colId: 'col1', field: null },
        { colId: 'col2', field: null },
        { colId: 'col3', field: null },
        { colId: 'col4', field: null },
        { colId: 'col5', field: null },
        { colId: 'col6', field: null },
      ],
    },
    {
      id: 'upload-october',
      fileName: 'October.xls',
      playerCount: 45_564,
      rows: buildUploadPreviewRows(1),
      preValidated: true,
      columnMappings: [
        { colId: 'col1', field: 'id' },
        { colId: 'col2', field: 'username' },
        { colId: 'col3', field: null },
        { colId: 'col4', field: null },
        { colId: 'col5', field: null },
        { colId: 'col6', field: null },
      ],
    },
    {
      id: 'upload-september',
      fileName: 'September.xls',
      playerCount: 1_564,
      rows: buildUploadPreviewRows(2),
      preValidated: true,
      columnMappings: [
        { colId: 'col1', field: 'id' },
        { colId: 'col2', field: 'email' },
        { colId: 'col3', field: null },
        { colId: 'col4', field: null },
        { colId: 'col5', field: null },
        { colId: 'col6', field: null },
      ],
    },
  ];
}
