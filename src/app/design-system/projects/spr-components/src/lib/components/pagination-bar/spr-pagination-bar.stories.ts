import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DropdownOption } from '../../shared/interfaces/dropdown-option.interface';
import { PAGE_SIZE_SELECTOR_CONFIG_TOKEN } from '../page-size-selector/constants/page-size-selector.constant';
import { PageSizeSelectorConfig } from '../page-size-selector/interfaces/page-size-selector-config.interface';
import { PAGINATION_BAR_CONFIG_TOKEN } from './constants/pagination-bar.constant';
import { PaginationBarConfig } from './interfaces/pagination-bar-config.interface';
import { SprPaginationBarComponent } from './spr-pagination-bar.component';

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

interface CustomArgs {
  isPaginationParamsModeEnabled: boolean;
}

const meta: Meta<SprPaginationBarComponent & CustomArgs> = {
  title: 'shared components/PaginationBar',
  component: SprPaginationBarComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **PaginationBar** component provides a navigation bar for paginating through a list of items. It supports various configurations to enhance its usability and appearance.

- **Page:** Current page number.
- **Size:** Number of items per page.
- **Collection Size:** Total number of items in the collection.
- **Loading State:** Indicates if data is currently loading.
- **Disabled State:** Option to disable the pagination controls.
- **Export Section:** Option to include an export section for additional actions.

This component enhances user experience by providing a flexible and intuitive interface for pagination.        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
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
    page: {
      description: 'Current page number.',
    },
    size: {
      description: 'Number of items per page.',
    },
    collectionSize: {
      description: 'Total number of items in the collection.',
    },
    paginationParams: {
      description: 'Alternative pagination mode when collection size is unavailable',
    },
    disabled: {
      description: 'Option to disable the pagination controls.',
    },
    withExportSection: {
      description: 'Option to include an export section for additional actions.',
    },
    isPaginationParamsModeEnabled: {
      description: 'Disables manual input of page numbers in the pagination input field.',
    },
    paginationWithPageSize: {
      description: 'Enables the selector for the number of items per page.',
    },
    isPaginationInputDisabled: {
      description: 'Disables the pagination input, preventing users from changing the page size.',
    },
    withSearch: {
      description: 'Option shows the search input field.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    searchPlaceholder: {
      description: 'Option sets the placeholder text for the search input field.',
      table: {
        defaultValue: {
          summary: 'Search...',
        },
      },
    },
    searchMaxLength: {
      description: 'Option sets the maximum length of the search input field.',
      table: {
        defaultValue: {
          summary: '100',
        },
      },
    },
    withBoundaryLinks: {
      description: 'Option shows the boundaries of pagination (first and last buttons).',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
  },
};

export const PaginationBar: StoryObj<SprPaginationBarComponent & CustomArgs> = {
  args: {
    page: 0,
    size: 25,
    collectionSize: 1110,
    withSearch: true,
    searchPlaceholder: 'Search...',
    searchMaxLength: 20,
    withExportSection: true,
    disabled: false,
    paginationWithPageSize: true,
    isPaginationInputDisabled: false,
    isPaginationParamsModeEnabled: false,
    paginationParams: {
      first: true,
      last: false,
      hasNext: true,
      hasPrevious: false,
    },
    withBoundaryLinks: true,
  },
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
        <spr-pagination-bar
          [page]="page"
          [size]="size"
          [isLoading]="disabled"
          [collectionSize]="collectionSize"
          [paginationWithPageSize]="paginationWithPageSize"
          [isPaginationInputDisabled]="isPaginationInputDisabled"
          [paginationParams]="isPaginationParamsModeEnabled && paginationParams"
          [withExportSection]="withExportSection"
          [withSearch]="withSearch"
          [searchPlaceholder]="searchPlaceholder"
          [searchMaxLength]="searchMaxLength"
          [withBoundaryLinks]="withBoundaryLinks"
        ></spr-pagination-bar>
    `,
    };
  },
};

export default meta;
