import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsConditions } from './conditions';
import { ConditionExtendedTypes } from './conditions.util';
import { getElementByCss } from '../../../shared/utils';

describe('ConditionsFilter', () => {
  let component: DsConditions;
  let fixture: ComponentFixture<DsConditions>;

  const MOCK_EQUALS_VALUE = {
    condition: ConditionExtendedTypes.EQUALS,
    conditionValue: 'something',
  };

  const SELECTOR_EQUALS = '[data-testid="condition-equals"]';
  const SELECTOR_CONTAINS = '[data-testid="condition-contains"]';
  const SELECTOR_BETWEEN = '[data-testid="condition-between"]';
  const SELECTOR_BLANK = '[data-testid="condition-blank"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsConditions],
    });

    fixture = TestBed.createComponent(DsConditions);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should apply value automatically', () => {
      (component as any).form.patchValue(MOCK_EQUALS_VALUE);

      expect((component as any).value()).toStrictEqual(MOCK_EQUALS_VALUE);
    });

    it('should apply value manually', () => {
      component.disableAutoApply(true);

      (component as any).form.patchValue(MOCK_EQUALS_VALUE);

      component.apply();

      expect((component as any).value()).toStrictEqual(MOCK_EQUALS_VALUE);
    });

    it('should not apply value when auto apply disabled', () => {
      component.disableAutoApply(true);

      (component as any).form.patchValue(MOCK_EQUALS_VALUE);

      expect((component as any).value()).toBe(null);
    });

    it('should reset value', () => {
      (component as any).form.patchValue(MOCK_EQUALS_VALUE);

      component.resetValue();

      expect((component as any).value()).toBe(null);
    });

    it('should generate filter value', () => {
      const filterValue = (component as any).prettifyFilterValue(MOCK_EQUALS_VALUE);

      (component as any).form.patchValue(MOCK_EQUALS_VALUE);

      expect((component as any).filterValue()).toBe(filterValue);
    });
  });

  describe('View', () => {
    it('should show equals filter', () => {
      (component as any).form.controls.condition.patchValue(ConditionExtendedTypes.EQUALS);

      fixture.detectChanges();

      const element = getElementByCss(fixture, SELECTOR_EQUALS);

      expect(element).toBeTruthy();
    });

    it('should show contains filter', () => {
      (component as any).form.controls.condition.patchValue(ConditionExtendedTypes.CONTAINS);

      fixture.detectChanges();

      const element = getElementByCss(fixture, SELECTOR_CONTAINS);

      expect(element).toBeTruthy();
    });

    it('should show between filter', () => {
      (component as any).form.controls.condition.patchValue(ConditionExtendedTypes.BETWEEN);

      fixture.detectChanges();

      const element = getElementByCss(fixture, SELECTOR_BETWEEN);

      expect(element).toBeTruthy();
    });

    it('should show blank filter', () => {
      (component as any).form.controls.condition.patchValue(ConditionExtendedTypes.BLANK);

      fixture.detectChanges();

      const element = getElementByCss(fixture, SELECTOR_BLANK);

      expect(element).toBeTruthy();
    });
  });
});
