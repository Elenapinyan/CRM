import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FilterArrayPipe } from '../../shared';
import { SortType } from '../../shared/enums/sort-type.enum';
import { DropdownOption } from '../../shared/interfaces/dropdown-option.interface';
import { SprButtonComponent } from '../button/spr-button.component';
import { SprChipsComponent } from '../chips/spr-chips.component';
import { SprDropdownComponent } from '../dropdown/spr-dropdown.component';
import { PAGE_SIZE_SELECTOR_CONFIG_TOKEN } from '../page-size-selector/constants/page-size-selector.constant';
import { PageSizeSelectorConfig } from '../page-size-selector/interfaces/page-size-selector-config.interface';
import { PAGINATION_BAR_CONFIG_TOKEN } from '../pagination-bar/constants/pagination-bar.constant';
import { PaginationBarConfig } from '../pagination-bar/interfaces/pagination-bar-config.interface';
import { SprTableDataCellDirective } from './directives/spr-table-data-cell.directive';
import { SprTableRowDirective } from './directives/spr-table-row.directive';
import { DisplayedColumn, PageAndSizeInfo, TableSortConfiguration } from './interfaces/table.interface';
import { SprTableComponent } from './spr-table.component';

interface CustomArgs {
  customText: string;
  leftIcon: boolean;
  rightIcon: boolean;
  withTooltip: boolean;
}

const mockPaginationBarConfig: PaginationBarConfig = {
  exportLabel: 'Export:',
};

const mockPageSizeSelectorConfig: PageSizeSelectorConfig = {
  mapToOptions: (sizes: number[]): DropdownOption[] =>
    sizes.map((size) => ({
      text: `${size} per page`,
      value: size,
    })),
};

const meta: Meta<SprTableComponent<any, any> & SprDropdownComponent & CustomArgs> = {
  title: 'shared components/Table',
  component: SprTableComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Table** component is designed to display structured data in a grid format. It offers numerous customization options including different cell sizes, pagination, and the ability to embed other components like buttons, dropdowns, and chips within table cells.

- **Styles:** Adjust the cell size and add various styling options to columns and rows.
- **Pagination:** Support for paginating large datasets.
- **Embeddable Components:** Integrate buttons, dropdowns, and other components within table cells.

Enhance your data presentation by leveraging the Table component's flexibility and rich feature set.
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        SprTableRowDirective,
        SprTableDataCellDirective,
        SprDropdownComponent,
        SprButtonComponent,
        SprChipsComponent,
        FilterArrayPipe,
      ],
      providers: [
        {
          provide: PAGINATION_BAR_CONFIG_TOKEN,
          useValue: mockPaginationBarConfig,
        },
        {
          provide: PAGE_SIZE_SELECTOR_CONFIG_TOKEN,
          useValue: mockPageSizeSelectorConfig,
        },
      ],
    }),
  ],
  argTypes: {
    cellSize: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
      description: 'Select the cell size',
      table: {
        type: {
          summary: 'sm | md | lg',
        },
        defaultValue: {
          summary: 'lg',
        },
      },
    },
    page: {
      description: 'The current page number.',
      control: {
        disable: true,
      },
    },
    size: {
      description: 'A number specifying the number of items per page.',
      control: {
        disable: true,
      },
    },
    collectionSize: {
      description: 'The total number of items to paginate through.',
      control: {
        disable: true,
      },
    },
    displayedColumns: {
      description: 'Configuration for the columns displayed in the table.',
      control: {
        disable: true,
      },
    },
    displayedRows: {
      description: 'Data to be displayed in the rows.',
      control: {
        disable: true,
      },
    },
    options: {
      description: 'Options for the dropdown component integrated within the table cells.',
      control: {
        disable: true,
      },
    },
    withPagination: {
      description: 'Enable pagination for the table.',
    },
    withExportSection: {
      description: 'Include an export section for exporting table data.',
    },
    withBoundaryLinks: {
      description: 'Option shows the boundaries of pagination (first and last buttons).',
    },
    isLoading: {
      description: 'Indicate if the table is in a loading state.',
    },
    dropdownPlaceholder: {
      description: 'Placeholder text for the dropdown component within the table cells.',
    },
    customText: {
      description: 'Custom text to display within a table cell.',
    },
    paginationWithPageSize: {
      description: 'Enables the selector for the number of items per page.',
    },
    isPaginationInputDisabled: {
      description: 'Disables the pagination input, preventing users from changing the page size.',
    },
    withSearch: {
      description: 'Option shows the search input field in pagination section.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    searchPlaceholder: {
      description: 'Option sets the placeholder text for the search input field in pagination section.',
      table: {
        defaultValue: {
          summary: 'Search...',
        },
      },
    },
    searchMaxLength: {
      description: 'Option sets the maximum length of the search input field in pagination section.',
      table: {
        defaultValue: {
          summary: '100',
        },
      },
    },
  } as any,
};

