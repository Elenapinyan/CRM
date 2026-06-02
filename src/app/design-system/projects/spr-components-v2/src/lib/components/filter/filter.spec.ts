import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { DsFilter } from './filter';
import { FilterValueAccessor, getElementByCss, SPR_FILTER_ACCESSOR } from '../../shared/utils';
import { MenuDirective } from '../../shared';
import { MockMenuDirective } from '../../shared/directives/menu/__mocks__';

const filterMock: FilterValueAccessor = {
  apply: jest.fn(),
  resetValue: jest.fn(),
  disableAutoApply: jest.fn(),
  filterValue: signal('SomeValue'),
};

describe('Filters', () => {
  let component: DsFilter;
  let fixture: ComponentFixture<DsFilter>;

  const SELECTOR_TOGGLE_UTIL = '[data-testid="toggle-icon"]';
  const SELECTOR_VALUE = '[data-testid="value"]';
  const SELECTOR_NOT_SELECTED = '[data-testid="value-not-selected"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsFilter, MockMenuDirective],
      providers: [{ provide: SPR_FILTER_ACCESSOR, useValue: jest.fn() }],
    }).overrideComponent(DsFilter, {
      remove: {
        imports: [MenuDirective],
      },
      add: {
        imports: [MockMenuDirective],
      },
    });

    fixture = TestBed.createComponent(DsFilter);

    fixture.componentRef.setInput('label', 'Label');

    component = fixture.componentInstance;

    // overwrite child with mock because it's a contentChild signal
    (component as any).child = signal(filterMock);

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should compute string value', () => {
      const mockValue = 'Test';

      (component as any).child().filterValue.set(mockValue);

      expect((component as any).value()).toBe(mockValue);
    });

    it('should compute string[] value', () => {
      const mockValues = ['Test1', 'Test2'];

      (component as any).child().filterValue.set(mockValues);

      expect((component as any).value()).toBe(mockValues.join(', '));
    });

    it('should compute string[] value according to maxValuesDisplay', () => {
      const mockValues = ['Test1', 'Test2', 'Test3', 'Test4'];

      (component as any).child().filterValue.set(mockValues);

      expect((component as any).value()).toBe('Test1, Test2, Test3 +1');
    });

    it('should apply changes', () => {
      const spy = jest.spyOn((component as any).child(), 'apply');

      component.apply();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should reset changes', () => {
      const spy = jest.spyOn((component as any).child(), 'resetValue');

      component.resetValue();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should disable auto apply', () => {
      fixture.componentRef.setInput('footer', true);

      const spy = jest.spyOn((component as any).child(), 'disableAutoApply');

      expect(spy).toHaveBeenCalledWith(true);
    });

    it('should not disable auto apply', () => {
      fixture.componentRef.setInput('footer', false);

      fixture.detectChanges();

      const spy = jest.spyOn((component as any).child(), 'disableAutoApply');

      expect(spy).toHaveBeenCalledWith(false);
    });
  });

  describe('View', () => {
    it('should show selected value', () => {
      fixture.detectChanges();

      const element = getElementByCss(fixture, SELECTOR_VALUE);

      expect(element).toBeTruthy();
    });

    it('should show NotSelected when value is empty', () => {
      (component as any).child().filterValue.set('');

      fixture.detectChanges();

      const element = getElementByCss(fixture, SELECTOR_NOT_SELECTED);

      expect(element).toBeTruthy();
    });
  });
});
