import { Injectable } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDate, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Meta, StoryObj } from '@storybook/angular';
import { ActiveLanguageFactory, DATEPICKER_TRANSLATE_ACTIVE_LANGUAGE, DsControlSizeDirective } from '../../../shared';
import { DsDatepicker } from './datepicker';
import { SprDatetimeAdapter } from '../date-adapter';
import { DateTime, ngbDateToDate } from '../datepicker.util';
import { SprDynamicFormatterDirective } from '../date-formatter';

interface CustomArgs {
  formControl: FormControl;
  isDisabled: boolean;
}

@Injectable()
class SprCustomDatetimeAdapter extends SprDatetimeAdapter<string | null> {
  override fromModel(value: string | null): DateTime<NgbDateStruct | null, NgbTimeStruct | null> {
    const date = value ? new Date(value) : null;

    return {
      date: date ? { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } : null,
      time: date ? { hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds() } : null,
    };
  }

  override toModel(dateTime: DateTime<NgbDateStruct | null, NgbTimeStruct | null>): string | null {
    return ngbDateToDate(dateTime.date, dateTime.time)?.toISOString() ?? null;
  }
}

const ACTIVE_LANGUAGE_FACTORY: ActiveLanguageFactory = {
  getActiveLanguage(): string {
    return 'pl';
  },
};

