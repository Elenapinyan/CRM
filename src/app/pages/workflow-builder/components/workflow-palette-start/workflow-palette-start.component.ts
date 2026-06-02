import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WorkflowBuilderStateService } from '../../services/workflow-builder-state.service';
import { setTransparentDragImage } from '../../services/workflow-palette-drag.util';
import { WORKFLOW_PALETTE_DRAG_TYPE, type WorkflowNodeType } from '../../workflow-builder.model';

@Component({
  selector: 'app-workflow-palette-start',
  imports: [],
  templateUrl: './workflow-palette-start.component.html',
  styleUrl: './workflow-palette-start.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowPaletteStartComponent {
  protected readonly state = inject(WorkflowBuilderStateService);
  protected readonly collapsed = signal(false);

  protected toggleCollapsed(event: MouseEvent): void {
    event.stopPropagation();
    this.collapsed.update((v) => !v);
  }

  protected onDragStart(event: DragEvent, type: WorkflowNodeType): void {
    if (!this.state.canDropNodeType(type)) {
      event.preventDefault();
      return;
    }
    event.dataTransfer?.setData(WORKFLOW_PALETTE_DRAG_TYPE, type);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'copy';
    }
    setTransparentDragImage(event);
    this.state.beginPaletteDrag(type, event.clientX, event.clientY);
  }

  protected onDragEnd(): void {
    this.state.endPaletteDrag();
  }
}
