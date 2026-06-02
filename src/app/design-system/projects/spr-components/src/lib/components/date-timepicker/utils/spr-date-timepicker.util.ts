import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export const getNgbDate = (date: string | Date): NgbDate => {
  const newDate = date instanceof Date ? date : new Date(date);

  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();

  return new NgbDate(year, month, day);
};
