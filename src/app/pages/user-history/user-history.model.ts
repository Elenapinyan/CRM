/** Sections of the app that contribute changeable records to the history log. */
export type HistoryEntityKind = 'segment' | 'cohort' | 'workflow' | 'template';

export type HistoryAction = 'created' | 'modified';

/** One change event — a record being created or modified somewhere in the app. */
export interface UserHistoryRow {
  /** Synthetic, stable event id. */
  id: number;
  /** When the change happened — real Date for sorting and date filtering. */
  timestamp: Date;
  /** Pre-formatted display string for the timestamp. */
  dateLabel: string;
  user: string;
  action: HistoryAction;
  entityKind: HistoryEntityKind;
  /** Name of the changed record. */
  itemName: string;
  /** Id of the changed record. */
  itemId: number;
}

export interface UserHistoryFooterStats {
  segment: number;
  cohort: number;
  workflow: number;
  template: number;
}
