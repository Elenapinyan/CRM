import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridOptions } from 'ag-grid-community';

import { rmTheme } from '../../ag-grid/rm-grid.theme';

@Component({
  selector: 'app-data-grid',
  imports: [AgGridAngular],
  template: `
    <div class="ag-grid-component__content ag-grid-size-md">
      <ag-grid-angular
        [rowData]="rowData"
        [columnDefs]="columnDefs"
        [gridOptions]="resolvedGridOptions"
        domLayout="normal"
      />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        min-height: 280px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridComponent {
  @Input() rowData: object[] = [];
  @Input() columnDefs: ColDef[] = [];
  @Input() gridOptions: GridOptions = {};

  protected readonly baseGridOptions: GridOptions = {
    theme: rmTheme,
    suppressCellFocus: true,
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
    },
  };

  protected get resolvedGridOptions(): GridOptions {
    return { ...this.baseGridOptions, ...this.gridOptions };
  }
}
