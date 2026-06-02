import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PeriodSelectorFormValue } from '../interfaces/period-selector.interface';
import { isHovered } from './is-hovered.util';
import { isInside } from './is-inside.util';

export const isRange = (date: NgbDate, { dateFrom, dateTo }: PeriodSelectorFormValue, hovered: NgbDate | null): boolean | null =>
  date.equals(dateFrom!) ||
  (dateTo && date.equals(dateTo)) ||
  isInside(date, { dateFrom, dateTo }) ||
  isHovered(date, { dateFrom, dateTo }, hovered);
