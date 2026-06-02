import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DropdownOption } from '../../../shared';
import { PeriodVariantType } from '../datepicker.util';

@Component({
  selector: 'ds-datepicker-periods',
  templateUrl: './datepicker-periods.html',
  styleUrl: './datepicker-periods.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsDatepickerPeriods {
  list = input.required<DropdownOption[]>();
  selectedPeriod = input<PeriodVariantType | null>(null);

  readonly selected = output<DropdownOption>();

  protected select(option: DropdownOption): void {
    this.selected.emit(option);
  }
}
