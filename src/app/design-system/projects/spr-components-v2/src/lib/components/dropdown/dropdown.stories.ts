import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DsControlSizeDirective } from '../../shared';
import { ValidatorsKeys } from '../../shared/enums/validators.enum';
import { DsDropdownComponent } from './dropdown.component';
import { SelectionTemplateDirective } from '../selection';

interface CustomArgs {
  label: string;
  isAddonStart: boolean;
  isAddonEnd: boolean;
  formControl: FormControl;
}

const meta: Meta<DsDropdownComponent & CustomArgs> = {
  title: 'shared components/Dropdowns/Dropdown',
  component: DsDropdownComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Dropdown** component is a versatile element that allows users to select from a list of options. It supports various configurations to enhance its usability and appearance.

- **Options:** Accepts an array of objects to define the list of options.
- **Loading State:** Indicates if the dropdown is loading its options.
- **Append container:** Append dropdown to body or any other element.
- **Addons:** Optionally add elements before or after the element.
- **Controll meny max height:** accepts maximum number of displayed options in dropdown without scrolling.
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
      options: ['sm', 'md'],
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
    dropdownPlaceholder: {
      description: 'Main placeholder for dropdown.',
    },
    tooltip: {
      description: 'The text to display within the tooltip.',
    },
    tooltipClassForLabel: {
      description: 'Tooltip class for label.',
      control: { type: 'text' },
    },
    isColored: {
      description: 'Option to apply colored styling to the input field.',
    },
    widthByContent: {
      description:
        'Option to enable/disable dynamic dropdown width depending on content inside. But not more than window size. If window size is less than item, scroll will appear.',
    },
    maxDisplayedItems: {
      description: 'Limit the number of items displayed in the dropdown list.',
      table: {
        defaultValue: {
          summary: '10',
        },
      },
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
      imports: [ReactiveFormsModule, DsControlSizeDirective, SelectionTemplateDirective],
    }),
  ],
};

const formControl = new FormControl(2, { nonNullable: true, validators: [Validators.required] });

export const Dropdown: StoryObj<DsDropdownComponent & CustomArgs> = {
  args: {
    options: [
      { text: 'Spribe', value: 1, isDisabled: true },
      { text: 'Aviator', value: 2, icon: 'ds-icon-general-trophy' },
      { text: 'Georgia', value: 3 },
      { text: 'Ukraine', value: 4 },
      { text: 'Moldova', value: 5 },
      { text: 'Poland', value: 6 },
      { text: 'Austria', value: 7 },
      { text: 'Slovakia', value: 8 },
      { text: 'Switzerland', value: 9 },
      { text: 'Germany', value: 10 },
      { text: 'Czech Czech Czech Czech Czech Czech Czech Czech Czech Czech Czech Czech Czech Czech', value: 11 },
    ],
    description: 'Description',
    label: 'Label',
    tooltip: 'Tooltip',
    tooltipClassForLabel: 'ds-component',
    dropdownPlaceholder: 'Dropdown placeholder',
    inputPlaceholder: '',
    placeholder: 'Search',
    controlSize: 'md',
    maxDisplayedItems: 10,
    inputDebounceTime: 200,
    isLoading: false,
    isColored: false,
    isDisabled: false,
    withSearch: true,
    isAddonStart: false,
    isAddonEnd: false,
    widthByContent: false,
    inputId: '123',
    errorMessages: {
      [ValidatorsKeys.Required]: 'This field is required',
    },
    addonStart: { icon: 'ds-icon ds-icon-control-cross' },
    addonEnd: { icon: 'ds-icon ds-icon-control-cross' },
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
        <ds-dropdown
          style="width: 300px"
          [label]="label"
          [dropdownPlaceholder]="dropdownPlaceholder"
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
          [isColored]="isColored"
          [errorMessages]="errorMessages"
          [addonEnd]="isAddonEnd && addonEnd"
          [maxDisplayedItems]="maxDisplayedItems"
          [addonStart]="isAddonStart && addonStart"
          [inputDebounceTime]="inputDebounceTime"
          [widthByContent]="widthByContent"
        />

        <br>
        <br>

        <h4>With custom templates</h4>
        <ds-dropdown
          style="width: 300px"
          [label]="label"
          [dropdownPlaceholder]="dropdownPlaceholder"
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
          [isColored]="isColored"
          [errorMessages]="errorMessages"
          [addonEnd]="isAddonEnd && addonEnd"
          [maxDisplayedItems]="maxDisplayedItems"
          [addonStart]="isAddonStart && addonStart"
          [inputDebounceTime]="inputDebounceTime"
          [widthByContent]="widthByContent"
        >
          <ng-template sprSelectionTemplate="option" let-option let-selected="isSelected">
            @if (selected) {
              <i class="ds-icon-general-check-shield"></i>
            }
            <div [class.selected]="selected">{{ option.text }}</div>
          </ng-template>

          <ng-template sprSelectionTemplate="select-all" let-data let-selected="isSelected">
            @if (selected) {
              <i class="ds-icon-general-check-shield"></i>
            }
            <div [class.selected]="selected">{{ data.text }}</div>
          </ng-template>

          <ng-template sprSelectionTemplate="search-error" let-error>
            <div>{{ error.title }}</div>
            <div>{{ error.subtitle }}</div>
          </ng-template>
        </ds-dropdown>
      `,
    };
  },
};

export default meta;
