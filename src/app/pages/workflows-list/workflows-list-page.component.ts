import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { DsButton, OffCanvasService } from '@platform-workspace/design-system-v2';
import { CreateWorkflowOffCanvasComponent } from '../workflows-create/create-workflow-off-canvas.component';
import type { CreateWorkflowResult } from '../workflows-create/create-workflow.model';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridOptions, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';

import { rmTheme } from '../../ag-grid/rm-grid.theme';
import { formatCrmListPageRefreshedAt } from '../../shared/crm-list/crm-list-date.util';
import type { CrmListColumnPanelItem } from '../../shared/crm-list/crm-list-columns.model';
import { ClearFiltersButtonComponent } from '../../shared/ag-grid/clear-filters-button.component';
import {
  WORKFLOWS_COLUMN_PANEL_ITEMS,
  WORKFLOWS_DEFAULT_COLUMN_VISIBILITY,
} from './workflows-list-columns';
import { buildWorkflowRowsList, computeWorkflowFooterStats } from './workflows-list.mock';
import type { WorkflowRow, WorkflowStatus, WorkflowType } from './workflows-list.model';

const WORKFLOW_STATUS_META: Record<
  WorkflowStatus,
  { label: string; gridChipClass: string; footerChipClass: string; iconClass: string }
> = {
  draft: {
    label: 'Draft',
    gridChipClass: 'crm-list__grid-chip--wf-draft',
    footerChipClass: 'crm-list__footer-chip--wf-draft',
    iconClass: 'ds-icon ds-icon-general-new',
  },
  'in-progress': {
    label: 'In progress',
    gridChipClass: 'crm-list__grid-chip--wf-in-progress',
    footerChipClass: 'crm-list__footer-chip--wf-in-progress',
    iconClass: 'ds-icon ds-icon-general-play',
  },
  scheduled: {
    label: 'Scheduled',
    gridChipClass: 'crm-list__grid-chip--wf-scheduled',
    footerChipClass: 'crm-list__footer-chip--wf-scheduled',
    iconClass: 'ds-icon ds-icon-general-time',
  },
  completed: {
    label: 'Completed',
    gridChipClass: 'crm-list__grid-chip--wf-completed',
    footerChipClass: 'crm-list__footer-chip--wf-completed',
    iconClass: 'ds-icon ds-icon-control-check',
  },
  paused: {
    label: 'Paused',
    gridChipClass: 'crm-list__grid-chip--wf-paused',
    footerChipClass: 'crm-list__footer-chip--wf-paused',
    iconClass: 'ds-icon ds-icon-general-pause',
  },
  canceled: {
    label: 'Canceled',
    gridChipClass: 'crm-list__grid-chip--wf-canceled',
    footerChipClass: 'crm-list__footer-chip--wf-canceled',
    iconClass: 'ds-icon ds-icon-control-cross',
  },
};

const WORKFLOW_TYPE_LABELS: Record<WorkflowType, string> = {
  trigger: 'Trigger',
  scheduled: 'Scheduled',
  manual: 'Manual',
};

function workflowNameCellRenderer(params: ICellRendererParams<WorkflowRow>): HTMLElement {
  const a = document.createElement('a');
  a.className = 'crm-list__name-link';
  a.href = '#';
  a.textContent = params.data?.name ?? '';
  return a;
}

function workflowStatusCellRenderer(params: ICellRendererParams<WorkflowRow>): HTMLElement {
  const wrap = document.createElement('span');
  const status = params.data?.status;
  if (!status) {
    return wrap;
  }
  const meta = WORKFLOW_STATUS_META[status];
  wrap.className = `crm-list__grid-chip ${meta.gridChipClass}`;
  wrap.innerHTML = `<i class="${meta.iconClass}" aria-hidden="true"></i>${meta.label}`;
  return wrap;
}

