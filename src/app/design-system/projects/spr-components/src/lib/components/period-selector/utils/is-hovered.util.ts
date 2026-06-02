import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PeriodSelectorFormValue } from '../interfaces/period-selector.interface';

export const isHovered = (date: NgbDate, { dateFrom, dateTo }: PeriodSelectorFormValue, hoveredDate: NgbDate | null): boolean | null =>
  dateFrom && (dateTo?.equals(dateFrom) || false) && hoveredDate && date.after(dateFrom) && date.before(hoveredDate);
