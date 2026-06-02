import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DsButton } from '@platform-workspace/design-system-v2';
import { map } from 'rxjs';

import {
  formatCohortCreatedLabel,
  type NewCohortDraft,
} from '../cohorts-create/create-cohort.model';
import { SegmentFilterPickerComponent } from '../segments/segment-filter-picker.component';
import type { FilterCatalogItem } from '../segments/segments-filter-catalog';
import { buildCohortMatrix, getCell, getPlayersForCell } from './cohort-builder.mock';
import {
  catalogItemToEventRow,
  type CohortEventKind,
  type CohortEventRow,
  type CohortMatrix,
  type CohortMatrixCell,
} from './cohort-builder.model';
import { CohortUsersSidebarComponent } from './cohort-users-sidebar.component';

@Component({
  selector: 'app-cohort-builder-page',
  imports: [RouterLink, DsButton, SegmentFilterPickerComponent, CohortUsersSidebarComponent],
  templateUrl: './cohort-builder-page.component.html',
  styleUrl: './cohort-builder-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CohortBuilderPageComponent {
  private readonly route = inject(ActivatedRoute);

  private readonly cohortDraft = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => {
        const isNew = params.get('new') === '1';
        if (!isNew) {
          return null;
        }

        const createdRaw = params.get('created');
        const createdAt = createdRaw ? new Date(createdRaw) : new Date();
        const createdAtValid = Number.isNaN(createdAt.getTime()) ? new Date() : createdAt;

        return {
          name: params.get('name')?.trim() || 'New cohort',
          description: params.get('description')?.trim() || '',
          createdAt: createdAtValid,
        } satisfies NewCohortDraft;
      }),
    ),
    { initialValue: null as NewCohortDraft | null },
  );

  protected readonly cohortTitle = computed(() => this.cohortDraft()?.name ?? 'First deposit retention');

  protected readonly cohortHint = computed(
    () => this.cohortDraft()?.description ?? 'Define start and return events, then build the cohort matrix.',
  );

  protected readonly breadcrumbCurrent = computed(() => {
    const draft = this.cohortDraft();
    if (!draft) {
      return 'Cohort created 09-Jun-2027 13:44';
    }
    return `Cohort created ${formatCohortCreatedLabel(draft.createdAt)}`;
  });

  protected readonly startEvents = signal<CohortEventRow[]>([]);
  protected readonly returnEvents = signal<CohortEventRow[]>([]);

  protected readonly activePicker = signal<CohortEventKind | null>(null);

  protected readonly cohortBuilt = signal(false);
  protected readonly matrix = signal<CohortMatrix | null>(null);

  protected readonly selectedCell = signal<CohortMatrixCell | null>(null);
  protected readonly usersSidebarOpen = signal(false);

  protected readonly canBuild = computed(
    () => this.startEvents().length > 0 && this.returnEvents().length > 0,
  );

  protected readonly selectedPeriodLabel = computed(() => {
    const cell = this.selectedCell();
    const m = this.matrix();
    if (!cell || !m) {
      return '';
    }
    return m.periodLabels[cell.periodIndex] ?? '';
  });

  protected readonly selectedIntervalLabel = computed(() => {
    const cell = this.selectedCell();
    const m = this.matrix();
    if (!cell || !m) {
      return '';
    }
    return m.intervalLabels[cell.intervalIndex] ?? '';
  });

  protected readonly sidebarPlayers = computed(() => {
    const cell = this.selectedCell();
    if (!cell) {
      return [];
    }
    return getPlayersForCell(cell.periodIndex, cell.intervalIndex);
  });

  protected isPickerOpen(kind: CohortEventKind): boolean {
    return this.activePicker() === kind;
  }

  protected openPicker(kind: CohortEventKind, event: MouseEvent): void {
    event.stopPropagation();
    if (this.cohortBuilt()) {
      return;
    }
    if (this.activePicker() === kind) {
      this.activePicker.set(null);
      return;
    }
    queueMicrotask(() => this.activePicker.set(kind));
  }

  protected closePicker(): void {
    this.activePicker.set(null);
  }

  protected onEventPicked(kind: CohortEventKind, item: FilterCatalogItem): void {
    this.activePicker.set(null);
    const row = catalogItemToEventRow(item);
    if (kind === 'start') {
      this.startEvents.update((rows) => [...rows, row]);
    } else {
      this.returnEvents.update((rows) => [...rows, row]);
    }
  }

  protected removeEvent(kind: CohortEventKind, id: string): void {
    if (kind === 'start') {
      this.startEvents.update((rows) => rows.filter((r) => r.id !== id));
    } else {
      this.returnEvents.update((rows) => rows.filter((r) => r.id !== id));
    }
  }

  protected buildCohort(): void {
    if (!this.canBuild()) {
      return;
    }
    this.matrix.set(buildCohortMatrix());
    this.cohortBuilt.set(true);
    this.closePicker();
    this.usersSidebarOpen.set(false);
    this.selectedCell.set(null);
  }

  protected editSetup(): void {
    this.cohortBuilt.set(false);
    this.matrix.set(null);
    this.usersSidebarOpen.set(false);
    this.selectedCell.set(null);
  }

  protected onCellClick(periodIndex: number, intervalIndex: number): void {
    const m = this.matrix();
    if (!m) {
      return;
    }
    const cell = getCell(m, periodIndex, intervalIndex);
    if (!cell || cell.heat === 'empty' || cell.playerCount === 0) {
      return;
    }
    this.selectedCell.set(cell);
    this.usersSidebarOpen.set(true);
  }

  protected closeUsersSidebar(): void {
    this.usersSidebarOpen.set(false);
    this.selectedCell.set(null);
  }

  protected cellClass(cell: CohortMatrixCell): string {
    return `cohort-matrix__cell-btn cohort-matrix__cell cohort-matrix__cell--${cell.heat}`;
  }

  protected isCellSelected(cell: CohortMatrixCell): boolean {
    const selected = this.selectedCell();
    return (
      selected != null &&
      selected.periodIndex === cell.periodIndex &&
      selected.intervalIndex === cell.intervalIndex
    );
  }

  protected matrixCell(matrix: CohortMatrix, periodIndex: number, intervalIndex: number): CohortMatrixCell | undefined {
    return getCell(matrix, periodIndex, intervalIndex);
  }
}
