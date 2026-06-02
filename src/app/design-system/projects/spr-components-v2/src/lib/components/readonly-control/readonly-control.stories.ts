import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsReadonlyControlComponent } from './readonly-control.component';
import { DsLabelDirective } from '../../directives/label';

const meta: Meta<DsReadonlyControlComponent> = {
  title: 'shared components/Readonly Control',
  component: DsReadonlyControlComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **ReadonlyControl** component is used to display non-editable text with an optional icon, providing a clear and structured presentation for static content.

- **Label and Description:** Display a label and description to guide users.
- **Control Size:** Adjust the component size using sprControlSize input.
- **Text Content:** Displays read-only text using content projection.
- **Icon Slot:** Allows an optional icon to be projected within the component.

This component is ideal for displaying static information such as user details, statuses, or formatted read-only values.
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [DsLabelDirective],
    }),
  ],
  argTypes: {
    controlSize: {
      options: ['sm', 'md'],
      control: {
        type: 'select',
      },
      description: 'Adjust the size of the input control.',
      table: {
        defaultValue: {
          summary: 'md',
        },
      },
    },
    label: {
      description: 'The text to display as the label for the input.',
    },
    tooltipClassForLabel: {
      description: 'Tooltip class for label.',
      control: { type: 'text' },
    },
  },
};

export const ReadonlyControl: StoryObj<DsReadonlyControlComponent> = {
  args: {
    controlSize: 'md',
    label: 'Label',
    tooltip: 'Tooltip',
    tooltipClassForLabel: 'ds-component',
  },
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
        <ds-readonly-control
         [controlSize]="controlSize"
         [label]="label"
         [tooltip]="tooltip"
         [tooltipClassForLabel]="tooltipClassForLabel"
         >
          Disabled Value

          <ng-container icon>
            <i class="ds-icon ds-icon-general-workspace"></i>
          </ng-container>
        </ds-readonly-control>
    `,
    };
  },
};

export default meta;
