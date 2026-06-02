import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SprControlSizeDirective } from '../../shared/directives/spr-control-size.directive';
import { ValidatorsKeys } from '../../shared/enums/validators.enum';
import { SprDropdownComponent } from './spr-dropdown.component';

interface CustomArgs {
  label: string;
  isAddonStart: boolean;
  isAddonEnd: boolean;
  formControl: FormControl;
}

const meta: Meta<SprDropdownComponent & CustomArgs> = {
  title: 'shared components/Dropdown',
  component: SprDropdownComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Dropdown** component is a versatile element that allows users to select from a list of options. It supports various configurations to enhance its usability and appearance.

- **Options:** Accepts an array of objects to define the list of options.
- **Loading State:** Indicates if the dropdown is loading its options.
- **Disability:** Option to disable the component, preventing user interaction.
- **Search:** Includes a search feature to filter the list of options.
- **Control Size:** Adjust the size of the dropdown control to fit different form layouts.

This component enhances user experience by providing a flexible and intuitive interface for selection.
        `,
      },
    },
  },
  argTypes: {
    options: {
      description:
        'This parameter accepts an array of objects of type `DropdownOption`, which is structured as follows: ' +
        '`{ text: string, value: string | number | boolean | null, isDisabled?: boolean, icon?: string, class?: string }[]`',
    },
    isLoading: {
      description: 'Indicates if the dropdown is loading its options.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    isDisabled: {
      description: 'Disable the dropdown to prevent user interactions.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    description: {
      description: 'The text to display as the description for the period selector.',
    },
    withSearch: {
      description: 'Include a search feature to filter the list of options.',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    controlSize: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
      description: 'Adjust the size of the dropdown control.',
      table: {
        defaultValue: {
          summary: 'md',
        },
      },
    },
    isAddonStart: {
      description: 'Include an addon element at the start of the input field.',
    },
    isAddonEnd: {
      description: 'Include an addon element at the end of the input field.',
    },
    inputId: {
      description: 'This is equivalent to the basic HTML id attribute.',
      control: {
        disable: true,
      },
    },
    label: {
      description: 'The text to display within the label.',
    },
    inputPlaceholder: {
      description: 'The text to display within the input placeholder.',
    },
    placeholder: {
      description: 'The text to display within the search input placeholder.',
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
    maxDisplayedItems: {
      description: 'Limit the number of items displayed in the dropdown list.',
    },
    errorMessages: {
      description: 'Custom error messages for validation.',
    },
    addonStart: {
      description: 'Object for configuring the start addon element.',
    },
    addonEnd: {
      description: 'Object for configuring the end addon element.',
    },
    formControl: {
      table: { disable: true },
    },
    inputDebounceTime: {
      description: 'Specifies the delay (in milliseconds) before triggering a search event after the user stops typing.',
      table: {
        defaultValue: {
          summary: '200',
        },
      },
      control: {
        type: 'number',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, SprControlSizeDirective],
    }),
  ],
};

const formControl = new FormControl('', { nonNullable: true, validators: [Validators.required] });

export const Dropdown: StoryObj<SprDropdownComponent & CustomArgs> = {
  args: {
    options: [
      { text: 'Spribe', value: 1, isDisabled: true },
      { text: 'Aviator', value: 2, icon: 'bo-icon-general-trophy' },
      { text: 'Georgian', value: 3 },
      { text: 'Ukraine', value: 4 },
    ],
    description: 'Description',
    label: 'Label',
    tooltip: 'Tooltip',
    tooltipClassForLabel: 'tooltip-container__body tooltip-white',
    inputPlaceholder: '',
    placeholder: 'Search',
    controlSize: 'md',
    maxDisplayedItems: 4,
    inputDebounceTime: 200,
    isLoading: false,
    isDisabled: false,
    withSearch: true,
    isAddonStart: true,
    isAddonEnd: false,
    inputId: '123',
    errorMessages: {
      [ValidatorsKeys.Required]: 'This field is required',
    },
    addonStart: { icon: 'bo-icon-general-placeholder' },
    addonEnd: { icon: 'bo-icon-general-placeholder' },
    formControl,
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
        <spr-dropdown
         [label]="label"
         [inputId]="inputId"
         [options]="options"
         [tooltip]="tooltip"
         [tooltipClassForLabel]="tooltipClassForLabel"
         [inputPlaceholder]="inputPlaceholder"
         [placeholder]="placeholder"
         [isLoading]="isLoading"
         [isDisabled]="isDisabled"
         [withSearch]="withSearch"
         [formControl]="formControl"
         [controlSize]="controlSize"
         [description]="description"
         [errorMessages]="errorMessages"
         [addonEnd]="isAddonEnd && addonEnd"
         [maxDisplayedItems]="maxDisplayedItems"
         [addonStart]="isAddonStart && addonStart"
         [inputDebounceTime]="inputDebounceTime"
       />
      `,
    };
  },
};

export default meta;
