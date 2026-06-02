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
import { CreateTemplateOffCanvasComponent } from '../communication-create/create-template-off-canvas.component';
import {
  mapCreateChannelToListChannel,
  type CreateTemplateResult,
} from '../communication-create/create-template.model';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridOptions, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';

import { rmTheme } from '../../ag-grid/rm-grid.theme';
import { formatCrmListDate, formatCrmListPageRefreshedAt } from '../../shared/crm-list/crm-list-date.util';
import type { CrmListColumnPanelItem } from '../../shared/crm-list/crm-list-columns.model';
import { ClearFiltersButtonComponent } from '../../shared/ag-grid/clear-filters-button.component';
import {
  COMMUNICATION_COLUMN_PANEL_ITEMS,
  COMMUNICATION_DEFAULT_COLUMN_VISIBILITY,
} from './communication-list-columns';
import { buildCommunicationRowsList, computeCommunicationFooterStats } from './communication-list.mock';
import type { CommunicationTemplateRow, TemplateChannel, TemplateState } from './communication-list.model';

const CHANNEL_META: Record<
  TemplateChannel,
  { label: string; gridChipClass: string; footerChipClass: string; iconClass: string }
> = {
  email: {
    label: 'Email',
    gridChipClass: 'crm-list__grid-chip--ch-email',
    footerChipClass: 'crm-list__footer-chip--ch-email',
    iconClass: 'ds-icon ds-icon-chips-mail-fill',
  },
  sms: {
    label: 'SMS',
    gridChipClass: 'crm-list__grid-chip--ch-sms',
    footerChipClass: 'crm-list__footer-chip--ch-sms',
    iconClass: 'ds-icon ds-icon-general-message',
  },
  push: {
    label: 'Push',
    gridChipClass: 'crm-list__grid-chip--ch-push',
    footerChipClass: 'crm-list__footer-chip--ch-push',
    iconClass: 'ds-icon ds-icon-general-bell',
  },
  'in-app': {
    label: 'In-app',
    gridChipClass: 'crm-list__grid-chip--ch-in-app',
    footerChipClass: 'crm-list__footer-chip--ch-in-app',
    iconClass: 'ds-icon ds-icon-general-layout',
  },
  chat: {
    label: 'Chat',
    gridChipClass: 'crm-list__grid-chip--ch-chat',
    footerChipClass: 'crm-list__footer-chip--ch-chat',
    iconClass: 'ds-icon ds-icon-general-messages',
  },
  telegram: {
    label: 'Telegram',
    gridChipClass: 'crm-list__grid-chip--ch-telegram',
    footerChipClass: 'crm-list__footer-chip--ch-telegram',
    iconClass: 'ds-icon ds-icon-sent',
  },
};

function templateNameCellRenderer(params: ICellRendererParams<CommunicationTemplateRow>): HTMLElement {
  const a = document.createElement('a');
  a.className = 'crm-list__name-link';
  a.href = '#';
  a.textContent = params.data?.name ?? '';
  return a;
}

function channelTypeCellRenderer(params: ICellRendererParams<CommunicationTemplateRow>): HTMLElement {
  const wrap = document.createElement('span');
  const t = params.data?.type;
  if (!t) {
    return wrap;
  }
  const meta = CHANNEL_META[t];
  wrap.className = `crm-list__grid-chip ${meta.gridChipClass}`;
  wrap.innerHTML = `<i class="${meta.iconClass}" aria-hidden="true"></i>${meta.label}`;
  return wrap;
}

function templateStateCellRenderer(params: ICellRendererParams<CommunicationTemplateRow>): HTMLElement {
  const wrap = document.createElement('span');
  const s: TemplateState | undefined = params.data?.state;
  if (!s) {
    return wrap;
  }
  const label = s === 'active' ? 'Active' : 'Inactive';
  wrap.className = `crm-list__state crm-list__state--${s}`;
  wrap.innerHTML = `<span class="crm-list__state-dot" aria-hidden="true"></span><span>${label}</span>`;
  return wrap;
}

