import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  Injector,
  ViewChild,
} from '@angular/core';
import { Vflow, VflowComponent, type Background, type ConnectionSettings } from 'ngx-vflow';

import {
  WorkflowBuilderStateService,
  type WorkflowSegmentMenuAction,
} from '../../services/workflow-builder-state.service';
import { WORKFLOW_EDGE_CURVE } from '../../services/workflow-edge.util';
import { WORKFLOW_NODE_SIZE } from '../../services/workflow-layout.util';
import { WORKFLOW_PALETTE_DRAG_TYPE, type WorkflowNodeType } from '../../workflow-builder.model';
import { WorkflowPaletteBuildComponent } from '../workflow-palette-build/workflow-palette-build.component';
import { WorkflowPaletteStartComponent } from '../workflow-palette-start/workflow-palette-start.component';
import { WorkflowPaletteWorkflowComponent } from '../workflow-palette-workflow/workflow-palette-workflow.component';
import { WorkflowNodeInspectorComponent } from '../workflow-node-inspector/workflow-node-inspector.component';

@Component({
  selector: 'app-workflow-canvas',
  imports: [
    Vflow,
    WorkflowPaletteWorkflowComponent,
    WorkflowPaletteStartComponent,
    WorkflowPaletteBuildComponent,
    WorkflowNodeInspectorComponent,
  ],
  templateUrl: './workflow-canvas.component.html',
  styleUrl: './workflow-canvas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowCanvasComponent {
  protected readonly state = inject(WorkflowBuilderStateService);
  private readonly injector = inject(Injector);

  @ViewChild('scrollSurface') private scrollSurface?: ElementRef<HTMLElement>;
  @ViewChild(VflowComponent) private vflow?: VflowComponent;

  /** Figma body/dots (454:23002) — 3px dots, 20px grid on #fff */
  protected readonly workflowConnection: ConnectionSettings = {
    curve: WORKFLOW_EDGE_CURVE,
    mode: 'strict',
  };

  protected readonly canvasBackground: Background = {
    type: 'dots',
    gap: 20,
    size: 3,
    color: '#d4d4d8',
    backgroundColor: '#ffffff',
  };

  protected onDragOver(event: DragEvent): void {
    if (!event.dataTransfer?.types.includes(WORKFLOW_PALETTE_DRAG_TYPE)) {
      return;
    }
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    this.state.updatePaletteDragPosition(event.clientX, event.clientY);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    const type = event.dataTransfer?.getData(WORKFLOW_PALETTE_DRAG_TYPE) as WorkflowNodeType | '';
    if (!type || (type !== 'segment' && type !== 'trigger' && type !== 'bonus')) {
      return;
    }

    this.state.endPaletteDrag();
    const viewportCenter = this.getViewportCenterFlowPoint();
    const nodeId = this.state.addNodeFromPalette(type, viewportCenter ?? undefined);
    if (nodeId) {
      this.centerNodeInViewport(nodeId);
    }
  }

  @HostListener('document:dragover', ['$event'])
  protected onDocumentDragOver(event: DragEvent): void {
    if (!this.state.paletteDrag()) {
      return;
    }
    this.state.updatePaletteDragPosition(event.clientX, event.clientY);
  }

  @HostListener('document:dragend')
  protected onDocumentDragEnd(): void {
    this.state.endPaletteDrag();
  }

  private getViewportCenterFlowPoint(): { x: number; y: number } | null {
    const scrollEl = this.scrollSurface?.nativeElement;
    const vflow = this.vflow;
    if (!scrollEl || !vflow) {
      return null;
    }

    const rect = scrollEl.getBoundingClientRect();
    return vflow.documentPointToFlowPoint({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  }

  private centerNodeInViewport(nodeId: string): void {
    afterNextRender(
      () => {
        const scrollEl = this.scrollSurface?.nativeElement;
        const vflow = this.vflow;
        const node = this.state.nodes().find((entry) => entry.id === nodeId);
        if (!scrollEl || !vflow || !node) {
          return;
        }

        const nodeType = this.state.nodeType(node);
        const size = nodeType
          ? WORKFLOW_NODE_SIZE[nodeType]
          : { width: node.width?.() ?? 81, height: node.height?.() ?? 76 };
        const viewport = vflow.viewport();
        const nodeLeft = node.point().x * viewport.zoom + viewport.x;
        const nodeTop = node.point().y * viewport.zoom + viewport.y;
        const nodeWidth = size.width * viewport.zoom;
        const nodeHeight = size.height * viewport.zoom;

        scrollEl.scrollTo({
          left: Math.max(0, nodeLeft + nodeWidth / 2 - scrollEl.clientWidth / 2),
          top: Math.max(0, nodeTop + nodeHeight / 2 - scrollEl.clientHeight / 2),
          behavior: 'smooth',
        });
      },
      { injector: this.injector },
    );
  }

  protected onCanvasClick(): void {
    this.state.closeNodeContextMenu();
    this.state.selectNode(null);
  }

  protected onSegmentMenuAction(action: WorkflowSegmentMenuAction, event: Event): void {
    event.stopPropagation();
    this.state.runSegmentMenuAction(action);
  }
}
