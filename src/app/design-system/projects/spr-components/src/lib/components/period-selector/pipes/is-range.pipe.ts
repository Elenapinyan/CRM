import { Pipe, PipeTransform } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PeriodSelectorFormValue } from '../interfaces/period-selector.interface';
import { isRange } from '../utils/is-range.util';

@Pipe({
  name: 'isRange',
  standalone: true,
})
export class IsRangePipe implements PipeTransform {
  transform(date: NgbDate, formValue: PeriodSelectorFormValue, hovered: NgbDate | null): boolean | null {
    return isRange(date, formValue, hovered);
  }
}
