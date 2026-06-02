import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from '../datepicker.util';

export const isHovered = (date: NgbDate, { dateFrom, dateTo }: DateRange<NgbDateStruct>, hoveredDate: NgbDate | null): boolean | null =>
  dateFrom && (NgbDate.from(dateTo)?.equals(dateFrom) || false) && hoveredDate && date.after(dateFrom) && date.before(hoveredDate);

export const isInside = (date: NgbDate, { dateFrom, dateTo }: DateRange<NgbDateStruct>): boolean | null =>
  date.after(dateFrom!) && date.before(dateTo!);

export const isRange = (date: NgbDate, { dateFrom, dateTo }: DateRange<NgbDateStruct>, hovered: NgbDate | null): boolean | null =>
  date.equals(dateFrom!) || (dateTo && date.equals(dateTo)) || isHovered(date, { dateFrom, dateTo }, hovered);
