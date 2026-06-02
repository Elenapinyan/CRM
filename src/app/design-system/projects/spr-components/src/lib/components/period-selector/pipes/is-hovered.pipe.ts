import { Pipe, PipeTransform } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PeriodSelectorFormValue } from '../interfaces/period-selector.interface';
import { isHovered } from '../utils/is-hovered.util';

@Pipe({
  name: 'isHovered',
  standalone: true,
})
export class IsHoveredPipe implements PipeTransform {
  transform(date: NgbDate, formValue: PeriodSelectorFormValue, hovered: NgbDate | null): boolean | null {
    return isHovered(date, formValue, hovered);
  }
}
