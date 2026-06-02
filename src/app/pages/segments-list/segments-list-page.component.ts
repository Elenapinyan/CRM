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
import { CreateSegmentOffCanvasComponent } from '../segments-create/create-segment-off-canvas.component';
import type { CreateSegmentResult } from '../segments-create/create-segment.model';
import { ClearFiltersButtonComponent } from '../../shared/ag-grid/clear-filters-button.component';
import {
  SEGMENTS_COLUMN_PANEL_ITEMS,
  SEGMENTS_DEFAULT_COLUMN_VISIBILITY,
  type SegmentsColumnPanelItem,
} from './segments-list-columns';
import { buildSegmentRowsList, computeSegmentsFooterStats } from './segments-list.mock';
import type { SegmentRow, SegmentState } from './segments-list.model';

function nameCellRenderer(params: ICellRendererParams<SegmentRow>): HTMLElement {
  const a = document.createElement('a');
  a.className = 'segments-list__name-link';
  a.href = `/segments/build?id=${params.data?.id ?? ''}`;
  a.textContent = params.data?.name ?? '';
  return a;
}

function typeChipCellRenderer(params: ICellRendererParams<SegmentRow>): HTMLElement {
  const wrap = document.createElement('span');
  const t = params.data?.type;
  if (!t) {
    return wrap;
  }
  const label = t === 'dynamic' ? 'Dynamic' : t === 'static' ? 'Static' : 'Uploaded';
  const icon =
    t === 'dynamic' ? 'ds-icon ds-icon-general-wave' : t === 'static' ? 'ds-icon ds-icon-general-anchor' : 'ds-icon ds-icon-control-upload';
  wrap.className = `segments-list__footer-chip segments-list__footer-chip--${t}`;
  wrap.innerHTML = `<i class="${icon}" aria-hidden="true"></i>${label}`;
  return wrap;
}

function formatSegmentsPageRefreshedAt(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

function stateCellRenderer(params: ICellRendererParams<SegmentRow>): HTMLElement {
  const wrap = document.createElement('span');
  const s: SegmentState | undefined = params.data?.state;
  if (!s) {
    return wrap;
  }
  const label = s === 'used' ? 'Used' : 'Not used';
  wrap.className = `segments-list__state segments-list__state--${s}`;
  wrap.innerHTML = `<span class="segments-list__state-dot" aria-hidden="true"></span><span>${label}</span>`;
  return wrap;
}

@Component({
  selector: 'app-segments-list-page',
  imports: [DsButton, AgGridAngular, ClearFiltersButtonComponent],
  templateUrl: './segments-list-page.component.html',
  styleUrl: './segments-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentsListPageComponent {
  private readonly router = inject(Router);
  private readonly offCanvas = inject(OffCanvasService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly allRows: SegmentRow[] = buildSegmentRowsList();

  protected readonly rowData = signal<SegmentRow[]>(this.allRows);

  protected readonly columnPanelItems: readonly SegmentsColumnPanelItem[] = SEGMENTS_COLUMN_PANEL_ITEMS;

  protected readonly columnPanelSearch = signal('');
  protected readonly columnsPanelOpen = signal(false);
  /** Draft visibility while panel is open (`true` = visible). */
  protected readonly columnVisibilityDraft = signal<Record<string, boolean>>({ ...SEGMENTS_DEFAULT_COLUMN_VISIBILITY });

  private readonly columnAnchor = viewChild.required<ElementRef<HTMLElement>>('columnAnchor');

  protected readonly filteredPanelColumns = computed(() => {
    const q = this.columnPanelSearch().trim().toLowerCase();
    if (!q) {
      return this.columnPanelItems;
    }
    return this.columnPanelItems.filter((c) => c.label.toLowerCase().includes(q));
  });

  protected readonly lastUpdatedLabel = signal(formatSegmentsPageRefreshedAt(new Date()));

  /** Player totals by segment type for rows currently passing grid filters. */
  protected readonly footerStats = signal(computeSegmentsFooterStats(this.allRows));

  private gridApi: GridApi<SegmentRow> | null = null;

  protected readonly gridApiRef = signal<GridApi<SegmentRow> | null>(null);

  protected readonly columnDefs: ColDef<SegmentRow>[] = [
    { field: 'id', colId: 'id', headerName: 'ID', width: 120, filter: 'agNumberColumnFilter' },
    {
      colId: 'type',
      headerName: 'Type',
      minWidth: 140,
      width: 160,
      cellRenderer: typeChipCellRenderer,
      valueGetter: (p) => p.data?.type,
    },
    {
      colId: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 200,
      cellRenderer: nameCellRenderer,
    },
    {
      field: 'players',
      colId: 'players',
      headerName: 'Players',
      width: 110,
      type: 'rightAligned',
      valueFormatter: (p) => (p.value == null ? '' : Number(p.value).toLocaleString()),
    },
    {
      colId: 'state',
      headerName: 'State',
      width: 120,
      cellRenderer: stateCellRenderer,
      valueGetter: (p) => p.data?.state,
    },
    {
      field: 'usage',
      colId: 'usage',
      headerName: 'Usage',
      flex: 1,
      minWidth: 120,
      valueFormatter: (p) => (p.value == null || p.value === '' ? '—' : String(p.value)),
    },
    { field: 'creator', colId: 'creator', headerName: 'Creator', width: 130 },
    { field: 'created', colId: 'created', headerName: 'Created date', width: 150 },
    { field: 'modified', colId: 'modified', headerName: 'Modified date', width: 150 },
  ];

  protected readonly gridOptions: GridOptions<SegmentRow> = {
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

  protected onGridReady(event: GridReadyEvent<SegmentRow>): void {
    this.gridApi = event.api;
    this.gridApiRef.set(event.api);
    this.columnVisibilityDraft.set({ ...SEGMENTS_DEFAULT_COLUMN_VISIBILITY });
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

  protected createSegment(): void {
    this.offCanvas
      .open(CreateSegmentOffCanvasComponent, {
        settings: {
          keyboard: true,
          backdrop: true,
          panelClass: 'create-segment-offcanvas-panel ds-component',
        },
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        const draft = result as unknown as CreateSegmentResult | undefined;
        if (!draft?.type || !draft.name) {
          return;
        }

        const createdAt = new Date().toISOString();
        void this.router.navigate(['/segments/build'], {
          queryParams: {
            new: '1',
            type: draft.type,
            name: draft.name,
            description: draft.description,
            created: createdAt,
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
    this.columnVisibilityDraft.set({ ...SEGMENTS_DEFAULT_COLUMN_VISIBILITY });
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
      this.columnVisibilityDraft.set({ ...SEGMENTS_DEFAULT_COLUMN_VISIBILITY });
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
      this.footerStats.set(computeSegmentsFooterStats(this.allRows));
      return;
    }

    const filtered: SegmentRow[] = [];
    api.forEachNodeAfterFilter((node) => {
      if (node.data) {
        filtered.push(node.data);
      }
    });
    this.footerStats.set(computeSegmentsFooterStats(filtered));
  }
}
