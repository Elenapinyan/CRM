import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { DsSlider } from './slider';

describe('Slider', () => {
  let fixture: ComponentFixture<DsSlider>;
  let component: DsSlider;
  let componentRef: ComponentRef<DsSlider>;

  const CONFIGURATION_ERROR_SELECTOR = '[data-testid="configuration-error"]';
  const TICK_MARKS_SELECTOR = '[data-testid="tick-marks"]';
  const MIN_MAX_LABELS_SELECTOR = '[data-testid="min-max-labels"';
  const END_INPUT_SELECTOR = '[data-testid="end-input"]';
  const START_INPUT_SELECTOR = '[data-testid="start-input"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsSlider],
    });

    jest.spyOn(console, 'error').mockImplementation(() => {});

    fixture = TestBed.createComponent(DsSlider);

    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    syncViewModel(fixture);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('Check valid min/max/range', () => {
      expect(getElementByCss(fixture, CONFIGURATION_ERROR_SELECTOR)).toBeFalsy();
    });

    it('Check invalid min', () => {
      componentRef.setInput('min', component.max() + 1);
      fixture.detectChanges();

      expect(getElementByCss(fixture, CONFIGURATION_ERROR_SELECTOR)).toBeTruthy();
    });

    it('Check invalid max', () => {
      componentRef.setInput('max', component.min() - 1);
      fixture.detectChanges();

      expect(getElementByCss(fixture, CONFIGURATION_ERROR_SELECTOR)).toBeTruthy();
    });

    it('Check invalid step (more then max)', () => {
      componentRef.setInput('max', 10);
      componentRef.setInput('step', 100);
      fixture.detectChanges();

      expect(getElementByCss(fixture, CONFIGURATION_ERROR_SELECTOR)).toBeTruthy();
    });

    it('Check invalid step (less then 0)', () => {
      componentRef.setInput('step', 0);
      fixture.detectChanges();

      expect(getElementByCss(fixture, CONFIGURATION_ERROR_SELECTOR)).toBeTruthy();
    });

    it('Check invalid value from parent', () => {
      component.writeValue(1000);
      fixture.detectChanges();
      expect(getElementByCss(fixture, END_INPUT_SELECTOR)?.nativeElement.value).toEqual(component.max() + '');

      component.writeValue(-1000);
      fixture.detectChanges();
      expect(getElementByCss(fixture, END_INPUT_SELECTOR)?.nativeElement.value).toEqual(component.min() + '');
    });

    it('Check invalid range from parent', () => {
      componentRef.setInput('isRange', true);
      fixture.detectChanges();

      component.writeValue([-100, 1000]);
      fixture.detectChanges();
      expect(getElementByCss(fixture, END_INPUT_SELECTOR)?.nativeElement.value).toEqual(component.max() + '');
      expect(getElementByCss(fixture, START_INPUT_SELECTOR)?.nativeElement.value).toEqual(component.min() + '');

      component.writeValue([60, 40]);
      fixture.detectChanges();
      expect(getElementByCss(fixture, START_INPUT_SELECTOR)?.nativeElement.value).toEqual('40');
      expect(getElementByCss(fixture, END_INPUT_SELECTOR)?.nativeElement.value).toEqual('40');
    });

    it('Show hide min/max labels', () => {
      // chech default
      expect(getElementByCss(fixture, MIN_MAX_LABELS_SELECTOR)).toBeFalsy();

      componentRef.setInput('showMinMaxLabels', true);
      fixture.detectChanges();

      expect(getElementByCss(fixture, MIN_MAX_LABELS_SELECTOR)).toBeTruthy();
    });

    it('Show hide tick marks', () => {
      // chech default
      expect(getElementByCss(fixture, TICK_MARKS_SELECTOR)).toBeFalsy();

      componentRef.setInput('showTickMarks', true);
      fixture.detectChanges();

      expect(getElementByCss(fixture, TICK_MARKS_SELECTOR)).toBeTruthy();
    });
  });
});
