import { Injectable } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDate, NgbDateAdapter, NgbDateStruct, NgbTimeAdapter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ActiveLanguageFactory, DATEPICKER_TRANSLATE_ACTIVE_LANGUAGE } from '../../shared';
import { SprControlSizeDirective } from '../../shared/directives/spr-control-size.directive';
import { SPR_DATE_TIMEPICKER_ADAPTER_TOKEN } from './constants/spr-date-timepicker.constant';
import { SprDefaultDateTimepickerAdapter } from './services/default-date-timepicker-adapter.service';
import { SprDateTimepickerComponent } from './spr-date-timepicker.component';

interface CustomArgs {
  label: string;
  formControl: FormControl;
}

function dateFormatZero(i: number): string {
  return i < 10 ? `0${i}` : `${i}`;
}

@Injectable()
class TimeAdapterService extends NgbTimeAdapter<string> {
  fromModel(value: string | null): NgbTimeStruct | null {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10),
    };
  }

  toModel(time: NgbTimeStruct | null): string | null {
    return time != null ? `${dateFormatZero(time.hour)}:${dateFormatZero(time.minute)}:${dateFormatZero(time.second)}` : null;
  }
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

const ACTIVE_LANGUAGE_FACTORY: ActiveLanguageFactory = {
  getActiveLanguage(): string {
    return 'pl';
  },
};

const meta: Meta<SprDateTimepickerComponent & CustomArgs> = {
  title: 'shared components/DateTimepicker',
  component: SprDateTimepickerComponent,
  parameters: {
    docs: {
      description: {
        component: `
The **DateTimepicker** component is a versatile element for selecting dates and times. It supports various configurations to ensure the selection process aligns with your application's requirements.

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
    isDeselectAllowed: {
      description:
        'Allows the user to deselect the date by clicking on the X icon on the right side. \t When the deselect button was clicked, we can subscribe to the deslectDate event.',
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
      providers: [
        { provide: NgbDateAdapter, useClass: DateAdapter },
        {
          provide: NgbTimeAdapter,
          useClass: TimeAdapterService,
        },
        {
          provide: SPR_DATE_TIMEPICKER_ADAPTER_TOKEN,
          useClass: SprDefaultDateTimepickerAdapter,
        },
        {
          provide: DATEPICKER_TRANSLATE_ACTIVE_LANGUAGE,
          useFactory: (): ActiveLanguageFactory => ACTIVE_LANGUAGE_FACTORY,
        },
      ],
    }),
  ],
};

const formControl = new FormControl(null, { nonNullable: true, validators: [Validators.required] });

export const DateTimepicker: StoryObj<SprDateTimepickerComponent & CustomArgs> = {
  args: {
    controlSize: 'md',
    label: 'Label',
    tooltipClassForLabel: 'tooltip-container__body tooltip-white',
    tooltip: 'Tooltip',
    isDisabled: false,
    description: 'Description',
    placeholder: 'Placeholder',
    isDeselectAllowed: false,
    minDate: new NgbDate(new Date().getUTCFullYear(), new Date().getMonth(), new Date().getDate()),
    maxDate: new NgbDate(new Date().getUTCFullYear(), new Date().getMonth() + 2, new Date().getDate()),
    inputId: '123',
    errorMessages: {
      required: 'This field is required',
    },
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
        <spr-date-timepicker
         [label]="label"
         [inputId]="inputId"
         [tooltip]="tooltip"
         [tooltipClassForLabel]="tooltipClassForLabel"
         [minDate]="minDate"
         [maxDate]="maxDate"
         [isDisabled]="isDisabled"
         [description]="description"
         [formControl]="formControl"
         [controlSize]="controlSize"
         [placeholder]="placeholder"
         [sprControlSize]="controlSize"
         [errorMessages]="errorMessages"
         [isDeselectAllowed]="isDeselectAllowed"
       />
      `,
    };
  },
};

export default meta;
