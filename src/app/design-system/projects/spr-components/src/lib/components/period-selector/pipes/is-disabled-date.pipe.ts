import { Pipe, PipeTransform } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Pipe({
  name: 'isDisabledDate',
  standalone: true,
})
export class IsDisabledDatePipe implements PipeTransform {
  transform(date: NgbDate, today: NgbDateStruct): boolean | null {
    return today && date.after(today);
  }
}
