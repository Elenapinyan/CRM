import { Component, ComponentRef, ElementRef, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { SliderInputDirective } from './slider-input';

@Component({
  template: '<input #input sprSliderThumb [min]="min()" [max]="max()" [(rangeValue)]="value"/>',
  imports: [SliderInputDirective],
})
class TestComponent {
  input = viewChild.required<ElementRef<HTMLInputElement>>('input');
  directive = viewChild(SliderInputDirective);

  readonly min = signal(0);
  readonly max = signal(100);
  readonly value = signal(0);
}

describe('SliderInputDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let componentRef: ComponentRef<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);

    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    syncViewModel(fixture);
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
      expect(component.directive()).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should change value on change input', () => {
      component.input().nativeElement.value = '10';
      getElementByCss(fixture, 'input').triggerEventHandler('input', { target: component.input().nativeElement });

      syncViewModel(fixture);

      expect(component.value()).toBe(10);
    });

    it('should validate value from event if  over then max', () => {
      component.input().nativeElement.value = '1000';
      getElementByCss(fixture, 'input').triggerEventHandler('input', { target: component.input().nativeElement });

      syncViewModel(fixture);

      expect(component.value()).toBe(component.max());
    });

    it('should validate value from event if less then min', () => {
      component.input().nativeElement.value = '-1000';
      getElementByCss(fixture, 'input').triggerEventHandler('input', { target: component.input().nativeElement });

      syncViewModel(fixture);

      expect(component.value()).toBe(component.min());
    });

    it('should validate input value over then max', () => {
      component.value.set(1000);

      syncViewModel(fixture);

      expect(component.value()).toBe(component.max());
    });

    it('should validate input value less then min', () => {
      component.value.set(-1000);

      syncViewModel(fixture);

      expect(component.value()).toBe(component.min());
    });
  });
});
