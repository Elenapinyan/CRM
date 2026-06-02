import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodVariants, PeriodVariantType } from '../datepicker.util';
import { DsDatepickerPeriods } from './datepicker-periods';
import { DropdownOption } from '../../../shared';
import { getElementByCss, getElementsByCss } from '../../../shared/utils';

describe('DatepickerPeriods', () => {
  let component: DsDatepickerPeriods;
  let fixture: ComponentFixture<DsDatepickerPeriods>;

  const OPTIONS_MOCK: DropdownOption[] = [
    {
      text: 'Today',
      value: PeriodVariants.Today,
    },
    {
      text: 'Yesterday',
      value: PeriodVariants.Yesterday,
    },
    {
      text: 'Last 7 days',
      value: PeriodVariants.LastSevenDays,
    },
    {
      text: 'This month',
      value: PeriodVariants.ThisMonth,
    },
    {
      text: 'Last Month',
      value: PeriodVariants.LastMonth,
    },
    {
      text: 'Last Year',
      value: PeriodVariants.LastYear,
    },
    {
      text: 'Lifetime',
      value: PeriodVariants.Lifetime,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsDatepickerPeriods],
    });

    fixture = TestBed.createComponent(DsDatepickerPeriods);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('list', OPTIONS_MOCK);

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should render list', () => {
      const items = getElementsByCss(fixture, '[data-testid="dp-period-item"]');

      expect(items.length).toBe(OPTIONS_MOCK.length);
    });

    it('should add active class', () => {
      fixture.componentRef.setInput('selectedPeriod', OPTIONS_MOCK[0].value as PeriodVariantType);

      fixture.detectChanges();

      const item = getElementByCss(fixture, '.datepicker-periods__button--active[data-testid="dp-period-item"]');

      expect(item).toBeTruthy();
    });
  });
});
