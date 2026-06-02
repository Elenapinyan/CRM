import { computed, Directive, inject, input, InputSignal, signal, Signal, untracked, viewChild } from '@angular/core';
import { FormBuilder, FormControl, ValidationErrors } from '@angular/forms';
import { NgbDate, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { date2NgbDate, DateTimeFormGroup, unknown2NgbDate } from './datepicker.util';
import { addYears, subYears } from 'date-fns';
import { BaseControlValueAccessor } from '../../shared/utils';
import { ControlSize } from '../../shared/interfaces/controls-size.interface';
import { injectDefaultErrorMessageConfig } from '../../shared/models/base-control/constants/base-control.constant';
import { v7 } from 'uuid';

export type BaseDatepicker<DateType = unknown, TimeType = unknown> = {
  inputReadonly: InputSignal<boolean>;
  timepicker: InputSignal<boolean>;
  minDate: InputSignal<Date | NgbDateStruct | string | null | undefined>;
  maxDate: InputSignal<Date | NgbDateStruct | string | null | undefined>;
  customTarget: Signal<string | HTMLElement | null>;
  dateControl: FormControl<DateType | null>;
  timeControl: FormControl<TimeType | null>;
  toggle(): void;
  setCustomTemplateTarget(element: HTMLElement): void;
  selectDate(date: NgbDate): void;
  resetValue(): void;
  apply(): void;
};

@Directive({
  host: {
    '[class.host-field-colored]': 'isColored()',
    '[class.host-field-disabled]': 'ngControl?.disabled',
    '[class.host-field-invalid]': 'isInvalidControl',
  },
})
export abstract class SprBaseDatepicker<ControlType = unknown, DateType = unknown, TimeType = unknown>
  extends BaseControlValueAccessor<ControlType>
  implements BaseDatepicker<DateType, TimeType>
{
  private readonly datepicker = viewChild(NgbInputDatepicker);

  protected readonly formBuilder = inject(FormBuilder);
  protected readonly form = this.formBuilder.group<DateTimeFormGroup<DateType | null, TimeType | null>>({
    date: this.formBuilder.control<DateType | null>(null),
    time: this.formBuilder.control<TimeType | null>(null),
  });

  label = input<string>('');
  isColored = input<boolean>(false);
  description = input<string>('');
  tooltip = input<string | null>(null);
  inputId = input<string>(v7());
  errorMessages = input(injectDefaultErrorMessageConfig());

  inputReadonly = input<boolean>(true);
  timepicker = input<boolean>(false);
  controlSize = input<ControlSize>('md');
  minDate = input<Date | NgbDateStruct | string | null>();
  maxDate = input<Date | NgbDateStruct | string | null>();
  outsideDays = input<'visible' | 'hidden' | 'collapsed'>('visible');
  customTarget = signal<string | HTMLElement | null>(null);

  protected readonly ngbMinDate = computed(() => {
    const minDate = this.minDate();

    const ngbDate = unknown2NgbDate(minDate ?? null);

    if (!ngbDate) {
      const date = subYears(new Date(), 10);

      return date2NgbDate(date).date!;
    }

    return ngbDate;
  });

  protected readonly ngbMaxDate = computed(() => {
    const maxDate = this.maxDate();
    const ngbDate: NgbDate | null = unknown2NgbDate(maxDate ?? null);

    if (!ngbDate) {
      const date = addYears(new Date(), 10);

      return date2NgbDate(date).date!;
    }

    const minDate = untracked(this.ngbMinDate);

    if (ngbDate.before(minDate)) {
      return minDate;
    }

    return ngbDate;
  });

  get dateControl(): FormControl<DateType | null> {
    return this.form.controls.date;
  }

  get timeControl(): FormControl<TimeType | null> {
    return this.form.controls.time;
  }

  validate(): ValidationErrors | null {
    return this.form.valid ? null : this.form.errors;
  }

  toggle(): void {
    this.datepicker()?.toggle();
  }

  setCustomTemplateTarget(element: HTMLElement): void {
    this.customTarget.set(element);
  }

  override setDisabledState(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);

    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  abstract selectDate(date: NgbDate): void;
  abstract resetValue(): void;
  abstract apply(): void;
}
