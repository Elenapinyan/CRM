import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { WorkflowBuilderStateService } from '../../services/workflow-builder-state.service';
import { setTransparentDragImage } from '../../services/workflow-palette-drag.util';
import { WORKFLOW_PALETTE_DRAG_TYPE, type WorkflowNodeType } from '../../workflow-builder.model';

type BuildPaletteRow = {
  id: string;
  title: string;
  subtitle: string;
  iconClass: string;
  draggable: boolean;
  dragType?: WorkflowNodeType;
};

@Component({
  selector: 'app-workflow-palette-build',
  imports: [],
  templateUrl: './workflow-palette-build.component.html',
  styleUrl: './workflow-palette-build.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowPaletteBuildComponent {
  protected readonly state = inject(WorkflowBuilderStateService);
  protected readonly collapsed = signal(false);

  protected readonly rows: readonly BuildPaletteRow[] = [
    {
      id: 'communication',
      title: 'Send communication',
      subtitle: 'Delivers a targeted message to the player via selected channels',
      iconClass: 'ds-icon-general-message',
      draggable: false,
    },
    {
      id: 'bonus',
      title: 'Award bonus',
      subtitle: "Credits a specified bonus directly to the player's account",
      iconClass: 'ds-icon-general-gift',
      draggable: true,
      dragType: 'bonus',
    },
    {
      id: 'trigger',
      title: 'Add trigger',
      subtitle: 'Waits for the player to complete a specific action before continuing',
      iconClass: 'ds-icon-general-pointer',
      draggable: false,
    },
    {
      id: 'filter',
      title: 'Add filter',
      subtitle: 'Checks if the player meets specific conditions to continue down this path',
      iconClass: 'ds-icon-general-flowchart',
      draggable: false,
    },
    {
      id: 'delay',
      title: 'Set delay',
      subtitle: 'Pauses the workflow for a specified period of time',
      iconClass: 'ds-icon-general-time',
      draggable: false,
    },
    {
      id: 'block',
      title: 'Block/Unblock player',
      subtitle: "Restricts or restores the player's account access",
      iconClass: 'ds-icon-general-alert-octagon',
      draggable: false,
    },
    {
      id: 'split',
      title: 'Split audience',
      subtitle: 'Divides players into randomized groups to test different paths',
      iconClass: 'ds-icon-general-plus-group',
      draggable: false,
    },
  ];

  protected toggleCollapsed(event: MouseEvent): void {
    event.stopPropagation();
    this.collapsed.update((v) => !v);
  }

  protected onDragStart(event: DragEvent, row: BuildPaletteRow): void {
    if (!row.draggable || !row.dragType) {
      event.preventDefault();
      return;
    }

    event.dataTransfer?.setData(WORKFLOW_PALETTE_DRAG_TYPE, row.dragType);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'copy';
    }
    setTransparentDragImage(event);
    this.state.beginPaletteDrag(row.dragType, event.clientX, event.clientY);
  }

  protected onDragEnd(): void {
    this.state.endPaletteDrag();
  }
}
