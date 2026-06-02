import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsDatepickerDay } from './datepicker-day';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { getElementByCss, syncViewModel } from '../../../shared/utils';

describe('DatepickerDay', () => {
  let component: DsDatepickerDay;
  let fixture: ComponentFixture<DsDatepickerDay>;

  const date = NgbDate.from({ year: 2025, month: 1, day: 5 });
  const maxDate = NgbDate.from({ year: 2025, month: 1, day: 10 });

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-01-05T10:00:00.000Z'));
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsDatepickerDay],
    });

    fixture = TestBed.createComponent(DsDatepickerDay);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('date', date);
    fixture.componentRef.setInput('maxDate', maxDate);

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should add disable class', () => {
      const maxDate = NgbDate.from({ year: 2025, month: 1, day: 4 });

      fixture.componentRef.setInput('maxDate', maxDate);

      syncViewModel(fixture);

      const day = getElementByCss(fixture, '[data-testid="dp-day"]').nativeElement as HTMLElement;

      expect(day.classList.contains('disabled-date')).toBeTruthy();
    });

    it('should add focused class', () => {
      fixture.componentRef.setInput('focused', true);

      syncViewModel(fixture);

      const day = getElementByCss(fixture, '[data-testid="dp-day"]').nativeElement as HTMLElement;

      expect(day.classList.contains('focused')).toBeTruthy();
    });

    it('should add today class', () => {
      const day = getElementByCss(fixture, '[data-testid="dp-day"]').nativeElement as HTMLElement;

      expect(day.classList.contains('today')).toBeTruthy();
    });

    it('should add out class', () => {
      fixture.componentRef.setInput('rangeMode', true);
      fixture.componentRef.setInput('maxRangeInDays', 2);

      fixture.componentRef.setInput('selectedRange', {
        dateFrom: NgbDate.from({ year: 2025, month: 1, day: 3 }),
        dateTo: NgbDate.from({ year: 2025, month: 1, day: 4 }),
      });

      syncViewModel(fixture);

      const day = getElementByCss(fixture, '[data-testid="dp-day"]').nativeElement as HTMLElement;

      expect(day.classList.contains('out')).toBeTruthy();
    });

    it('should add range class for range mode', () => {
      fixture.componentRef.setInput('rangeMode', true);

      fixture.componentRef.setInput('selectedRange', {
        dateFrom: NgbDate.from({ year: 2025, month: 1, day: 5 }),
        dateTo: NgbDate.from({ year: 2025, month: 1, day: 7 }),
      });

      syncViewModel(fixture);

      const day = getElementByCss(fixture, '[data-testid="dp-day"]').nativeElement as HTMLElement;

      expect(day.classList.contains('range')).toBeTruthy();
    });

    it('should add range class for non-range mode', () => {
      fixture.componentRef.setInput('rangeMode', false);

      fixture.componentRef.setInput('selectedDate', date);

      syncViewModel(fixture);

      const day = getElementByCss(fixture, '[data-testid="dp-day"]').nativeElement as HTMLElement;

      expect(day.classList.contains('range')).toBeTruthy();
    });

    it('should add faded class', () => {
      fixture.componentRef.setInput('rangeMode', true);

      fixture.componentRef.setInput('selectedRange', {
        dateFrom: NgbDate.from({ year: 2025, month: 1, day: 3 }),
        dateTo: NgbDate.from({ year: 2025, month: 1, day: 7 }),
      });

      syncViewModel(fixture);

      const day = getElementByCss(fixture, '[data-testid="dp-day"]').nativeElement as HTMLElement;

      expect(day.classList.contains('faded')).toBeTruthy();
    });
  });
});
