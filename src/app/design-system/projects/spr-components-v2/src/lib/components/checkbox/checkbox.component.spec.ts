import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltip, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { Placement } from './interfaces/checkbox.interface';
import { DsCheckboxComponent } from './checkbox.component';

describe('SprCheckboxComponent', () => {
  let fixture: ComponentFixture<DsCheckboxComponent>;
  let component: DsCheckboxComponent;

  const WRAPPER_SELECTOR = '[data-testid="checkbox-wrapper"]';
  const INPUT_SELECTOR = '[data-testid="checkbox-input"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule, ClipboardModule, DsCheckboxComponent],
    });

    fixture = TestBed.createComponent(DsCheckboxComponent);

    component = fixture.componentInstance;
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should add isDecorated class', () => {
      const CLASS_NAME = 'control-action--decorated';

      component.isDecorated = true;

      fixture.detectChanges();

      expect(fixture.elementRef.nativeElement.classList.contains(CLASS_NAME)).toBeTruthy();
    });

    it('should add isPartiallyChecked class', () => {
      const CLASS_NAME = 'partially-checked';

      component.isPartiallyChecked = true;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, WRAPPER_SELECTOR)?.nativeElement;

      expect(element.classList.contains(CLASS_NAME)).toBeTruthy();
    });

    it('should add inputId', () => {
      const MOCK_ID = 'test-id';

      fixture.componentRef.setInput('inputId', MOCK_ID);

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, INPUT_SELECTOR)?.nativeElement;

      expect(element.hasAttribute('id')).toBeTruthy();
      expect(element.getAttribute('id')).toBe(MOCK_ID);
    });

    it('should set tooltip text', () => {
      const TOOLTIP_TEXT = 'Test Tooltip';

      component.checkboxTooltip = TOOLTIP_TEXT;
      syncViewModel(fixture);

      const tooltipDirective = getElementByCss(fixture, WRAPPER_SELECTOR).injector.get(NgbTooltip);

      expect(tooltipDirective.ngbTooltip).toBe(TOOLTIP_TEXT);
    });

    it('should set tooltip class', () => {
      const TOOLTIP_CLASS = 'custom-tooltip-class';

      component.tooltipClass = TOOLTIP_CLASS;
      syncViewModel(fixture);

      const tooltipDirective = getElementByCss(fixture, WRAPPER_SELECTOR).injector.get(NgbTooltip) as NgbTooltip;

      expect(tooltipDirective.tooltipClass).toBe(TOOLTIP_CLASS);
    });

    it('should set tooltip placement', () => {
      const PLACEMENT: Placement = 'top';

      component.tooltipPlacement = PLACEMENT;
      syncViewModel(fixture);

      const tooltipDirective = getElementByCss(fixture, WRAPPER_SELECTOR).injector.get(NgbTooltip) as NgbTooltip;

      expect(tooltipDirective.placement).toEqual(PLACEMENT);
    });
  });
});
