import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltip, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SprCheckboxComponent } from './spr-checkbox.component';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { Placement } from './interfaces/spr-checkbox.interface';

describe('SprCheckboxComponent', () => {
  let fixture: ComponentFixture<SprCheckboxComponent>;
  let component: SprCheckboxComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule, ClipboardModule, SprCheckboxComponent],
    });

    fixture = TestBed.createComponent(SprCheckboxComponent);

    component = fixture.componentInstance;
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should add isDecorated class', () => {
      const CLASS_NAME = 'checkbox-control--decorated';

      component.isDecorated = true;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, '.' + CLASS_NAME)?.nativeElement;

      expect(element).toBeTruthy();
    });

    it('should add isPartiallyChecked class', () => {
      const CLASS_NAME = 'partially-checked';

      component.isPartiallyChecked = true;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, 'input')?.nativeElement;

      expect(element.classList.contains(CLASS_NAME)).toBeTruthy();
    });

    it('should add inputId', () => {
      const MOCK_ID = 'test-id';

      fixture.componentRef.setInput('inputId', MOCK_ID);

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, 'input')?.nativeElement;

      expect(element.hasAttribute('id')).toBeTruthy();
      expect(element.getAttribute('id')).toBe(MOCK_ID);
    });

    it('should set tooltip text', () => {
      const TOOLTIP_TEXT = 'Test Tooltip';

      component.checkboxTooltip = TOOLTIP_TEXT;
      syncViewModel(fixture);

      const element = getElementByCss(fixture, 'input')?.nativeElement;

      expect(element.getAttribute('ng-reflect-ngb-tooltip')).toBe(TOOLTIP_TEXT);
    });

    it('should set tooltip class', () => {
      const TOOLTIP_CLASS = 'custom-tooltip-class';

      component.tooltipClass = TOOLTIP_CLASS;
      syncViewModel(fixture);

      const tooltipDirective = getElementByCss(fixture, 'input').injector.get(NgbTooltip) as NgbTooltip;

      expect(tooltipDirective.tooltipClass).toBe(TOOLTIP_CLASS);
    });

    it('should set tooltip placement', () => {
      const PLACEMENT: Placement = 'top';

      component.tooltipPlacement = PLACEMENT;
      syncViewModel(fixture);

      const tooltipDirective = getElementByCss(fixture, 'input').injector.get(NgbTooltip) as NgbTooltip;

      expect(tooltipDirective.placement).toEqual(PLACEMENT);
    });
  });
});
