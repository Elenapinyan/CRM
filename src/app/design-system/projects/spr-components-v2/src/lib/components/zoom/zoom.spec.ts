import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElementByCss } from '../../shared/utils';
import { Zoom } from './zoom';
import { WritableSignal } from '@angular/core';

describe('SprZoomComponent', () => {
  let fixture: ComponentFixture<Zoom>;
  let component: Zoom;
  let value: WritableSignal<number>;

  let MOCK_VALUE = 3;
  let MOCK_MIN = 2;
  let MOCK_MAX = 4;
  let MOCK_UNIT = '%';

  const DECREASE_BTN_SELECTOR = '[data-testid="zoom-decrease-btn"]';
  const INCREASE_BTN_SELECTOR = '[data-testid="zoom-increase-btn"]';
  const INPUT_SELECTOR = '[data-testid="zoom-input"]';
  const DISPLAY_SELECTOR = '[data-testid="zoom-value-display"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(Zoom);

    component = fixture.componentInstance;

    fixture.componentRef.setInput('min', MOCK_MIN);
    fixture.componentRef.setInput('max', MOCK_MAX);
    fixture.componentRef.setInput('unit', MOCK_UNIT);

    value = (component as any).value;
    value.set(MOCK_VALUE);

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should increase value', () => {
      component.increase();

      fixture.detectChanges();

      expect(value()).toBe(MOCK_VALUE + 1);
    });

    it('should decrease value', () => {
      component.decrease();

      fixture.detectChanges();

      expect(value()).toBe(MOCK_VALUE - 1);
    });

    it('should increase value not more than max', () => {
      component.increase();
      component.increase();
      component.increase();

      fixture.detectChanges();

      expect(value()).toBe(MOCK_MAX);
    });

    it('should decrease value not less than min', () => {
      component.decrease();
      component.decrease();
      component.decrease();

      fixture.detectChanges();

      expect(value()).toBe(MOCK_MIN);
    });
  });

  describe('View', () => {
    it('should have value displayed', () => {
      const element = getElementByCss(fixture, DISPLAY_SELECTOR).nativeElement;

      fixture.detectChanges();

      expect(element.textContent?.trim()).toBe(MOCK_VALUE + ' ' + MOCK_UNIT);
    });

    it('should increase value when click on button', () => {
      const spy = jest.spyOn(component, 'increase');
      const btnElement = getElementByCss(fixture, INCREASE_BTN_SELECTOR).nativeElement;

      btnElement.dispatchEvent(new Event('click'));

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should decrease value when click on button', () => {
      const spy = jest.spyOn(component, 'decrease');
      const btnElement = getElementByCss(fixture, DECREASE_BTN_SELECTOR).nativeElement;

      btnElement.dispatchEvent(new Event('click'));

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call inputValueChanged value when input value', () => {
      const spy = jest.spyOn(component, 'inputValueChanged');

      const inputElement = getElementByCss(fixture, `${INPUT_SELECTOR} input`).nativeElement;

      inputElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call updateValue on blur', () => {
      const spy = jest.spyOn(component, 'updateValue');

      const inputElement = getElementByCss(fixture, `${INPUT_SELECTOR} input`).nativeElement;

      inputElement.dispatchEvent(new Event('blur'));

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
