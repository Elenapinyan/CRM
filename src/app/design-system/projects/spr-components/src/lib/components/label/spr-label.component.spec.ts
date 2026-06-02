import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SprLabelComponent } from './spr-label.component';
import { getElementByCss } from '../../shared/utils';

describe('SprLabelComponent', () => {
  let fixture: ComponentFixture<SprLabelComponent>;
  let component: SprLabelComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule, ClipboardModule, SprLabelComponent],
    });

    fixture = TestBed.createComponent(SprLabelComponent);

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
      const LABEL = 'Test label';

      component.label = LABEL;

      fixture.detectChanges();

      const element = getElementByCss(fixture, '.label-form')?.nativeElement;

      expect(element).toBeTruthy();
    });

    it('should add tooltip', () => {
      const TOOLTIP = 'Test tooltip';

      component.tooltip = TOOLTIP;

      fixture.detectChanges();

      const element = getElementByCss(fixture, '.tooltip-container')?.nativeElement;

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

      const element: HTMLElement = getElementByCss(fixture, 'label')?.nativeElement;

      expect(element.hasAttribute('for')).toBeTruthy();
      expect(element.getAttribute('for')).toBe(ID);
    });

    it('should add left icon', () => {
      const LEFT_ICON = 'bo-icon-general-workspace';

      component.leftIcon = LEFT_ICON;

      fixture.detectChanges();

      const leftIconElement: HTMLElement = getElementByCss(fixture, '.' + LEFT_ICON)?.nativeElement;

      expect(leftIconElement).toBeTruthy();
    });

    it('should add right icon', () => {
      const RIGHT_ICON = 'bo-icon-general-boat';

      component.rightIcon = RIGHT_ICON;

      fixture.detectChanges();

      const rightIconElement: HTMLElement = getElementByCss(fixture, '.' + RIGHT_ICON)?.nativeElement;

      expect(rightIconElement).toBeTruthy();
    });

    it('should add className', () => {
      const CLASS_NAME = 'test-class';

      component.className = CLASS_NAME;

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.firstChild.classList.contains(CLASS_NAME)).toBeTruthy();
    });
  });
});
