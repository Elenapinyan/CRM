import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  model,
  OnInit,
  output,
  signal,
  TemplateRef,
  untracked,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NgbDate,
  NgbDateParserFormatter,
  NgbDatepicker,
  NgbDatepickerI18n,
  NgbDateStruct,
  NgbInputDatepicker,
  NgbTimeStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { DatepickerTranslateService, DropdownOption, DsControlSizeDirective } from '../../../shared';
import { DsButton } from '../../button';
import { DateRangeService, DefaultDateRangeService } from './date-range.service';
import {
  DATEPICKER_RANGE_TRANSLATIONS,
  DateRange,
  DateTime,
  DatetimeRange,
  DEFAULT_INPUT_NOT_SELECTED_PLACEHOLDER,
  getMaxNgbDate,
  PeriodVariants,
  PeriodVariantType,
  TimePlaceholder,
  TimeRange,
} from '../datepicker.util';
import { SprDateParserFormatter, SprDMYFormatter } from '../date-formatter';
import { SprBaseDateRangeAdapter, SprDateRangeAdapter } from '../date-adapter';
import { DatepickerCustomDayDirective, DsDatepickerMonth } from '../datepicker-month';
import { DsDatepickerPeriods } from '../datepicker-periods';
import { DsDatepickerDay } from '../datepicker-day';
import { SprBaseDatepicker } from '../base-datepicker';
import { DsFormField } from '../../form-field';
import { FormatRangePipe } from '../pipes';
import { DisabledNgbFormatter } from './datepicker-range.util';
import { MaskitoDirective } from '@maskito/angular';
import { MaskitoOptions } from '@maskito/core';
import { FilterValueAccessor, provideFilterValueAccessor } from '../../../shared/utils';

