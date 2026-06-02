// this formatter is needed to disable default ngb datepicker input data formatting
import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class DisabledNgbFormatter extends NgbDateParserFormatter {
  override parse(value: string): NgbDateStruct | null {
    return null;
  }

  override format(date: NgbDateStruct | null): string {
    return '';
  }
}
