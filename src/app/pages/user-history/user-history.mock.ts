import { buildCohortRowsList } from '../cohorts-list/cohorts-list.mock';
import { buildCommunicationRowsList } from '../communication-list/communication-list.mock';
import { buildSegmentRowsList } from '../segments-list/segments-list.mock';
import { buildWorkflowRowsList } from '../workflows-list/workflows-list.mock';
import type { HistoryEntityKind, UserHistoryFooterStats, UserHistoryRow } from './user-history.model';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

/** Parse the `DD-Mon-YYYY HH:mm` string produced by {@link formatCrmListDate}. */
function parseCrmListDate(value: string): Date {
  const [datePart, timePart] = value.split(' ');
  const [day, month, year] = datePart.split('-');
  const [hour, minute] = (timePart ?? '00:00').split(':');
  return new Date(
    Number(year),
    Math.max(0, MONTHS.indexOf(month as (typeof MONTHS)[number])),
    Number(day),
    Number(hour),
    Number(minute),
  );
}

interface ChangeableRecord {
  id: number;
  name: string;
  creator: string;
  created: string;
  modified: string;
}

/** Flatten every changeable record from a section into create + modify events. */
function collectEvents(
  records: readonly ChangeableRecord[],
  entityKind: HistoryEntityKind,
): Omit<UserHistoryRow, 'id'>[] {
  const events: Omit<UserHistoryRow, 'id'>[] = [];
  for (const record of records) {
    events.push({
      timestamp: parseCrmListDate(record.created),
      dateLabel: record.created,
      user: record.creator,
      action: 'created',
      entityKind,
      itemName: record.name,
      itemId: record.id,
    });
    events.push({
      timestamp: parseCrmListDate(record.modified),
      dateLabel: record.modified,
      user: record.creator,
      action: 'modified',
      entityKind,
      itemName: record.name,
      itemId: record.id,
    });
  }
  return events;
}

/**
 * Aggregate the changeable records from every section of the app — segments,
 * cohorts, workflows and communication templates — into a single history log.
 */
export function buildUserHistoryRows(): UserHistoryRow[] {
  const events: Omit<UserHistoryRow, 'id'>[] = [
    ...collectEvents(buildSegmentRowsList(), 'segment'),
    ...collectEvents(buildCohortRowsList(), 'cohort'),
    ...collectEvents(buildWorkflowRowsList(), 'workflow'),
    ...collectEvents(buildCommunicationRowsList(), 'template'),
  ];

  events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return events.map((event, index) => ({ id: index + 1, ...event }));
}

export function computeUserHistoryFooterStats(
  rows: readonly UserHistoryRow[],
): UserHistoryFooterStats {
  const stats: UserHistoryFooterStats = { segment: 0, cohort: 0, workflow: 0, template: 0 };
  for (const row of rows) {
    stats[row.entityKind]++;
  }
  return stats;
}