@Component({
  selector: 'ds-datepicker-range',
  templateUrl: 'datepicker-range.html',
  styleUrls: ['datepicker-range.scss'],
  imports: [
    CommonModule,
    NgbInputDatepicker,
    ReactiveFormsModule,
    DsControlSizeDirective,
    DsButton,
    DsDatepickerMonth,
    DsDatepickerPeriods,
    DsDatepickerDay,
    DsFormField,
    DatepickerCustomDayDirective,
    FormatRangePipe,
    NgbDatepicker,
    MaskitoDirective,
  ],
  providers: [
    provideFilterValueAccessor(DsDatepickerRange),
    { provide: NgbDatepickerI18n, useClass: DatepickerTranslateService },
    { provide: NgbDateParserFormatter, useClass: DisabledNgbFormatter },
    SprDMYFormatter,
    SprBaseDateRangeAdapter,
    DefaultDateRangeService,
    FormatRangePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsDatepickerRange<DateType = DatetimeRange<unknown>>
  extends SprBaseDatepicker<DateType | null, DateRange<NgbDateStruct>, TimeRange>
  implements FilterValueAccessor, OnInit
{
  private readonly destroyRef = inject(DestroyRef);
  private readonly formatRangePipe = inject(FormatRangePipe);

  private readonly dateRangeService = inject(DateRangeService, { optional: true }) ?? inject(DefaultDateRangeService);
  private readonly dateRangeAdapter =
    inject<SprDateRangeAdapter<DateType>>(SprDateRangeAdapter, { optional: true, skipSelf: true }) ?? inject(SprBaseDateRangeAdapter);

  private readonly dateParserFormatter: SprDateParserFormatter =
    inject(SprDateParserFormatter, { optional: true }) ?? inject(SprDMYFormatter);

  protected readonly translations = inject(DATEPICKER_RANGE_TRANSLATIONS);

  /**
   * See FilterValueAccessor interface for information
   **/
  protected readonly autoApplyDisabled = signal(false);

  /**
   * See FilterValueAccessor interface for information
   **/
  readonly filterValue = computed(() => {
    const v = this.value();

    if (!v) {
      return null;
    }

    return this.formatRangePipe.transform(this.form.getRawValue(), this.timepicker());
  });

  protected readonly periodStartDate = signal<NgbDateStruct | null>(null);

  protected readonly startDate = computed(() => {
    const maxDate = this.maxDate();
    const ngbMaxDate = untracked(this.ngbMaxDate);
    const date = new Date();
    const todayNgbDate = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());

    const startDate = maxDate && ngbMaxDate.before(todayNgbDate) ? this.ngbMaxDate() : todayNgbDate;

    return new NgbDate(startDate.year, startDate.month, 1);
  });

  protected readonly maskedPlaceholder = computed(() => {
    const isReadonly = this.inputReadonly();
    const placeholder = this.placeholder();

    if (isReadonly) {
      return placeholder;
    }

    if (this.timepicker()) {
      const maskPlaceholder = this.dateParserFormatter.inputMaskConfig().placeholder;

      return maskPlaceholder ? `${maskPlaceholder} - ${maskPlaceholder}` : placeholder;
    }

    const maskPlaceholder = this.dateParserFormatter.inputMaskConfig().datePlaceholder;

    return maskPlaceholder ? `${maskPlaceholder} - ${maskPlaceholder}` : placeholder;
  });

  protected readonly maskConfig = computed(() => this.dateParserFormatter.inputMaskConfig());

  protected readonly inputMask = computed<MaskitoOptions | null>(() => {
    const config = this.maskConfig();

    return config?.rangeMask(this.timepicker()) ?? null;
  });

  protected readonly appliedDatetimeRange = signal<DateTime<DateRange<NgbDateStruct> | null, TimeRange | null>>(this.form.getRawValue());

  protected readonly PeriodVariants = PeriodVariants;
  protected readonly TimePlaceholder = TimePlaceholder;

  protected dateSelectedFromSelectOption: boolean = false;
  protected hoveredDate: NgbDate | null = null;

  showFooter = input<boolean>(false);
  footerCustomTemplate = input<TemplateRef<unknown>>();
  maxRangeInDays = input<number | null>(null);
  selectOptions = input<DropdownOption[]>([]);
  isDeselectAllowed = input(false);
  placeholder = input(DEFAULT_INPUT_NOT_SELECTED_PLACEHOLDER);
  markDisabledFn = input<(date: NgbDateStruct) => boolean>(() => false);
  selectedRange = model<PeriodVariantType | null>(null);
  inline = input<boolean>(false);
  tooltipClassForLabel = input<string | null>('ds-component');

  readonly dateDeselected = output();
  readonly dateSelected = output<NgbDate>();
  readonly rangeConfirmed = output<DateType | null>();
  readonly rangeCanceled = output<void>();

  constructor() {
    super();

    effect(() => {
      const selectedRange = this.selectedRange();
      const optionList = untracked(this.selectOptions);

      if (selectedRange && optionList.length && selectedRange === PeriodVariants.NotSelected) {
        this.resetValue();
      }
    });
  }

  ngOnInit(): void {
    this.initControlListener();
  }

  close(datepicker: NgbInputDatepicker, emitCanceledEvent: boolean = false): void {
    const datetimeRange = this.form.getRawValue() as DatetimeRange<NgbDateStruct>;

    this.onTouched();

    if (!datetimeRange || !datetimeRange.date?.dateFrom) {
      datepicker.close();

      return;
    }

    if (!this.showFooter()) {
      return;
    }

    if (datepicker.isOpen()) {
      datepicker.close();
    }

    if (emitCanceledEvent) {
      this.rangeCanceled.emit();
    }
  }

  selectDate(date: NgbDate): void {
    this.dateSelectedFromSelectOption = false;

    const selectedRange = this.dateControl.getRawValue();

    const updatedRange = this.getUpdatedRange(date, selectedRange);

    const timeRange = {
      timeFrom: { hour: 0, minute: 0, second: 0 },
      timeTo: { hour: 23, minute: 59, second: 59 },
    };

    this.form.patchValue({
      date: updatedRange,
      time: timeRange,
    });

    const datetimeRange = this.dateRangeAdapter.toModel(this.form.getRawValue() as DatetimeRange<NgbDateStruct>);

    if (datetimeRange) {
      this.onTouched(datetimeRange as DateType);
    }
  }

  apply(triggerOnChange: boolean = true): void {
    const datetimeRange = this.form.getRawValue() as DatetimeRange<NgbDateStruct>;

    this.appliedDatetimeRange.set(datetimeRange);

    const date = this.dateRangeAdapter.toModel(datetimeRange) as DateType;

    this.value.set(date);

    if (triggerOnChange) {
      this.onChange(date);
      this.rangeConfirmed.emit(date);
    }
  }

  resetValue(): void {
    this.selectedRange.set(PeriodVariants.NotSelected);

    this.form.patchValue({
      date: { dateFrom: null, dateTo: null },
      time: { timeTo: null, timeFrom: null },
    });

    this.onChange(null);
    this.apply(true);

    this.dateDeselected.emit();
  }

  disableAutoApply(value: boolean): void {
    this.autoApplyDisabled.set(value);
  }

  override writeValue(value: DateType | null): void {
    if (value) {
      this.selectedRange.set(PeriodVariants.Custom);

      const datetimeRange = this.dateRangeAdapter.fromModel(value as DatetimeRange<NgbDateStruct> & DateType);

      this.form.patchValue(datetimeRange);

      this.apply(false);
    } else {
      this.form.patchValue({
        date: { dateFrom: null, dateTo: null },
        time: { timeFrom: null, timeTo: null },
      });
    }
  }

  /**
   * This method fixes incorrect date values and pads after manual input.
   **/
  protected fixDateOnChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.value) {
      return;
    }

    const values = input.value.split(' - ');

    const from = values?.[0];
    const to = values?.[1];

    const parsedFromValue = this.dateParserFormatter.parse(from);
    const parsedToValue = to ? this.dateParserFormatter.parse(to) : null;

    if (!parsedFromValue && !parsedToValue) {
      return;
    }

    const postFixedDateFrom = this.postFixDatetime(parsedFromValue?.date ?? null, parsedFromValue?.time ?? null);
    const postFixedDateTo = this.postFixDatetime(parsedToValue?.date ?? null, parsedToValue?.time ?? null);

    this.form.patchValue({
      date: {
        dateFrom: postFixedDateFrom?.date ?? null,
        dateTo: postFixedDateTo?.date ?? null,
      },
      time: {
        timeFrom: postFixedDateFrom?.time ?? null,
        timeTo: postFixedDateTo?.time ?? null,
      },
    });

    if (!this.inputReadonly()) {
      this.apply(true);
    }
  }

  protected selectOption(option: DropdownOption): void {
    this.dateSelectedFromSelectOption = true;

    this.selectedRange.set(option.value as PeriodVariants);

    const parsedDateRange = this.dateRangeService.getDateRange(option.value as PeriodVariantType);

    this.periodStartDate.set(parsedDateRange?.date?.dateFrom ?? null);

    if (!parsedDateRange) {
      this.form.patchValue(
        {
          date: { dateFrom: null, dateTo: null },
          time: { timeTo: null, timeFrom: null },
        },
        { emitEvent: false },
      );

      this.onChange(null);

      return;
    }

    this.form.patchValue(parsedDateRange);
  }

  protected setHoveredDate(date: NgbDate | null): void {
    if (date === null) {
      this.hoveredDate = null;

      return;
    }

    const dateFrom = this.dateControl.getRawValue()?.dateFrom ?? null;

    if (!dateFrom) {
      this.hoveredDate = date;

      return;
    }

    if (dateFrom && date.before(dateFrom)) {
      this.hoveredDate = date;

      return;
    }

    this.hoveredDate = getMaxNgbDate(date, dateFrom, this.maxRangeInDays());
  }

  private postFixDatetime(date: NgbDateStruct | null, time: NgbTimeStruct | null): DateTime<NgbDateStruct | null, NgbTimeStruct | null> {
    const maxDate = this.ngbMaxDate();
    const minDate = this.ngbMinDate();

    if (minDate.after(date)) {
      date = minDate;

      return { date, time };
    }

    if (maxDate.before(date)) {
      date = maxDate;

      return { date, time };
    }

    return { date, time };
  }

  private getUpdatedRange(date: NgbDate, range: any): DateRange<NgbDateStruct> {
    const dateFrom = range?.dateFrom ?? null;
    const dateTo = range?.dateTo ?? null;

    let newFromDate: NgbDateStruct | null = dateFrom;
    let newToDate: NgbDateStruct | null = dateTo ? dateTo : dateFrom;

    if (!dateFrom && !dateTo) {
      newFromDate = date;
      newToDate = date;
    } else if (dateFrom && dateTo) {
      if (NgbDate.from(dateFrom)?.equals(dateTo) && NgbDate.from(date)?.after(dateFrom)) {
        newToDate = getMaxNgbDate(NgbDate.from(date)!, dateFrom, this.maxRangeInDays());
      } else {
        newFromDate = date;
        newToDate = date;
      }
    }

    return {
      dateFrom: newFromDate,
      dateTo: newToDate,
    };
  }

  private initControlListener(): void {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      const date = value.date;
      const time = value.time;

      if (!this.autoApplyDisabled() && (!this.showFooter() || this.inline())) {
        const datetimeRange = this.dateRangeAdapter.toModel({ date, time } as DatetimeRange<NgbDateStruct>);

        this.value.set(datetimeRange as DateType);
        this.onChange(datetimeRange as DateType);
      }
    });
  }
}
