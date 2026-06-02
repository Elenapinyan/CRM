import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  viewChild,
} from '@angular/core';
import { CustomNodeComponent, Vflow } from 'ngx-vflow';

import { WorkflowBuilderStateService } from '../../../services/workflow-builder-state.service';
import type { WorkflowNodeData } from '../../../workflow-builder.model';

@Component({
  selector: 'app-workflow-node-segment',
  imports: [Vflow],
  templateUrl: './workflow-node-segment.component.html',
  styleUrl: './workflow-node-segment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowNodeSegmentComponent extends CustomNodeComponent<WorkflowNodeData> {
  private readonly state = inject(WorkflowBuilderStateService);

  private readonly menuTrigger = viewChild.required<ElementRef<HTMLButtonElement>>('menuTrigger');

  protected readonly menuOpen = computed(() => {
    const menu = this.state.nodeContextMenu();
    return menu?.nodeId === this.node().id;
  });

  protected toggleMenu(event: Event): void {
    event.stopPropagation();
    if (this.menuOpen()) {
      this.state.closeNodeContextMenu();
      return;
    }
    const rect = this.menuTrigger().nativeElement.getBoundingClientRect();
    this.state.openSegmentContextMenu(this.node().id, rect);
  }

  protected onSelect(event: Event): void {
    event.stopPropagation();
    this.state.selectNode(this.node().id);
  }
}
