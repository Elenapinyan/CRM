import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  signal,
  viewChild,
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridOptions, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';

import { rmTheme } from '../../ag-grid/rm-grid.theme';
import { formatCrmListPageRefreshedAt } from '../../shared/crm-list/crm-list-date.util';
import type { CrmListColumnPanelItem } from '../../shared/crm-list/crm-list-columns.model';
import { ClearFiltersButtonComponent } from '../../shared/ag-grid/clear-filters-button.component';
import {
  USER_HISTORY_COLUMN_PANEL_ITEMS,
  USER_HISTORY_DEFAULT_COLUMN_VISIBILITY,
} from './user-history-columns';
import { buildUserHistoryRows, computeUserHistoryFooterStats } from './user-history.mock';
import type { HistoryAction, HistoryEntityKind, UserHistoryRow } from './user-history.model';

const ACTION_META: Record<HistoryAction, { label: string; gridChipClass: string; iconClass: string }> = {
  created: {
    label: 'Created',
    gridChipClass: 'crm-list__grid-chip--act-created',
    iconClass: 'ds-icon ds-icon-control-plus',
  },
  modified: {
    label: 'Modified',
    gridChipClass: 'crm-list__grid-chip--act-modified',
    iconClass: 'ds-icon ds-icon-control-edit',
  },
};

const ENTITY_META: Record<
  HistoryEntityKind,
  { label: string; gridChipClass: string; footerChipClass: string; iconClass: string }
> = {
  segment: {
    label: 'Segment',
    gridChipClass: 'crm-list__grid-chip--ent-segment',
    footerChipClass: 'crm-list__footer-chip--ent-segment',
    iconClass: 'ds-icon ds-icon-general-target',
  },
  cohort: {
    label: 'Cohort',
    gridChipClass: 'crm-list__grid-chip--ent-cohort',
    footerChipClass: 'crm-list__footer-chip--ent-cohort',
    iconClass: 'ds-icon ds-icon-general-chart',
  },
  workflow: {
    label: 'Workflow',
    gridChipClass: 'crm-list__grid-chip--ent-workflow',
    footerChipClass: 'crm-list__footer-chip--ent-workflow',
    iconClass: 'ds-icon ds-icon-general-flowchart',
  },
  template: {
    label: 'Template',
    gridChipClass: 'crm-list__grid-chip--ent-template',
    footerChipClass: 'crm-list__footer-chip--ent-template',
    iconClass: 'ds-icon ds-icon-general-messages',
  },
};

function itemNameCellRenderer(params: ICellRendererParams<UserHistoryRow>): HTMLElement {
  const a = document.createElement('a');
  a.className = 'crm-list__name-link';
  a.href = '#';
  a.textContent = params.data?.itemName ?? '';
  return a;
}

function actionCellRenderer(params: ICellRendererParams<UserHistoryRow>): HTMLElement {
  const wrap = document.createElement('span');
  const action = params.data?.action;
  if (!action) {
    return wrap;
  }
  const meta = ACTION_META[action];
  wrap.className = `crm-list__grid-chip ${meta.gridChipClass}`;
  wrap.innerHTML = `<i class="${meta.iconClass}" aria-hidden="true"></i>${meta.label}`;
  return wrap;
}

function entityCellRenderer(params: ICellRendererParams<UserHistoryRow>): HTMLElement {
  const wrap = document.createElement('span');
  const kind = params.data?.entityKind;
  if (!kind) {
    return wrap;
  }
  const meta = ENTITY_META[kind];
  wrap.className = `crm-list__grid-chip ${meta.gridChipClass}`;
  wrap.innerHTML = `<i class="${meta.iconClass}" aria-hidden="true"></i>${meta.label}`;
  return wrap;
}

/** Strip time so the date filter compares calendar days. */
function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

