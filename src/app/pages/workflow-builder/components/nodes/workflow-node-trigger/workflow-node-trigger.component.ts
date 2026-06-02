import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CustomNodeComponent, Vflow } from 'ngx-vflow';

import { WorkflowBuilderStateService } from '../../../services/workflow-builder-state.service';
import type { WorkflowNodeData } from '../../../workflow-builder.model';

@Component({
  selector: 'app-workflow-node-trigger',
  imports: [Vflow],
  template: `
    <button
      type="button"
      class="wf-node wf-node--trigger"
      [class.wf-node--selected]="selected()"
      (click)="onSelect($event)"
    >
      <span class="wf-node__stripe wf-node__stripe--blue" aria-hidden="true"></span>
      <span class="wf-node__icon" aria-hidden="true">
        <i class="ds-icon ds-icon-general-flash"></i>
      </span>
      <span class="wf-node__content">
        <span class="wf-node__title">{{ data()?.label ?? 'Set trigger' }}</span>
        @if (data()?.triggerName) {
          <span class="wf-node__subtitle">{{ data()?.triggerName }}</span>
        }
      </span>
      <handle type="target" position="top" />
      <handle type="source" position="bottom" />
    </button>
  `,
  styleUrl: '../workflow-node.shared.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowNodeTriggerComponent extends CustomNodeComponent<WorkflowNodeData> {
  private readonly state = inject(WorkflowBuilderStateService);

  protected onSelect(event: MouseEvent): void {
    event.stopPropagation();
    this.state.selectNode(this.node().id);
  }
}
