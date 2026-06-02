import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DropdownOption } from '../../../shared';
import { DsButton } from '../../button';
import { DsDatepickerRange } from './datepicker-range';
import {
  date2NgbDate,
  DateRange,
  DatetimeRange,
  DEFAULT_INPUT_NOT_SELECTED_PLACEHOLDER,
  ngbDateToDate,
  PeriodVariants,
} from '../datepicker.util';
import { SprDateRangeAdapter } from '../date-adapter';
import { DatepickerToggleDirective } from '../datepicker-toggle.directive';
import { SprDynamicFormatterDirective } from '../date-formatter';

interface CustomArgs {
  formControl: FormControl;
  isDisabled: boolean;
}

@Injectable()
class CustomDateRangeAdapter extends SprDateRangeAdapter<DateRange<Date>> {
  override fromModel(range: DateRange<Date>): DatetimeRange<NgbDateStruct> {
    const parsedDateFrom = date2NgbDate(range.dateFrom);
    const parsedDateTo = date2NgbDate(range.dateTo);

    return {
      date: {
        dateFrom: parsedDateFrom?.date ?? null,
        dateTo: parsedDateTo?.date ?? null,
      },
      time: {
        timeFrom: parsedDateFrom?.time ?? null,
        timeTo: parsedDateTo?.time ?? null,
      },
    };
  }

  override toModel(range: DatetimeRange<NgbDateStruct>): DateRange<Date> {
    return {
      dateFrom: ngbDateToDate(range.date?.dateFrom, range.time?.timeFrom),
      dateTo: ngbDateToDate(range.date?.dateTo, range.time?.timeTo),
    };
  }
}

const PeriodOptions: DropdownOption[] = [
  {
    text: 'Today',
    value: PeriodVariants.Today,
  },
  {
    text: 'Yesterday',
    value: PeriodVariants.Yesterday,
  },
  {
    text: 'Last 7 days',
    value: PeriodVariants.LastSevenDays,
  },
  {
    text: 'This month',
    value: PeriodVariants.ThisMonth,
  },
  {
    text: 'Last Month',
    value: PeriodVariants.LastMonth,
  },
  {
    text: 'Last Year',
    value: PeriodVariants.LastYear,
  },
  {
    text: 'Lifetime',
    value: PeriodVariants.Lifetime,
  },
];

type Story = StoryObj<typeof meta>;

