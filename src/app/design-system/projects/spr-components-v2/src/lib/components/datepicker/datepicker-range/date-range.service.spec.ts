import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DefaultDateRangeService } from './date-range.service';
import { PeriodVariants } from '../datepicker.util';
import { endOfDay, endOfYear, startOfDay, startOfYear, subDays, subYears } from 'date-fns';
import { TestBed } from '@angular/core/testing';

describe('DateRangeService', () => {
  let service: DefaultDateRangeService;
  const getNgbDate = (date: Date): NgbDate => new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultDateRangeService],
    });

    service = TestBed.inject(DefaultDateRangeService);
  });

  it('should return null for Lifetime period', () => {
    const result = service.getDateRange(PeriodVariants.Lifetime);
    expect(result).toBeNull();
  });

  it('should return correct date range for Today from DateRangeService', () => {
    const now = new Date();
    const expectedFrom = getNgbDate(now);
    const expectedTo = getNgbDate(now);

    const range = service.getDateRange(PeriodVariants.Today);

    if (!range) {
      return;
    }

    const {
      date: { dateFrom, dateTo },
    } = range;

    expect(dateFrom).toEqual(expectedFrom);
    expect(dateTo).toEqual(expectedTo);
  });

  it('should return correct ISO strings from getDateRangeInModel', () => {
    const {
      date: { dateFrom, dateTo },
    } = service.getDateRangeInModel(PeriodVariants.Today);

    const currentDate = new Date();
    const startDay = startOfDay(currentDate);
    const endDay = endOfDay(currentDate);

    expect(dateFrom).toBe(startDay.toISOString());
    expect(dateTo).toBe(endDay.toISOString());
  });

  it('should return correct ISO date strings for Yesterday', () => {
    const {
      date: { dateFrom, dateTo },
    } = service.getDateRangeInModel(PeriodVariants.Yesterday);

    const currentDate = subDays(new Date(), 1);
    const startDay = startOfDay(currentDate);
    const endDay = endOfDay(currentDate);

    expect(dateFrom).toBe(startDay.toISOString());
    expect(dateTo).toBe(endDay.toISOString());
  });

  it('should throw an error for unknown period', () => {
    expect(() => (service as any).getDateRangeUtil('unknown')).toThrow('Unknown period: unknown');
  });

  it('should return correct range for LastMonth', () => {
    const {
      date: { dateFrom, dateTo },
    } = service.getDateRangeInModel(PeriodVariants.LastMonth);

    const fromDate = new Date(dateFrom!);
    const toDate = new Date(dateTo!);

    expect(fromDate.getTime()).toBeLessThan(toDate.getTime());
  });

  it('should return consistent dates for LastThreeMonth', () => {
    const {
      date: { dateFrom, dateTo },
    } = service.getDateRangeInModel(PeriodVariants.LastThreeMonth);

    const from = new Date(dateFrom!);
    const to = new Date(dateTo!);

    expect(from.getTime()).toBeLessThan(to.getTime());
    expect(from.getMonth()).not.toEqual(to.getMonth());
  });

  it('should return correct range for LastYear', () => {
    const {
      date: { dateFrom, dateTo },
    } = service.getDateRangeInModel(PeriodVariants.LastYear);

    const fromDate = new Date(dateFrom!);
    const toDate = new Date(dateTo!);
    const lastYear = subYears(new Date(), 1);
    const lastYearFrom = startOfYear(lastYear);
    const lastYearTo = endOfYear(lastYear);

    expect(fromDate.getTime()).toBeLessThan(toDate.getTime());
    expect(fromDate.getTime()).toBe(lastYearFrom.getTime());
    expect(toDate.getTime()).toBe(lastYearTo.getTime());
  });
});