@Component({
  selector: 'app-user-history-page',
  imports: [AgGridAngular, ClearFiltersButtonComponent],
  templateUrl: './user-history-page.component.html',
  styleUrl: './user-history-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserHistoryPageComponent {
  private readonly allRows: UserHistoryRow[] = buildUserHistoryRows();

  protected readonly rowData = signal<UserHistoryRow[]>(this.allRows);

  protected readonly columnPanelItems: readonly CrmListColumnPanelItem[] = USER_HISTORY_COLUMN_PANEL_ITEMS;

  protected readonly columnPanelSearch = signal('');
  protected readonly columnsPanelOpen = signal(false);
  protected readonly columnVisibilityDraft = signal<Record<string, boolean>>({
    ...USER_HISTORY_DEFAULT_COLUMN_VISIBILITY,
  });

  private readonly columnAnchor = viewChild.required<ElementRef<HTMLElement>>('columnAnchor');

  protected readonly filteredPanelColumns = computed(() => {
    const q = this.columnPanelSearch().trim().toLowerCase();
    if (!q) {
      return this.columnPanelItems;
    }
    return this.columnPanelItems.filter((c) => c.label.toLowerCase().includes(q));
  });

  protected readonly lastUpdatedLabel = signal(formatCrmListPageRefreshedAt(new Date()));

  protected readonly footerStats = signal(computeUserHistoryFooterStats(this.allRows));

  protected readonly entityMeta = ENTITY_META;

  protected readonly footerEntityOrder: HistoryEntityKind[] = [
    'segment',
    'cohort',
    'workflow',
    'template',
  ];

  protected readonly footerEntityLabel: Record<HistoryEntityKind, string> = {
    segment: 'Segments',
    cohort: 'Cohorts',
    workflow: 'Workflows',
    template: 'Templates',
  };

  private gridApi: GridApi<UserHistoryRow> | null = null;

  protected readonly gridApiRef = signal<GridApi<UserHistoryRow> | null>(null);

  protected readonly columnDefs: ColDef<UserHistoryRow>[] = [
    { field: 'id', colId: 'id', headerName: 'Event ID', width: 130, filter: 'agNumberColumnFilter' },
    {
      colId: 'timestamp',
      headerName: 'Date & time',
      width: 190,
      sort: 'desc',
      filter: 'agDateColumnFilter',
      valueGetter: (p) => p.data?.timestamp ?? null,
      valueFormatter: (p) => p.data?.dateLabel ?? '',
      getQuickFilterText: (p) => p.data?.dateLabel ?? '',
      filterParams: {
        comparator: (filterDate: Date, cellValue: unknown): number => {
          if (!(cellValue instanceof Date)) {
            return 0;
          }
          const cell = startOfDay(cellValue).getTime();
          const filter = filterDate.getTime();
          if (cell < filter) {
            return -1;
          }
          if (cell > filter) {
            return 1;
          }
          return 0;
        },
      },
    },
    {
      colId: 'action',
      headerName: 'Action',
      width: 150,
      cellRenderer: actionCellRenderer,
      valueGetter: (p) => (p.data ? ACTION_META[p.data.action].label : ''),
    },
    {
      colId: 'entityKind',
      headerName: 'Section',
      width: 160,
      cellRenderer: entityCellRenderer,
      valueGetter: (p) => (p.data ? ENTITY_META[p.data.entityKind].label : ''),
    },
    {
      field: 'itemName',
      colId: 'itemName',
      headerName: 'Item',
      flex: 1,
      minWidth: 220,
      cellRenderer: itemNameCellRenderer,
    },
    { field: 'itemId', colId: 'itemId', headerName: 'Item ID', width: 150, filter: 'agNumberColumnFilter' },
    { field: 'user', colId: 'user', headerName: 'User', width: 170 },
  ];

  protected readonly gridOptions: GridOptions<UserHistoryRow> = {
    theme: rmTheme,
    suppressCellFocus: true,
    rowHeight: 48,
    headerHeight: 44,
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
    },
    getRowId: (p) => String(p.data?.id ?? ''),
    onFilterChanged: () => this.refreshFooterStatsFromGrid(),
    onModelUpdated: () => this.refreshFooterStatsFromGrid(),
  };

  protected onGridReady(event: GridReadyEvent<UserHistoryRow>): void {
    this.gridApi = event.api;
    this.gridApiRef.set(event.api);
    this.columnVisibilityDraft.set({ ...USER_HISTORY_DEFAULT_COLUMN_VISIBILITY });
    this.applyDraftToGrid();
    this.refreshFooterStatsFromGrid();
  }

  protected onSearchInput(event: Event): void {
    const v = (event.target as HTMLInputElement).value;
    this.gridApi?.setGridOption('quickFilterText', v);
    this.refreshFooterStatsFromGrid();
  }

  protected onColumnPanelSearchInput(event: Event): void {
    this.columnPanelSearch.set((event.target as HTMLInputElement).value);
  }

  protected toggleColumnsPanel(event: MouseEvent): void {
    event.stopPropagation();
    if (this.columnsPanelOpen()) {
      this.closeColumnsPanel();
    } else {
      this.syncDraftFromGrid();
      this.columnsPanelOpen.set(true);
    }
  }

  protected closeColumnsPanel(): void {
    this.columnsPanelOpen.set(false);
    this.columnPanelSearch.set('');
  }

  protected isColumnVisible(colId: string): boolean {
    return this.columnVisibilityDraft()[colId] ?? true;
  }

  protected onColumnCheckboxChange(colId: string, locked: boolean, checked: boolean): void {
    if (locked) {
      return;
    }
    this.columnVisibilityDraft.update((d) => ({ ...d, [colId]: checked }));
    this.applyDraftToGrid();
  }

  protected revertColumnsToDefault(): void {
    this.columnVisibilityDraft.set({ ...USER_HISTORY_DEFAULT_COLUMN_VISIBILITY });
    this.applyDraftToGrid();
  }

  private applyDraftToGrid(): void {
    const api = this.gridApi;
    if (!api) {
      return;
    }
    const draft = this.columnVisibilityDraft();
    const state = this.columnPanelItems.map((item) => ({
      colId: item.colId,
      hide: item.locked ? false : !draft[item.colId],
    }));
    api.applyColumnState({ state, defaultState: { hide: false } });
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.columnsPanelOpen()) {
      return;
    }
    const target = event.target as Node | null;
    if (!target) {
      return;
    }
    const anchor = this.columnAnchor().nativeElement;
    if (anchor.contains(target)) {
      return;
    }
    this.closeColumnsPanel();
  }

  private syncDraftFromGrid(): void {
    const api = this.gridApi;
    if (!api) {
      this.columnVisibilityDraft.set({ ...USER_HISTORY_DEFAULT_COLUMN_VISIBILITY });
      return;
    }
    const colState = api.getColumnState();
    const next: Record<string, boolean> = {};
    for (const item of this.columnPanelItems) {
      const s = colState.find((c) => c.colId === item.colId);
      const visible = s ? !s.hide : true;
      next[item.colId] = item.locked ? true : visible;
    }
    this.columnVisibilityDraft.set(next);
  }

  private refreshFooterStatsFromGrid(): void {
    const api = this.gridApi;
    if (!api) {
      this.footerStats.set(computeUserHistoryFooterStats(this.allRows));
      return;
    }

    const filtered: UserHistoryRow[] = [];
    api.forEachNodeAfterFilter((node) => {
      if (node.data) {
        filtered.push(node.data);
      }
    });
    this.footerStats.set(computeUserHistoryFooterStats(filtered));
  }
}
