import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { ColDef } from 'ag-grid-community';

import { ChartPanelComponent } from '../../shared/chart-panel/chart-panel.component';
import { DataGridComponent } from '../../shared/data-grid/data-grid.component';

@Component({
  selector: 'app-dashboard',
  imports: [DataGridComponent, ChartPanelComponent],
  template: `
    <div class="dashboard">
      <header class="dashboard__hero">
        <h1 class="dashboard__title">CRM prototype</h1>
        <p class="dashboard__subtitle">Design system · ag-grid · ECharts</p>
      </header>

      <main class="dashboard__body">
        <section class="dashboard__section">
          <h2 class="dashboard__heading">Pipeline</h2>
          <app-data-grid [rowData]="rowData" [columnDefs]="columnDefs" />
        </section>

        <section class="dashboard__section">
          <h2 class="dashboard__heading">Weekly activity</h2>
          <app-chart-panel />
          <div class="dashboard__actions">
            <button type="button" class="dashboard__refresh" (click)="onRefresh()">Refresh</button>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [
    `
      .dashboard {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .dashboard__hero {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid var(--brd-neutral-200-700, #e5e5e5);
        background: var(--brd-neutral-050-900, #f7f7f7);
      }

      .dashboard__title {
        margin: 0 0 0.25rem;
        font-size: var(--spr-font-size-24, 1.5rem);
        font-weight: 600;
      }

      .dashboard__subtitle {
        margin: 0;
        color: var(--brd-neutral-600-400, #666);
        font-size: var(--spr-font-size-14, 0.875rem);
      }

      .dashboard__body {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        flex: 1;
      }

      .dashboard__section {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .dashboard__heading {
        margin: 0;
        font-size: var(--spr-font-size-18, 1.125rem);
        font-weight: 600;
      }

      .dashboard__actions {
        margin-top: 0.5rem;
      }

      .dashboard__refresh {
        border: 1px solid var(--brd-accent-blue-600-300, #2563eb);
        background: var(--brd-accent-blue-600-300, #2563eb);
        color: var(--brd-neutral-0-1000, #fff);
        font-size: var(--spr-font-size-14, 0.875rem);
        font-weight: 500;
        padding: 8px 14px;
        border-radius: var(--radius-8, 8px);
        cursor: pointer;
      }

      .dashboard__refresh:hover {
        filter: brightness(1.05);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  protected readonly rowData = [
    { name: 'Acme Corp', stage: 'Proposal', value: 42000 },
    { name: 'Globex', stage: 'Negotiation', value: 78000 },
    { name: 'Initech', stage: 'Qualified', value: 12000 },
  ];

  protected readonly columnDefs: ColDef[] = [
    { field: 'name', headerName: 'Account', flex: 1 },
    { field: 'stage', headerName: 'Stage', flex: 1 },
    { field: 'value', headerName: 'Value', type: 'rightAligned', flex: 1 },
  ];

  onRefresh(): void {
    // Placeholder for a future data reload hook.
  }
}
