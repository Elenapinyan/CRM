import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsMonthNavigation } from './month-navigation';
import { NgbDate, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { DropdownOption } from '../../../../shared';

const ngbDate = NgbDate.from({ year: 2025, month: 6, day: 6 });

const datepickerMock = {
  minDate: NgbDate.from({ year: 2025, month: 1, day: 1 }),
  maxDate: NgbDate.from({ year: 2025, month: 12, day: 31 }),
  calendar: {
    getToday: () => ngbDate,
    getMonths: (year?: number) => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  i18n: {
    getMonthShortName: (num: number) => 'month' + num,
  },
  state: {
    months: [NgbDate.from({ year: 2025, month: 6, day: 1 })],
    firstDate: NgbDate.from({ year: 2025, month: 6, day: 1 }),
  },
  dayTemplate: null,
  navigateTo: (date: NgbDate) => {},
} as unknown as NgbDatepicker;

describe('MonthNavigation', () => {
  let component: DsMonthNavigation;
  let fixture: ComponentFixture<DsMonthNavigation>;

  beforeAll(() => {
    Object.defineProperty(document, 'defaultView', {
      value: { CSS: { highlights: new Map() } },
      configurable: true,
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsMonthNavigation],
    });

    fixture = TestBed.createComponent(DsMonthNavigation);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('datepicker', datepickerMock);
    fixture.componentRef.setInput('month', datepickerMock.state.firstDate.month);
    fixture.componentRef.setInput('year', datepickerMock.state.firstDate.year);
    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have months', () => {
      expect(
        (component as any)
          .months()
          .map((y: DropdownOption) => y.value)
          .reverse(),
      ).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    });

    it('should have years', () => {
      expect((component as any).years().map((y: DropdownOption) => y.value)).toStrictEqual([2025]);
    });
  });
});
