import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { AmountPicker } from './amount-picker';

interface CustomArgs {
  formControl: FormControl;
  isDisabledState: boolean;
}

const formControl = new FormControl([20, 80], { nonNullable: true });

const meta: Meta<AmountPicker & CustomArgs> = {
  title: 'Shared Components/AmountPicker',
  component: AmountPicker,
  parameters: {
    docs: {
      description: {
        component: `
The **Amount Picker** is a composite component that combines two **Currency Inputs** and a **Slider**.
It allows users to select a price range either by dragging the slider handles or by typing exact values into the input fields.

- **min**: Minimum value. By default is 0.
- **max**: Maximum value. By default is 100.
- **step**: Specifies the legal number intervals. By default is 1.
- **currencyPrefix**: String content to be displayed as a prefix inside the input field. Add nothing if you want to hide this block (default value).
- **currencySuffix**: String content to be displayed as a suffix inside the input field. Add nothing if you want to hide this block (default value).
- **precision**: Control the number of decimal places for numeric inputs. 0 - for integer number (default value)

### Usage Example:
\`\`\`html
<ds-amount-picker
  [formControl]="formControl"
  [min]="0"
  [max]="100"
  [step]="1"
  currencyPrefix="USD"
  currencySuffix="$"
  precision="0"
></ds-amount-picker>
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
  args: {
    formControl,
    min: 0,
    max: 100,
    step: 1,
    currencyPrefix: 'USD',
    currencySuffix: '$',
    precision: 0,
    isDisabledState: false,
  },
  argTypes: {
    formControl: {
      table: { disable: true },
    },
    min: {
      description: 'Minimum value',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    max: {
      description: 'Maximum value',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    step: {
      description: 'Specifies the legal number intervals',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
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
    isDisabledState: {
      description: 'Disable the input to prevent user interactions.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
  render: (args) => {
    if (args.isDisabledState) {
      args.formControl.disable();
    } else {
      args.formControl.enable();
    }

    return {
      props: {
        ...args,
      },
      template: `
          <ds-amount-picker
            [formControl]="formControl"
            [min]="min"
            [max]="max"
            [step]="step"
            [precision]="precision"
            [currencyPrefix]="currencyPrefix"
            [currencySuffix]="currencySuffix"
          ></ds-amount-picker>
      `,
    };
  },
};

export const Default: StoryObj<AmountPicker & CustomArgs> = {};

export default meta;
