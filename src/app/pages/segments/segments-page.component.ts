import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ModalService } from '@platform-workspace/design-system-v2';
import { map } from 'rxjs';

import {
  CREATE_SEGMENT_TYPE_LABELS,
  formatSegmentCreatedLabel,
  segmentTypeIconClass,
  segmentTypePillClass,
  type CreateSegmentType,
  type NewSegmentDraft,
} from '../segments-create/create-segment.model';
import { SegmentPlayersModalComponent } from './components/segment-players-modal/segment-players-modal.component';
import type { SegmentPlayersModalData } from './components/segment-players-modal/segment-players-modal.model';
import { SegmentFieldsMappingModalComponent } from './components/segment-upload/segment-fields-mapping-modal.component';
import { buildDefaultUploadFileDrafts } from './components/segment-upload/segment-upload.mock';
import type {
  SegmentFieldsMappingModalData,
  SegmentFieldsMappingModalResult,
  UploadedSegmentFile,
} from './components/segment-upload/segment-upload.model';
import { SegmentUploadFileRowComponent } from './components/segment-upload/segment-upload-file-row.component';
import { SegmentFilterPickerComponent } from './segment-filter-picker.component';
import { SegmentFilterPreviewRowComponent } from './segment-filter-preview-row.component';
import {
  categoryFilterTone,
  subsectionIconClass,
  type FilterCatalogItem,
} from './segments-filter-catalog';
import type { SegmentFilterRow } from './segments-editor.model';
import { defaultFilterTokens, applyFilterChipEdit } from './segments-filter-registry';
import { playerCountForFilterSettings } from './segments-filter-settings';
import type { SegmentFilterChipEdit } from './segments-filter-shared';
import { SegmentFilterType } from './segments-filter-type.enum';
import { getCatalogItemWithType, resolveFilterMapping } from './segments-filter-type-map';
import { defaultDateFilterTokens } from './segments-date-filter';
import { defaultMoneyFilterTokens } from './segments-money-filter';

function formatPlayersLabel(count: number): string {
  return `${count.toLocaleString('en-US')} players`;
}

function segmentTotalForLogic(rows: SegmentFilterRow[], logic: 'and' | 'or'): number {
  if (rows.length === 0) {
    return 0;
  }
  const counts = rows.map((r) => r.playerCount);
  if (rows.length === 1) {
    return counts[0];
  }
  const sum = counts.reduce((total, n) => total + n, 0);
  if (logic === 'or') {
    return sum;
  }
  const min = Math.min(...counts);
  if (sum <= 1) {
    return 0;
  }
  const cap = Math.min(min, sum - 1);
  const seed = rows.reduce((acc, row) => acc + row.id.length + row.playerCount, 0);
  const ratio = 0.25 + ((seed * 17) % 50) / 100;
  return Math.max(1, Math.min(Math.floor(min * ratio), cap));
}

const SAMPLE_FILTERS: SegmentFilterRow[] = [
  {
    id: 'f-avg-bet-date',
    categoryId: 'general-activity',
    group: 'Bet',
    apiKey: 'avg_bet_amount_activity',
    filterType: SegmentFilterType.MONEY,
    playerCount: 23_543,
    tokens: defaultMoneyFilterTokens('Average bet amount', '100'),
  },
  {
    id: 'f-bet-date',
    categoryId: 'general-activity',
    group: 'Bet',
    apiKey: 'bet_date_activity',
    filterType: SegmentFilterType.DATE_TIME,
    playerCount: 23_543,
    tokens: (() => {
      const base = defaultDateFilterTokens('Bet date');
      const op = base.find((t) => t.kind === 'chip' && t.role === 'operator');
      if (op?.kind === 'chip') {
        op.text = 'within';
      }
      const mode = base.find((t) => t.kind === 'chip' && t.role === 'dateMode');
      if (mode?.kind === 'chip') {
        mode.text = 'dynamic dates';
      }
      return [
        ...base.slice(0, 4),
        { kind: 'text' as const, text: 'from' },
        { kind: 'chip' as const, text: 'custom', role: 'dynamicPreset' },
        { kind: 'chip' as const, text: '7', role: 'customValue' },
        { kind: 'chip' as const, text: 'days ago', role: 'customUnit' },
        { kind: 'text' as const, text: 'to' },
        { kind: 'chip' as const, text: 'today', role: 'dynamicPresetEnd' },
      ];
    })(),
  },
  {
    id: 'f-total-ggr',
    categoryId: 'player-profile',
    group: 'KPI',
    apiKey: 'ggr_total',
    filterType: SegmentFilterType.MONEY,
    playerCount: 45_564,
    tokens: defaultMoneyFilterTokens('Total GGR', '42.50'),
  },
];

