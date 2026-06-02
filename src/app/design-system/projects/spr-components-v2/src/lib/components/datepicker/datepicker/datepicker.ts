import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, OnInit, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDate, NgbDatepicker, NgbDatepickerI18n, NgbDateStruct, NgbInputDatepicker, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { startOfDay } from 'date-fns';
import { DatepickerTranslateService, DsControlSizeDirective } from '../../../shared';
import { DsButton } from '../../button';
import { SprBaseDatepicker } from '../base-datepicker';
import { SprBaseDatetimeAdapter, SprDatetimeAdapter } from '../date-adapter';
import { SprDateParserFormatter, SprDMYFormatter } from '../date-formatter';
import { DateTime, TimePlaceholder } from '../datepicker.util';
import { DsDatepickerDay } from '../datepicker-day';
import { DatepickerCustomDayDirective, DsDatepickerMonth } from '../datepicker-month';
import { DsFormField } from '../../form-field';
import { FormatDatePipe } from '../pipes';
import { MaskitoDirective } from '@maskito/angular';
import { FilterValueAccessor, provideFilterValueAccessor } from '../../../shared/utils';

@Component({
  selector: 'ds-datepicker',
  templateUrl: 'datepicker.html',
  styleUrl: 'datepicker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbInputDatepicker,
    DsDatepickerDay,
    DsDatepickerMonth,
    DsFormField,
    FormatDatePipe,
    DsButton,
    DatepickerCustomDayDirective,
    DsControlSizeDirective,
    NgbDatepicker,
    MaskitoDirective,
  ],
  providers: [
    provideFilterValueAccessor(DsDatepicker),
    SprDMYFormatter,
    SprBaseDatetimeAdapter,
    { provide: NgbDatepickerI18n, useClass: DatepickerTranslateService },
    FormatDatePipe,
  ],
})
export class DsDatepicker<DateType = unknown>
  extends SprBaseDatepicker<DateType | null, NgbDateStruct, NgbTimeStruct>
  implements FilterValueAccessor, OnInit
{
  private readonly destroyRef = inject(DestroyRef);
  private readonly formatDatePipe = inject(FormatDatePipe);

  private readonly dateTimepickerAdapter =
    inject<SprDatetimeAdapter<DateType>>(SprDatetimeAdapter, { optional: true, skipSelf: true }) ?? inject(SprBaseDatetimeAdapter);

  protected readonly dateParserFormatter: SprDateParserFormatter =
    inject(SprDateParserFormatter, { optional: true }) ?? inject(SprDMYFormatter);

  /**
   * See FilterValueAccessor interface for information
   **/
  protected readonly autoApplyDisabled = signal(false);

  protected readonly inputPlaceholder = computed(() => {
    if (this.inputReadonly()) {
      return this.placeholder();
    }

    if (this.timepicker()) {
      return this.dateParserFormatter?.inputMaskConfig()?.placeholder;
    }

    return this.dateParserFormatter?.inputMaskConfig()?.datePlaceholder;
  });

  protected readonly TimePlaceholder = TimePlaceholder;

  private valueTouched = false;

  readonly filterValue = computed(() => {
    const v = this.value();

    if (!v) {
      return null;
    }

    return this.formatDatePipe.transform(this.getParsedValue(v), this.timepicker());
  });

  placeholder = input<string>('');
  isDeselectAllowed = input<boolean>(false);
  inline = input<boolean>(false);
  tooltipClassForLabel = input<string | null>('ds-component');

  dateDeselected = output();
  dateChanged = output<DateType | null>();

  ngOnInit(): void {
    this.initControlListener();
  }

  selectDate(date: NgbDate): void {
    this.form.setValue({
      ...this.form.getRawValue(),
      date,
    });

    this.dateChanged.emit(this.getNormalizedValue());
  }

  resetValue(): void {
    this.form.patchValue({ date: null, time: null });

    this.dateDeselected.emit();

    this.value.set(null);
    this.onChange(null);
  }

  apply(): void {
    if (this.timepicker()) {
      const selectedTime = this.timeControl.getRawValue();

      if (!selectedTime) {
        const date = startOfDay(new Date());

        this.timeControl.patchValue({ hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds() }, { emitEvent: false });
      }
    }

    const value = this.getNormalizedValue();

    this.value.set(value);

    if (this.valueTouched) {
      this.onChange(value);
    } else {
      this.onTouched(value);
      this.valueTouched = true;
    }
  }

  disableAutoApply(value: boolean): void {
    this.autoApplyDisabled.set(value);
  }

  override writeValue(value: DateType | null): void {
    if (!value) {
      this.form.patchValue(
        {
          date: null,
          time: null,
        },
        { emitEvent: false },
      );
      return;
    }

    const parsedValue = this.getParsedValue(value);

    this.form.patchValue(parsedValue, { emitEvent: false });
  }

  protected valueChanged(event: Event): void {
    const input = event.target as HTMLInputElement;

    const v = input.value;

    const parsedValue = this.dateParserFormatter?.parse(v);

    if (!parsedValue) {
      return;
    }

    const maxDate = this.ngbMaxDate();
    const minDate = this.ngbMinDate();

    if (minDate.after(parsedValue.date)) {
      parsedValue.date = minDate;

      input.value = this.dateParserFormatter.format(parsedValue.date, parsedValue.time);
    }

    if (maxDate.before(parsedValue.date)) {
      parsedValue.date = maxDate;

      input.value = this.dateParserFormatter.format(parsedValue.date, parsedValue.time);
    }

    this.form.patchValue(parsedValue);
  }

  private initControlListener(): void {
    this.form.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((v) => !this.autoApplyDisabled() && (this.isDeselectAllowed() || Boolean(v.date))),
      )
      .subscribe(() => {
        this.apply();
      });
  }

  private getNormalizedValue(): DateType | null {
    return this.dateTimepickerAdapter.toModel(
      this.form.getRawValue() as DateTime<NgbDateStruct | null, NgbTimeStruct | null>,
    ) as DateType | null;
  }

  private getParsedValue(value: DateType | null): DateTime<NgbDateStruct | null, NgbTimeStruct | null> {
    return this.dateTimepickerAdapter.fromModel(value as DateTime<NgbDateStruct | null, NgbTimeStruct | null> & DateType);
  }
}
