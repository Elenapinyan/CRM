import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsTwoOptionsSwitcherComponent } from './two-options-switcher.component';

const meta: Meta<DsTwoOptionsSwitcherComponent> = {
  title: 'shared components/TwoOptionsSwitcher',
  component: DsTwoOptionsSwitcherComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
The \`TwoOptionsSwitcherComponent\` allows users to switch between two predefined options. It can display labels and tooltips for both options, and its state can be controlled using a form control. The component is designed to be accessible and can be disabled when needed to prevent user interaction.

## Key Features

- **Customizable Labels**: Display primary and secondary labels to guide users.
- **Tooltips**: Provide additional information through tooltips for both options.
- **Disability**: Option to disable the switcher to prevent user interaction.
        `,
      },
    },
  },
  argTypes: {
    isDisabled: {
      description: 'Disable the switcher to prevent user interactions.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    labelStart: {
      description: 'The label to display at the start position.',
    },
    labelEnd: {
      description: 'The label to display at the end position.',
    },
    tooltipStart: {
      description: 'The tooltip text for the start label.',
    },
    tooltipEnd: {
      description: 'The tooltip text for the end label.',
    },
    tooltipClassForLabel: {
      description: 'Tooltip class for label.',
      control: { type: 'text' },
    },
    startValue: {
      description: 'Value emitted when the control is off (false).',
    },
    endValue: {
      description: 'Value emitted when the control is on (true).',
    },
    inputId: {
      description: 'This is equivalent to the basic HTML id attribute.',
      control: {
        disable: true,
      },
    },
  },
};

const formControl = new FormControl('start', { nonNullable: true });

export const TwoOptionsSwitcher: StoryObj<DsTwoOptionsSwitcherComponent & { formControl: FormControl }> = {
  args: {
    isDisabled: false,
    labelStart: 'label start',
    labelEnd: 'label end',
    tooltipStart: 'tooltip start',
    tooltipEnd: 'tooltip end',
    tooltipClassForLabel: 'ds-component',
    startValue: 'start',
    endValue: 'end',
    inputId: '1',
    formControl,
  },

  render: (args) => {
    if (args.isDisabled) {
      args.formControl.disable();
    } else {
      args.formControl.enable();
    }

    return {
      props: {
        ...args,
      },
      template: `
       <ds-two-options-switcher
        [labelStart]="labelStart"
        [labelEnd]="labelEnd"
        [tooltipStart]="tooltipStart"
        [tooltipEnd]="tooltipEnd"
        [tooltipClassForLabel]="tooltipClassForLabel"
        [startValue]="startValue"
        [endValue]="endValue"
        [formControl]="formControl"
        [inputId]="inputId"
       ></ds-two-options-switcher>
      `,
    };
  },
};

export default meta;
