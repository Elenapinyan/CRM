import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { DsNumericInputComponent } from './numeric-input';

jest.useFakeTimers();

describe('NumericInputComponent', () => {
  let fixture: ComponentFixture<DsNumericInputComponent>;
  let component: DsNumericInputComponent;
  let componentRef: ComponentRef<DsNumericInputComponent>;
  let input: HTMLInputElement;

  const WRAPPER_SELECTOR = '[data-testid="numeric-input-wrapper"]';
  const INPUT_SELECTOR = '[data-testid="numeric-input"]';
  const PREFIX_SELECTOR = '[data-testid="numeric-prefix"]';
  const STEP_DOWN_BTN_SELECTOR = '[data-testid="step-down-button"]';
  const STEP_UP_BTN_SELECTOR = '[data-testid="step-up-button"]';
  const DESCRIPTION_SELECTOR = '[data-testid="numeric-description"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule, ClipboardModule, DsNumericInputComponent],
    });

    fixture = TestBed.createComponent(DsNumericInputComponent);

    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    input = getElementByCss(fixture, INPUT_SELECTOR).nativeElement;

    syncViewModel(fixture);
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should emit a blur event and mark the control as touched', () => {
      const spyOnCvaOnTouched = jest.spyOn(component as any, 'cvaOnTouched');
      const spyOnBlurEventEmit = jest.spyOn(component.blurEvent, 'emit');
      const testFocusEvent = new FocusEvent('inputBlur');

      component.onBlur(testFocusEvent);

      expect(spyOnCvaOnTouched).toHaveBeenCalledTimes(1);
      expect(spyOnBlurEventEmit).toHaveBeenCalledTimes(1);
      expect(spyOnBlurEventEmit).toHaveBeenCalledWith(testFocusEvent);
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

    it('Check step buttons', () => {
      const subtractButton: HTMLElement = getElementByCss(fixture, STEP_DOWN_BTN_SELECTOR).nativeElement;
      const addButton: HTMLElement = getElementByCss(fixture, STEP_UP_BTN_SELECTOR).nativeElement;

      addButton.click();
      expect(input.value).toBe('1');

      subtractButton.click();
      expect(input.value).toBe('0');

      subtractButton.click();
      expect(input.value).toBe('0');

      componentRef.setInput('isNegativeNumbersAcceptable', true);
      fixture.detectChanges();

      subtractButton.click();
      expect(input.value).toBe('-1');
    });

    it('should show/hide numeric prefix', () => {
      const MOCK_PREFIX = 'USD';

      componentRef.setInput('numericPrefix', MOCK_PREFIX);

      syncViewModel(fixture);

      const element = getElementByCss(fixture, PREFIX_SELECTOR).nativeElement;

      expect(element.textContent?.trim()).toBe(MOCK_PREFIX);

      componentRef.setInput('numericPrefix', '');

      syncViewModel(fixture);

      const element2 = getElementByCss(fixture, PREFIX_SELECTOR);

      expect(element2).toBeFalsy();
    });

    it('should react on the native input blur event', () => {
      syncViewModel(fixture);

      const spyOnBlurEvenHandler = jest.spyOn(component, 'onBlur');
      const testEvent = new Event('blur');
      input.dispatchEvent(testEvent);

      expect(spyOnBlurEvenHandler).toHaveBeenCalledWith(testEvent);
    });
  });
});
