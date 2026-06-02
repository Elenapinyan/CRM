import { NgbDate, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { getDate, getMonth, getYear, isValid } from 'date-fns';

export const dateParse = (value?: NgbDate | NgbDateStruct | null | string): NgbDate | null => {
  if (!value) {
    return null;
  }

  if (typeof value === 'object' && 'year' in value) {
    return NgbDate.from(value);
  }

  if (typeof value === 'string') {
    let dateString = value;

    if (dateString.includes('T')) {
      dateString = dateString.split('T')[0];
    }

    const date = new Date(dateString);

    if (isValid(date)) {
      return new NgbDate(getYear(date), getMonth(date) + 1, getDate(date));
    }
  }

  return null;
};

export const fromNgbDate = ({ day, year, month }: NgbDateStruct): string => {
  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
};

export const ngbDateToDate = (date: NgbDateStruct | null, time?: NgbTimeStruct | null): Date | null => {
  if (!date) {
    return null;
  }

  const newDate = new Date(fromNgbDate(date));

  if (time) {
    newDate.setHours(time.hour);
    newDate.setMinutes(time.minute);
    newDate.setSeconds(time.second);
  }

  return newDate;
};
