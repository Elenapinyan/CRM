import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PeriodSelectorFormValue } from '../interfaces/period-selector.interface';
export declare const isHovered: (date: NgbDate, { dateFrom, dateTo }: PeriodSelectorFormValue, hoveredDate: NgbDate | null) => boolean | null;
