import { Pipe, PipeTransform } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PeriodSelectorFormValue } from '../interfaces/period-selector.interface';
import { isInside } from '../utils/is-inside.util';

@Pipe({
  name: 'isInside',
  standalone: true,
})
export class IsInsidePipe implements PipeTransform {
  transform(date: NgbDate, formValue: PeriodSelectorFormValue): boolean | null {
    return isInside(date, formValue);
  }
}
