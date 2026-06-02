import { Directive, EventEmitter, inject, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { NgbDate, NgbDatepickerNavigateEvent, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { DateRange, PeriodSelectorFooterSettings, PeriodSelectorFormGroup } from './interfaces/period-selector.interface';
import { BaseControl } from '../../shared';
import { ONE_DAY_TIME_STAMP } from '../../shared/constants/one-day-time-stamp.constant';
import { dateParse, fromNgbDate } from '../../shared/utils/date-parser.util';
import { DEFAULT_FOOTER_SETTINGS } from './constants/period-selector.constant';
import { startOfDay, startOfToday } from 'date-fns';
import { DOCUMENT } from '@angular/common';
import { getNgbDate } from '../date-timepicker';

@Directive()
export class SprBasePeriodSelector extends BaseControl<FormGroup<PeriodSelectorFormGroup>, DateRange | null> implements OnInit {
  @Input() set footerSettings(settings: PeriodSelectorFooterSettings | undefined) {
    if (!settings) {
      return;
    }

    this.fullFooterSettings = {
      ...DEFAULT_FOOTER_SETTINGS,
      ...settings,
    };
  }

  @Input() set maxDate(date: NgbDate | string | null | undefined) {
    if (date instanceof NgbDate) {
      this.ngbMaxDate = date;
      return;
    }

    const parsedDate = dateParse(date);

    if (parsedDate) {
      this.ngbMaxDate = parsedDate;
    }
  }

  @Input() maxRangeInDays: number | null = null;

  @Output() rangeConfirmed = new EventEmitter<DateRange | null>();

  @Output() rangeCanceled = new EventEmitter<void>();

  localMaxDate: NgbDate | null = null;

  fullFooterSettings: Required<PeriodSelectorFooterSettings> = DEFAULT_FOOTER_SETTINGS;
  hoveredDate: NgbDate | null = null;
  startDate!: NgbDate;
  alreadyAppliedDateForNgbDatePicker: Partial<{
    dateFrom: NgbDate | null;
    dateTo: NgbDate | null;
  }> = { dateFrom: null, dateTo: null };

  protected ngbMaxDate: NgbDate = ((): NgbDate => {
    const today = startOfToday();

    return NgbDate.from({ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() })!;
  })();

  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private currentDate?: NgbDatepickerNavigateEvent['next'];

  private alreadyAppliedDate: DateRange | null = {};
  private dateValueReadyToEmit: DateRange | null = {};

  protected dateSelectedFromSelectOption: boolean = false;

  get maxDate(): NgbDate {
    return this.localMaxDate ?? this.ngbMaxDate;
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.startDate = this.getStartDate() ?? this.ngbMaxDate;
    this.currentDate = { year: this.startDate.year, month: this.startDate.month };
  }

  getStartDate(): NgbDate | undefined {
    if (!this.ngbMaxDate) return;

    if (this.ngbMaxDate.month === 1) {
      return NgbDate.from({ year: this.ngbMaxDate.year - 1, month: 12, day: 1 })!;
    } else {
      return NgbDate.from({ year: this.ngbMaxDate.year, month: this.ngbMaxDate.month - 1, day: 1 })!;
    }
  }

  onNavigate({ next }: NgbDatepickerNavigateEvent): void {
    this.currentDate = next;
    this.setNextMonthDisabled(this.isCurrentMonthMaxMonth());
  }

  onDateSelection(date: NgbDate, custom = false): void {
    this.dateSelectedFromSelectOption = false;

    const { dateFrom, dateTo } = this.control.getRawValue();
    let newFromDate: NgbDate | null = dateFrom;
    let newToDate: NgbDate | null = dateTo;

    if (!dateFrom && !dateTo) {
      newFromDate = date;
      newToDate = date;
    } else if (dateFrom && dateTo) {
      if (dateFrom.equals(dateTo) && date.after(dateFrom)) {
        newToDate = date;
      } else {
        newFromDate = date;
        newToDate = date;
      }
    }

    this.control.patchValue({
      dateFrom: newFromDate,
      dateTo: newToDate,
    });

    if (newFromDate && this.maxRangeInDays) {
      this.setNextMonthDisabled(this.isCurrentMonthMaxMonth());
    }

    this.cvaOnTouched();
    this.cdRef.markForCheck();
  }

  override writeValue(value: DateRange | null): void {
    if (value) {
      const dateFrom = dateParse(value.dateFrom);
      const dateTo = dateParse(value.dateTo);

      this.control.patchValue({
        dateFrom,
        dateTo,
      });

      this.onApply(false);

      this.cdRef.markForCheck();
    } else {
      this.control.patchValue({
        dateFrom: null,
        dateTo: null,
      });
    }
  }

  onApply(triggerOnChange: boolean = true): void {
    this.alreadyAppliedDateForNgbDatePicker = this.control.getRawValue();
    this.alreadyAppliedDate = this.dateValueReadyToEmit;

    if (triggerOnChange) {
      this.cvaOnChange(this.alreadyAppliedDate);
      this.rangeConfirmed.emit(this.alreadyAppliedDate);
    }
  }

  onClose(datepicker: NgbInputDatepicker, closeOnButton = false, resetMaxDate = !this.alreadyAppliedDateForNgbDatePicker.dateFrom): void {
    if (!this.fullFooterSettings.submitDateOnApply) {
      return;
    }

    this.control.patchValue(this.alreadyAppliedDateForNgbDatePicker);

    if (closeOnButton) {
      datepicker.close();
      this.rangeCanceled.emit();
    }

    if (resetMaxDate) {
      this.localMaxDate = null;
    } else if (this.maxRangeInDays !== null && this.control.value.dateFrom) {
      this.localMaxDate = this.getEffectiveMaxDate();
      datepicker.navigateTo(this.control.value.dateFrom);
    }
  }

  protected override initControlListener(): void {
    this.control.valueChanges
      .pipe(
        map(({ dateFrom, dateTo }) => {
          if (!dateFrom && !dateTo) {
            return null;
          }

          return {
            dateFrom: dateFrom ? `${fromNgbDate(dateFrom)}T00:00:00.000Z` : undefined,
            dateTo: dateTo ? `${fromNgbDate(dateTo)}T23:59:59.000Z` : undefined,
          };
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((date) => {
        const effectiveMaxDate = this.getEffectiveMaxDate();
        this.localMaxDate = effectiveMaxDate;

        if (date?.dateFrom && !this.dateSelectedFromSelectOption) {
          const dateTo = date.dateTo ? getNgbDate(startOfDay(date.dateTo)) : null;

          if (dateTo && dateTo.after(effectiveMaxDate)) {
            date.dateTo = `${fromNgbDate(effectiveMaxDate)}T23:59:59.000Z`;
          }
        }

        this.dateValueReadyToEmit = date;
        this.cdRef.markForCheck();

        if (!this.fullFooterSettings.submitDateOnApply || this.dateSelectedFromSelectOption) {
          this.cvaOnChange(date);
        }
      });
  }

  protected override initControl(): FormGroup<PeriodSelectorFormGroup> {
    return this.formBuilder.nonNullable.group<PeriodSelectorFormGroup>({
      dateFrom: this.formBuilder.control(null),
      dateTo: this.formBuilder.control(null),
    });
  }

  protected getEffectiveMaxDate(): NgbDate {
    if (!this.maxRangeInDays || !this.control.value.dateFrom) return this.ngbMaxDate;

    const maxAllowedDate = new Date(
      startOfDay(fromNgbDate(this.control.value.dateFrom)).getTime() + ONE_DAY_TIME_STAMP * (this.maxRangeInDays - 1),
    );
    return getNgbDate(maxAllowedDate).after(this.ngbMaxDate) ? this.ngbMaxDate : getNgbDate(maxAllowedDate);
  }

  private isCurrentMonthMaxMonth(): boolean {
    const maxDate = this.maxDate;
    return maxDate.month === this.currentDate?.month && maxDate.year === this.currentDate?.year;
  }

  private setNextMonthDisabled(isDisabled: boolean): void {
    requestAnimationFrame(() => {
      const nextMonthBtn = this.document.querySelector('.ngb-dp-arrow-next > .ngb-dp-arrow-btn');
      if (!nextMonthBtn) return;

      if (isDisabled) {
        this.renderer.setAttribute(nextMonthBtn, 'disabled', 'true');
      } else {
        this.renderer.removeAttribute(nextMonthBtn, 'disabled');
      }
    });
  }
}
