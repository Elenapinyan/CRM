import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DsLabelComponent } from './label.component';
import { getElementByCss } from '../../shared/utils';

describe('SprLabelComponent', () => {
  let fixture: ComponentFixture<DsLabelComponent>;
  let component: DsLabelComponent;

  const ROW_SELECTOR = '[data-testid="label-row"]';
  const LABEL_ELEMENT_SELECTOR = '[data-testid="label-element"]';
  const LABEL_TEXT_SELECTOR = '[data-testid="label-text"]';
  const LEFT_ICON_SELECTOR = '[data-testid="left-icon"]';
  const RIGHT_ICON_SELECTOR = '[data-testid="right-icon"]';
  const TOOLTIP_SELECTOR = '[data-testid="tooltip-container"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule, ClipboardModule, DsLabelComponent],
    });

    fixture = TestBed.createComponent(DsLabelComponent);

    component = fixture.componentInstance;

    component.inputId = '1';
    component.isInline = true;
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should add label text', () => {
      component.label = 'Test label';

      fixture.detectChanges();

      const element = getElementByCss(fixture, LABEL_TEXT_SELECTOR)?.nativeElement;

      expect(element).toBeTruthy();
    });

    it('should add tooltip', () => {
      component.tooltip = 'Test tooltip';

      fixture.detectChanges();

      const element = getElementByCss(fixture, TOOLTIP_SELECTOR)?.nativeElement;

      expect(element).toBeTruthy();
    });

    it('should add inline class', () => {
      const CLASS_NAME = 'label--inline';

      component.isInline = true;

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.classList.contains(CLASS_NAME)).toBeTruthy();
    });

    it('should add inputId', () => {
      const ID = 'test-id';

      component.inputId = ID;

      fixture.detectChanges();

      const element: HTMLElement = getElementByCss(fixture, LABEL_ELEMENT_SELECTOR)?.nativeElement;

      expect(element.hasAttribute('for')).toBeTruthy();
      expect(element.getAttribute('for')).toBe(ID);
    });

    it('should add left icon', () => {
      component.leftIcon = 'ds-icon-general-workspace';

      fixture.detectChanges();

      const leftIconElement: HTMLElement = getElementByCss(fixture, LEFT_ICON_SELECTOR)?.nativeElement;

      expect(leftIconElement).toBeTruthy();
    });

    it('should add right icon', () => {
      component.rightIcon = 'ds-icon-general-boat';

      fixture.detectChanges();

      const rightIconElement: HTMLElement = getElementByCss(fixture, RIGHT_ICON_SELECTOR)?.nativeElement;

      expect(rightIconElement).toBeTruthy();
    });

    it('should add className', () => {
      const CLASS_NAME = 'test-class';

      component.className = CLASS_NAME;

      fixture.detectChanges();

      const rowElement = getElementByCss(fixture, ROW_SELECTOR).nativeElement;

      expect(rowElement.classList.contains(CLASS_NAME)).toBeTruthy();
    });
  });
});
