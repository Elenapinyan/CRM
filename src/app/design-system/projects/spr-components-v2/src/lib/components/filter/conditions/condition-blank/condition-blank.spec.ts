import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsConditionBlank } from './condition-blank';
import { BlankConditionOperator, ConditionExtendedTypes } from '../conditions.util';
import { getElementByCss } from '../../../../shared/utils';

describe('ConditionsFilterBlank', () => {
  let component: DsConditionBlank;
  let fixture: ComponentFixture<DsConditionBlank>;

  const SELECTOR_EQUALS = '[data-testid="condition-equals"]';
  const SELECTOR_CONTAINS = '[data-testid="condition-contains"]';
  const SELECTOR_BETWEEN = '[data-testid="condition-between"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsConditionBlank],
    });

    fixture = TestBed.createComponent(DsConditionBlank);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should emit value changes', () => {
      const mockConditionValue = {
        from: 1,
        to: 10,
      };

      const mockResultValue = {
        operator: BlankConditionOperator.OR,
        condition: ConditionExtendedTypes.EQUALS,
        conditionValue: mockConditionValue,
      };

      (component as any).form.controls.conditionValue.patchValue(mockConditionValue);

      expect((component as any).value()).toStrictEqual(mockResultValue);
    });

    it('should get value from writeValue method', () => {
      const mockValue = {
        operator: BlankConditionOperator.OR,
        condition: ConditionExtendedTypes.BETWEEN,
        conditionValue: {
          from: 1,
          to: 10,
        },
      };

      component.writeValue(mockValue);

      expect((component as any).form.getRawValue()).toStrictEqual(mockValue);
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
  });
});
