import { ChangeDetectionStrategy, Component, computed, contentChild, DestroyRef, effect, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs';
import { NgbDate, NgbDatepicker, NgbDatepickerMonth, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { BaseControlValueAccessor } from '../../../shared/utils';
import { DsButton } from '../../button';
import { DATEPICKER_RANGE_TRANSLATIONS, TimeRange, TimeRangeFormGroup } from '../datepicker.util';
import { DsDatepickerTime } from '../datepicker-time';
import { DatepickerCustomDayDirective } from './datepicker-custom-day';
import { DsMonthNavigation } from './month-navigation/month-navigation';
import { MaskitoOptions } from '@maskito/core';

@Component({
  selector: 'ds-datepicker-month',
  templateUrl: './datepicker-month.html',
  styleUrl: './datepicker-month.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgbDatepickerMonth, DsButton, ReactiveFormsModule, NgTemplateOutlet, DsDatepickerTime, FormsModule, DsMonthNavigation],
})
export class DsDatepickerMonth extends BaseControlValueAccessor<TimeRange | NgbTimeStruct | null> implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly translations = inject(DATEPICKER_RANGE_TRANSLATIONS);

  datepicker = input.required<NgbDatepicker>();
  startFrom = input<NgbDateStruct | null>(null);
  timepicker = input<boolean>(false);
  timeMask = input<MaskitoOptions | null>(null);
  timePlaceholder = input<string>('');
  altSelectors = input<boolean>(false);

  protected readonly columns = computed(() => {
    const dp = this.datepicker();

    return dp.state.months.map(() => '1fr').join(' ');
  });

  protected readonly customDay = contentChild(DatepickerCustomDayDirective);

  protected readonly formGroup = this.fb.group<TimeRangeFormGroup>({
    timeFrom: this.fb.control(null),
    timeTo: this.fb.control(null),
  });

  constructor() {
    super();

    effect(() => {
      const dp = this.datepicker();
      const template = this.customDay()?.templateRef;

      if (!template) {
        return;
      }

      dp.dayTemplate = template;
    });

    effect(() => {
      const startFrom = this.startFrom();

      if (!startFrom) {
        return;
      }

      this.datepicker().navigateTo(startFrom);
    });
  }

  ngOnInit(): void {
    this.initFormGroupValueChanges();
  }

  override writeValue(value: TimeRange | NgbTimeStruct | null): void {
    super.writeValue(value);

    this.formGroup.patchValue(
      this.isTimeRange(value)
        ? value
        : {
            timeFrom: value ?? null,
            timeTo: value ?? null,
          },
      { emitEvent: false },
    );
  }

  protected navigateNext(datepicker: NgbDatepicker): void {
    const { state, calendar } = datepicker;

    const { year, month, day } = calendar.getNext(state.firstDate, 'm', 1);

    datepicker.navigateTo({ year, month, day });
  }

  protected navigatePrev(datepicker: NgbDatepicker): void {
    const { state, calendar } = datepicker;

    const { year, month, day } = calendar.getNext(state.firstDate, 'm', -1);

    datepicker.navigateTo({ year, month, day });
  }

  protected toStringDate(value: NgbDate | null): string {
    return `${value?.year}-${value?.month}`;
  }

  private isTimeRange(v: TimeRange | NgbTimeStruct | null): v is TimeRange {
    return !!v && v.hasOwnProperty('timeFrom');
  }

  private initFormGroupValueChanges(): void {
    this.formGroup.valueChanges.pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      const val = this.datepicker().displayMonths === 1 ? (value.timeFrom ?? null) : (value as TimeRange);

      this.onChange(val);
      this.value.set(val);
    });
  }
}
