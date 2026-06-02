import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CustomNodeComponent, Vflow } from 'ngx-vflow';

import { WorkflowBuilderStateService } from '../../../services/workflow-builder-state.service';
import type { WorkflowNodeData } from '../../../workflow-builder.model';

@Component({
  selector: 'app-workflow-node-bonus',
  imports: [Vflow],
  template: `
    <button
      type="button"
      class="wf-node wf-node--bonus"
      [class.wf-node--selected]="selected()"
      (click)="onSelect($event)"
    >
      <span class="wf-node__stripe wf-node__stripe--purple" aria-hidden="true"></span>
      <span class="wf-node__icon" aria-hidden="true">
        <i class="ds-icon ds-icon-general-gift"></i>
      </span>
      <span class="wf-node__content">
        <span class="wf-node__title">{{ data()?.bonusName ?? data()?.label ?? 'Bonus' }}</span>
        @if (!data()?.bonusId) {
          <span class="wf-node__subtitle">Select bonus</span>
        } @else {
          <span class="wf-node__subtitle">Bonus configured</span>
        }
      </span>
      <handle type="target" position="top" />
      <handle type="source" position="bottom" />
    </button>
  `,
  styleUrl: '../workflow-node.shared.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowNodeBonusComponent extends CustomNodeComponent<WorkflowNodeData> {
  private readonly state = inject(WorkflowBuilderStateService);

  protected onSelect(event: MouseEvent): void {
    event.stopPropagation();
    this.state.selectNode(this.node().id);
    if (!this.data()?.bonusId) {
      this.state.pendingBonusNodeId.set(this.node().id);
    }
  }
}
