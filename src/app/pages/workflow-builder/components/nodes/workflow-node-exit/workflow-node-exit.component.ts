import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomNodeComponent, Vflow } from 'ngx-vflow';

import type { WorkflowNodeData } from '../../../workflow-builder.model';

@Component({
  selector: 'app-workflow-node-exit',
  imports: [Vflow],
  template: `
    <div class="wf-node wf-node--exit" aria-label="Exit">
      <span class="wf-node-exit__icon" aria-hidden="true">
        <i class="ds-icon ds-icon-general-log-out"></i>
      </span>
      <span class="wf-node-exit__label">Exit</span>
      <handle type="target" position="top" />
    </div>
  `,
  styleUrl: './workflow-node-exit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowNodeExitComponent extends CustomNodeComponent<WorkflowNodeData> {}
