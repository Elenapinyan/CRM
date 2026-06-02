import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SprMultiSwitcherComponent } from './spr-multi-switcher.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownOptionValue } from '../../shared/interfaces/dropdown-option.interface';

interface CustomArgs {
  formControl: FormControl;
}

const meta: Meta<SprMultiSwitcherComponent & CustomArgs> = {
  title: 'shared components/MultiSwitcher',
  component: SprMultiSwitcherComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **MultiSwitcher** is a versatile switcher component designed for toggling between multiple options. This component is highly customizable and can be configured with various options and states.

This story demonstrates the default usage of the **MultiSwitcher** with a predefined set of options.
        `,
      },
    },
  },
  argTypes: {
    options: {
      description:
        'This parameter accepts an array of objects of type `DropdownOption`, which is structured as follows: ' +
        '`[{ text: string, value: string | number | boolean | null }]`',
    },
    isDisabled: {
      description: 'Boolean flag indicating whether the switcher is disabled.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    switcherId: {
      description: 'This is equivalent to the basic HTML id attribute.',
    },
    formControl: {
      table: { disable: true },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
};

const formControl = new FormControl<DropdownOptionValue>(1, { nonNullable: true, validators: [Validators.required] });

export const MultiSwitcher: StoryObj<SprMultiSwitcherComponent & CustomArgs> = {
  args: {
    currentSelectedValue: 1,
    options: [
      { text: 'Spribe', value: 1 },
      { text: 'Aviator', value: 2 },
      { text: 'Georgian', value: 3 },
      { text: 'Ukraine', value: 4 },
    ],
    isDisabled: false,
    switcherId: '123',
    formControl,
  },
  render: (args) => {
    formControl.patchValue(args.currentSelectedValue, { emitEvent: false });

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
        <spr-multi-switcher [options]="options" [formControl]="formControl" [switcherId]="switcherId" />
      `,
    };
  },
};

export default meta;
