import { Injectable } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDate, NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SprControlSizeDirective } from '../../shared';
import { SprDatepickerComponent } from './spr-datepicker.component';

interface CustomArgs {
  formControl: FormControl;
}

@Injectable()
class DateAdapter extends NgbDateAdapter<string> {
  fromModel(value: string | null): NgbDateStruct | null {
    if (!value) {
      return null;
    }

    const date = new Date(value);

    return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
  }

  toModel(date: NgbDateStruct | null): string | null {
    if (!date) {
      return null;
    }
    const { day, month, year } = date;
    const preFormattedDate = new Date(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`);

    return preFormattedDate.toISOString().split('T')[0];
  }
}

const meta: Meta<SprDatepickerComponent & CustomArgs> = {
  title: 'shared components/Datepicker',
  component: SprDatepickerComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **Datepicker** component is a versatile element for selecting dates. It supports various configurations to ensure the selection process aligns with your application's requirements.

- **Date Range:** Define minimum and maximum selectable dates to restrict user input.
- **Control Size:** Adjust the size of the date picker control to fit different form layouts.
- **Disability:** Option to disable the component, preventing user interaction.

This component enhances user experience by providing an intuitive interface for date and time selection.
        `,
      },
    },
  },
  argTypes: {
    minDate: {
      description: 'This parameter specifies the earliest allowable date that a user can select.',
    },
    maxDate: {
      description: 'This parameter specifies the latest allowable date that a user can select.',
    },
    inputId: {
      description: 'This is equivalent to the basic HTML id attribute.',
      control: {
        disable: true,
      },
    },
    isDisabled: {
      description: 'Disable the date picker to prevent user interactions.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    controlSize: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
      description: 'Adjust the size of the date picker control.',
      table: {
        defaultValue: {
          summary: 'md',
        },
      },
    },
    placeholder: {
      description: 'The placeholder text to display in the date input field.',
    },
    deselect: {
      description: 'Allows the user to deselect the date by clicking on the X icon on the right side.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    description: {
      description: 'The text to display as the description for the period selector.',
    },
    label: {
      description: 'The text to display as the label for the period selector.',
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
    formControl: {
      table: { disable: true },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, SprControlSizeDirective],
      providers: [{ provide: NgbDateAdapter, useClass: DateAdapter }],
    }),
  ],
};

const formControl = new FormControl(null, { nonNullable: true, validators: [Validators.required] });

export const Datepicker: StoryObj<SprDatepickerComponent & CustomArgs> = {
  args: {
    label: 'Label',
    tooltip: 'Tooltip',
    tooltipClassForLabel: 'tooltip-container__body tooltip-white',
    controlSize: 'md',
    isDisabled: false,
    description: 'Description',
    minDate: new NgbDate(new Date().getUTCFullYear(), new Date().getMonth(), new Date().getDate()),
    maxDate: new NgbDate(new Date().getUTCFullYear(), new Date().getMonth() + 2, new Date().getDate()),
    inputId: '123',
    formControl,
    errorMessages: {
      required: 'This field is required',
    },
    placeholder: 'Placeholder',
    deselect: false,
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
        <spr-datepicker
         [inputId]="inputId"
         [label]="label"
         [tooltip]="tooltip"
         [tooltipClassForLabel]="tooltipClassForLabel"
         [minDate]="minDate"
         [maxDate]="maxDate"
         [isDisabled]="isDisabled"
         [description]="description"
         [formControl]="formControl"
         [controlSize]="controlSize"
         [sprControlSize]="controlSize"
         [errorMessages]="errorMessages"
         [deselect]="deselect"
         [placeholder]="placeholder"
       />
      `,
    };
  },
};

export default meta;
