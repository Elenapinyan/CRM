import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { DsCurrencyInputComponent } from './currency-input';

jest.useFakeTimers();

describe('CurrencyInputComponent', () => {
  let fixture: ComponentFixture<DsCurrencyInputComponent>;
  let component: DsCurrencyInputComponent;
  let componentRef: ComponentRef<DsCurrencyInputComponent>;
  let input: HTMLInputElement;

  const WRAPPER_SELECTOR = '[data-testid="currency-input-wrapper"]';
  const INPUT_SELECTOR = '[data-testid="currency-input"]';
  const PREFIX_SELECTOR = '[data-testid="currency-prefix"]';
  const SUFFIX_SELECTOR = '[data-testid="currency-suffix"]';
  const DESCRIPTION_SELECTOR = '[data-testid="currency-description"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule, ClipboardModule, DsCurrencyInputComponent],
    });

    fixture = TestBed.createComponent(DsCurrencyInputComponent);

    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    input = getElementByCss(fixture, INPUT_SELECTOR).nativeElement;

    syncViewModel(fixture);
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should set the value', () => {
      const MOCK_VALUE = '123';

      component.writeValue(MOCK_VALUE);

      expect(input.value).toBe(MOCK_VALUE);
    });

    it('should change control size to small', () => {
      const SM_CLASS = 'control-field--small';

      component.controlSize = 'sm';

      syncViewModel(fixture);

      const div: HTMLElement = getElementByCss(fixture, WRAPPER_SELECTOR).nativeElement;

      expect(div.classList.contains(SM_CLASS)).toBeTruthy();
    });

    it('should add placeholder', () => {
      const PLACEHOLDER = 'test-placeholder';

      componentRef.setInput('placeholder', PLACEHOLDER);

      syncViewModel(fixture);

      expect(input.placeholder).toBe(PLACEHOLDER);
    });

    it('should accept negative numbers', () => {
      const NEGATIVE = '-1';

      componentRef.setInput('isNegativeNumbersAcceptable', true);

      fixture.detectChanges();

      input.value = NEGATIVE;
      input.dispatchEvent(new Event('input'));

      expect(input.value).toBe(NEGATIVE);
    });

    it('should not accept negative numbers', () => {
      const NEGATIVE = '-1';
      const POSITIVE = '1';

      componentRef.setInput('isNegativeNumbersAcceptable', false);

      fixture.detectChanges();

      input.value = NEGATIVE;
      input.dispatchEvent(new Event('input'));

      expect(input.value).toBe(POSITIVE);
    });

    it('should change a precision', () => {
      const VALUE_P1 = '1.25';
      const VALUE_P2 = '1.218';

      componentRef.setInput('precision', 1);

      fixture.detectChanges();

      input.value = VALUE_P1;
      input.dispatchEvent(new Event('input'));

      const v1 = input.value;

      componentRef.setInput('precision', 2);

      fixture.detectChanges();

      input.value = VALUE_P2;
      input.dispatchEvent(new Event('input'));

      const v2 = input.value;

      expect(v1).toBe(VALUE_P1.slice(0, -1));
      expect(v2).toBe(VALUE_P2.slice(0, -1));
    });

    it('should remove fractional numbers if precision 0', () => {
      const FRACTIONAL_VALUE = '1.21';
      const RESULT_VALUE = '1';

      componentRef.setInput('precision', 0);

      fixture.detectChanges();

      input.value = FRACTIONAL_VALUE;
      input.dispatchEvent(new Event('input'));

      syncViewModel(fixture);

      expect(input.value).toBe(RESULT_VALUE);
    });

    it('should show description', () => {
      const MOCK_DESCRIPTION = 'description';

      component.description = MOCK_DESCRIPTION;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, DESCRIPTION_SELECTOR).nativeElement;

      expect(element.textContent?.trim()).toBe(MOCK_DESCRIPTION);
    });

    it('should show/hide currencyPrefix', () => {
      const MOCK_PREFIX = '€';

      componentRef.setInput('currencyPrefix', MOCK_PREFIX);

      syncViewModel(fixture);

      const element = getElementByCss(fixture, PREFIX_SELECTOR)?.nativeElement;

      expect(element.textContent?.trim()).toBe(MOCK_PREFIX);

      componentRef.setInput('currencyPrefix', '');

      syncViewModel(fixture);

      const element2 = getElementByCss(fixture, PREFIX_SELECTOR);

      expect(element2).toBeFalsy();
    });

    it('should show/hide currencySuffix', () => {
      const MOCK_SUFFIX = '€';

      componentRef.setInput('currencySuffix', MOCK_SUFFIX);

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, SUFFIX_SELECTOR)?.nativeElement;

      expect(element.textContent?.trim()).toBe(MOCK_SUFFIX);

      componentRef.setInput('currencySuffix', '');

      syncViewModel(fixture);

      const element2 = getElementByCss(fixture, SUFFIX_SELECTOR);

      expect(element2).toBeFalsy();
    });
  });
});
