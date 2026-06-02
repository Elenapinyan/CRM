import type { CohortMatrix, CohortMatrixCell, CohortPlayerRow } from './cohort-builder.model';

const PERIOD_LABELS = ['1 Apr', '8 Apr', '15 Apr', '22 Apr', '29 Apr', '6 May', '13 May', '20 May'] as const;

const INTERVAL_LABELS = ['Day 0', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'] as const;

function heatForPct(pct: number): CohortMatrixCell['heat'] {
  if (pct <= 0) {
    return 'empty';
  }
  if (pct >= 55) {
    return 'high';
  }
  if (pct >= 25) {
    return 'medium';
  }
  return 'low';
}

export function buildCohortMatrix(): CohortMatrix {
  const cells: CohortMatrixCell[] = [];

  for (let p = 0; p < PERIOD_LABELS.length; p++) {
    for (let i = 0; i < INTERVAL_LABELS.length; i++) {
      const base = Math.max(0, 92 - i * 11 - p * 3);
      const retentionPct = i === 0 ? 100 : Math.max(0, Math.round(base + ((p * 7 + i * 13) % 9) - 4));
      const cohortSize = 4200 - p * 180 + i * 12;
      const playerCount = Math.round((cohortSize * retentionPct) / 100);

      cells.push({
        periodIndex: p,
        intervalIndex: i,
        retentionPct,
        playerCount,
        heat: heatForPct(retentionPct),
      });
    }
  }

  return {
    periodLabels: [...PERIOD_LABELS],
    intervalLabels: [...INTERVAL_LABELS],
    cells,
  };
}

export function getCell(
  matrix: CohortMatrix,
  periodIndex: number,
  intervalIndex: number,
): CohortMatrixCell | undefined {
  return matrix.cells.find((c) => c.periodIndex === periodIndex && c.intervalIndex === intervalIndex);
}

export function getPlayersForCell(periodIndex: number, intervalIndex: number): CohortPlayerRow[] {
  const seed = periodIndex * 100 + intervalIndex;
  const count = 8 + (seed % 5);
  const rows: CohortPlayerRow[] = [];

  for (let n = 0; n < count; n++) {
    const id = 880000 + seed * 17 + n;
    rows.push({
      id: String(id),
      username: `player_${id}`,
      email: `player${id}@example.com`,
      lastActivity: `${(intervalIndex + 1) % 28 || 1} May 2026`,
    });
  }

  return rows;
}
