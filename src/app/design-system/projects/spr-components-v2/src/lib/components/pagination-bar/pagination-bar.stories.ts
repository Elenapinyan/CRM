import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { PaginationBar } from './pagination-bar';
import { PAGINATION_TRANSLATIONS_CONFIG, PaginationTranslationsConfig } from './pagination-bar.options';

const mockPaginationBarConfig: PaginationTranslationsConfig = {
  rowsPerPage: () => 'Rows per page',
  ofPages: (params) => `of ${params.of} pages`,
  showingOf: (params) => `Showing ${params.showing} of ${params.of}`,
};

interface CustomArgs {
  isPaginationParamsModeEnabled: boolean;
}

const meta: Meta<PaginationBar & CustomArgs> = {
  title: 'shared components/PaginationBar',
  component: PaginationBar,
  parameters: {
    docs: {
      description: {
        component: `
The **PaginationBar** component provides a navigation bar for paginating through a list of items. It supports various configurations to enhance its usability and appearance.

- **Page:** Current page number.
- **Size:** Number of items per page.
- **Total:** Total number of items in the collection.
- **Pagination Params:** Alternative pagination without total items available.
- **Disabled State:** Option to disable the pagination controls.

This component enhances user experience by providing a flexible and intuitive interface for pagination.

To provide a translations you can use \`PAGINATION_TRANSLATIONS_CONFIG\` injection token or \`[translationConfig]="config"\` input property

Translation config example

\`\`\`typescript
const paginationBarConfig: PaginationTranslationsConfig = {
  rowsPerPage: () => 'Rows per page',
  ofPages: (params) => \`of \${params.of} pages\`,
  showingOf: (params) => \`Showing \${params.showing} of \${params.of}\`,
};
\`\`\`

\`\`\`typescript
export type PaginationTranslationsConfig = {
  rowsPerPage: () => string;
  showingOf: (params: ShowingOfParams) => string;
  ofPages: (params: OfPagesParams) => string;
};
\`\`\`
`,
      },
    },
  },
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: PAGINATION_TRANSLATIONS_CONFIG,
          useValue: mockPaginationBarConfig,
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
    total: {
      description: 'Total number of items in the collection.',
    },
    paginationParams: {
      description: 'Alternative pagination mode when collection size is unavailable',
    },
    disabled: {
      description: 'Option to disable the pagination controls.',
    },
  },
};

export const PaginationBarStory: StoryObj<PaginationBar & CustomArgs> = {
  args: {
    page: 0,
    size: 25,
    total: 1110,
    disabled: false,
    paginationParams: {
      first: true,
      last: false,
      hasNext: true,
      hasPrevious: false,
    },
  },
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
        <h5 class="storybook-title">With available total items count</h5>
        <ds-pagination-bar
          [page]="page"
          [size]="size"
          [disabled]="disabled"
          [total]="total"
        />

        <br>
        <br>

        <h5 class="storybook-title">Alternative pagination when total is not available</h5>
        <ds-pagination-bar
          [page]="page"
          [size]="size"
          [disabled]="disabled"
          [total]="total"
          [paginationParams]="paginationParams"
        />
    `,
    };
  },
};

export default meta;
