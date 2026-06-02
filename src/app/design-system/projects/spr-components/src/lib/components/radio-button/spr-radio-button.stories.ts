import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SprLabelDirective } from '../../../public-api';
import { SprLabelComponent } from '../label/spr-label.component';
import { SprRadioButtonComponent } from './spr-radio-button.component';

interface CustomArgs {
  leftIcon: string;
  rightIcon: string;
  isTooltip: boolean;
  withLabel: boolean;
  isFullwidth: boolean;
  isLabelReverse: boolean;
}

const meta: Meta<SprRadioButtonComponent & SprLabelComponent & CustomArgs> = {
  title: 'shared components/RadioButton',
  component: SprRadioButtonComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **RadioButton** component allows users to select one option from a set of choices. It supports various configurations to enhance its usability and appearance.

- **Current Route:** Adjust the styling based on the current route theme.
- **Icons:** Optionally display icons on either side of the label text for added visual cues.
- **Tooltip:** Provide additional information through a tooltip.
- **Label and Description:** Display a label and description to guide users.
- **Disability:** Option to disable the component, preventing user interaction.

This component enhances user experience by providing a clear and intuitive interface for making selections.
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [SprLabelDirective],
    }),
  ],
  argTypes: {
    isDisabled: {
      description: 'Disable the radio button to prevent user interactions.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    inputId: {
      description: 'This is equivalent to the basic HTML id attribute.',
      control: {
        disable: true,
      },
    },
    label: {
      description: 'The text to display as the label for the radio button.',
    },
    tooltip: {
      description: 'The text to display within the tooltip.',
    },
    tooltipClassForLabel: {
      description: 'Tooltip class for label.',
      control: { type: 'text' },
      table: {
        defaultValue: { summary: 'tooltip-container__body tooltip-white' },
      },
    },
    isLabelReverse: {
      description: 'Controls whether the label appears to the left or right of the radio button.',
    },
    isInline: {
      description: 'Controls whether the label and radio button appear inline.',
    },
    isDecorated: {
      description: 'Option to add decoration to the radio button.',
    },
    isTooltip: {
      description: 'Enable or disable the tooltip for the radio button.',
    },
    withLabel: {
      description: 'Enable or disable the label for the radio button.',
    },
    leftIcon: {
      description: 'Specifies the font for the icon to be displayed on the left side of the component.',
    },
    rightIcon: {
      description: 'Specifies the font for the icon to be displayed on the right side of the component.',
    },
  },
};

export const RadioButton: StoryObj<SprRadioButtonComponent & SprLabelComponent & CustomArgs> = {
  args: {
    label: 'Label',
    tooltip: 'Tooltip',
    tooltipClassForLabel: 'tooltip-container__body tooltip-white',
    withLabel: true,
    isInline: false,
    isLabelReverse: false,
    leftIcon: 'bo-icon-general-workspace',
    rightIcon: 'bo-icon-general-workspace',
    isDecorated: false,
    isTooltip: true,
    isDisabled: false,
    inputId: '1',
  },
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
        <spr-radio-button
          [label]="withLabel && label"
          [isLabelReverse]="isLabelReverse"
          [tooltip]="isTooltip && tooltip"
          [tooltipClassForLabel]="tooltipClassForLabel"
          [leftIcon]="leftIcon"
          [rightIcon]="rightIcon"
          [isInline]="isInline"
          [isDecorated]="isDecorated"
          [isDisabled]="isDisabled"
          [isBottomMargin]="false" />
    `,
    };
  },
};

export default meta;
