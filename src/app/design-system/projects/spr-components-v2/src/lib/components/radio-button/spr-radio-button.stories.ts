import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsLabelDirective } from '../../../public-api';
import { DsLabelComponent } from '../label/label.component';
import { DsRadioButtonComponent } from './radio-button.component';

interface CustomArgs {
  leftIcon: string;
  rightIcon: string;
  isTooltip: boolean;
  withLabel: boolean;
  isFullwidth: boolean;
  isLabelReverse: boolean;
  formControl: FormControl;
}

const formControl = new FormControl('', { nonNullable: true, validators: [Validators.required] });

const meta: Meta<DsRadioButtonComponent & DsLabelComponent & CustomArgs> = {
  title: 'shared components/RadioButton',
  component: DsRadioButtonComponent,
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
      imports: [DsLabelDirective, ReactiveFormsModule],
    }),
  ],
  argTypes: {
    formControl: {
      table: {
        disable: true,
      },
    },
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

export const RadioButton: StoryObj<DsRadioButtonComponent & DsLabelComponent & CustomArgs> = {
  args: {
    label: 'Label',
    tooltip: 'Tooltip',
    tooltipClassForLabel: 'ds-component',
    withLabel: true,
    isInline: false,
    isLabelReverse: false,
    leftIcon: 'ds-icon-general-info',
    rightIcon: 'ds-icon-general-info',
    isDecorated: false,
    isTooltip: true,
    isDisabled: false,
    inputId: '1',
    formControl,
  },
  render: (args) => {
    return {
      props: {
        ...args,
      },
      template: `
      <section class="storybook-section">
        <ds-radio-button
          [label]="withLabel && label"
          [isLabelReverse]="isLabelReverse"
          [tooltip]="isTooltip && tooltip"
          [tooltipClassForLabel]="tooltipClassForLabel"
          [leftIcon]="leftIcon"
          [rightIcon]="rightIcon"
          [isInline]="isInline"
          [isDecorated]="isDecorated"
          [isDisabled]="isDisabled"
          [formControl]="formControl"
          [name]="'radioButtonName'"
          [value]="'radioButtonName1'"
          [inputId]="'radioButtonId1'"
          [isBottomMargin]="false" />
      </section>

      <section class="storybook-section">
        <ds-radio-button
          [label]=""
          [isLabelReverse]="isLabelReverse"
          [tooltip]="isTooltip && tooltip"
          [tooltipClassForLabel]="tooltipClassForLabel"
          [leftIcon]="leftIcon"
          [rightIcon]="rightIcon"
          [isInline]="isInline"
          [isDecorated]="isDecorated"
          [isDisabled]="isDisabled"
          [formControl]="formControl"
          [name]="'radioButtonName'"
          [value]="'radioButtonName2'"
          [inputId]="'radioButtonId2'"
          [isBottomMargin]="false" >
          <div>dfgsdfgsdfg</div>
        </ds-radio-button>
      </section>

      <section class="storybook-section">
        <h3 class="storybook-title">default</h3>

        <ds-radio-button
          [label]="withLabel && label"
          [isLabelReverse]="isLabelReverse"
          [tooltip]="isTooltip && tooltip"
          [tooltipClassForLabel]="tooltipClassForLabel"
          [leftIcon]="leftIcon"
          [rightIcon]="rightIcon"
          [isInline]="isInline"
          [isDecorated]="isDecorated"
          [isDisabled]="isDisabled"
          [formControl]="formControl"
          [name]="'radioButtonName2'"
          [value]="'radioButtonName01'"
          [inputId]="'radioButtonId01'"
          [isBottomMargin]="false" />

        <ds-radio-button
          [label]="withLabel && label"
          [isLabelReverse]="isLabelReverse"
          [tooltip]="isTooltip && tooltip"
          [tooltipClassForLabel]="tooltipClassForLabel"
          [leftIcon]="leftIcon"
          [rightIcon]="rightIcon"
          [isInline]="isInline"
          [isDecorated]="isDecorated"
          [isDisabled]="isDisabled"
          [formControl]="formControl"
          [name]="'radioButtonName2'"
          [value]="'radioButtonName02'"
          [inputId]="'radioButtonId02'"
          [isBottomMargin]="false" />
      </section>
    `,
    };
  },
};

export default meta;
