import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { DsTwoOptionsSwitcherComponent } from './two-options-switcher.component';

describe('SprTwoOptionsSwitcher', () => {
  const MOCK_START_VALUE = '1';
  const MOCK_END_VALUE = '2';

  let component: DsTwoOptionsSwitcherComponent;
  let fixture: ComponentFixture<DsTwoOptionsSwitcherComponent>;
  let cvaOnChangeSpy: jest.SpyInstance;

  const ROOT_SELECTOR = '[data-testid="switcher-root"]';
  const INPUT_SELECTOR = '[data-testid="switcher-input"]';

  beforeEach(() => {
    TestBed.configureTestingModule({});

    fixture = TestBed.createComponent(DsTwoOptionsSwitcherComponent);

    component = fixture.componentInstance;

    fixture.componentRef.setInput('startValue', MOCK_START_VALUE);
    fixture.componentRef.setInput('endValue', MOCK_END_VALUE);

    cvaOnChangeSpy = jest.spyOn(component as any, 'cvaOnChange');
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should init control', () => {
      const control = (component as any).control as FormControl;

      expect(control).toBeTruthy();
    });

    describe('writeValue()', () => {
      let setSpy: jest.SpyInstance;
      beforeEach(() => {
        setSpy = jest.spyOn(component['control'], 'setValue');
      });

      it('should map startValue to false', () => {
        component.writeValue(MOCK_START_VALUE);

        expect(setSpy).toHaveBeenCalledWith(false, { emitEvent: false });
      });

      it('should map endValue to true', () => {
        component.writeValue(MOCK_END_VALUE);

        expect(setSpy).toHaveBeenCalledWith(true, { emitEvent: false });
      });

      it('should map unknown value to false', () => {
        const setSpy = jest.spyOn(component['control'], 'setValue');
        component.writeValue('other');
        expect(setSpy).toHaveBeenCalledWith(false, { emitEvent: false });
      });
    });

    describe('initControlListener()', () => {
      beforeEach(() => {
        (component as any).initControl();
        (component as any).initControlListener();
      });

      it('should emit startValue when control value is false', () => {
        (component as any).control.setValue(false);

        expect(cvaOnChangeSpy).toHaveBeenCalledWith(MOCK_START_VALUE);
      });

      it('should emit endValue when control value is true', () => {
        (component as any).control.setValue(true);

        expect(cvaOnChangeSpy).toHaveBeenCalledWith(MOCK_END_VALUE);
      });
    });

    it('should toggle control value', () => {
      const control = (component as any).control as FormControl;

      component.controlToggle(true);

      const trueValue = control.value;

      component.controlToggle(false);

      const falseValue = control.value;

      expect(trueValue).toBeTruthy();
      expect(falseValue).toBeFalsy();
    });
  });

  describe('View', () => {
    it('should disable', () => {
      const control = (component as any).control as FormControl;

      control.disable();

      syncViewModel(fixture);

      const divElement: HTMLElement = getElementByCss(fixture, ROOT_SELECTOR).nativeElement;

      expect(divElement.classList.contains('disabled')).toBeTruthy();
    });

    it('should add name and id to input', () => {
      const MOCK_INPUT_ID = 'test-id';

      fixture.componentRef.setInput('inputId', MOCK_INPUT_ID);

      syncViewModel(fixture);

      const inputElement: HTMLElement = getElementByCss(fixture, INPUT_SELECTOR).nativeElement;

      expect(inputElement.getAttribute('name')).toBe(MOCK_INPUT_ID);
      expect(inputElement.getAttribute('id')).toBe(MOCK_INPUT_ID);
    });
  });
});
