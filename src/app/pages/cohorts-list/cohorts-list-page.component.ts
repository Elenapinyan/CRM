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
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridOptions, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';

import { rmTheme } from '../../ag-grid/rm-grid.theme';
import { formatCrmListPageRefreshedAt } from '../../shared/crm-list/crm-list-date.util';
import type { CrmListColumnPanelItem } from '../../shared/crm-list/crm-list-columns.model';
import { ClearFiltersButtonComponent } from '../../shared/ag-grid/clear-filters-button.component';
import { CreateCohortOffCanvasComponent } from '../cohorts-create/create-cohort-off-canvas.component';
import type { CreateCohortResult } from '../cohorts-create/create-cohort.model';
import {
  COHORTS_COLUMN_PANEL_ITEMS,
  COHORTS_DEFAULT_COLUMN_VISIBILITY,
} from './cohorts-list-columns';
import { buildCohortRowsList } from './cohorts-list.mock';
import type { CohortRow } from './cohorts-list.model';

function nameCellRenderer(params: ICellRendererParams<CohortRow>): HTMLElement {
  const a = document.createElement('a');
  a.className = 'crm-list__name-link';
  const id = params.data?.id ?? '';
  a.href = id ? `/analytics/cohorts/build?id=${id}` : '#';
  a.textContent = params.data?.name ?? '';
  return a;
}

@Component({
  selector: 'app-cohorts-list-page',
  imports: [DsButton, AgGridAngular, ClearFiltersButtonComponent],
  templateUrl: './cohorts-list-page.component.html',
  styleUrl: './cohorts-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CohortsListPageComponent {
  private readonly router = inject(Router);
  private readonly offCanvas = inject(OffCanvasService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly allRows: CohortRow[] = buildCohortRowsList();

  protected readonly rowData = signal<CohortRow[]>(this.allRows);

  protected readonly columnPanelItems: readonly CrmListColumnPanelItem[] = COHORTS_COLUMN_PANEL_ITEMS;

  protected readonly columnPanelSearch = signal('');
  protected readonly columnsPanelOpen = signal(false);
  protected readonly columnVisibilityDraft = signal<Record<string, boolean>>({
    ...COHORTS_DEFAULT_COLUMN_VISIBILITY,
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

  private gridApi: GridApi<CohortRow> | null = null;

  protected readonly gridApiRef = signal<GridApi<CohortRow> | null>(null);

  protected readonly columnDefs: ColDef<CohortRow>[] = [
    { field: 'id', colId: 'id', headerName: 'ID', width: 140, filter: 'agNumberColumnFilter' },
    {
      colId: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 200,
      cellRenderer: nameCellRenderer,
    },
    { field: 'description', colId: 'description', headerName: 'Description', flex: 1, minWidth: 240 },
    { field: 'creator', colId: 'creator', headerName: 'Creator', width: 140 },
    { field: 'created', colId: 'created', headerName: 'Created', width: 180 },
    { field: 'modified', colId: 'modified', headerName: 'Modified', width: 180 },
  ];

  protected readonly gridOptions: GridOptions<CohortRow> = {
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
  };

  protected onGridReady(event: GridReadyEvent<CohortRow>): void {
    this.gridApi = event.api;
    this.gridApiRef.set(event.api);
    this.columnVisibilityDraft.set({ ...COHORTS_DEFAULT_COLUMN_VISIBILITY });
    this.applyDraftToGrid();
  }

  protected onSearchInput(event: Event): void {
    const v = (event.target as HTMLInputElement).value;
    this.gridApi?.setGridOption('quickFilterText', v);
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

  protected createCohort(): void {
    this.offCanvas
      .open(CreateCohortOffCanvasComponent, {
        settings: {
          keyboard: true,
          backdrop: true,
          panelClass: 'create-cohort-offcanvas-panel ds-component',
        },
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        const draft = result as unknown as CreateCohortResult | undefined;
        if (!draft?.name) {
          return;
        }

        void this.router.navigate(['/analytics/cohorts/build'], {
          queryParams: {
            new: '1',
            name: draft.name,
            description: draft.description,
            created: new Date().toISOString(),
          },
        });
      });
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
    this.columnVisibilityDraft.set({ ...COHORTS_DEFAULT_COLUMN_VISIBILITY });
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
      this.columnVisibilityDraft.set({ ...COHORTS_DEFAULT_COLUMN_VISIBILITY });
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
}
