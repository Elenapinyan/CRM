import { Injectable, computed, signal } from '@angular/core';
import { Edge, Node, createNode, isComponentNode } from 'ngx-vflow';
import { v4 as uuidv4 } from 'uuid';

import type { NewWorkflowDraft } from '../../workflows-create/create-workflow.model';
import { WorkflowNodeBonusComponent } from '../components/nodes/workflow-node-bonus/workflow-node-bonus.component';
import { WorkflowNodeExitComponent } from '../components/nodes/workflow-node-exit/workflow-node-exit.component';
import { WorkflowNodeSegmentComponent } from '../components/nodes/workflow-node-segment/workflow-node-segment.component';
import { WorkflowNodeTriggerComponent } from '../components/nodes/workflow-node-trigger/workflow-node-trigger.component';
import {
  DEFAULT_WORKFLOW_SETTINGS,
  WORKFLOW_EXIT_NODE_ID,
  type WorkflowNodeData,
  type WorkflowNodeType,
  type WorkflowSettings,
  type WorkflowSettingsTabId,
} from '../workflow-builder.model';
import { createWorkflowEdge } from './workflow-edge.util';
import {
  WORKFLOW_NODE_SIZE,
  computeExitNodePosition,
  computeWorkflowNodePosition,
} from './workflow-layout.util';

const CANVAS_WIDTH = 2400;
const CANVAS_HEIGHT = 1400;

const NODE_COMPONENTS = {
  segment: WorkflowNodeSegmentComponent,
  trigger: WorkflowNodeTriggerComponent,
  bonus: WorkflowNodeBonusComponent,
  exit: WorkflowNodeExitComponent,
} as const;

export type WorkflowSegmentMenuAction = 'select' | 'clear' | 'rename' | 'remove';

export interface WorkflowNodeContextMenuState {
  nodeId: string;
  x: number;
  y: number;
  type: 'segment';
}

export interface WorkflowPaletteDragState {
  type: WorkflowNodeType;
  x: number;
  y: number;
}

@Injectable()
export class WorkflowBuilderStateService {
  readonly draft = signal<NewWorkflowDraft | null>(null);
  readonly workflowInstanceId = signal('');

  readonly nodes = signal<Node<WorkflowNodeData>[]>([]);
  readonly edges = signal<Edge[]>([]);

  readonly selectedNodeId = signal<string | null>(null);
  readonly settingsWidgetCollapsed = signal(false);
  readonly settings = signal<WorkflowSettings>({ ...DEFAULT_WORKFLOW_SETTINGS });

  readonly pendingBonusNodeId = signal<string | null>(null);

  readonly nodeContextMenu = signal<WorkflowNodeContextMenuState | null>(null);
  readonly paletteDrag = signal<WorkflowPaletteDragState | null>(null);

  readonly canvasWidth = CANVAS_WIDTH;
  readonly canvasHeight = CANVAS_HEIGHT;

  readonly selectedNode = computed(() => {
    const id = this.selectedNodeId();
    if (!id) {
      return null;
    }
    return this.nodes().find((n) => n.id === id) ?? null;
  });

  readonly hasSegmentNode = computed(() => this.nodes().some((n) => this.nodeType(n) === 'segment'));
  readonly hasTriggerNode = computed(() => this.nodes().some((n) => this.nodeType(n) === 'trigger'));
  readonly showBuildPalette = computed(() => this.hasTriggerNode());

  readonly showBuildPaletteForSelectedNode = computed(() => {
    const node = this.selectedNode();
    if (!node) {
      return false;
    }
    const type = this.nodeType(node);
    return type === 'segment' || type === 'trigger';
  });

  readonly nodeCountByType = computed(() => {
    const counts: Record<WorkflowNodeType, number> = { segment: 0, trigger: 0, bonus: 0, exit: 0 };
    for (const node of this.nodes()) {
      const type = this.nodeType(node);
      if (type && type !== 'exit') {
        counts[type] += 1;
      }
    }
    return counts;
  });

  setDraft(draft: NewWorkflowDraft | null): void {
    this.draft.set(draft);
    if (draft && !this.workflowInstanceId()) {
      this.workflowInstanceId.set(uuidv4());
    }
  }

  selectNode(nodeId: string | null): void {
    if (nodeId === WORKFLOW_EXIT_NODE_ID) {
      return;
    }
    this.selectedNodeId.set(nodeId);
    this.nodes.update((list) =>
      list.map((node) => {
        if (node.selected) {
          node.selected.set(node.id === nodeId);
        }
        return node;
      }),
    );
  }

