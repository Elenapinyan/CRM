import { Pipe, PipeTransform } from '@angular/core';
import { PeriodSelectorFormValue } from '../interfaces/period-selector.interface';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Pipe({
  name: 'getDisplayedDate',
  standalone: true,
})
export class GetDisplayedDatePipe implements PipeTransform {
  private displayedValue: string = '';
  private lastValue!: PeriodSelectorFormValue | null;

  constructor(private readonly ngbDateAdapter: NgbDateAdapter<NgbDateStruct>) {}

  transform({ dateFrom, dateTo }: PeriodSelectorFormValue): string {
    if (!dateFrom && !dateTo) {
      return ``;
    }

    if (this.lastValue && this.lastValue.dateFrom === dateFrom && this.lastValue.dateTo === dateTo) {
      return this.displayedValue;
    }

    this.lastValue = { dateFrom, dateTo };

    this.displayedValue = `${this.ngbDateAdapter.toModel(dateFrom)} - ${this.ngbDateAdapter.toModel(dateTo)}`;

    return this.displayedValue;
  }
}