interface Item {
  name: string;
  sureName: string;
  age: number;
  status: string;
  blockManagement: string;
}

type ItemKey = keyof Item | 'sex' | 'customText';

const columns: DisplayedColumn<ItemKey>[] = [
  {
    columnKey: 'name',
    text: 'Name',
  },
  {
    columnKey: 'sureName',
    text: 'SureName',
    settings: {
      isSortable: true,
    },
  },
  {
    columnKey: 'age',
    text: 'Age',
    settings: {
      headColumnClasses: 'brd-table__th--right',
      bodyColumnClasses: 'brd-table__td--right',
    },
  },
  {
    columnKey: 'sex',
    text: 'Sex',
  },
  {
    columnKey: 'customText',
    text: 'Text',
  },
  {
    columnKey: 'status',
    text: 'Status',
  },
  {
    columnKey: 'blockManagement',
    text: 'Block Management',
    settings: {
      headColumnClasses: 'brd-table__th--center',
      bodyColumnClasses: 'brd-table__td--center',
    },
  },
];

const rows: { [key: string]: any }[] = [
  {
    name: 'Andrew',
    sureName: 'Andreev',
    age: 22,
    status: 'gray',
    blockManagement: 'Block',
  },
  {
    name: 'Egor',
    sureName: 'Egorov',
    age: 11,
    status: 'olive',
    blockManagement: 'Block',
  },
  {
    name: 'Alex',
    sureName: 'Alexeev',
    age: 6,
    status: 'green',
    blockManagement: 'Block',
  },
  {
    name: 'Roman',
    sureName: 'Romanov',
    age: 32,
    status: 'purple',
    blockManagement: 'Block',
  },
  {
    name: 'Anton',
    sureName: 'Antonov',
    age: 108,
    status: 'blue',
    blockManagement: 'Block',
  },
];

const pagination: PageAndSizeInfo = {
  page: 0,
  size: 25,
};

export const Table: StoryObj<SprTableComponent<any, any> & SprDropdownComponent & CustomArgs> = {
  args: {
    withPagination: true,
    withExportSection: false,
    withBoundaryLinks: true,
    withSearch: true,
    searchPlaceholder: 'Search...',
    searchMaxLength: 20,
    isLoading: false,
    isHovering: false,
    cellSize: 'lg',
    dropdownPlaceholder: 'Choose',
    paginationWithPageSize: true,
    isPaginationInputDisabled: false,
    customText: 'Custom text',
    page: pagination.page,
    size: pagination.size,
    collectionSize: 275,
    displayedColumns: columns,
    displayedRows: rows,
    options: [
      { text: 'Male', value: 1 },
      { text: 'Female', value: 2 },
    ],
    sortConfig: {
      sortType: SortType.Desc,
      selectedColumn: 'sureName',
    } as TableSortConfiguration<ItemKey>,
  } as never,
  render: (args: any) => {
    let searchTerm = '';

    return {
      props: args,
      template: `
    <div class="page-body">
      <spr-table
        tableClasses="table-hover"
        [title]="'Table title'"
        [page]="page"
        [cellSize]="cellSize"
        [isLoading]="isLoading"
        [isHovering]="isHovering"
        [displayedRows]="displayedRows | sprFilterArray : searchTerm : 'name'"
        [collectionSize]="collectionSize"
        [withPagination]="withPagination"
        [displayedColumns]="displayedColumns"
        [withExportSection]="withExportSection"
        [withBoundaryLinks]="withBoundaryLinks"
        [paginationWithPageSize]="paginationWithPageSize"
        [isPaginationInputDisabled]="isPaginationInputDisabled"
        [sortConfiguration]="sortConfig"
        [withSearch]="withSearch"
        [searchPlaceholder]="searchPlaceholder"
        [searchMaxLength]="searchMaxLength"
        (searchChanges)="searchTerm = $event">
        <ng-template
          sprTableRow
          columnKey="age"
          let-row
        >
         <td sprTableDataCell>
         {{ row.age }}
         </td>
        </ng-template>
        <ng-template
          sprTableRow
          columnKey="sex"
          let-row>
          <td sprTableDataCell>
            <spr-dropdown
              [options]="options"
              [withSearch]="false"
              [dropdownPlaceholder]="dropdownPlaceholder"
            ></spr-dropdown>
          </td>
        </ng-template>
        <ng-template
          sprTableRow
          columnKey="customText"
        >
          <td sprTableDataCell>
            {{customText}}
          </td>
        </ng-template>
         <ng-template
          sprTableRow
          columnKey="status"
          let-row>
          <td sprTableDataCell>
            <spr-chips [variant]="row.status" size="sm">{{row.status}}</spr-chips>
          </td>
        </ng-template>
        <ng-template
          sprTableRow
          columnKey="blockManagement"
          let-row>
            <td sprTableDataCell>
               <spr-button size="sm">{{ row.blockManagement }}</spr-button>
            </td>
        </ng-template>
      </spr-table>
    </div>
`,
    };
  },
};

export default meta;
