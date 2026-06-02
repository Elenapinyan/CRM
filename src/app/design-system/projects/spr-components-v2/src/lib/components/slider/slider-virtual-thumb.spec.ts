import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { syncViewModel } from '../../shared/utils';
import { SliderVisualThumb } from './slider-virtual-thumb';

describe('SliderVisualThumb', () => {
  let fixture: ComponentFixture<SliderVisualThumb>;
  let component: SliderVisualThumb;
  let componentRef: ComponentRef<SliderVisualThumb>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SliderVisualThumb],
    });

    fixture = TestBed.createComponent(SliderVisualThumb);

    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    syncViewModel(fixture);
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });
});
