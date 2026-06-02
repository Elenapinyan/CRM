import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SprControlSizeDirective } from '../../shared';
import { ValidatorsKeys } from '../../shared/enums/validators.enum';
import { SprMultiSelectDropdownComponent } from './spr-multi-select-dropdown.component';

interface CustomArgs {
  isAddonStart: boolean;
  isAddonEnd: boolean;
  formControl: FormControl;
}

const meta: Meta<SprMultiSelectDropdownComponent & CustomArgs> = {
  title: 'shared components/MultiSelectDropdown',
  component: SprMultiSelectDropdownComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **MultiSelectDropdown** component allows users to select multiple options from a list. It supports various configurations to enhance its usability and appearance.

- **Options:** Accepts an array of objects to define the list of options.
- **Loading State:** Indicates if the dropdown is loading its options.
- **Disability:** Option to disable the component, preventing user interaction.
- **Search:** Includes a search feature to filter the list of options.
- **Control Size:** Adjust the size of the dropdown control to fit different form layouts.

This component enhances user experience by providing a flexible and intuitive interface for multi-selection.
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
      table: {
        defaultValue: {
          summary: '4',
        },
      },
    },
    filterStrategy: {
      description: 'Filter strategy',
      options: ['local', 'api'],
      type: 'string',
      control: {
        type: 'select',
      },
      table: {
        defaultValue: {
          summary: 'local',
        },
      },
      addonEnd: {
        description: 'Object for configuring the end addon element.',
      },
      addonStart: {
        description: 'Object for configuring the start addon element.',
      },
    },
    isAddonStart: {
      description: 'Include an addon element at the start of the input field.',
    },
    isAddonEnd: {
      description: 'Include an addon element at the end of the input field.',
    },
    addonStart: {
      description: 'Object for configuring the start addon element.',
    },
    addonEnd: {
      description: 'Object for configuring the end addon element.',
    },
    errorMessages: {
      description: 'Custom error messages for validation.',
    },
    formControl: {
      table: { disable: true },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, SprControlSizeDirective],
    }),
  ],
};

const formControl = new FormControl('', { nonNullable: true, validators: [Validators.required] });

export const MultiSelectDropdown: StoryObj<SprMultiSelectDropdownComponent & CustomArgs> = {
  args: {
    label: 'Label',
    tooltip: 'Tooltip',
    tooltipClassForLabel: 'tooltip-container__body tooltip-white',
    controlSize: 'md',
    maxDisplayedItems: 4,
    inputPlaceholder: '',
    description: 'Description',
    isLoading: false,
    isDisabled: false,
    withSearch: true,
    isAddonStart: true,
    isAddonEnd: false,
    filterStrategy: 'local',
    options: [
      { text: 'Spribe', value: 1, isDisabled: true, icon: 'bo-icon-general-diamond' },
      { text: 'Aviator', value: 2, isDisabled: false, icon: 'bo-icon-general-trophy' },
      { text: 'Georgian', value: 3, isDisabled: false, icon: '' },
      { text: 'Ukraine', value: 4, isDisabled: false, icon: '' },
    ],
    addonStart: { icon: 'bo-icon-general-placeholder' },
    addonEnd: { icon: 'bo-icon-general-placeholder' },
    errorMessages: {
      [ValidatorsKeys.Required]: 'This field is required',
    },
    inputId: '123',
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
        <spr-multi-select-dropdown
         [label]="label"
         [inputId]="inputId"
         [options]="options"
         [tooltip]="tooltip"
         [tooltipClassForLabel]="tooltipClassForLabel"
         [inputPlaceholder]="inputPlaceholder"
         [isLoading]="isLoading"
         [isDisabled]="isDisabled"
         [withSearch]="withSearch"
         [description]="description"
         [formControl]="formControl"
         [controlSize]="controlSize"
         [errorMessages]="errorMessages"
         [filterStrategy]="filterStrategy"
         [addonEnd]="isAddonEnd && addonEnd"
         [maxDisplayedItems]="maxDisplayedItems"
         [addonStart]="isAddonStart && addonStart"
       />
      `,
    };
  },
};

export default meta;
