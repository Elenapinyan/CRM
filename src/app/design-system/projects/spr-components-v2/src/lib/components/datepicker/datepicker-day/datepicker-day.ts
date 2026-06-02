import { ChangeDetectionStrategy, Component, computed, input, model, untracked } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateRange, getDiffInDays } from '../datepicker.util';
import { isHovered, isInside, isRange } from './datepicker-day.util';

@Component({
  selector: 'ds-datepicker-day',
  templateUrl: './datepicker-day.html',
  styleUrl: './datepicker-day.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsDatepickerDay {
  date = input.required<NgbDate>();
  selectedDate = input<NgbDateStruct | null>(null);
  maxDate = input.required<NgbDateStruct>();

  focused = input<boolean>(false);

  rangeMode = input<boolean>(false);
  selectedRange = input<DateRange<NgbDateStruct> | null>(null);
  maxRangeInDays = input<number | null>(null);
  hoveredDate = model<NgbDate | null>(null);

  readonly isSelectedDate = computed(() => {
    const date = this.date();
    const selectedDate = this.selectedDate();

    if (!selectedDate) {
      return false;
    }

    return date.equals(selectedDate);
  });

  readonly isTodayDate = computed(() => {
    const date = this.date();
    const today = this.getTodayNgbDate();

    return today?.equals(date) ?? false;
  });

  readonly isFaded = computed(() => {
    const date = untracked(this.date);
    const selectedRange = this.selectedRange();

    if (selectedRange && this.rangeMode()) {
      return isHovered(date, selectedRange, this.hoveredDate()) || isInside(date, selectedRange);
    }

    return false;
  });

  readonly isRange = computed(() => {
    if (!this.rangeMode()) {
      return this.isSelectedDate();
    }

    const range = this.selectedRange();

    return range && isRange(untracked(this.date), range, this.hoveredDate());
  });

  readonly isOutOfRange = computed(() => {
    if (!this.rangeMode()) {
      return false;
    }

    const range = this.selectedRange();
    const maxRange = this.maxRangeInDays();

    if (!range || !range.dateFrom || !maxRange) {
      return false;
    }

    return getDiffInDays(untracked(this.date), range.dateFrom) > maxRange;
  });

  readonly isDisabled = computed(() => {
    const maxDate = this.maxDate();

    return maxDate && untracked(this.date).after(maxDate);
  });

  private readonly todayDate = new Date();

  private getTodayNgbDate(): NgbDate | null {
    return NgbDate.from({
      year: this.todayDate.getUTCFullYear(),
      month: this.todayDate.getUTCMonth() + 1,
      day: this.todayDate.getUTCDate(),
    });
  }
}
