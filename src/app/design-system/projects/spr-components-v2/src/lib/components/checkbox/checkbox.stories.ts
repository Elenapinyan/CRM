import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsLabelDirective } from '../../../public-api';
import { DsLabelComponent } from '../label/label.component';
import { DsCheckboxComponent } from './checkbox.component';

interface CustomArgs {
  leftIcon: string;
  rightIcon: string;
  isTooltip: boolean;
  withLabel: boolean;
  isFullWidth: boolean;
  isLabelReverse: boolean;
}

const meta: Meta<DsCheckboxComponent & DsLabelComponent & CustomArgs> = {
  title: 'shared components/Checkbox',
  component: DsCheckboxComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Checkbox component** is a flexible and highly customizable element in your application.

- **Styles:** Adjust the checkbox's appearance based on the current route theme.
- **Labels:** Option to display labels to the left or right of the checkbox.
- **Icons:** Display icons on either side of the checkbox label.
- **Functions:** Supports various states like partial selection and disabling.

Enhance your user experience by configuring the checkbox to meet your application's design and functionality requirements.
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [DsLabelDirective, NgbTooltipModule],
    }),
  ],
  argTypes: {
    isLabelReverse: {
      description: 'Controls whether the label appears to the left or right of the input element.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    isPartiallyChecked: {
      description: 'Represents a partial selection within a group.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    isDisabled: {
      description: 'Disable the checkbox to prevent user interactions.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    withLabel: {
      description: 'Determines if the checkbox should be accompanied by a label.',
    },
    leftIcon: {
      description: 'Display an icon to the left of the checkbox label.',
    },
    rightIcon: {
      description: 'Display an icon to the right of the checkbox label.',
    },
    label: {
      description: 'Text label for the checkbox.',
    },
    tooltip: {
      description: 'Tooltip text to be displayed when the checkbox is hovered over.',
    },
    tooltipClassForLabel: {
      description: 'Tooltip class for label.',
      control: { type: 'text' },
    },
    checkboxTooltip: {
      description: 'Checkbox tooltip text to be displayed when the checkbox is hovered.',
    },
    tooltipClass: {
      description: 'Add classes for checkbox tooltip.',
    },
    tooltipPlacement: {
      description: 'Add any placement for checkbox tooltip.',
      options: ['auto', 'top', 'bottom', 'start', 'end'],
      control: {
        type: 'select',
      },
      table: {
        type: {
          summary: 'auto | top | bottom | start | end',
        },
        defaultValue: {
          summary: 'auto',
        },
      },
    },
    isInline: {
      description: 'Controls whether the label and checkbox appear inline.',
    },
    isDecorated: {
      description: 'Adds additional decoration to the checkbox, such us a gray background.',
    },
    isTooltip: {
      description: 'Tooltip text to be displayed when the icon is hovered.',
    },
    inputId: {
      description: 'Equivalent to the basic HTML id attribute.',
      control: {
        disable: true,
      },
    },
  },
};

export const Checkbox: StoryObj<DsCheckboxComponent & DsLabelComponent & CustomArgs> = {
  args: {
    label: 'Label',
    tooltip: 'Tooltip',
    checkboxTooltip: 'Checkbox Tooltip',
    tooltipClassForLabel: 'ds-component',
    tooltipClass: 'ds-component',
    tooltipPlacement: 'auto',
    withLabel: true,
    isInline: false,
    leftIcon: 'ds-icon-general-workspace',
    rightIcon: 'ds-icon-general-workspace',
    isLabelReverse: false,
    isDecorated: false,
    isTooltip: true,
    isDisabled: false,
    isPartiallyChecked: false,
    inputId: '1',
  },
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
        <ds-checkbox
          [inputId]="inputId"
          [label]="withLabel && label"
          [tooltipClass]="tooltipClass"
          [isLabelReverse]="isLabelReverse"
          [checkboxTooltip]="checkboxTooltip"
          [tooltipPlacement]="tooltipPlacement"
          [tooltip]="isTooltip && tooltip"
          [tooltipClassForLabel]="tooltipClassForLabel"
          [leftIcon]="leftIcon"
          [rightIcon]="rightIcon"
          [isInline]="isInline"
          [isDisabled]="isDisabled"
          [isDecorated]="isDecorated"
          [isPartiallyChecked]="isPartiallyChecked" />
      `,
    };
  },
};

export default meta;