@Component({
  selector: 'app-workflows-list-page',
  imports: [DsButton, AgGridAngular, ClearFiltersButtonComponent],
  templateUrl: './workflows-list-page.component.html',
  styleUrl: './workflows-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowsListPageComponent {
  private readonly offCanvas = inject(OffCanvasService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private readonly allRows: WorkflowRow[] = buildWorkflowRowsList();

  protected readonly rowData = signal<WorkflowRow[]>(this.allRows);

  protected readonly columnPanelItems: readonly CrmListColumnPanelItem[] = WORKFLOWS_COLUMN_PANEL_ITEMS;

  protected readonly columnPanelSearch = signal('');
  protected readonly columnsPanelOpen = signal(false);
  protected readonly columnVisibilityDraft = signal<Record<string, boolean>>({
    ...WORKFLOWS_DEFAULT_COLUMN_VISIBILITY,
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

  protected readonly footerStats = signal(computeWorkflowFooterStats(this.allRows));

  protected readonly workflowStatusMeta = WORKFLOW_STATUS_META;

  protected readonly footerStatusOrder: WorkflowStatus[] = [
    'in-progress',
    'completed',
    'scheduled',
    'draft',
    'paused',
    'canceled',
  ];

  private gridApi: GridApi<WorkflowRow> | null = null;

  protected readonly gridApiRef = signal<GridApi<WorkflowRow> | null>(null);

  protected readonly columnDefs: ColDef<WorkflowRow>[] = [
    { field: 'id', colId: 'id', headerName: 'ID', width: 160, filter: 'agNumberColumnFilter' },
    {
      colId: 'status',
      headerName: 'Status',
      width: 145,
      cellRenderer: workflowStatusCellRenderer,
      valueGetter: (p) => p.data?.status,
    },
    {
      colId: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 200,
      cellRenderer: workflowNameCellRenderer,
    },
    {
      field: 'players',
      colId: 'players',
      headerName: 'Players',
      width: 145,
      type: 'rightAligned',
      valueFormatter: (p) => (p.value == null ? '' : Number(p.value).toLocaleString()),
    },
    {
      colId: 'type',
      headerName: 'Type',
      width: 145,
      valueGetter: (p) => p.data?.type,
      valueFormatter: (p) => {
        const t = p.value as WorkflowType | undefined;
        return t ? WORKFLOW_TYPE_LABELS[t] : '';
      },
    },
    { field: 'creator', colId: 'creator', headerName: 'Creator', width: 160 },
    { field: 'created', colId: 'created', headerName: 'Created', width: 180 },
    { field: 'modified', colId: 'modified', headerName: 'Modified', width: 180 },
  ];

  protected readonly gridOptions: GridOptions<WorkflowRow> = {
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

  protected onGridReady(event: GridReadyEvent<WorkflowRow>): void {
    this.gridApi = event.api;
    this.gridApiRef.set(event.api);
    this.columnVisibilityDraft.set({ ...WORKFLOWS_DEFAULT_COLUMN_VISIBILITY });
    this.applyDraftToGrid();
    this.refreshFooterStatsFromGrid();
  }

  protected createWorkflow(): void {
    this.offCanvas
      .open(CreateWorkflowOffCanvasComponent, {
        settings: {
          keyboard: true,
          backdrop: true,
          panelClass: 'create-workflow-offcanvas-panel ds-component',
        },
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        const draft = result as unknown as CreateWorkflowResult | undefined;
        if (!draft?.name) {
          return;
        }

        void this.router.navigate(['/workflows/build'], {
          queryParams: {
            new: '1',
            name: draft.name,
            description: draft.description,
            created: new Date().toISOString(),
          },
        });
      });
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
    this.columnVisibilityDraft.set({ ...WORKFLOWS_DEFAULT_COLUMN_VISIBILITY });
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
      this.columnVisibilityDraft.set({ ...WORKFLOWS_DEFAULT_COLUMN_VISIBILITY });
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
      this.footerStats.set(computeWorkflowFooterStats(this.allRows));
      return;
    }

    const filtered: WorkflowRow[] = [];
    api.forEachNodeAfterFilter((node) => {
      if (node.data) {
        filtered.push(node.data);
      }
    });
    this.footerStats.set(computeWorkflowFooterStats(filtered));
  }
}