  openSegmentContextMenu(nodeId: string, anchorRect: DOMRect): void {
    this.nodeContextMenu.set({
      nodeId,
      x: anchorRect.right - 168,
      y: anchorRect.bottom + 4,
      type: 'segment',
    });
  }

  closeNodeContextMenu(): void {
    this.nodeContextMenu.set(null);
  }

  runSegmentMenuAction(action: WorkflowSegmentMenuAction): void {
    const menu = this.nodeContextMenu();
    if (!menu || menu.type !== 'segment') {
      return;
    }
    const nodeId = menu.nodeId;
    this.closeNodeContextMenu();

    switch (action) {
      case 'select':
        this.selectNode(nodeId);
        break;
      case 'clear':
        this.clearSegmentNode(nodeId);
        break;
      case 'rename': {
        const data = this.getNodeData(nodeId);
        const current = data?.label ?? 'Segment';
        const next = window.prompt('Rename block', current);
        if (next?.trim()) {
          this.updateNodeData(nodeId, { label: next.trim() });
        }
        break;
      }
      case 'remove':
        this.removeNode(nodeId);
        break;
    }
  }

  toggleSettingsWidget(): void {
    this.settingsWidgetCollapsed.update((v) => !v);
  }

  beginPaletteDrag(type: WorkflowNodeType, clientX: number, clientY: number): void {
    this.paletteDrag.set({ type, x: clientX, y: clientY });
  }

  updatePaletteDragPosition(clientX: number, clientY: number): void {
    const current = this.paletteDrag();
    if (!current) {
      return;
    }
    this.paletteDrag.set({ ...current, x: clientX, y: clientY });
  }

  endPaletteDrag(): void {
    this.paletteDrag.set(null);
  }

  updateSettings(settings: WorkflowSettings): void {
    this.settings.set(settings);
  }

  canDropNodeType(type: WorkflowNodeType): boolean {
    if (type === 'exit') {
      return false;
    }
    const counts = this.nodeCountByType();
    if (type === 'segment' || type === 'trigger') {
      return counts[type] === 0;
    }
    return true;
  }

  addNodeFromPalette(
    type: WorkflowNodeType,
    viewportCenter?: { x: number; y: number },
  ): string | null {
    if (!this.canDropNodeType(type)) {
      return null;
    }

    const existing = this.getChainNodes();
    const size = WORKFLOW_NODE_SIZE[type];
    const { x, y } =
      existing.length === 0 && viewportCenter
        ? {
            x: Math.round(viewportCenter.x - size.width / 2),
            y: Math.round(viewportCenter.y - size.height / 2),
          }
        : computeWorkflowNodePosition(type, CANVAS_WIDTH, existing, (node) => this.nodeType(node));

    const id = uuidv4();
    const label =
      type === 'segment' ? 'Select segment' : type === 'trigger' ? 'Set trigger' : 'Bonus';

    const node = createNode(
      {
        id,
        type: NODE_COMPONENTS[type],
        point: { x, y },
        width: WORKFLOW_NODE_SIZE[type].width,
        height: WORKFLOW_NODE_SIZE[type].height,
        selected: false,
        draggable: false,
        data: { label },
      },
      { useDefaults: true },
    );

    this.nodes.update((list) => [...list.filter((n) => n.id !== WORKFLOW_EXIT_NODE_ID), node]);
    this.linkToPreviousNode(id);
    this.syncExitNode();
    this.selectNode(id);

    if (type === 'bonus') {
      this.pendingBonusNodeId.set(id);
    }

    return id;
  }

  assignBonusToNode(nodeId: string, bonusId: string, bonusName: string): void {
    this.nodes.update((list) =>
      list.map((node) => {
        if (node.id !== nodeId || !isComponentNode(node) || !node.data) {
          return node;
        }
        const current = node.data() ?? { label: 'Bonus' };
        node.data.set({
          ...current,
          bonusId,
          bonusName,
          label: bonusName,
        });
        return node;
      }),
    );
    this.pendingBonusNodeId.set(null);
    this.selectNode(nodeId);
  }

  clearPendingBonus(): void {
    this.pendingBonusNodeId.set(null);
  }

  updateNodeData(nodeId: string, patch: Partial<WorkflowNodeData>): void {
    this.nodes.update((list) =>
      list.map((node) => {
        if (node.id !== nodeId || !isComponentNode(node) || !node.data) {
          return node;
        }
        node.data.set({ ...(node.data() ?? { label: '' }), ...patch });
        return node;
      }),
    );
  }