const meta: Meta<DsDatepickerRange & CustomArgs> = {
  title: 'shared components/Datepicker/Datepicker Range',
  component: DsDatepickerRange,
  parameters: {
    docs: {
      description: {
        component: `
The **Datepicker Range** component allows users to select a range of dates. It supports various configurations to enhance its usability and appearance.

This component enhances user experience by providing a clear and intuitive interface for period selection.
- **markDisabledFn**: Allows to provide function to disable dates, works like filter(): if returned false - date stays selectable, if true - disabled. **Important!**: Please provide only arrow functions to preserve declaration context.

##Adapters
- **\`SprBaseDateRangeAdapter\`**: Default adapter, if custom not provided. Handles \`NgbDateStruct\` type for the input/output dates.
- **\`SprDateRangeAdapter<Type>\`**: Extend this abstract class if you want to override **default adapter**, scroll down to see example.

##Formatters
- **\`SprISOFormatter\`**: Default formatter if custom not provided. Parse ISO string to NgbDateStruct + NgbTimeStruct and format in reverse.
- **\`SprDateParserFormatter\`**: Extend this abstract class if you want to override basic date format displayed in input.
- **\`SprDynamicFormatterDirective\`**: Dynamic formatter directive. Overrides provided formatters for specific component.
        `,
      },
    },
  },
  argTypes: {
    controlSize: {
      options: ['sm', 'md'],
      control: {
        type: 'select',
      },
      description: 'Adjust the size of the period selector control.',
      table: {
        defaultValue: {
          summary: 'm',
        },
      },
    },
    tooltipClassForLabel: {
      description: 'Tooltip class for label.',
      control: { type: 'text' },
      table: {
        defaultValue: { summary: 'tooltip-container__body tooltip-white' },
      },
    },
    inputId: {
      description: 'This is equivalent to the basic HTML id attribute.',
      control: {
        disable: true,
      },
    },
    description: {
      description: 'The text to display as the description for the period selector.',
    },
    inline: {
      description: 'This property enables inline mode. So calendar will be without input, title, description, just calendar.',
    },
    label: {
      description: 'The text to display as the label for the period selector.',
    },
    tooltip: {
      description: 'The text to display within the tooltip.',
    },
    maxRangeInDays: {
      description: 'Limits the selectable date range by setting the maximum number of days between dateFrom and dateTo.',
    },
    selectOptions: {
      description:
        'Preset periods used in date range filters (e.g. Today, Last 7 days). If not provided/empty array provided right part (days dropdown) will be hidden',
    },
    selectedRange: {
      description:
        'Represents the currently selected date range. Used for both initializing the component with preselected dates and tracking user input.',
      control: {
        disable: true,
      },
    },
    placeholder: {
      description: 'The placeholder text to display in the date input field when no date is selected',
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
    timepicker: {
      description: 'You can enable/disable timepickers. If enabled, then you will get time object in your adapter',
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
    inputReadonly: {
      description:
        'You can enable/disable typing data in input. If true - mask from dateParserFormatter will be used and default placeholder will be ignored.',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    showFooter: {
      description: 'Enables default footer with Cancel & Apply buttons. Optionally you can provide custom template.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    footerCustomTemplate: {
      description: 'If showFooter is true, you can provide custom template for the calendar footer.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    markDisabledFn: {
      description:
        'Allows to provide function to disable dates, works like filter(): if returned false - date stays selectable, if true - disabled. **Important!**: Please provide only arrow functions to preserve declaration context. \n By default function is `() => false`, to not disable any date.',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, DatepickerToggleDirective, DsButton, SprDynamicFormatterDirective],
      providers: [{ provide: SprDateRangeAdapter, useClass: CustomDateRangeAdapter }],
    }),
  ],
};

const formControl = new FormControl(null, { nonNullable: true, validators: [Validators.required] });

export const Examples: StoryObj<DsDatepickerRange & CustomArgs> = {
  args: {
    tooltip: 'Tooltip',
    label: 'Label text',
    description: 'Description',
    controlSize: 'md',
    inputId: 'some-range-picker-id',
    timepicker: false,
    isColored: false,
    isDisabled: false,
    inputReadonly: true,
    showFooter: true,
    maxRangeInDays: 30,
    inline: false,
    selectOptions: PeriodOptions,
    selectedRange: PeriodVariants.Lifetime,
    isDeselectAllowed: false,
    tooltipClassForLabel: 'tooltip--sm ds-component',
    placeholder: DEFAULT_INPUT_NOT_SELECTED_PLACEHOLDER,
    markDisabledFn: () => false,
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
        <ds-datepicker-range
          [timepicker]="timepicker"
          [showFooter]="showFooter"
          [inputReadonly]="inputReadonly"
          [tooltip]="tooltip"
          [label]="label"
          [inline]="inline"
          [isColored]="isColored"
          [controlSize]="controlSize"
          [errorMessages]="errorMessages"
          [description]="description"
          [tooltipClassForLabel]="tooltipClassForLabel"
          [inputId]="inputId"
          [formControl]="formControl"
          [maxRangeInDays]="maxRangeInDays"
          [selectOptions]="selectOptions"
          [selectedRange]="selectedRange"
          [isDeselectAllowed]="isDeselectAllowed"
          [placeholder]="placeholder" />

        <br/>
        <br/>
        <br/>
        <h3>Dynamic formatter</h3>
        <p>You can use special directive to force datepicker independently work with another format</p>
        <ds-datepicker-range
          sprDynamicDateFormatter
          dateMask="YMD"
          timeMask="HMS"
          dateSeparator="/"
          [timepicker]="timepicker"
          [showFooter]="showFooter"
          [inputReadonly]="inputReadonly"
          [tooltip]="tooltip"
          [label]="label"
          [inline]="inline"
          [isColored]="isColored"
          [controlSize]="controlSize"
          [errorMessages]="errorMessages"
          [tooltipClassForLabel]="tooltipClassForLabel"
          [description]="description"
          [inputId]="inputId"
          [formControl]="formControl"
          [maxRangeInDays]="maxRangeInDays"
          [selectOptions]="selectOptions"
          [selectedRange]="selectedRange"
          [isDeselectAllowed]="isDeselectAllowed"
          [placeholder]="placeholder" />

        <br/>
        <br/>
        <br/>
        <h3 class="storybook-title">Custom toggle button</h3>
        <div>
          <ds-datepicker-range hidden #dp />
          <ds-button variant="secondary" [sprDatepickerToggle]="dp">Open Calendar</ds-button>
        </div>
      `,
    };
  },
};

export const Adapters: Story = {
  parameters: {
    docs: {
      canvas: { sourceState: 'shown' },
      source: {
        type: 'code',
        language: 'ts',
        format: true,
        code: String.raw`
// To provide your custom range-adapter use SprDateRangeAdapter as a key
// providers: [{ provide: SprDateRangeAdapter, useClass: CustomDateRangeAdapter }],

@Injectable()
class CustomDateRangeAdapter extends SprDateRangeAdapter<DateRange<Date>> {
  override fromModel(range: DateRange<Date>): DatetimeRange<NgbDateStruct> {
    const parsedDateFrom = date2NgbDate(range.dateFrom);
    const parsedDateTo = date2NgbDate(range.dateTo);

    return {
      date: {
        dateFrom: parsedDateFrom?.date ?? null,
        dateTo: parsedDateTo?.date ?? null,
      },
      time: { // if timepicker disabled you can ignore time property, it's optional
        timeFrom: parsedDateFrom?.time ?? null,
        timeTo: parsedDateTo?.time ?? null,
      }
    };
  }

  override toModel(range: DatetimeRange<NgbDateStruct>): DateRange<Date> {
    return {
      dateFrom: ngbDateToDate(range.dateFrom, range.timeFrom),
      dateTo: ngbDateToDate(range.dateTo, range.timeTo),
    };
  }
}
`,
      },
    },
  },
  render: () => ({
    template: `
      <span>Here is an example of custom range adapter</span>
    `,
  }),
};

export const Formatters: Story = {
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

export const ExtraTranslation: Story = {
  parameters: {
    docs: {
      canvas: { sourceState: 'shown' },
      source: {
        type: 'code',
        language: 'ts',
        format: true,
        code: String.raw`
// to provide your custom translations for footer and time prefixes
// use DATEPICKER_RANGE_TRANSLATIONS injection token
// otherwise the default values will be used

// cancel: 'Cancel',
// apply: 'Apply',
// startTime: 'Starting',
// endTime: 'Ending',

providers: [{
  provide: DATEPICKER_RANGE_TRANSLATIONS,
  useFactory: (i18n: SomeTranslationService) => ({
    // ...translation
  }),
  deps: [SomeTranslationService]
}],
`,
      },
    },
  },
  render: () => ({
    template: `
      <span>Here is an example how to provide custom translations for footer and timepickers</span>
    `,
  }),
};

export default meta;
