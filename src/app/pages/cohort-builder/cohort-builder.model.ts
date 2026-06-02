import type { FilterCatalogItem } from '../segments/segments-filter-catalog';

export type CohortEventKind = 'start' | 'return';

export interface CohortEventRow {
  id: string;
  catalogId: string;
  label: string;
  group: string;
}

export interface CohortMatrixCell {
  periodIndex: number;
  intervalIndex: number;
  retentionPct: number;
  playerCount: number;
  heat: 'high' | 'medium' | 'low' | 'empty';
}

export interface CohortMatrix {
  periodLabels: string[];
  intervalLabels: string[];
  cells: CohortMatrixCell[];
}

export interface CohortPlayerRow {
  id: string;
  username: string;
  email: string;
  lastActivity: string;
}

export function catalogItemToEventRow(item: FilterCatalogItem): CohortEventRow {
  return {
    id: `ev-${item.id}-${Date.now()}`,
    catalogId: item.id,
    label: item.label,
    group: item.group,
  };
}
