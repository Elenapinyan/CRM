import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SprTransferListComponent } from './spr-transfer-list.component';
import { SprTransferListTemplateDirective } from './spr-transfer-list-template.directive';

const meta: Meta<SprTransferListComponent> = {
  title: 'shared components/TransferList',
  component: SprTransferListComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **TransferList** component is a versatile UI element for transferring items between two lists. It allows users to easily move items from one list to another with a simple interface.

### Features:
- **Group By**: You can group your items by prop.
- **Visible Header**: Header for the visible items list before country number..
- **Countries Header**: Header for the visible items list after country number.
- **Source Column Header**: Header for the source column, where items are initially listed.
- **Target Column Header**: Header for the target column, where items can be moved.
- **Search Placeholder**: Placeholder text for the search input.
- **Source List**: The initial list of items available for transfer.
- **Enabled Items**: Items that can not be moved to Target List.
- **Disabled Items**: Items that can not be moved to Source List.
        `,
      },
    },
  },
  argTypes: {
    groupBy: {
      description: 'You can group your list options by property. Now just "category" field is available',
      control: {
        type: 'select',
      },
      options: [false, 'category'],
      table: {
        type: {
          summary: 'false | "category"',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    visibleHeader: {
      description: 'Customizable header for the visible items list before country number.',
      control: {
        type: 'text',
      },
    },
    countriesHeader: {
      description: 'Customizable header for the visible items list after country number.',
      control: {
        type: 'text',
      },
    },
    sourceColumnHeader: {
      description: 'Customizable header for the source column, where items are initially listed.',
      control: {
        type: 'text',
      },
    },
    targetColumnHeader: {
      description: 'Customizable header for the target column, where items can be moved.',
      control: {
        type: 'text',
      },
    },
    searchPlaceholder: {
      description: 'Placeholder text for the search input.',
      control: {
        type: 'text',
      },
    },
    sourceList: {
      description: 'The initial list of items available for transfer.',
    },
    enabledItems: {
      description: 'List of values that can not be moved to Target List.',
    },
    disabledItems: {
      description: 'List of values that can not be moved to Source List.',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [SprTransferListComponent, SprTransferListTemplateDirective],
    }),
  ],
};

export const TransferList: StoryObj<SprTransferListComponent> = {
  args: {
    visibleHeader: 'Visible in',
    countriesHeader: 'Countries',
    sourceColumnHeader: 'Visible',
    targetColumnHeader: 'Hidden',
    searchPlaceholder: 'Search Placeholder',
    enabledItems: ['Af', 'Ge'],
    disabledItems: ['Ru'],
    sourceList: [
      { name: 'Afghanistan', icon: 'bo-icon-general-workspace', value: 'Af' },
      { name: 'Andorra', icon: 'bo-icon-general-boat', value: 'An' },
      { name: 'Argentina', icon: 'bo-icon-general-alert-octagon', value: 'Ar' },
      { name: 'Portugal', icon: '', value: 'Pt', category: 'Europe' },
      { name: 'Poland', icon: '', value: 'Po', category: 'Europe' },
      { name: 'Ukraine', icon: '', value: 'Ua', category: 'Europe' },
      { name: 'Georgia', icon: '', value: 'Ge' },
      { name: 'Finland', icon: '', value: 'Fi', category: 'Europe' },
      { name: 'Spain', icon: '', value: 'Sp', category: 'Europe' },
      { name: 'France', icon: '', value: 'Fr', category: 'Europe' },
      { name: 'Korea', icon: '', value: 'Kr' },
      { name: 'Uzbekistan', icon: '', value: 'Uz' },
      { name: 'Venezuela', icon: '', value: 'Vz' },
      { name: 'Zambia', icon: '', value: 'Za' },
      { name: 'Zimbabwe', icon: '', value: 'Zi' },
    ],
    targetList: [{ name: 'russia', icon: '', value: 'Ru' }],
    groupBy: false,
  },
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
        <spr-transfer-list
          [groupBy]="groupBy"
          [sourceList]="sourceList"
          [targetList]="targetList"
          [enabledItems]="enabledItems"
          [disabledItems]="disabledItems"
          [visibleHeader]="visibleHeader"
          [countriesHeader]="countriesHeader"
          [sourceColumnHeader]="sourceColumnHeader"
          [targetColumnHeader]="targetColumnHeader"
          [searchPlaceholder]="searchPlaceholder">
          <ng-template dsTransferListTemplate="sourceItemButtonIcon">
            <i class="bo-icon-arrows-chevron-right"></i>
          </ng-template>
        </spr-transfer-list>
      `,
    };
  },
};

export default meta;
