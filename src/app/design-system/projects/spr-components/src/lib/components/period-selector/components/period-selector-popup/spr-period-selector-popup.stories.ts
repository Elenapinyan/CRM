import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { SprButtonComponent } from '../../../button/spr-button.component';
import { SprToastsComponent, SprToastService } from '../../../toast';
import { DateRange } from '../../index';
import { PeriodSelectorFooterSettings } from '../../interfaces/period-selector.interface';
import { SprTogglePeriodSelectorDirective } from '../../directives/toggle-period-selector';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

function getDefaultMaxDate(): NgbDate {
  return new NgbDate(new Date().getUTCFullYear(), new Date().getMonth() + 1, new Date().getDate());
}

@Component({
  selector: 'spr-toast-button-wrapper',
  template: `
    <spr-button
      size="sm"
      style="display: inline-block"
      sprTogglePeriodSelector
      [maxRangeInDays]="maxRangeInDays"
      [footerSettings]="footerSettings"
      [isDisabled]="isDisabled"
      [maxDate]="maxDate"
      [inputId]="inputId"
      (rangeCanceled)="rangeCanceled()"
      (rangeConfirmed)="rangeConfirmed($event!)"
      >Open Period Selector</spr-button
    >

    <spr-toasts></spr-toasts>
  `,
  standalone: true,
  imports: [SprButtonComponent, SprToastsComponent, SprTogglePeriodSelectorDirective],
  providers: [SprToastService],
})
export class ToastButtonWrapperComponent {
  inputId!: string;
  isDisabled!: boolean;
  maxDate!: NgbDate;
  maxRangeInDays!: number;
  footerSettings!: PeriodSelectorFooterSettings;

  constructor(private readonly toastService: SprToastService) {}

  rangeConfirmed(range: DateRange): void {
    this.toastService.showSuccess(`Selected range: ${range.dateFrom} - ${range.dateTo}`);
  }

  rangeCanceled(): void {
    this.toastService.showError('Selection was canceled');
  }
}

const FooterSettings: PeriodSelectorFooterSettings = {
  showFooter: true,
  submitDateOnApply: true,
};

const meta: Meta<ToastButtonWrapperComponent> = {
  title: 'shared components/PeriodSelectorPopup',
  component: ToastButtonWrapperComponent,
  parameters: {
    docs: {
      description: {
        component: `
The \`sprTogglePeriodSelector\` directive is used to attach a period (date range) selector popup to any clickable element, such as a button. When the host element is clicked, the directive opens a popup component (\`SprPeriodSelectorComponent\`) allowing the user to select a date range.

### Key Features:
- **Modular and standalone**: Designed to work with Angular standalone components.
- **Customizable**: Accepts inputs such as \`maxRangeInDays\`, \`footerSettings\`, and \`isDisabled\` to control behavior and appearance.
- **Two-way interaction**: Emits \`rangeConfirmed\` and \`rangeCanceled\` events to allow the parent component to react to user actions.

### Inputs:
- \`inputId: string\` – Optional ID used for accessibility or testing purposes.
- \`isDisabled: boolean\` – Disables the trigger element, preventing user interaction.
- \`maxRangeInDays: number\` – Restricts the selectable date range span (e.g., 30 days max).
- \`footerSettings: PeriodSelectorFooterSettings\` – Configuration object for customizing the footer area of the popup.

### Events:
- \`(rangeConfirmed): DateRange\` – Emitted when the user confirms their selection.
- \`(rangeCanceled): void\` – Emitted when the user cancels the selection.

### Footer Configuration (via \`footerSettings\`):
- \`showFooter\`: Show/hide footer section.
- \`submitDateOnApply\`: Automatically apply date on confirmation.
- \`position\`: Align footer buttons (left or right).
- \`cancelButtonText\` / \`applyButtonText\`: Customize action button texts.
- \`templateRef\`: Optionally replace the footer with a custom template.

This directive improves UX by offering a seamless way to open a fully-featured period selector and handle the user’s choice in a clean, reactive manner.
  `,
      },
    },
  },
  argTypes: {
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
    maxRangeInDays: {
      description: 'Limits the selectable date range by setting the maximum number of days between dateFrom and dateTo.',
    },
    footerSettings: {
      description: 'Configures the footer appearance and behavior, including button texts, position, and visibility.',
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
  },
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
};

export const PeriodSelectorPopup: StoryObj<ToastButtonWrapperComponent> = {
  args: {
    isDisabled: false,
    maxRangeInDays: 30,
    footerSettings: FooterSettings,
    inputId: '123',
    maxDate: getDefaultMaxDate(),
  },
};

export default meta;