  clearSegmentNode(nodeId: string): void {
    this.updateNodeData(nodeId, {
      segmentName: undefined,
      label: 'Select segment',
    });
  }

  removeNode(nodeId: string): void {
    if (nodeId === WORKFLOW_EXIT_NODE_ID) {
      return;
    }
    this.nodes.update((list) => list.filter((node) => node.id !== nodeId));
    this.edges.update((list) =>
      list.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
    );
    if (this.selectedNodeId() === nodeId) {
      this.selectNode(null);
    }
    if (this.pendingBonusNodeId() === nodeId) {
      this.pendingBonusNodeId.set(null);
    }
    this.rebuildChainEdges();
    this.syncExitNode();
  }

  nodeType(node: Node<WorkflowNodeData>): WorkflowNodeType | null {
    const type = node.type;
    if (type === WorkflowNodeSegmentComponent) {
      return 'segment';
    }
    if (type === WorkflowNodeTriggerComponent) {
      return 'trigger';
    }
    if (type === WorkflowNodeBonusComponent) {
      return 'bonus';
    }
    if (type === WorkflowNodeExitComponent || node.id === WORKFLOW_EXIT_NODE_ID) {
      return 'exit';
    }
    return null;
  }

  getNodeData(nodeId: string): WorkflowNodeData | null {
    const node = this.nodes().find((n) => n.id === nodeId);
    if (!node || !isComponentNode(node) || !node.data) {
      return null;
    }
    return node.data() ?? null;
  }

  private getChainNodes(): Node<WorkflowNodeData>[] {
    return this.nodes()
      .filter((node) => {
        const type = this.nodeType(node);
        return type !== null && type !== 'exit';
      })
      .sort((a, b) => a.point().y - b.point().y);
  }

  private linkToPreviousNode(newNodeId: string): void {
    const chain = this.getChainNodes();
    if (chain.length < 2) {
      return;
    }

    const prev = chain[chain.length - 2];
    const edge = createWorkflowEdge({
      id: `${prev.id}->${newNodeId}`,
      source: prev.id,
      target: newNodeId,
    });
    this.edges.update((edges) => [...edges, edge]);
  }

  private rebuildChainEdges(): void {
    const chain = this.getChainNodes();
    const chainEdges = chain.slice(1).map((node, index) => {
      const prev = chain[index];
      return createWorkflowEdge({
        id: `${prev.id}->${node.id}`,
        source: prev.id,
        target: node.id,
      });
    });

    this.edges.update((edges) => {
      const exitEdge = edges.filter((e) => e.target === WORKFLOW_EXIT_NODE_ID);
      return [...chainEdges, ...exitEdge];
    });
  }

  private syncExitNode(): void {
    const chain = this.getChainNodes();
    if (chain.length === 0) {
      this.nodes.update((list) => list.filter((n) => n.id !== WORKFLOW_EXIT_NODE_ID));
      this.edges.update((list) => list.filter((e) => e.target !== WORKFLOW_EXIT_NODE_ID));
      return;
    }

    const last = chain[chain.length - 1];
    const lastType = this.nodeType(last);
    if (!lastType) {
      return;
    }

    const { x, y } = computeExitNodePosition(last, lastType, CANVAS_WIDTH);
    const exitNode = createNode(
      {
        id: WORKFLOW_EXIT_NODE_ID,
        type: WorkflowNodeExitComponent,
        point: { x, y },
        width: WORKFLOW_NODE_SIZE.exit.width,
        height: WORKFLOW_NODE_SIZE.exit.height,
        selected: false,
        draggable: false,
        data: { label: 'Exit' },
      },
      { useDefaults: true },
    );

    const tailEdge = createWorkflowEdge({
      id: `${last.id}->${WORKFLOW_EXIT_NODE_ID}`,
      source: last.id,
      target: WORKFLOW_EXIT_NODE_ID,
    });

    this.nodes.update((list) => [...list.filter((n) => n.id !== WORKFLOW_EXIT_NODE_ID), exitNode]);
    this.edges.update((list) => {
      const withoutTail = list.filter(
        (e) => e.target !== WORKFLOW_EXIT_NODE_ID && e.source !== WORKFLOW_EXIT_NODE_ID,
      );
      return [...withoutTail, tailEdge];
    });
  }
}
