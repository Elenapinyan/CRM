import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbDate, NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { format } from 'date-fns';
import { v7 } from 'uuid';
import { DropdownOption } from '../../../../shared';
import { DEFAULT_DROPDOWN_NOT_SELECTED_TEXT, DEFAULT_INPUT_NOT_SELECTED_PLAYSHOLDER } from '../../constants/period-selector.constant';
import { PeriodVariants } from '../../enums/period-selector-variants.enum';
import { DateRange, PeriodSelectorFooterSettings } from '../../interfaces/period-selector.interface';
import { SprPeriodSelectorComponent } from './spr-period-selector.component';
import { DefaultDateRangeService } from '../../services/date-range.service';
import { getDateRangeInModel } from '../../utils/get-date-range.util';
import { SprButtonComponent } from '../../../button';

function getDefaultMaxDate(): NgbDate {
  return new NgbDate(new Date().getUTCFullYear(), new Date().getMonth() + 1, new Date().getDate());
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

    return format(preFormattedDate, 'dd-LLL-yyyy');
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

const FooterSettings: PeriodSelectorFooterSettings = {
  showFooter: true,
  submitDateOnApply: true,
};

const meta: Meta<SprPeriodSelectorComponent> = {
  title: 'shared components/PeriodSelector',
  component: SprPeriodSelectorComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, SprButtonComponent],
      providers: [DefaultDateRangeService, { provide: NgbDateAdapter, useClass: DateAdapter }],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
The **PeriodSelector** component allows users to select a specific period or time frame. It supports various configurations to enhance its usability and appearance.

- **Control Size:** Adjust the size of the period selector control to fit different form layouts.
- **Tooltip:** Provide additional information through a tooltip.
- **Label and Description:** Display a label and description to guide users.
- **Disability:** Option to disable the component, preventing user interaction.

Configures the footer appearance and behavior for the **PeriodSelector** component.
This interface allows you to customize the footer's visibility, button texts, and positioning:

- **showFooter**: Controls whether the footer is displayed. If set to \`false\`, the footer is hidden.
- **submitDateOnApply**: Defines whether the date is automatically submitted when the "Apply" button is clicked. If \`true\`, the date is applied immediately.
- **position**: Specifies the position of the footer. Can be set to \`"left"\` or \`"right"\` to align the footer accordingly.
- **cancelButtonText**: Customizes the text of the "Cancel" button. If not provided, defaults to a standard text.
- **applyButtonText**: Customizes the text of the "Apply" button. If not provided, defaults to a standard text.
- **templateRef**: Allows you to pass a custom template for the footer, enabling advanced customization beyond the default layout.
- **isDeselectAllowed**: Allows the user to deselect the date by clicking on the X icon on the right side. When the deselect button is clicked, we can subscribe to the deselectDate event.
- **inputPlaceholder**: Only when we have **isDeselectAllowed**. Placeholder text to display in the date input field when no date is selected.
- **dropDownNotSelectedText**: Only when we have **isDeselectAllowed**. Text to display in the dropdown when no date is selected.
This component enhances user experience by providing a clear and intuitive interface for period selection.
- **markDisabledFn**: Allows to provide function to disable dates, works like filter(): if returned false - date stays selectable, if true - disabled. **Important!**: Please provide only arrow functions to preserve declaration context.

        `,
      },
    },
  },
  argTypes: {
    controlSize: {
      options: ['sm', 'md', 'lg'],
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
    inputId: {
      description: 'This is equivalent to the basic HTML id attribute.',
      control: {
        disable: true,
      },
    },
    isDisabled: {
      description: 'Disable the period selector to prevent user interactions.',
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
    maxRangeInDays: {
      description: 'Limits the selectable date range by setting the maximum number of days between dateFrom and dateTo.',
    },
    maxDate: {
      description:
        'This parameter specifies the latest allowable date that a user can select. You can pass values of the following types: `NgbDate`, `string`, `null` or `undefined`. If the input value is undefined, null, or an invalid date string, the current date is set as the value using the `NgbDate` type.',
      table: {
        type: {
          summary: 'NgbDate',
        },
        defaultValue: {
          summary: 'Current day: ' + JSON.stringify(getDefaultMaxDate(), null, 2),
        },
      },
      control: {
        type: 'date',
      },
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
    footerSettings: {
      description: 'Configures the footer appearance and behavior, including button texts, position, and visibility.',
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
    dropdownNotSelectedText: {
      description: 'Work only with isDeselectAllowed. Text to display in the dropdown when no date is selected.',
    },
    inputPlaceholder: {
      description: 'Work only with isDeselectAllowed. The placeholder text to display in the date input field when no date is selected',
    },
    markDisabledFn: {
      description:
        'Allows to provide function to disable dates, works like filter(): if returned false - date stays selectable, if true - disabled. **Important!**: Please provide only arrow functions to preserve declaration context. \n By default function is `() => false`, to not disable any date.',
    },
  },
};

export const PeriodSelector: StoryObj<SprPeriodSelectorComponent> = {
  args: {
    isDisabled: false,
    tooltip: 'Tooltip',
    tooltipClassForLabel: 'tooltip-container__body tooltip-white',
    label: 'Label text',
    description: 'Description',
    controlSize: 'md',
    maxRangeInDays: 30,
    maxDate: getDefaultMaxDate(),
    selectOptions: PeriodOptions,
    selectedRange: PeriodVariants.Today,
    footerSettings: FooterSettings,
    inputId: v7(),
    isDeselectAllowed: false,
    dropdownNotSelectedText: DEFAULT_DROPDOWN_NOT_SELECTED_TEXT,
    inputPlaceholder: DEFAULT_INPUT_NOT_SELECTED_PLAYSHOLDER,
    markDisabledFn: () => false,
  },
  render: (args) => {
    const form = new FormGroup({
      period: new FormControl<DateRange<string> | null>(getDateRangeInModel(PeriodVariants.Today)),
    });

    const componentState = {
      currentRange: args.selectedRange,
    };

    return {
      props: {
        ...args,
        form,
        componentState,
        onReset: (): void => {
          form.reset({
            period: getDateRangeInModel(PeriodVariants.Today),
          });
          componentState.currentRange = PeriodVariants.Today;
        },
        onRangeChange: (newValue: PeriodVariants): void => {
          componentState.currentRange = newValue;
        },
      },
      template: `
        <form [formGroup]="form">
          <spr-period-selector
            formControlName="period"
            [controlSize]="controlSize"
            [inputId]="inputId"
            [isDisabled]="isDisabled"
            [description]="description"
            [label]="label"
            [tooltip]="tooltip"
            [tooltipClassForLabel]="tooltipClassForLabel"
            [maxRangeInDays]="maxRangeInDays"
            [maxDate]="maxDate"
            [selectOptions]="selectOptions"
            [selectedRange]="componentState.currentRange"
            [footerSettings]="footerSettings"
            [isDeselectAllowed]="isDeselectAllowed"
            [dropdownNotSelectedText]="dropdownNotSelectedText"
            [inputPlaceholder]="inputPlaceholder"
            [markDisabledFn]="markDisabledFn"
            (selectedRangeChange)="onRangeChange($event)"
          ></spr-period-selector>
        </form>

        <div style="margin-top: 30px; padding: 15px; border-top: 1px solid #eee;">
          <spr-button
            type="button"
            (click)="onReset()">
            Reset Filters
          </spr-button>

          <div style="margin-top: 15px; font-size: 13px; color: #666; font-family: monospace;">
            <div><strong>Selected Range:</strong> {{ componentState.currentRange }}</div>
            <div><strong>Form Value:</strong> {{ form.value.period | json }}</div>
          </div>
        </div>
      `,
    };
  },
};

export default meta;
