import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DefaultDateRangeService } from './date-range.service';
import { PeriodVariants } from '../enums/period-selector-variants.enum';
import { format } from 'date-fns';
import { TestBed } from '@angular/core/testing';

describe('DefaultDateRangeService', () => {
  let service: DefaultDateRangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultDateRangeService],
    });

    service = TestBed.inject(DefaultDateRangeService);
  });

  const getNgbDate = (date: Date): NgbDate => new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());

  it('should return null for Lifetime period', () => {
    const result = service.getDateRange(PeriodVariants.Lifetime);
    expect(result).toBeNull();
  });

  it('should return correct date range for Today from DefaultDateRangeService', () => {
    const now = new Date();
    const expectedFrom = getNgbDate(now);
    const expectedTo = getNgbDate(now);

    const result = service.getDateRange(PeriodVariants.Today);

    expect(result?.dateFrom).toEqual(expectedFrom);
    expect(result?.dateTo).toEqual(expectedTo);
  });

  it('should return correct ISO strings from getDateRangeInModel', () => {
    const result = service.getDateRangeInModel(PeriodVariants.Today);
    expect(result.dateFrom).toMatch(/T00:00:00.000Z$/);
    expect(result.dateTo).toMatch(/T23:59:59.000Z$/);
  });

  it('should return correct ISO date strings for Yesterday', () => {
    const result = service.getDateRangeInModel(PeriodVariants.Yesterday);

    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() - 1);
    const expectedFrom = `${format(expectedDate, 'yyyy-MM-dd')}T00:00:00.000Z`;
    const expectedTo = `${format(expectedDate, 'yyyy-MM-dd')}T23:59:59.000Z`;

    expect(result.dateFrom).toBe(expectedFrom);
    expect(result.dateTo).toBe(expectedTo);
  });

  it('should throw an error for unknown period', () => {
    expect(() => service['getDateRangeUtil']('unknown' as any)).toThrow('Unknown period: unknown');
  });

  it('should return correct range for LastMonth', () => {
    const { dateFrom, dateTo } = service.getDateRangeInModel(PeriodVariants.LastMonth);

    const fromDate = new Date(dateFrom!);
    const toDate = new Date(dateTo!);

    expect(fromDate.getTime()).toBeLessThan(toDate.getTime());
  });

  it('should return consistent dates for LastThreeMonth', () => {
    const { dateFrom, dateTo } = service.getDateRangeInModel(PeriodVariants.LastThreeMonth);

    const from = new Date(dateFrom!);
    const to = new Date(dateTo!);

    expect(from.getTime()).toBeLessThan(to.getTime());
    expect(from.getMonth()).not.toEqual(to.getMonth());
  });

  it('should return correct range for LastYear', () => {
    const { dateFrom, dateTo } = service.getDateRangeInModel(PeriodVariants.LastYear);

    const fromDate = new Date(dateFrom!);
    const toDate = new Date(dateTo!);
    const lastYear = new Date().getFullYear() - 1;

    expect(fromDate.getUTCFullYear()).toBe(lastYear);
    expect(fromDate.getUTCMonth()).toBe(0);
    expect(fromDate.getUTCDate()).toBe(1);

    expect(toDate.getUTCFullYear()).toBe(lastYear);
    expect(toDate.getUTCMonth()).toBe(11);
    expect(toDate.getUTCDate()).toBe(31);

    expect(fromDate.getTime()).toBeLessThan(toDate.getTime());
  });
});