const meta: Meta<DsDatepicker<Date> & CustomArgs> = {
  title: 'shared components/Datepicker/Datepicker Single',
  component: DsDatepicker,
  parameters: {
    docs: {
      description: {
        component: `
The **Datepicker** component is a versatile element for selecting dates and times. It supports various configurations to ensure the selection process aligns with your application's requirements.

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
    tooltipClassForLabel: {
      description: 'Tooltip class for label.',
      control: { type: 'text' },
      table: {
        defaultValue: { summary: 'tooltip-container__body tooltip-white' },
      },
    },
    controlSize: {
      options: ['sm', 'md'],
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
    inline: {
      description: 'This property enables inline mode. So calendar will be without input, title, description, just calendar.',
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
    isColored: {
      description: 'Option to apply colored styling to the input field.',
    },
    isDisabled: {
      description: 'Disable the input to prevent user interactions.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    timepicker: {
      description: 'You can enable/disable timepickers. If enabled, then you will get time object in your adapter',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    inputReadonly: {
      description:
        'You can enable/disable typing data in input. If true - mask from dateParserFormatter will be used and default placeholder will be ignored.',
      table: {
        defaultValue: {
          summary: 'true',
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
    formControl: {
      table: { disable: true },
    },
  },
  decorators: [],
};

const formControl = new FormControl(null, { nonNullable: true, validators: [Validators.required] });

export const Examples: StoryObj<DsDatepicker<Date> & CustomArgs> = {
  args: {
    label: 'Label',
    tooltip: 'Tooltip',
    description: 'Description',
    inputId: 'some-id',
    isColored: false,
    isDisabled: false,
    controlSize: 'md',
    timepicker: false,
    inputReadonly: true,
    placeholder: 'Placeholder',
    isDeselectAllowed: false,
    inline: false,
    tooltipClassForLabel: 'ds-component',
    minDate: new NgbDate(new Date().getUTCFullYear(), new Date().getMonth() + 1, new Date().getDate()),
    maxDate: new NgbDate(new Date().getUTCFullYear(), new Date().getMonth() + 3, new Date().getDate()),
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
      moduleMetadata: {
        providers: [
          {
            provide: SprDatetimeAdapter,
            useClass: SprCustomDatetimeAdapter,
          },
          {
            provide: DATEPICKER_TRANSLATE_ACTIVE_LANGUAGE,
            useFactory: (): ActiveLanguageFactory => ACTIVE_LANGUAGE_FACTORY,
          },
        ],
        imports: [SprDynamicFormatterDirective, ReactiveFormsModule, DsControlSizeDirective],
      },
      props: {
        ...args,
      },
      template: `
        <h3 class="storybook-title">Provided parser</h3>
        <ds-datepicker
          [timepicker]="timepicker"
          [inputReadonly]="inputReadonly"
          [tooltip]="tooltip"
          [isColored]="isColored"
          [label]="label"
          [tooltipClassForLabel]="tooltipClassForLabel"
          [errorMessages]="errorMessages"
          [description]="description"
          [inline]="inline"
          [inputId]="inputId"
          [minDate]="minDate"
          [maxDate]="maxDate"
          [formControl]="formControl"
          [controlSize]="controlSize"
          [placeholder]="placeholder"
          [isDeselectAllowed]="isDeselectAllowed"
        />

        <br/>
        <br/>
        <br/>
        <h3 class="storybook-title">Dynamic formatter</h3>
        <p class="storybook-title">You can use special directive to force datepicker independently work with another format</p>
        <ds-datepicker
          sprDynamicDateFormatter
          dateMask="YMD"
          timeMask="HMS"
          dateSeparator="/"
          [timepicker]="timepicker"
          [inputReadonly]="inputReadonly"
          [tooltip]="tooltip"
          [label]="label"
          [tooltipClassForLabel]="tooltipClassForLabel"
          [errorMessages]="errorMessages"
          [description]="description"
          [inline]="inline"
          [inputId]="inputId"
          [minDate]="minDate"
          [maxDate]="maxDate"
          [formControl]="formControl"
          [controlSize]="controlSize"
          [placeholder]="placeholder"
          [isDeselectAllowed]="isDeselectAllowed"
        />
      `,
    };
  },
};

export default meta;

export const Adapters: StoryObj = {
  parameters: {
    docs: {
      canvas: { sourceState: 'shown' },
      source: {
        type: 'code',
        language: 'ts',
        format: true,
        code: String.raw`
// To provide your custom date adapter use SprDatetimeAdapter as a key
// providers: [{ provide: SprDatetimeAdapter, useClass: SprCustomDatetimeAdapter }],

@Injectable()
class SprCustomDatetimeAdapter extends SprDatetimeAdapter<string | null> {
  override fromModel(value: string | null): DateTime<NgbDateStruct | null, NgbTimeStruct | null> {
    const date = value ? new Date(value) : null;

    return { // if timepicker disabled you can ignore time property, it's optional
      date: date ? { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } : null,
      time: date ? { hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds() } : null,
    };
  }

  override toModel(dateTime: DateTime<NgbDateStruct | null, NgbTimeStruct | null>): string | null {
    return ngbDateToDate(dateTime.date, dateTime.time)?.toISOString() ?? null;
  }
}
`,
      },
    },
  },
  render: () => ({
    template: `
      <span>Here is an example of custom datetime adapter</span>
    `,
  }),
};

export const Formatters: StoryObj = {
  parameters: {
    docs: {
      canvas: { sourceState: 'shown' },
      source: {
        type: 'code',
        language: 'ts',
        format: true,
        code: String.raw`
// to provide your custom formatter use SprDateParserFormatter as a key
// providers: [{ provide: SprDateParserFormatter, useClass: CustomDateFormatter }],

@Injectable()
class CustomDateFormatter extends SprDateParserFormatter {
  override parse(value: string): { date: NgbDateStruct | null; time: NgbTimeStruct | null } | null {
    const dateObj = new Date(value);

    return date2NgbDate(dateObj);
  }

  override format(date: NgbDateStruct | null, time?: NgbTimeStruct | null): string {
    return ngbDateToDate(date, time)?.toISOString() ?? '';
  }
}

// You can create your own dynamic formatter directive this way
@Directive({
  selector: 'ds-datepicker,ds-datepicker-range[dynamicFormatter]',
  providers: [ // this provider is important here to make directive visible for date pickers
    {
      provide: SprDateParserFormatter,
      useExisting: CustomDynamicFormatterDirective,
    },
  ],
})
export class CustomDynamicFormatterDirective extends SprDateParserFormatter<string, string> {
  dateMask = input<string>(DateTypes.ISO);
  timeMask = input<string>(TimeMasks.HMS);

  override dateSeparator = input<string>('-');

  override readonly inputMaskConfig = computed(() => {
    const dateType = this.dateMask();
    const timeMask = this.timeMask();

    return this.getInputMaskConfig(dateType, timeMask);
  });

  override parse(value: string): { date: NgbDateStruct | null; time: NgbTimeStruct | null } | null {
    switch (this.dateMask()) {
      case DateTypes.YMD:
        return stringYMD2datetime(value, this.dateSeparator());
      case DateTypes.DMY:
        return stringDMY2datetime(value, this.dateSeparator());
      default: {
        const dateObj = new Date(value);

        return date2NgbDate(dateObj);
      }
    }
  }

  override format(date: NgbDateStruct | null, time?: NgbTimeStruct | null): string {
    switch (this.dateMask()) {
      case DateTypes.YMD:
        return datetime2YMDString(date, time, this.dateSeparator());
      case DateTypes.DMY:
        return datetime2DMYString(date, time, this.dateSeparator());
      default:
        return ngbDateToDate(date, time)?.toISOString() ?? '';
    }
  }

  getInputMaskConfig(date: string, time: string | undefined): DateMaskConfig {
    return {
      dateMask: '',
      datePlaceholder: '',
      timeMask: '',
      timePlaceholder: '',
      mask: 'date + time masks',
      placeholder: 'date + time placeholders',
      fixPadsFn: (v: string) => '', // fix pads if you need
    };
  }
}
`,
      },
    },
  },
  render: () => ({
    template: `
      <span>Here is an example of custom date formatter</span>
    `,
  }),
};
