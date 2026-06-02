import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import Big from 'big.js';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { DsInputComponent } from './input.component';
import { By } from '@angular/platform-browser';

describe('SprInputComponent', () => {
  let fixture: ComponentFixture<DsInputComponent>;
  let component: DsInputComponent;
  let input: HTMLInputElement;

  const WRAPPER_SELECTOR = '[data-testid="input-wrapper"]';
  const INPUT_SELECTOR = '[data-testid="input-element"]';
  const PASSWORD_BTN_SELECTOR = '[data-testid="password-toggle-button"]';
  const ADDON_START_SELECTOR = '[data-testid="addon-start"]';
  const ADDON_END_SELECTOR = '[data-testid="addon-end"]';
  const PREPEND_SELECTOR = '[data-testid="input-prepend"]';
  const APPEND_SELECTOR = '[data-testid="input-append"]';
  const SUBMIT_BTN_SELECTOR = '[data-testid="submit-button"]';
  const DESCRIPTION_SELECTOR = '[data-testid="input-description"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule, ClipboardModule, DsInputComponent],
    });

    fixture = TestBed.createComponent(DsInputComponent);

    component = fixture.componentInstance;

    input = getElementByCss(fixture, INPUT_SELECTOR).nativeElement;

    syncViewModel(fixture);
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should change type from text to password', () => {
      expect(component.displayedInputType).toBe('text');

      fixture.componentRef.setInput('type', 'password');

      expect(component.displayedInputType).toBe('password');
    });

    it('should focus manually', () => {
      fixture.detectChanges();

      const focusSpy = jest.spyOn((component as any).inputElement(), 'focus');

      component.focus();

      expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    describe('convertValue()', () => {
      it('should return string if type is text', () => {
        fixture.componentRef.setInput('type', 'text');

        const MOCK_VALUE = 'Test Value 123';

        const result = (component as any).convertValue(MOCK_VALUE, component.type());

        expect(result).toBe(MOCK_VALUE);
      });

      it('should convert to number if type is number', () => {
        fixture.componentRef.setInput('type', 'number');

        const MOCK_VALUE = '1.3123';

        const result = (component as any).convertValue(MOCK_VALUE, component.type());

        expect(result).toBe(+MOCK_VALUE);
        expect(typeof result).toBe('number');
      });

      it('should convert to big.js number if type is bigNumber', () => {
        fixture.componentRef.setInput('type', 'bigNumber');

        const MOCK_VALUE = '1.12312312312321341';

        const result = (component as any).convertValue(MOCK_VALUE, component.type());

        expect(result).toBe(new Big(MOCK_VALUE).toFixed());
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
  });

  describe('View', () => {
    it('should set the value', () => {
      const MOCK_VALUE = 'test-value';
      const element = getElementByCss(fixture, INPUT_SELECTOR).nativeElement;

      component.writeValue(MOCK_VALUE);

      expect(element.value).toBe(MOCK_VALUE);
    });

    it('should show the password button', () => {
      fixture.componentRef.setInput('type', 'password');

      syncViewModel(fixture);

      const passwordButton = getElementByCss(fixture, PASSWORD_BTN_SELECTOR);

      expect(passwordButton).toBeTruthy();
    });

    it('should change control size to small', () => {
      const SM_CLASS = 'control-field--small';

      fixture.componentRef.setInput('controlSize', 'sm');

      syncViewModel(fixture);

      const div: HTMLElement = getElementByCss(fixture, WRAPPER_SELECTOR).nativeElement;

      expect(div.classList.contains(SM_CLASS)).toBeTruthy();
    });

    it('should add addons', () => {
      fixture.componentRef.setInput('addonStart', { icon: 'ds-icon-general-placeholder' });

      syncViewModel(fixture);

      let startAddon = getElementByCss(fixture, ADDON_START_SELECTOR);
      expect(startAddon).toBeTruthy();

      fixture.componentRef.setInput('addonEnd', { icon: 'ds-icon-general-placeholder' });

      syncViewModel(fixture);

      let endAddon = getElementByCss(fixture, ADDON_END_SELECTOR);
      expect(endAddon).toBeTruthy();
    });

    it('should add prepend', () => {
      fixture.componentRef.setInput('prepend', true);

      syncViewModel(fixture);

      const prepend = getElementByCss(fixture, PREPEND_SELECTOR).nativeElement;

      expect(prepend).toBeTruthy();
    });

    it('should add append', () => {
      fixture.componentRef.setInput('append', true);

      syncViewModel(fixture);

      const element = getElementByCss(fixture, APPEND_SELECTOR).nativeElement;

      expect(element).toBeTruthy();
    });

    it('should add append with type button', () => {
      fixture.componentRef.setInput('append', true);
      fixture.componentRef.setInput('appendType', 'button');

      syncViewModel(fixture);

      const wrapper = getElementByCss(fixture, APPEND_SELECTOR);
      const button = wrapper.query(By.css('ds-button'));

      expect(button).toBeTruthy();
    });

    it('should add placeholder', () => {
      const PLACEHOLDER = 'test-placeholder';

      fixture.componentRef.setInput('placeholder', PLACEHOLDER);

      syncViewModel(fixture);

      expect(input.placeholder).toBe(PLACEHOLDER);
    });

    it('should add submit button', () => {
      fixture.componentRef.setInput('isSubmitStrategy', true);

      syncViewModel(fixture);

      const button = getElementByCss(fixture, SUBMIT_BTN_SELECTOR).nativeElement;

      expect(button).toBeTruthy();
    });

    it('should toggle password visibility', () => {
      fixture.componentRef.setInput('type', 'password');

      syncViewModel(fixture);

      const v1 = input.type;

      component.togglePasswordVisibility();

      syncViewModel(fixture);

      const v2 = input.type;

      expect(v1).toBe('password');
      expect(v2).toBe('text');
    });

    it('should accept negative numbers', () => {
      const NEGATIVE = -1;

      fixture.componentRef.setInput('type', 'number');
      fixture.componentRef.setInput('isNegativeNumbersAcceptable', true);

      fixture.detectChanges();

      input.value = NEGATIVE.toString();
      input.dispatchEvent(new Event('input'));

      expect(input.value).toBe(NEGATIVE.toString());
    });

    it('should not accept negative numbers', () => {
      const NEGATIVE = -1;
      const POSITIVE = 1;

      fixture.componentRef.setInput('type', 'number');
      fixture.componentRef.setInput('isNegativeNumbersAcceptable', false);

      fixture.detectChanges();

      input.value = NEGATIVE.toString();
      input.dispatchEvent(new Event('input'));

      expect(input.value).toBe(POSITIVE.toString());
    });

    it('should change a precision', () => {
      const VALUE_P1 = 1.25;
      const VALUE_P2 = 1.218;

      fixture.componentRef.setInput('type', 'number');
      fixture.componentRef.setInput('precision', 1);

      fixture.detectChanges();

      input.value = VALUE_P1.toString();
      input.dispatchEvent(new Event('input'));

      const v1 = input.value;

      fixture.componentRef.setInput('precision', 2);

      fixture.detectChanges();

      input.value = VALUE_P2.toString();
      input.dispatchEvent(new Event('input'));

      const v2 = input.value;

      expect(v1).toBe(VALUE_P1.toString().slice(0, -1));
      expect(v2).toBe(VALUE_P2.toString().slice(0, -1));
    });

    it('should remove fractional numbers if onlyInteger', () => {
      const FRACTIONAL_VALUE = 1.21;
      const RESULT_VALUE = 1;

      fixture.componentRef.setInput('type', 'number');
      fixture.componentRef.setInput('onlyInteger', true);

      fixture.detectChanges();

      input.value = FRACTIONAL_VALUE.toString();
      input.dispatchEvent(new Event('input'));

      syncViewModel(fixture);

      expect(input.value).toBe(RESULT_VALUE.toString());
    });

    it('should show description', () => {
      const MOCK_DESCRIPTION = 'description';

      component.description = MOCK_DESCRIPTION;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, DESCRIPTION_SELECTOR).nativeElement;

      expect(element.textContent?.trim()).toBe(MOCK_DESCRIPTION);
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
