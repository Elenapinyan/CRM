import { ChangeDetectionStrategy, Component, ComponentRef, forwardRef, input } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AmountPicker } from './amount-picker';
import { DsCurrencyInputComponent } from '../currency-input';
import { DsSlider } from '../slider';
import { AmountPickerValue } from './amount-picker.options';

@Component({
  selector: 'ds-currency-input',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputStub),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CurrencyInputStub implements ControlValueAccessor {
  readonly currencyPrefix = input<string>();
  readonly currencySuffix = input<string>();
  readonly precision = input<number>();
  readonly disabled = input(false);

  writeValue(): void {}
  registerOnChange(): void {}
  registerOnTouched(): void {}
  setDisabledState(): void {}
}

@Component({
  selector: 'ds-slider',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderStub),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SliderStub implements ControlValueAccessor {
  readonly isRange = input<boolean>();
  readonly min = input<number>();
  readonly max = input<number>();
  readonly step = input<number>();
  readonly disabled = input(false);
  readonly showMinMaxLabels = input<boolean>();

  writeValue(): void {}
  registerOnChange(): void {}
  registerOnTouched(): void {}
  setDisabledState(): void {}
}

describe('AmountPicker', () => {
  let fixture: ComponentFixture<AmountPicker>;
  let component: AmountPicker;
  let componentRef: ComponentRef<AmountPicker>;

  const START_INPUT_SELECTOR = '[data-testid="start-input"]';
  const END_INPUT_SELECTOR = '[data-testid="end-input"]';
  const SLIDER_SELECTOR = '[data-testid="slider"]';

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AmountPicker, FormsModule],
    }).overrideComponent(AmountPicker, {
      remove: { imports: [DsCurrencyInputComponent, DsSlider] },
      add: { imports: [CurrencyInputStub, SliderStub] },
    });

    fixture = TestBed.createComponent(AmountPicker);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    fixture.detectChanges();

    const spy = jest.fn();
    component.registerOnChange(spy);
    component.onChange = spy;
  });

  describe('Model', () => {
    it('should initialize with default values [0, 100]', () => {
      expect(component['startValue']()).toBe(0);
      expect(component['endValue']()).toBe(100);
    });
  });

  describe('ControlValueAccessor (Interaction with Parent)', () => {
    it('Check valid value from parent', fakeAsync(() => {
      const val: AmountPickerValue = [20, 80];
      component.writeValue(val);
      fixture.detectChanges();

      expect(component['startValue']()).toBe(20);
      expect(component['endValue']()).toBe(80);
    }));

    it('Check null value from parent (should reset to min/max)', fakeAsync(() => {
      component.writeValue([20, 80]);
      fixture.detectChanges();

      component.writeValue(null);
      fixture.detectChanges();

      expect(component['startValue']()).toBe(component.min());
      expect(component['endValue']()).toBe(component.max());
    }));
  });

  describe('Logic & Validation', () => {
    const simulateStartInput = (val: string): void => {
      component['onStartInputChange'](val);
    };

    const simulateEndInput = (val: string): void => {
      component['onEndInputChange'](val);
    };

    it('Check start input clamping (cannot be less than min)', fakeAsync(() => {
      componentRef.setInput('min', 10);
      fixture.detectChanges();

      simulateStartInput('0');

      tick(800);
      fixture.detectChanges();

      expect(component['startValue']()).toBe(10);
      expect(component.onChange).toHaveBeenCalledWith([10, 100]);
    }));

    it('Check start input allows crossing end value during typing', fakeAsync(() => {
      component['startValue'].set(0);
      component['endValue'].set(50);
      fixture.detectChanges();

      simulateStartInput('60');

      tick(800);
      fixture.detectChanges();

      expect(component['startValue']()).toBe(50);
      expect(component.onChange).toHaveBeenCalledWith([50, 50]);
    }));

    it('Check end input clamping (cannot be more than max)', fakeAsync(() => {
      componentRef.setInput('max', 200);
      fixture.detectChanges();

      simulateEndInput('300');

      tick(800);
      fixture.detectChanges();

      expect(component['endValue']()).toBe(200);
      expect(component.onChange).toHaveBeenCalledWith([0, 200]);
    }));

    it('Check end input allows crossing start value during typing', fakeAsync(() => {
      component['startValue'].set(50);
      component['endValue'].set(100);
      fixture.detectChanges();

      simulateEndInput('20');

      tick(800);
      fixture.detectChanges();

      expect(component['endValue']()).toBe(20);
    }));

    it('Check blur corrects values (sanity check)', () => {
      component['startValue'].set(60);
      component['endValue'].set(50);
      fixture.detectChanges();

      component['startInputModel']()?.control.setValue(60);
      component['endInputModel']()?.control.setValue(50);

      component['onBlur']();

      expect(component['startValue']()).toBe(50);
      expect(component['endValue']()).toBe(50);
      expect(component.onChange).toHaveBeenCalledWith([50, 50]);
    });

    it('Check slider interaction updates signals', () => {
      component['onSliderChange']([30, 70]);
      fixture.detectChanges();

      expect(component['startValue']()).toBe(30);
      expect(component['endValue']()).toBe(70);
      expect(component.onChange).toHaveBeenCalledWith([30, 70]);
    });
  });

  describe('View Rendering', () => {
    it('should pass disabled state to children', fakeAsync(() => {
      component.setDisabledState(true);
      fixture.detectChanges();

      expect(component['isDisabled']()).toBe(true);

      const startInputDebugElement = fixture.debugElement.query(By.css(START_INPUT_SELECTOR));
      const endInputDebugElement = fixture.debugElement.query(By.css(END_INPUT_SELECTOR));
      const sliderDebugElement = fixture.debugElement.query(By.css(SLIDER_SELECTOR));

      expect(startInputDebugElement.componentInstance.disabled()).toBe(true);
      expect(endInputDebugElement.componentInstance.disabled()).toBe(true);
      expect(sliderDebugElement.componentInstance.disabled()).toBe(true);
    }));

    it('should update signal when child component emits change', fakeAsync(() => {
      const startInputDe = fixture.debugElement.query(By.css(START_INPUT_SELECTOR));

      startInputDe.triggerEventHandler('ngModelChange', 55);

      tick(800);
      fixture.detectChanges();

      expect(component['startValue']()).toBe(55);
    }));
  });
});
