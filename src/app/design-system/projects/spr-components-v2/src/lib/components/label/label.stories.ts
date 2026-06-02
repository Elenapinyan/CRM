import { NgIf } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsLabelComponent } from './label.component';

interface CustomArgs {
  leftIcon: string;
  rightIcon: string;
  withTooltip: boolean;
}

const meta: Meta<DsLabelComponent & CustomArgs> = {
  title: 'shared components/Label',
  component: DsLabelComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Label** component is a versatile element used to display text labels in your application. It supports various configurations to enhance its usability and appearance.

- **Icons:** Optionally display icons on either side of the label text for added visual cues.
- **Tooltip:** Option to include a tooltip for additional information.
- **Reversed Label:** Control the position of the label relative to the input field.

This component enhances user experience by providing a flexible and intuitive interface for labeling inputs.
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [NgIf],
    }),
  ],
  argTypes: {
    inputId: {
      description: 'This is equivalent to the basic HTML id attribute.',
      control: {
        disable: true,
      },
    },
    label: {
      description: 'The text to display within the label.',
    },
    tooltip: {
      description: 'The text to display within the tooltip.',
    },
    tooltipClassForLabel: {
      description: 'Tooltip class.',
      control: { type: 'text' },
    },
    leftIcon: {
      description: 'Display an icon to the left of the label text.',
    },
    rightIcon: {
      description: 'Display an icon to the right of the label text.',
    },
    withTooltip: {
      description: 'Include a tooltip for the label.',
    },
    isInline: {
      description: 'Controls whether the label appear inline.',
    },
    isLabelReverse: {
      description: 'Controls whether the label and tooltip icon appear reverse.',
    },
  },
};

export const Label: StoryObj<DsLabelComponent & CustomArgs> = {
  args: {
    label: 'Label text',
    tooltip: 'Tooltip',
    tooltipClassForLabel: 'ds-component',
    leftIcon: 'ds-icon-general-workspace',
    rightIcon: 'ds-icon-general-workspace',
    withTooltip: true,
    isInline: false,
    isLabelReverse: false,
    inputId: '',
  },
  render: (args: DsLabelComponent & CustomArgs) => {
    return {
      props: {
        ...args,
      },
      template: `
        <ds-label
          [label]="label"
          [isInline]="isInline"
          [className]="className"
          [leftIcon]="leftIcon"
          [rightIcon]="rightIcon"
          [isLabelReverse]="isLabelReverse"
          [tooltip]="withTooltip && tooltip"
          [tooltipClassForLabel]="tooltipClassForLabel" />
      `,
    };
  },
};

export default meta;