@Component({
  selector: 'app-segments-page',
  imports: [
    RouterLink,
    SegmentFilterPickerComponent,
    SegmentFilterPreviewRowComponent,
    SegmentUploadFileRowComponent,
  ],
  templateUrl: './segments-page.component.html',
  styleUrl: './segments-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentsPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly modalService = inject(ModalService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly segmentDraft = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => {
        const isNew = params.get('new') === '1';
        if (!isNew) {
          return null;
        }

        const typeParam = params.get('type');
        const type: CreateSegmentType =
          typeParam === 'static' || typeParam === 'uploaded' || typeParam === 'dynamic'
            ? typeParam
            : 'dynamic';

        const createdRaw = params.get('created');
        const createdAt = createdRaw ? new Date(createdRaw) : new Date();
        const createdAtValid = Number.isNaN(createdAt.getTime()) ? new Date() : createdAt;

        return {
          type,
          name: params.get('name')?.trim() || 'New segment',
          description: params.get('description')?.trim() || '',
          createdAt: createdAtValid,
        } satisfies NewSegmentDraft;
      }),
    ),
    { initialValue: null as NewSegmentDraft | null },
  );

  protected readonly isNewSegment = computed(() => this.segmentDraft() != null);

  protected readonly segmentTitle = computed(() => this.segmentDraft()?.name ?? 'GGR preview');

  protected readonly segmentHint = computed(() => this.segmentDraft()?.description ?? 'Highest GGR players preview.');

  protected readonly segmentTypeLabel = computed(() => {
    const draft = this.segmentDraft();
    return draft ? CREATE_SEGMENT_TYPE_LABELS[draft.type] : 'Dynamic';
  });

  protected readonly segmentTypePillClass = computed(() => {
    const draft = this.segmentDraft();
    return segmentTypePillClass(draft?.type ?? 'dynamic');
  });

  protected readonly segmentTypeIconClass = computed(() => {
    const draft = this.segmentDraft();
    return segmentTypeIconClass(draft?.type ?? 'dynamic');
  });

  protected readonly breadcrumbCurrent = computed(() => {
    const draft = this.segmentDraft();
    if (!draft) {
      return 'Segment created 09-Jun-2027 13:44';
    }
    return `Segment created ${formatSegmentCreatedLabel(draft.createdAt)}`;
  });

  protected readonly isUploadedSegment = computed(() => this.segmentDraft()?.type === 'uploaded');

  readonly filterPickerOpen = signal(false);

  readonly logic = signal<'and' | 'or'>('and');

  /** Right-hand BRIA panel; closed until the user opens it from the toolbar (Figma). */
  readonly briaOpen = signal(false);

  /** `output` shows the sample conversation after a prompt (design: Output / Applied). */
  readonly briaPhase = signal<'initial' | 'output'>('initial');

  readonly briaDraft = signal('');

  readonly filterRows = signal<SegmentFilterRow[]>(
    inject(ActivatedRoute).snapshot.queryParamMap.get('new') === '1' ? [] : [...SAMPLE_FILTERS],
  );

  readonly uploadedFiles = signal<UploadedSegmentFile[]>([]);

  protected readonly hasUploadedFiles = computed(() => this.uploadedFiles().length > 0);

  protected readonly uploadedSegmentPlayerCount = computed(() =>
    this.uploadedFiles().reduce((total, file) => total + file.playerCount, 0),
  );

  protected readonly canSaveUploadedSegment = computed(() => this.hasUploadedFiles());

  protected readonly segmentPlayerCount = computed(() => {
    if (this.isUploadedSegment()) {
      return this.uploadedSegmentPlayerCount();
    }
    return segmentTotalForLogic(this.filterRows(), this.logic());
  });

  protected readonly segmentPlayersLabel = computed(() => formatPlayersLabel(this.segmentPlayerCount()));

  protected formatPlayersLabel = formatPlayersLabel;

  protected filterRowIconClass(row: SegmentFilterRow): string {
    return subsectionIconClass(row.categoryId, row.group);
  }

  protected filterRowTone(row: SegmentFilterRow): string {
    return categoryFilterTone(row.categoryId);
  }

  setLogic(value: 'and' | 'or'): void {
    this.logic.set(value);
  }

  toggleBria(): void {
    this.briaOpen.update((v) => !v);
  }

  closeBria(): void {
    this.briaOpen.set(false);
  }

  sendBriaPrompt(): void {
    const q = this.briaDraft().trim();
    if (!q) {
      return;
    }
    this.briaPhase.set('output');
    this.briaDraft.set('');
  }

  useSuggestedPrompt(text: string): void {
    this.briaDraft.set(text);
  }

  applyBriaToWorkspace(): void {
    this.filterRows.set([...SAMPLE_FILTERS]);
    this.briaPhase.set('output');
  }

  clearFilters(): void {
    this.filterRows.set([]);
  }

  toggleFilterPicker(event: MouseEvent): void {
    event.stopPropagation();
    if (this.filterPickerOpen()) {
      this.filterPickerOpen.set(false);
      return;
    }
    queueMicrotask(() => this.filterPickerOpen.set(true));
  }

  closeFilterPicker(): void {
    this.filterPickerOpen.set(false);
  }

  openFilterPickerFromCard(event: MouseEvent): void {
    event.stopPropagation();
    queueMicrotask(() => this.filterPickerOpen.set(true));
  }

  onCatalogFilterPicked(item: FilterCatalogItem): void {
    this.filterPickerOpen.set(false);
    const enriched = getCatalogItemWithType(item);
    const tokens = defaultFilterTokens(enriched.filterType, enriched.label, enriched.apiKey);
    const settings = {
      categoryId: item.categoryId,
      group: item.group,
      apiKey: enriched.apiKey,
      filterType: enriched.filterType,
      tokens,
    };
    this.filterRows.update((rows) => [
      ...rows,
      {
        id: `f-${item.id}-${Date.now()}`,
        ...settings,
        playerCount: playerCountForFilterSettings(rows, settings),
      },
    ]);
  }

  onFilterChipEdit(edit: SegmentFilterChipEdit): void {
    this.filterRows.update((rows) =>
      rows.map((row) => {
        if (row.id !== edit.rowId) {
          return row;
        }
        const updated: SegmentFilterRow = {
          ...row,
          tokens: applyFilterChipEdit(row.filterType, row.tokens, edit, row.apiKey),
        };
        return {
          ...updated,
          playerCount: playerCountForFilterSettings(rows, updated, row.id),
        };
      }),
    );
  }

  addFilterRow(): void {
    this.filterRows.update((rows) => {
      const mapping = resolveFilterMapping('pp-kpi-total-ggr');
      const tokens = defaultFilterTokens(mapping.filterType, 'Total GGR', mapping.apiKey);
      const settings = {
        categoryId: 'player-profile' as const,
        group: 'KPI',
        apiKey: mapping.apiKey,
        filterType: mapping.filterType,
        tokens,
      };
      return [
        ...rows,
        {
          id: `f-${Date.now()}`,
          ...settings,
          playerCount: playerCountForFilterSettings(rows, settings),
        },
      ];
    });
  }

  removeFilterRow(id: string): void {
    this.filterRows.update((rows) => rows.filter((r) => r.id !== id));
  }

  duplicateFilterRow(id: string): void {
    this.filterRows.update((rows) => {
      const index = rows.findIndex((r) => r.id === id);
      if (index === -1) {
        return rows;
      }
      const source = rows[index];
      const tokens = source.tokens.map((token) => ({ ...token }));
      const copy: SegmentFilterRow = {
        ...source,
        id: `f-${Date.now()}`,
        tokens,
        playerCount: playerCountForFilterSettings(rows, { ...source, tokens }),
      };
      const next = [...rows];
      next.splice(index + 1, 0, copy);
      return next;
    });
  }

  openBriaForDescribe(): void {
    this.briaOpen.set(true);
    this.briaPhase.set('initial');
  }

  openFilterPlayersModal(row: SegmentFilterRow): void {
    if (row.playerCount <= 0) {
      return;
    }

    this.openPlayersModal({
      playerCount: row.playerCount,
      scope: 'filter',
      filterRow: row,
    });
  }

  openSegmentPlayersModal(): void {
    const playerCount = this.segmentPlayerCount();
    if (playerCount <= 0) {
      return;
    }

    if (this.isUploadedSegment()) {
      this.openPlayersModal({
        playerCount,
        scope: 'segment',
      });
      return;
    }

    this.openPlayersModal({
      playerCount,
      scope: 'segment',
      filterRows: this.filterRows(),
      logic: this.logic(),
    });
  }

  openUploadedFilePlayersModal(file: UploadedSegmentFile): void {
    if (file.playerCount <= 0) {
      return;
    }

    this.openPlayersModal({
      playerCount: file.playerCount,
      scope: 'uploaded-file',
      uploadedFileId: file.id,
      uploadedFileName: file.fileName,
    });
  }

  removeUploadedFile(file: UploadedSegmentFile): void {
    this.uploadedFiles.update((files) => files.filter((entry) => entry.id !== file.id));
  }

  openUploadFieldsMappingModal(): void {
    this.modalService
      .open<SegmentFieldsMappingModalData, SegmentFieldsMappingModalResult | undefined>(
        SegmentFieldsMappingModalComponent,
        {
        modalData: {
          files: buildDefaultUploadFileDrafts(),
        },
        settings: {
          keyboard: true,
          backdrop: true,
          centered: true,
          scrollable: false,
          size: 'xl',
          windowClass: 'segment-fields-mapping-modal ds-component',
          backdropClass: 'ds-component',
        },
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (!result?.files?.length) {
          return;
        }
        this.uploadedFiles.set(result.files);
      });
  }

  onUploadAreaClick(event: MouseEvent): void {
    event.preventDefault();
    this.openUploadFieldsMappingModal();
  }

  onUploadAreaKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    event.preventDefault();
    this.openUploadFieldsMappingModal();
  }

  private openPlayersModal(modalData: SegmentPlayersModalData): void {
    this.modalService
      .open<SegmentPlayersModalData>(SegmentPlayersModalComponent, {
        modalData,
        settings: {
          keyboard: true,
          backdrop: true,
          centered: true,
          scrollable: false,
          size: 'xl',
          windowClass: 'segment-players-modal ds-component',
          backdropClass: 'ds-component',
        },
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
