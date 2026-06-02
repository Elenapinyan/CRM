import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from '../datepicker.util';
export declare const isHovered: (date: NgbDate, { dateFrom, dateTo }: DateRange<NgbDateStruct>, hoveredDate: NgbDate | null) => boolean | null;
export declare const isInside: (date: NgbDate, { dateFrom, dateTo }: DateRange<NgbDateStruct>) => boolean | null;
export declare const isRange: (date: NgbDate, { dateFrom, dateTo }: DateRange<NgbDateStruct>, hovered: NgbDate | null) => boolean | null;
