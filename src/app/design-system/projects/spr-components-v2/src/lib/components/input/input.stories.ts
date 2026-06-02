import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { v7 } from 'uuid';
import { DsLabelDirective } from '../../../public-api';
import { ValidatorsKeys } from '../../shared/enums/validators.enum';
import { DsButton } from '../button';
import { DsInputComponent } from './input.component';
import { fn } from '@storybook/test';

interface CustomArgs {
  formControl: FormControl;
  isAddonStart: boolean;
  isAddonEnd: boolean;
}

const formControl = new FormControl('', { nonNullable: true, validators: [Validators.required] });

const meta: Meta<DsInputComponent & CustomArgs> = {
  title: 'shared components/Input',
  component: DsInputComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Input** component allows users to enter and edit text. It supports various configurations to enhance its usability and appearance.

- **Current Route:** Adjust the styling based on the current route theme.
- **Input Type:** Define the type of input, such as text, number, bigNumber, or password.
- **Control Size:** Adjust the size of the input control to fit different form layouts.
- **Precision:** Control the number of decimal places for numeric inputs.
- **Negative Numbers:** Determine whether negative numbers are allowed as valid numeric input.
- **Submit Strategy:** Automatically clear the input when the submit strategy is true.
- **Tooltip:** Provide additional information through a tooltip.
- **Label and Description:** Display a label and description to guide users.
- **Max length:** Limit of characters to enter.
- **Addon:** Optionally add elements before or after the input field.
- **Prepend:** Optionally add elements before the input field but after Addon.
- **Append:** Optionally add elements after the input field but before addon.
- **Append type:** You can choose type label or button for wrapper of append template.
Default is \`"label"\`. If you use \`appendType="button"\` then you can use \`(appendClick)\` event.
- **Disability:** Option to disable the component, preventing user interaction.

This component enhances user experience by providing a clear and intuitive interface for text input.
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [FormsModule, ReactiveFormsModule, DsLabelDirective, DsButton],
    }),
  ],
  argTypes: {
    type: {
      options: ['text', 'number', 'bigNumber', 'password'],
      control: {
        type: 'select',
      },
      description: 'Define the type of input.',
    },
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
    precision: {
      description: 'The precision parameter controls the number of decimal places for numeric inputs.',
      table: {
        defaultValue: {
          summary: '0',
        },
      },
    },
    isNegativeNumbersAcceptable: {
      description: 'Parameter determines whether negative numbers are allowed as valid numeric input',
    },
    onlyInteger: {
      description: 'parameter specifies whether fractional values are allowed to be entered. Works only with number type',
    },
    isSubmitStrategy: {
      description: 'This parameter ensures that the input will automatically clear when the submit strategy is true.',
    },
    inputId: {
      description: 'This is equivalent to the basic HTML id attribute.',
    },
    formControl: {
      table: { disable: true },
    },
    isDisabled: {
      description: 'Disable the input to prevent user interactions.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    label: {
      description: 'The text to display as the label for the input.',
    },
    maxLength: {
      description: 'Limit of characters to enter.',
    },
    placeholder: {
      description: 'The text to display as the placeholder for the input.',
    },
    description: {
      description: 'The text to display as the description for the input.',
    },
    tooltip: {
      description: 'The text to display within the tooltip.',
    },
    tooltipClassForLabel: {
      description: 'Tooltip class for label.',
      control: { type: 'text' },
    },
    prepend: {
      description: 'Option to add elements before the input field.',
    },
    append: {
      description: 'Option to add elements after the input field.',
    },
    appendType: {
      options: ['label', 'button'],
      control: {
        type: 'select',
      },
      description: 'Options to choose append wrapper type. The event `(appendClick)` available for the `appendType="button"`',
      table: {
        type: {
          summary: 'label | button',
        },
        defaultValue: {
          summary: 'label',
        },
      },
    },
    isAddonStart: {
      description: 'Include an addon element at the start of the input field.',
    },
    isAddonEnd: {
      description: 'Include an addon element at the end of the input field.',
    },
    rounded: {
      description: 'Option to apply rounded styling to the input field.',
    },
    isColored: {
      description: 'Option to apply colored styling to the input field.',
    },
    errorMessages: {
      description: 'Custom error messages for validation.',
    },
    addonEnd: {
      description: 'Object for configuring the end addon element.',
    },
    addonStart: {
      description: 'Object for configuring the start addon element.',
    },
    readOnly: {
      description: 'Option to make input readonly',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    blurEvent: {
      action: 'blurEvent',
      description: 'Trigger, when inner input loses focus (emit "blur" event).',
      table: {
        category: 'Outputs',
      },
    },
  },
};

export const Input: StoryObj<DsInputComponent & CustomArgs> = {
  args: {
    type: 'text',
    label: 'Label',
    placeholder: 'Placeholder',
    description: 'Description',
    tooltip: 'Tooltip',
    tooltipClassForLabel: 'ds-component',
    controlSize: 'md',
    maxLength: 20,
    precision: 3,
    isDisabled: false,
    isColored: false,
    prepend: true,
    append: true,
    appendType: 'label',
    isAddonStart: true,
    isAddonEnd: true,
    rounded: false,
    isSubmitStrategy: false,
    onlyInteger: false,
    isNegativeNumbersAcceptable: false,
    errorMessages: {
      [ValidatorsKeys.Required]: 'This field is required',
    },
    addonEnd: { icon: 'ds-icon-control-cross' },
    addonStart: { icon: 'ds-icon-control-cross' },
    formControl,
    inputId: v7(),
    readOnly: false,
    blurEvent: fn(),
  },
  render: (args) => {
    function emitClick(): void {
      args.formControl.patchValue('You clicked append button!');
    }

    if (args.isDisabled) {
      args.formControl.disable({ emitEvent: false });
    } else {
      args.formControl.enable({ emitEvent: false });
    }

    return {
      props: {
        ...args,
        emitClick,
      },
      template: `
        <ds-input
          #input
          [isNegativeNumbersAcceptable]="isNegativeNumbersAcceptable"
          [addonStart]="isAddonStart && addonStart"
          [isSubmitStrategy]="isSubmitStrategy"
          [addonEnd]="isAddonEnd && addonEnd"
          [errorMessages]="errorMessages"
          [controlSize]="controlSize"
          [placeholder]="placeholder"
          [description]="description"
          [formControl]="formControl"
          [isColored]="isColored"
          [precision]="precision"
          [prepend]="prepend"
          [label]="label"
          [maxLength]="maxLength"
          [tooltip]="tooltip"
          [tooltipClassForLabel]="tooltipClassForLabel"
          [rounded]="rounded"
          [append]="append"
          [appendType]="appendType"
          [onlyInteger]="onlyInteger"
          [type]="type"
          [readOnly]="readOnly"
          [inputId]="inputId"
          (appendClick)="emitClick()"
          (blurEvent)="blurEvent($event)"
          >
          <i class="ds-icon ds-icon-control-cross"
            prependContent></i>
          <i class="ds-icon ds-icon-control-cross"
            appendContent></i>
        </ds-input>

        <ds-button style="padding: 16px 0" variant="secondary" (click)="input.focus()">Manual focus</ds-button>
      `,
    };
  },
};

export default meta;
