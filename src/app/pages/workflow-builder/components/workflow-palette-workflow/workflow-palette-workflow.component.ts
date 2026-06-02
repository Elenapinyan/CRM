import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModalService } from '@platform-workspace/design-system-v2';

import { WorkflowBuilderStateService } from '../../services/workflow-builder-state.service';
import { WORKFLOW_RECURRENCE_LABELS } from '../../data/workflow-settings.constants';
import type { WorkflowSettings, WorkflowSettingsTabId } from '../../workflow-builder.model';
import {
  WorkflowSettingsModalComponent,
  type WorkflowSettingsModalData,
} from '../workflow-settings-modal/workflow-settings-modal.component';

interface WorkflowSettingRow {
  id: WorkflowSettingsTabId;
  label: string;
  iconClass: string;
}

@Component({
  selector: 'app-workflow-palette-workflow',
  imports: [],
  templateUrl: './workflow-palette-workflow.component.html',
  styleUrl: './workflow-palette-workflow.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowPaletteWorkflowComponent {
  private readonly state = inject(WorkflowBuilderStateService);
  private readonly modalService = inject(ModalService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly collapsed = signal(false);

  protected readonly rows: readonly WorkflowSettingRow[] = [
    { id: 'scheduler', label: 'Scheduler', iconClass: 'ds-icon-general-time' },
    { id: 'frequency', label: 'Frequency', iconClass: 'ds-icon-general-repeat' },
    { id: 'goal', label: 'Goal', iconClass: 'ds-icon-tag-star' },
    { id: 'limits', label: 'Limits', iconClass: 'ds-icon-arrows-chevron-up-down' },
  ];

  protected readonly subtitles = computed(() => {
    const s = this.state.settings();
    return {
      scheduler: this.schedulerSubtitle(s),
      frequency: this.frequencySubtitle(s),
      goal: s.goal.metric && s.goal.target > 0 ? `${s.goal.metric}: ${s.goal.target}` : 'Not selected',
      limits:
        s.limits.maxPlayers > 0 || s.limits.maxRuns > 0
          ? `Max ${s.limits.maxPlayers.toLocaleString()} players · ${s.limits.maxRuns} runs`
          : 'Not selected',
    } satisfies Record<WorkflowSettingsTabId, string>;
  });

  protected toggleCollapsed(event: MouseEvent): void {
    event.stopPropagation();
    this.collapsed.update((v) => !v);
  }

  protected openSettings(tab: WorkflowSettingsTabId, event: MouseEvent): void {
    event.stopPropagation();
    this.modalService
      .open<WorkflowSettingsModalData, WorkflowSettingsModalData | undefined>(
        WorkflowSettingsModalComponent,
        {
          modalData: {
            initialTab: tab,
            settings: this.state.settings(),
            workflowName: this.state.draft()?.name ?? 'Workflow',
            workflowId: this.state.workflowInstanceId() || '—',
          },
          settings: {
            keyboard: true,
            backdrop: true,
            centered: true,
            scrollable: true,
            size: 'lg',
            windowClass: 'workflow-settings-modal ds-component',
            backdropClass: 'ds-component',
          },
        },
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result?.settings) {
          this.state.updateSettings(result.settings);
        }
      });
  }

  private schedulerSubtitle(settings: WorkflowSettings): string {
    const { startDateTime, recurrence } = settings.scheduler;
    if (startDateTime) {
      const label = WORKFLOW_RECURRENCE_LABELS[recurrence];
      return `${label} · from ${startDateTime.toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}`;
    }
    return 'Starts when turned on and runs until manually stopped';
  }

  private frequencySubtitle(settings: WorkflowSettings): string {
    const pattern = settings.frequency.pattern;
    const labels: Record<string, string> = {
      once: 'Players can enter this workflow only once',
      daily: 'Runs every day',
      weekly: 'Runs every week',
      monthly: 'Runs every month',
      annually: 'Runs every year',
      custom: 'Custom schedule',
    };
    return labels[pattern] ?? WORKFLOW_RECURRENCE_LABELS[pattern];
  }
}
