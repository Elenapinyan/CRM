import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModalService } from '@platform-workspace/design-system-v2';

import { WorkflowBuilderStateService } from '../../services/workflow-builder-state.service';
import {
  WorkflowBonusPickerModalComponent,
  type WorkflowBonusPickerModalData,
  type WorkflowBonusPickerResult,
} from '../workflow-bonus-picker-modal/workflow-bonus-picker-modal.component';

@Component({
  selector: 'app-workflow-node-inspector',
  imports: [],
  templateUrl: './workflow-node-inspector.component.html',
  styleUrl: './workflow-node-inspector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowNodeInspectorComponent {
  private readonly state = inject(WorkflowBuilderStateService);
  private readonly modalService = inject(ModalService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly selectedNodeId = this.state.selectedNodeId;

  protected readonly nodeType = computed(() => {
    const node = this.state.selectedNode();
    return node ? this.state.nodeType(node) : null;
  });

  protected readonly nodeData = computed(() => {
    const id = this.selectedNodeId();
    return id ? this.state.getNodeData(id) : null;
  });

  protected openBonusPicker(): void {
    const nodeId = this.selectedNodeId();
    if (!nodeId) {
      return;
    }

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
          return;
        }
        this.state.assignBonusToNode(result.nodeId, result.bonus.id, result.bonus.name);
      });
  }
}
