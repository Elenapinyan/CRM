import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsConditionEquals } from './condition-equals';
import { ConditionFilterType } from '../conditions.util';
import { getElementByCss } from '../../../../shared/utils';

describe('ConditionsFilterEquals', () => {
  let component: DsConditionEquals;
  let fixture: ComponentFixture<DsConditionEquals>;

  const SELECTOR_DATE = '[data-testid="date"]';
  const SELECTOR_TEXT = '[data-testid="text"]';
  const SELECTOR_NUMERIC = '[data-testid="numeric"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsConditionEquals],
    });

    fixture = TestBed.createComponent(DsConditionEquals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('View', () => {
    it('should show text control', () => {
      fixture.componentRef.setInput('type', ConditionFilterType.TEXT);

      fixture.detectChanges();

      const element = getElementByCss(fixture, SELECTOR_TEXT);

      expect(element).toBeTruthy();
    });

    it('should show numeric control', () => {
      fixture.componentRef.setInput('type', ConditionFilterType.NUMERIC);

      fixture.detectChanges();

      const element = getElementByCss(fixture, SELECTOR_NUMERIC);

      expect(element).toBeTruthy();
    });

    it('should show date control', () => {
      fixture.componentRef.setInput('type', ConditionFilterType.DATE);

      fixture.detectChanges();

      const element = getElementByCss(fixture, SELECTOR_DATE);

      expect(element).toBeTruthy();
    });
  });
});