@Component({
  selector: 'app-communication-list-page',
  imports: [DsButton, AgGridAngular, ClearFiltersButtonComponent],
  templateUrl: './communication-list-page.component.html',
  styleUrl: './communication-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunicationListPageComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly offCanvas = inject(OffCanvasService);
  private readonly router = inject(Router);

  private readonly allRows: CommunicationTemplateRow[] = buildCommunicationRowsList();

  protected readonly rowData = signal<CommunicationTemplateRow[]>(this.allRows);

  protected readonly columnPanelItems: readonly CrmListColumnPanelItem[] = COMMUNICATION_COLUMN_PANEL_ITEMS;

  protected readonly columnPanelSearch = signal('');
  protected readonly columnsPanelOpen = signal(false);
  protected readonly columnVisibilityDraft = signal<Record<string, boolean>>({
    ...COMMUNICATION_DEFAULT_COLUMN_VISIBILITY,
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

  protected readonly footerStats = signal(computeCommunicationFooterStats(this.allRows));

  protected readonly channelMeta = CHANNEL_META;

  protected readonly footerChannelOrder: TemplateChannel[] = [
    'email',
    'sms',
    'push',
    'in-app',
    'chat',
    'telegram',
  ];

  private gridApi: GridApi<CommunicationTemplateRow> | null = null;

  protected readonly gridApiRef = signal<GridApi<CommunicationTemplateRow> | null>(null);

  protected readonly columnDefs: ColDef<CommunicationTemplateRow>[] = [
    { field: 'id', colId: 'id', headerName: 'ID', width: 160, filter: 'agNumberColumnFilter' },
    {
      colId: 'type',
      headerName: 'Type',
      width: 145,
      cellRenderer: channelTypeCellRenderer,
      valueGetter: (p) => p.data?.type,
    },
    {
      colId: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 200,
      cellRenderer: templateNameCellRenderer,
    },
    {
      colId: 'state',
      headerName: 'State',
      width: 145,
      cellRenderer: templateStateCellRenderer,
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
    { field: 'creator', colId: 'creator', headerName: 'Creator', width: 160 },
    { field: 'created', colId: 'created', headerName: 'Created', width: 180 },
    { field: 'modified', colId: 'modified', headerName: 'Modified', width: 180 },
  ];

  protected readonly gridOptions: GridOptions<CommunicationTemplateRow> = {
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

  protected onGridReady(event: GridReadyEvent<CommunicationTemplateRow>): void {
    this.gridApi = event.api;
    this.gridApiRef.set(event.api);
    this.columnVisibilityDraft.set({ ...COMMUNICATION_DEFAULT_COLUMN_VISIBILITY });
    this.applyDraftToGrid();
    this.refreshFooterStatsFromGrid();
  }

  protected createTemplate(): void {
    this.offCanvas
      .open(CreateTemplateOffCanvasComponent, {
        settings: {
          keyboard: true,
          backdrop: true,
          panelClass: 'create-template-offcanvas-panel ds-component',
        },
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        const draft = result as unknown as CreateTemplateResult | undefined;
        if (!draft?.channel || !draft.name.trim()) {
          return;
        }

        if (draft.channel === 'sms') {
          queueMicrotask(() => {
            void this.router.navigate(['/communication', 'sms'], {
              queryParams: {
                new: '1',
                name: draft.name.trim(),
                ...(draft.description.trim() ? { description: draft.description.trim() } : {}),
              },
            });
          });
          return;
        }

        const now = new Date();
        const newRow: CommunicationTemplateRow = {
          id: Date.now(),
          type: mapCreateChannelToListChannel(draft.channel),
          name: draft.name,
          state: 'inactive',
          usage: null,
          creator: 'System',
          created: formatCrmListDate(now.getDate(), now.getMonth() + 1, now.getFullYear(), now.getHours(), now.getMinutes()),
          modified: formatCrmListDate(now.getDate(), now.getMonth() + 1, now.getFullYear(), now.getHours(), now.getMinutes()),
        };

        this.rowData.update((rows) => [newRow, ...rows]);
        this.refreshFooterStatsFromGrid();
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
    this.columnVisibilityDraft.set({ ...COMMUNICATION_DEFAULT_COLUMN_VISIBILITY });
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
      this.columnVisibilityDraft.set({ ...COMMUNICATION_DEFAULT_COLUMN_VISIBILITY });
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
      this.footerStats.set(computeCommunicationFooterStats(this.allRows));
      return;
    }

    const filtered: CommunicationTemplateRow[] = [];
    api.forEachNodeAfterFilter((node) => {
      if (node.data) {
        filtered.push(node.data);
      }
    });
    this.footerStats.set(computeCommunicationFooterStats(filtered));
  }
}
