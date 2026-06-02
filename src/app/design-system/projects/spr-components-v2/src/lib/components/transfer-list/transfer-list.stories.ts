import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TransferListComponent } from './transfer-list.component';
import { TransferListTemplateDirective } from './transfer-list-template.directive';

const meta: Meta<TransferListComponent> = {
  title: 'shared components/TransferList',
  component: TransferListComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **TransferList** component is a versatile UI element for transferring items between two lists. It allows users to easily move items from one list to another with a simple interface.

### Features:
- **Group By**: You can group your items by prop.
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
      imports: [TransferListComponent, TransferListTemplateDirective],
    }),
  ],
};

export const TransferList: StoryObj<TransferListComponent> = {
  args: {
    sourceColumnHeader: 'Visible',
    targetColumnHeader: 'Hidden',
    searchPlaceholder: 'Search Placeholder',
    enabledItems: ['Af', 'Ge'],
    disabledItems: ['Ru'],
    sourceList: [
      { name: 'Afghanistan', icon: 'ds-icon-general-workspace', value: 'Af' },
      { name: 'Andorra', icon: 'ds-icon-general-boat', value: 'An' },
      { name: 'Argentina', icon: 'ds-icon-general-alert-octagon', value: 'Ar' },
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
        <ds-transfer-list
          [groupBy]="groupBy"
          [sourceList]="sourceList"
          [targetList]="targetList"
          [enabledItems]="enabledItems"
          [disabledItems]="disabledItems"
          [sourceColumnHeader]="sourceColumnHeader"
          [targetColumnHeader]="targetColumnHeader"
          [searchPlaceholder]="searchPlaceholder">
          <ng-template dsTransferListTemplate="sourceItemButtonIcon">
            <i class="ds-icon ds-icon-arrows-arrow-right"></i>
          </ng-template>
        </ds-transfer-list>
      `,
    };
  },
};

export default meta;
