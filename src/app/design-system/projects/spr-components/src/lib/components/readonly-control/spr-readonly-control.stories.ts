import { Meta, StoryObj } from '@storybook/angular';
import { SprReadonlyControlComponent } from './spr-readonly-control.component';

const meta: Meta<SprReadonlyControlComponent> = {
  title: 'shared components/Readonly Control',
  component: SprReadonlyControlComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **ReadonlyControl** component is used to display non-editable text with an optional icon, providing a clear and structured presentation for static content.  

- **Control Size:** Adjust the component size using sprControlSize input.  
- **Text Content:** Displays read-only text using content projection.  
- **Icon Slot:** Allows an optional icon to be projected within the component.  

This component is ideal for displaying static information such as user details, statuses, or formatted read-only values.
        `,
      },
    },
  },
  argTypes: {
    controlSize: {
      options: ['sm', 'md', 'lg'],
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
  },
};

export const ReadonlyControl: StoryObj<SprReadonlyControlComponent> = {
  args: {
    controlSize: 'md',
  },
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
        <spr-readonly-control
         [controlSize]="controlSize">
          Disabled Value

          <ng-container icon>
            <i class="bo-icon bo-icon-general-workspace"></i>
          </ng-container>
        </spr-readonly-control>
    `,
    };
  },
};

export default meta;
