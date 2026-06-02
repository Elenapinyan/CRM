import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { DsDropdownComponent } from '../../../dropdown';
import { NgbDate, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ds-month-navigation',
  templateUrl: './month-navigation.html',
  styleUrl: './month-navigation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DsDropdownComponent, FormsModule],
})
export class DsMonthNavigation {
  datepicker = input.required<NgbDatepicker>();
  month = input.required<number>();
  year = input.required<number>();

  protected readonly years = computed(() => {
    const dp = this.datepicker();
    const today = dp.calendar.getToday();

    const minYearsOffset = today.year - dp.minDate.year;
    const maxYearsOffset = dp.maxDate.year - today.year || 1;
    const offset = minYearsOffset + maxYearsOffset;

    return Array.from({ length: offset }, (_, i) => {
      const year = today.year - minYearsOffset + i;

      return { text: year.toString(), value: year };
    }).reverse();
  });

  protected readonly months = computed(() => {
    const dp = this.datepicker();
    const selectedCalendar = this.selectedCalendar();

    let months = dp.calendar.getMonths(selectedCalendar?.year ?? dp.calendar.getToday().year);

    if (selectedCalendar?.year === dp.minDate.year) {
      const index = months.findIndex((month) => month === dp.minDate.month);
      months = months.slice(index);
    }

    if (selectedCalendar?.year === dp.maxDate.year) {
      const index = months.findIndex((month) => month === dp.maxDate.month);
      months = months.slice(0, index + 1);
    }

    const monthsOptions = months.map((value) => ({ text: dp.i18n.getMonthShortName(value), value }));

    return monthsOptions.reverse();
  });

  protected readonly selectedCalendar = signal<NgbDate | null>(null);

  constructor() {
    effect(() => {
      this.selectedCalendar.set(this.datepicker().calendar.getToday());
    });
  }

  protected navigate(year: number, month: number, day: number = 1): void {
    this.selectedCalendar.set(NgbDate.from({ year, month, day }));

    this.datepicker().navigateTo({ year, month, day });
  }
}
