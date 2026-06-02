import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DropdownOptionValue } from '../../shared/interfaces/dropdown-option.interface';
import { DsMultiSwitcherComponent } from './multi-switcher';

interface CustomArgs {
  formControl: FormControl;
  selectedValue: number;
  switcherType: 'text' | 'icon';
  disabled: boolean;
}

const textOptions = [
  { text: 'Spribe', value: 1 },
  { text: 'Aviator', value: 2 },
  { text: 'Georgian', value: 3 },
  { value: 4, text: 'Ukraine' },
  { value: 5, text: 'One more' },
];

const iconOptions = [
  { value: 1, icon: 'ds-icon ds-icon-control-cross' },
  { value: 2, icon: 'ds-icon ds-icon-control-cross' },
  { value: 3, icon: 'ds-icon ds-icon-control-cross' },
  { value: 4, icon: 'ds-icon ds-icon-control-cross' },
  { value: 5, icon: 'ds-icon ds-icon-control-cross' },
];

const meta: Meta<DsMultiSwitcherComponent & CustomArgs> = {
  title: 'shared components/MultiSwitcher',
  component: DsMultiSwitcherComponent,
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
    switcherType: {
      description: 'Only for stories preview. Show text or icon switcher',
      options: ['text', 'icon'],
      control: {
        type: 'select',
      },
      table: {
        defaultValue: {
          summary: 'text',
        },
        type: { summary: `text | icon` },
      },
    },
    options: {
      description:
        'This parameter accepts an array of objects of type `MultiSwitcherOption<T>`, which is structured as follows: ' +
        '`[{ text?: string, value: T, icon?: string }]`',
      table: {
        type: { summary: `MultiSwitcherOption` },
      },
    },
    disabled: {
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
    size: {
      options: ['sm', 'md'],
      control: {
        type: 'select',
      },
      description: 'Adjust the size of the switcher',
      table: {
        defaultValue: {
          summary: 'md',
        },
        type: { summary: `MultiSwitcherSize` },
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
};

const formControl = new FormControl<DropdownOptionValue>(1, { nonNullable: true, validators: [Validators.required] });

export const MultiSwitcher: StoryObj<DsMultiSwitcherComponent & CustomArgs> = {
  args: {
    selectedValue: 1,
    size: 'md',
    switcherType: 'text',
    switcherId: '123',
    disabled: false,
    formControl,
  },
  render: (args) => {
    formControl.patchValue(args.selectedValue, { emitEvent: false });

    if (args.disabled) {
      args.formControl.disable({ emitEvent: false });
    } else {
      args.formControl.enable({ emitEvent: false });
    }

    return {
      props: {
        ...args,
        textOptions,
        iconOptions,
      },
      template: `
        <ds-multi-switcher [options]="switcherType === 'text' ? textOptions : iconOptions" [size]="size"  [formControl]="formControl" [switcherId]="switcherId" />
      `,
    };
  },
};

export default meta;
