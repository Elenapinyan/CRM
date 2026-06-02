import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  computed,
  signal,
  viewChild,
} from '@angular/core';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import type { ModalWithData } from '@platform-workspace/design-system-v2';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridOptions, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';

import { rmTheme } from '../../../../ag-grid/rm-grid.theme';
import { ClearFiltersButtonComponent } from '../../../../shared/ag-grid/clear-filters-button.component';
import {
  SEGMENT_PLAYERS_COLUMN_PANEL_ITEMS,
  SEGMENT_PLAYERS_DEFAULT_COLUMN_VISIBILITY,
  type SegmentPlayersColumnPanelItem,
} from './segment-players-modal-columns';
import { buildSegmentPlayerRows, buildSegmentPlayersSeed } from './segment-players-modal.mock';
import type { SegmentPlayerRow, SegmentPlayersModalData } from './segment-players-modal.model';

function usernameCellRenderer(params: ICellRendererParams<SegmentPlayerRow>): HTMLElement {
  const a = document.createElement('a');
  a.className = 'segment-players-modal__username-link';
  a.href = '#';
  a.textContent = String(params.value ?? '');
  return a;
}

function formatCurrency(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) {
    return '';
  }

  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatPlayersTitle(count: number): string {
  return `${count.toLocaleString('en-US')} players`;
}

@Component({
  selector: 'app-segment-players-modal',
  imports: [AgGridAngular, ClearFiltersButtonComponent],
  templateUrl: './segment-players-modal.component.html',
  styleUrl: './segment-players-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentPlayersModalComponent implements ModalWithData<SegmentPlayersModalData> {
  @Input({ required: true }) modalData!: SegmentPlayersModalData;
  @Input() modalSettings?: NgbModalOptions;
  @Input({ required: true }) closeAction!: () => void;

  protected readonly columnPanelItems: readonly SegmentPlayersColumnPanelItem[] =
    SEGMENT_PLAYERS_COLUMN_PANEL_ITEMS;

  protected readonly columnPanelSearch = signal('');
  protected readonly columnsPanelOpen = signal(false);
  protected readonly columnVisibilityDraft = signal<Record<string, boolean>>({
    ...SEGMENT_PLAYERS_DEFAULT_COLUMN_VISIBILITY,
  });

  private readonly columnAnchor = viewChild.required<ElementRef<HTMLElement>>('columnAnchor');

  protected readonly title = computed(() => formatPlayersTitle(this.modalData.playerCount));

  protected readonly rowData = computed(() => {
    const seed = buildSegmentPlayersSeed(
      this.modalData.scope,
      this.modalData.filterRow,
      this.modalData.filterRows,
      this.modalData.logic,
      this.modalData.uploadedFileId,
    );
    return buildSegmentPlayerRows(seed, this.modalData.playerCount);
  });

  protected readonly filteredPanelColumns = computed(() => {
    const q = this.columnPanelSearch().trim().toLowerCase();
    if (!q) {
      return this.columnPanelItems;
    }
    return this.columnPanelItems.filter((c) => c.label.toLowerCase().includes(q));
  });

  private gridApi: GridApi<SegmentPlayerRow> | null = null;

  protected readonly gridApiRef = signal<GridApi<SegmentPlayerRow> | null>(null);

  protected readonly columnDefs: ColDef<SegmentPlayerRow>[] = [
    { field: 'id', colId: 'id', headerName: 'ID', width: 130, filter: 'agNumberColumnFilter' },
    {
      field: 'username',
      colId: 'username',
      headerName: 'Username',
      flex: 1,
      minWidth: 140,
      cellRenderer: usernameCellRenderer,
    },
    {
      field: 'ggrEur',
      colId: 'ggrEur',
      headerName: 'GGR, €',
      width: 100,
      type: 'rightAligned',
      filter: 'agNumberColumnFilter',
      valueFormatter: (params) => formatCurrency(params.value as number),
    },
    { field: 'firstName', colId: 'firstName', headerName: 'First name', width: 120 },
    { field: 'lastName', colId: 'lastName', headerName: 'Last name', width: 120 },
    { field: 'lastActivity', colId: 'lastActivity', headerName: 'Last activity date', width: 170 },
  ];

  protected readonly gridOptions: GridOptions<SegmentPlayerRow> = {
    theme: rmTheme,
    suppressCellFocus: true,
    rowHeight: 48,
    headerHeight: 52,
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
    },
    getRowId: (params) => String(params.data?.id ?? ''),
  };

  protected onGridReady(event: GridReadyEvent<SegmentPlayerRow>): void {
    this.gridApi = event.api;
    this.gridApiRef.set(event.api);
    this.columnVisibilityDraft.set({ ...SEGMENT_PLAYERS_DEFAULT_COLUMN_VISIBILITY });
    this.applyDraftToGrid();

    requestAnimationFrame(() => {
      event.api.redrawRows();
    });
  }

  protected onClose(): void {
    this.closeAction();
  }

  protected onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.gridApi?.setGridOption('quickFilterText', value);
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
    this.columnVisibilityDraft.update((draft) => ({ ...draft, [colId]: checked }));
    this.applyDraftToGrid();
  }

  protected revertColumnsToDefault(): void {
    this.columnVisibilityDraft.set({ ...SEGMENT_PLAYERS_DEFAULT_COLUMN_VISIBILITY });
    this.applyDraftToGrid();
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

  private syncDraftFromGrid(): void {
    const api = this.gridApi;
    if (!api) {
      this.columnVisibilityDraft.set({ ...SEGMENT_PLAYERS_DEFAULT_COLUMN_VISIBILITY });
      return;
    }
    const colState = api.getColumnState();
    const next: Record<string, boolean> = {};
    for (const item of this.columnPanelItems) {
      const state = colState.find((column) => column.colId === item.colId);
      const visible = state ? !state.hide : true;
      next[item.colId] = item.locked ? true : visible;
    }
    this.columnVisibilityDraft.set(next);
  }
}
