import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ValidatorsKeys } from '../../shared/enums/validators.enum';
import { DsCurrencyInputComponent } from './currency-input';

const formControl = new FormControl('', { nonNullable: true, validators: [Validators.required] });

interface CustomArgs {
  formControl: FormControl;
}

const meta: Meta<DsCurrencyInputComponent & CustomArgs> = {
  title: 'shared components/Currency Input',
  component: DsCurrencyInputComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Input** component allows users to enter and edit text. It supports various configurations to enhance its usability and appearance.

- **currencyPrefix**: String content to be displayed as a prefix inside the input field. Add nothing if want to hide this block (default value).
- **currencySuffix**: String content to be displayed as a suffix inside the input field. Add nothing if want to hide this block (default value).
- **precision**: Control the number of decimal places for numeric inputs. 0 - for integer number (default value)
- **isNegativeNumbersAcceptable**: Determine whether negative numbers are allowed as valid numeric input (default false).
- **controlSize**: Adjust the size of the input control to fit different form layouts.
- **placeholder**: The text to display as the placeholder for the input.
- **label** and **description**: Display a label and description to guide users.
- **tooltip**: Provide additional information through a tooltip.
- **isDisabled**: Option to disable the component, preventing user interaction.
- **readOnly**: Option to make input readonly.
- **maxLength**: Limit of characters to enter.
- **errorMessages**: Custom error messages for validation.

### Usage Example:
\`\`\`html
<ds-currency-input
  currencyPrefix="USD"
  currencySuffix="$"
  [isNegativeNumbersAcceptable]="false"
  placeholder="0.00"
  [formControl]="formControl"
  >
</ds-currency-input>
\`\`\`
#### For advanced options check example below

### Default options.
####You can change default option by provide custom value for **CURRENCY_INPUT_DEFAULT_OPTIONS** token:

\`\`\`typescript
providers: [
  {
    provide: CURRENCY_INPUT_DEFAULT_OPTIONS,
    useValue: {
      currencyPrefix: '',
      currencySuffix: '',
      placeholder: '',
      isNegativeNumbersAcceptable: false,
      maxLength: null,
      readOnly: false,
      precision: 0,
    }
  }
]
\`\`\`
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [FormsModule, ReactiveFormsModule],
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
    isNegativeNumbersAcceptable: {
      description: 'Parameter determines whether negative numbers are allowed as valid numeric input',
    },
    inputId: {
      description: 'This is equivalent to the basic HTML id attribute.',
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
    maxLength: {
      description: 'Limit of characters to enter.',
    },
    placeholder: {
      description: 'The text to display as the placeholder for the input.',
    },
    formControl: {
      table: { disable: true },
    },
    isColored: {
      description: 'Option to apply colored styling to the input field.',
    },
    precision: {
      description:
        'The precision parameter controls the number of decimal places for numeric (floating-point number) inputs. "0" by default (integer number)',
      table: {
        defaultValue: {
          summary: '0',
        },
      },
    },
    currencyPrefix: {
      description: 'String content to be displayed as a prefix inside the input field.',
    },
    currencySuffix: {
      description: 'String content to be displayed as a suffix inside the input field.',
    },
    errorMessages: {
      description: 'Custom error messages for validation.',
    },
    readOnly: {
      description: 'Option to make input readonly',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
};

export const Input: StoryObj<DsCurrencyInputComponent & CustomArgs> = {
  args: {
    label: 'Label',
    placeholder: '0.00',
    description: 'Description',
    tooltip: 'Tooltip',
    tooltipClassForLabel: 'ds-component',
    controlSize: 'md',
    maxLength: 20,
    formControl,
    isDisabled: false,
    isColored: false,
    precision: 2,
    currencyPrefix: 'USD',
    currencySuffix: '$',
    isNegativeNumbersAcceptable: false,
    errorMessages: {
      [ValidatorsKeys.Required]: 'This field is required',
    },
    inputId: '999',
    readOnly: false,
  },
  render: (args) => {
    if (args.isDisabled) {
      args.formControl.disable({ emitEvent: false });
    } else {
      args.formControl.enable({ emitEvent: false });
    }

    return {
      props: {
        ...args,
      },
      template: `
        <ds-currency-input
          [isNegativeNumbersAcceptable]="isNegativeNumbersAcceptable"
          [currencyPrefix]="currencyPrefix"
          [currencySuffix]="currencySuffix"
          [errorMessages]="errorMessages"
          [placeholder]="placeholder"
          [description]="description"
          [formControl]="formControl"
          [isColored]="isColored"
          [controlSize]="controlSize"
          [label]="label"
          [maxLength]="maxLength"
          [tooltip]="tooltip"
          [tooltipClassForLabel]="tooltipClassForLabel"
          [readOnly]="readOnly"
          [precision]="precision"
          [inputId]="inputId"
          >
        </ds-currency-input>
      `,
    };
  },
};

export default meta;
