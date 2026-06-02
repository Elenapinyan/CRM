import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PeriodSelectorFormValue } from '../interfaces/period-selector.interface';
export declare const isRange: (date: NgbDate, { dateFrom, dateTo }: PeriodSelectorFormValue, hovered: NgbDate | null) => boolean | null;
