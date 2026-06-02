import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import Big from 'big.js';
import { getElementByCss, getElementsByCss, syncViewModel } from '../../shared/utils';
import { SprInputComponent } from './spr-input.component';

describe('SprInputComponent', () => {
  let fixture: ComponentFixture<SprInputComponent>;
  let component: SprInputComponent;
  let input: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule, ClipboardModule, SprInputComponent],
    });

    fixture = TestBed.createComponent(SprInputComponent);

    component = fixture.componentInstance;

    input = getElementByCss(fixture, '.form-field__input').nativeElement;

    syncViewModel(fixture);
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should change type from text to password', () => {
      expect(component.displayedInputType).toBe('text');

      component.type = 'password';

      expect(component.displayedInputType).toBe('password');
    });

    it('should focus manually', () => {
      fixture.detectChanges();

      const focusSpy = jest.spyOn(component.inputElement.nativeElement, 'focus');

      component.focus();

      expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    describe('convertValue()', () => {
      it('should return string if type is text', () => {
        component.type = 'text';

        const MOCK_VALUE = 'Test Value 123';

        const result = (component as any).convertValue(MOCK_VALUE, component.type);

        expect(result).toBe(MOCK_VALUE);
      });

      it('should convert to number if type is number', () => {
        component.type = 'number';

        const MOCK_VALUE = '1.3123';

        const result = (component as any).convertValue(MOCK_VALUE, component.type);

        expect(result).toBe(+MOCK_VALUE);
        expect(typeof result).toBe('number');
      });

      it('should convert to big.js number if type is bigNumber', () => {
        component.type = 'bigNumber';

        const MOCK_VALUE = '1.12312312312321341';

        const result = (component as any).convertValue(MOCK_VALUE, component.type);

        expect(result).toBe(new Big(MOCK_VALUE).toFixed());
      });
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
      const MOCK_VALUE = 'test-value';
      const element = getElementByCss(fixture, '.form-field__input').nativeElement;

      component.writeValue(MOCK_VALUE);

      expect(element.value).toBe(MOCK_VALUE);
    });

    it('should show the password button', () => {
      component.type = 'password';

      syncViewModel(fixture);

      const passwordButton = getElementByCss(fixture, '.form-field__password-button');

      expect(passwordButton).toBeTruthy();
    });

    it('should change control size to small', () => {
      const SM_CLASS = 'control-form--small';

      component.controlSize = 'sm';

      syncViewModel(fixture);

      const div: HTMLElement = getElementByCss(fixture, '.form-field').nativeElement;

      expect(div.classList.contains(SM_CLASS)).toBeTruthy();
    });

    it('should add addons', () => {
      component.addonStart = { icon: 'bo-icon-general-placeholder' };

      syncViewModel(fixture);

      let addons = getElementsByCss(fixture, '.form-field__addon');

      expect(addons.length).toBe(1);

      component.addonEnd = { icon: 'bo-icon-general-placeholder' };

      syncViewModel(fixture);

      addons = getElementsByCss(fixture, '.form-field__addon');

      expect(addons.length).toBe(2);
    });

    it('should add prepend', () => {
      component.prepend = true;

      syncViewModel(fixture);

      const prepend = getElementByCss(fixture, '.form-field__prepend').nativeElement;

      expect(prepend).toBeTruthy();
    });

    it('should add append', () => {
      component.append = true;

      syncViewModel(fixture);

      const prepend = getElementByCss(fixture, '.form-field__append').nativeElement;

      expect(prepend).toBeTruthy();
    });

    it('should add placeholder', () => {
      const PLACEHOLDER = 'test-placeholder';

      component.placeholder = PLACEHOLDER;

      syncViewModel(fixture);

      expect(input.placeholder).toBe(PLACEHOLDER);
    });

    it('should add submit button', () => {
      component.isSubmitStrategy = true;

      syncViewModel(fixture);

      const button = getElementByCss(fixture, '.form-field__submit-button').nativeElement;

      expect(button).toBeTruthy();
    });

    it('should toggle password visibility', () => {
      component.type = 'password';

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

      component.type = 'number';

      component.isNegativeNumbersAcceptable = true;

      fixture.detectChanges();

      input.value = NEGATIVE.toString();
      input.dispatchEvent(new Event('input'));

      expect(input.value).toBe(NEGATIVE.toString());
    });

    it('should not accept negative numbers', () => {
      const NEGATIVE = -1;
      const POSITIVE = 1;

      component.type = 'number';

      component.isNegativeNumbersAcceptable = false;

      fixture.detectChanges();

      input.value = NEGATIVE.toString();
      input.dispatchEvent(new Event('input'));

      expect(input.value).toBe(POSITIVE.toString());
    });

    it('should change a precision', () => {
      const VALUE_P1 = 1.25;
      const VALUE_P2 = 1.218;

      component.type = 'number';

      component.precision = 1;

      fixture.detectChanges();

      input.value = VALUE_P1.toString();
      input.dispatchEvent(new Event('input'));

      const v1 = input.value;

      component.precision = 2;

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

      component.type = 'number';
      component.onlyInteger = true;

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

      const element: HTMLElement = getElementByCss(fixture, 'spr-field-description > .form-input-description').nativeElement;

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
