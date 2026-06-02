import type { Node } from 'ngx-vflow';

import type { WorkflowNodeData, WorkflowNodeType } from '../workflow-builder.model';

/** Vertical gap between stacked workflow blocks (px). */
export const WORKFLOW_NODE_GAP_PX = 60;

/** Vertical connector from last block handle to Exit (Figma 1214:16809). */
export const WORKFLOW_TAIL_LINE_PX = 52;

/** Y position of the first block in the stack. */
export const WORKFLOW_STACK_ORIGIN_Y = 120;

export const WORKFLOW_NODE_SIZE: Record<WorkflowNodeType, { width: number; height: number }> = {
  segment: { width: 81, height: 76 },
  trigger: { width: 200, height: 72 },
  bonus: { width: 220, height: 88 },
  exit: { width: 81, height: 36 },
};

export function computeCenteredNodeX(type: WorkflowNodeType, canvasWidth: number): number {
  return Math.round((canvasWidth - WORKFLOW_NODE_SIZE[type].width) / 2);
}

export function computeWorkflowNodePosition(
  type: WorkflowNodeType,
  canvasWidth: number,
  existingNodes: Node<WorkflowNodeData>[],
  nodeType: (node: Node<WorkflowNodeData>) => WorkflowNodeType | null,
): { x: number; y: number } {
  const x = computeCenteredNodeX(type, canvasWidth);

  const chain = existingNodes.filter((node) => {
    const t = nodeType(node);
    return t !== null && t !== 'exit';
  });

  if (chain.length === 0) {
    return { x, y: WORKFLOW_STACK_ORIGIN_Y };
  }

  const last = chain[chain.length - 1];
  const lastType = nodeType(last);
  const lastHeight = lastType ? WORKFLOW_NODE_SIZE[lastType].height : 72;

  return {
    x,
    y: last.point().y + lastHeight + WORKFLOW_NODE_GAP_PX,
  };
}

export function computeExitNodePosition(
  lastNode: Node<WorkflowNodeData>,
  lastType: WorkflowNodeType,
  canvasWidth: number,
): { x: number; y: number } {
  return {
    x: computeCenteredNodeX('exit', canvasWidth),
    y: lastNode.point().y + WORKFLOW_NODE_SIZE[lastType].height + WORKFLOW_TAIL_LINE_PX,
  };
}
