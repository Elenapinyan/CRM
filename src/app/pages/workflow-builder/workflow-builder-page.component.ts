import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ModalService } from '@platform-workspace/design-system-v2';
import { map } from 'rxjs';

import {
  formatWorkflowCreatedLabel,
  type NewWorkflowDraft,
} from '../workflows-create/create-workflow.model';
import { WorkflowCanvasComponent } from './components/workflow-canvas/workflow-canvas.component';
import { WorkflowBuilderTabsComponent } from './components/workflow-builder-tabs/workflow-builder-tabs.component';
import {
  WorkflowBonusPickerModalComponent,
  type WorkflowBonusPickerModalData,
  type WorkflowBonusPickerResult,
} from './components/workflow-bonus-picker-modal/workflow-bonus-picker-modal.component';
import { WorkflowBuilderStateService } from './services/workflow-builder-state.service';

@Component({
  selector: 'app-workflow-builder-page',
  imports: [RouterLink, WorkflowBuilderTabsComponent, WorkflowCanvasComponent],
  providers: [WorkflowBuilderStateService],
  templateUrl: './workflow-builder-page.component.html',
  styleUrl: './workflow-builder-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowBuilderPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly state = inject(WorkflowBuilderStateService);
  private readonly modalService = inject(ModalService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly workflowDraft = toSignal(
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
          name: params.get('name')?.trim() || 'New workflow',
          description: params.get('description')?.trim() || '',
          createdAt: createdAtValid,
        } satisfies NewWorkflowDraft;
      }),
    ),
    { initialValue: null as NewWorkflowDraft | null },
  );

  protected readonly workflowTitle = computed(
    () => this.workflowDraft()?.name ?? this.state.draft()?.name ?? 'Workflow',
  );

  protected readonly workflowHint = computed(
    () =>
      this.workflowDraft()?.description ??
      this.state.draft()?.description ??
      'Build your workflow on the canvas.',
  );

  protected readonly breadcrumbCurrent = computed(() => {
    const draft = this.workflowDraft() ?? this.state.draft();
    if (!draft) {
      return 'Workflow created';
    }
    return `Workflow created ${formatWorkflowCreatedLabel(draft.createdAt)}`;
  });

  protected readonly isNewWorkflow = computed(() => this.workflowDraft() != null);

  constructor() {
    effect(() => {
      const draft = this.workflowDraft();
      if (draft) {
        this.state.setDraft(draft);
      }
    });

    effect(() => {
      const pendingNodeId = this.state.pendingBonusNodeId();
      if (!pendingNodeId) {
        return;
      }

      queueMicrotask(() => this.openBonusPicker(pendingNodeId));
    });
  }

  private openBonusPicker(nodeId: string): void {
    this.modalService
      .open<WorkflowBonusPickerModalData, WorkflowBonusPickerResult>(
        WorkflowBonusPickerModalComponent,
        {
          modalData: { nodeId },
          settings: {
            keyboard: true,
            backdrop: true,
            centered: true,
            scrollable: true,
            size: 'lg',
            windowClass: 'workflow-bonus-picker-modal ds-component',
            backdropClass: 'ds-component',
          },
        },
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (!result?.bonus) {
          this.state.clearPendingBonus();
          return;
        }
        this.state.assignBonusToNode(result.nodeId, result.bonus.id, result.bonus.name);
      });
  }
}
