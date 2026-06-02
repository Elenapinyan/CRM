This is an example of how to use [AG Grid](https://www.ag-grid.com) from spr-components.

### Simple example usage:

#### Import styles

##### You can import inside main style.scss

```scss
import '@platform-workspace/grid/style/ag-grid.scss';
....
```

##### Or add to style section in angular.json

```json
  "options": {
    "styles": [
      "../node_modules/@platform-workspace/grid/style/ag-grid.scss"
    ....
```

#### Register Modules

Register the AllCommunityModule to access all Community features:

```typescript
import { AllCommunityModule, ModuleRegistry } from '@platform-workspace/grid';

ModuleRegistry.registerModules([AllCommunityModule]);
```

> To minimize bundle size, only register the modules you want to use

#### Import the Angular Data Grid.

You don't need to install Ng Grid separately, use \`@platform-workspace/grid\` path.

```typescript
import { AgGridAngular } from '@platform-workspace/grid'; // Angular Data Grid Component
import type { ColDef } from '@platform-workspace/grid'; // Column Definition Type Interface
```

#### Define Rows and Columns

```typescript
@Component({
  selector: 'app-any-component',
  imports: [AgGridAngular], // Add Angular Data Grid Component
  styleUrls: ['./app-any.component.css'],
  templateUrl: './app-any.component.html',
})
export class AppAnyComponent {
  // Template for custom cell content
  protected readonly actionTemplate = viewChild('actionTemplate');

  // Row Data: The data to be displayed.
  rowData = [
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' }
    {
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
    },
  ];
}
```

#### Angular Data Grid Component

Set Rows and Columns as ag-grid-angular component attributes:

```html
<!-- The AG Grid component -->
<ag-grid-angular [rowData]="rowData" [columnDefs]="colDefs" />

<!-- Template for custom cell content -->
<ng-template #actionTemplate let-value let-data="data">
  <spr-button (click)="editSeoPage(data)" variant="outline" size="sm" [isIcon]="true" type="button">
    <svg-icon class="icon" [svgStyle]="{ 'width.px': 16 }" [src]="'edit' | icon: 'controls'"></svg-icon>
  </spr-button>
</ng-template>
```
