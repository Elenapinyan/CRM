import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PeriodSelectorFormValue } from '../interfaces/period-selector.interface';
export declare const isInside: (date: NgbDate, { dateFrom, dateTo }: PeriodSelectorFormValue) => boolean | null;
