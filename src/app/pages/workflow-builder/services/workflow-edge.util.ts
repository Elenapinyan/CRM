import { createEdge, type CurveFactoryParams, type CurveLayout } from 'ngx-vflow';

/** Vertical connector — straight down from the source handle (Figma flow lines). */
export function workflowVerticalEdgePath({
  sourcePoint,
  targetPoint,
}: CurveFactoryParams): CurveLayout {
  return {
    path: `M ${sourcePoint.x},${sourcePoint.y} L ${sourcePoint.x},${targetPoint.y}`,
    labelPoints: {
      start: { x: sourcePoint.x, y: sourcePoint.y + (targetPoint.y - sourcePoint.y) * 0.15 },
      center: { x: sourcePoint.x, y: (sourcePoint.y + targetPoint.y) / 2 },
      end: { x: sourcePoint.x, y: sourcePoint.y + (targetPoint.y - sourcePoint.y) * 0.85 },
    },
  };
}

export const WORKFLOW_EDGE_CURVE = workflowVerticalEdgePath;

export function createWorkflowEdge(
  edge: Parameters<typeof createEdge>[0],
): ReturnType<typeof createEdge> {
  return createEdge(
    {
      ...edge,
      curve: WORKFLOW_EDGE_CURVE,
    },
    { useDefaults: true },
  );
}
