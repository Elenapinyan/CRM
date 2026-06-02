import { ChangeDetectionStrategy, Component, computed, input, viewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { DsButton } from 'projects/spr-components-v2/src/public-api';
import { ColDef, GridOptions, RowSelectionOptions } from '../../public-api';
import { AgGridTemplateRendererComponent } from '../grid-template-renderer';

@Component({
  selector: 'spr-ag-grid-example',
  imports: [AgGridAngular, DsButton],
  templateUrl: './ag-grid-example.html',
  styleUrl: './ag-grid-example.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgGrid {
  // Template for custom cell content
  protected readonly actionTemplate = viewChild('actionTemplate');

  // is row hovered
  readonly isRowHovered = input(true);

  // table size
  readonly size = input<'sm' | 'md' | 'lg'>();

  // avaliable color for row (will be added to 3 row)
  readonly bgColor = input<'default' | 'selected' | 'sum' | 'drag-sum' | 'error'>('default');

  readonly rowData = input<any[]>();

  protected readonly columnDefsWithCustomTemplate = computed(() => {
    const rowData = [...(this.columnDefs() || [])];

    if (rowData.length) {
      rowData.push({
        field: 'actions',
        headerName: '',
        sortable: false,
        // custom template config
        cellRenderer: AgGridTemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.actionTemplate,
        },
        width: 60,
        minWidth: 60,
        maxWidth: 60,
        suppressSizeToFit: true,
        resizable: false,
      });
    }
    return rowData;
  });

  readonly columnDefs = input<ColDef<Record<string, any>>[]>();

  protected readonly defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    suppressHeaderMenuButton: true,
    suppressHeaderContextMenu: true,
  };

  rowSelection: RowSelectionOptions | 'single' | 'multiple' = {
    mode: 'multiRow',
  };

  protected readonly gridOptions: GridOptions = {
    getRowClass: (params) => {
      return params.rowIndex === 2 ? `row-color-${this.bgColor()}` : undefined;
    },
  };

  protected readonly classes = computed(() => {
    return [`ag-grid-size-${this.size()}`];
  });
}
