import { Component, Input, ViewChild } from '@angular/core';
import { SprTogglePeriodSelectorDirective } from '../spr-toggle-period-selector.directive';
import { DateRange, PeriodSelectorFooterSettings } from '../../../interfaces/period-selector.interface';

@Component({
  selector: 'spr-toggle-period-selector-test-component',
  standalone: true,
  imports: [SprTogglePeriodSelectorDirective],
  template: `
    <button
      sprTogglePeriodSelector
      [footerSettings]="footerSettings"
      [maxRangeInDays]="maxRangeInDays"
      [isDisabled]="isDisabled"
      [inputId]="inputId"
      (rangeConfirmed)="onConfirmed($event!)"
      (rangeCanceled)="onCanceled()"
    >
      Open Calendar
    </button>
  `,
})
export class SprTogglePeriodSelectorTestComponent {
  @Input() footerSettings: PeriodSelectorFooterSettings = {
    cancelButtonText: 'Cancel',
    applyButtonText: 'Apply',
    submitDateOnApply: true,
  };

  @Input() confirmedRange: DateRange | null = null;
  @Input() maxRangeInDays = 30;
  @Input() isDisabled = false;
  @Input() inputId = 'test-id';

  @ViewChild(SprTogglePeriodSelectorDirective, { static: true }) togglePeriodSelectorDirective!: SprTogglePeriodSelectorDirective;

  canceled = false;

  onConfirmed(range: DateRange): void {
    this.confirmedRange = range;
  }

  onCanceled(): void {
    this.canceled = true;
  }
}
