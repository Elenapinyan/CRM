import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DynamicPositions } from '../../dynamic-template/interfaces';
import { SprLabelTestComponent } from './spr-label-test.component';
import { SprLabelDirective } from '../spr-label.directive';
import { getElementByCss, getElementByDirective } from '../../../shared/utils';

describe('SprLabelDirective', () => {
  let fixture: ComponentFixture<SprLabelTestComponent>;
  let component: SprLabelTestComponent;
  let labelName = 'spr-label';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule, ClipboardModule, SprLabelDirective, SprLabelTestComponent],
    });

    fixture = TestBed.createComponent(SprLabelTestComponent);

    component = fixture.componentInstance;

    component.label = 'Test label';
    component.position = DynamicPositions.END;
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should create label', () => {
      fixture.detectChanges();

      const element = getElementByDirective(fixture, SprLabelDirective).nativeElement;

      expect(element).toBeTruthy();
      expect(element!.nextElementSibling.localName).toBe(labelName);
      expect(component.labelDirective.componentRef?.instance).toBeTruthy();
    });

    it('should remove label', () => {
      component.label = '';

      fixture.detectChanges();

      const element = getElementByCss(fixture, labelName)?.nativeElement;

      expect(element).toBeFalsy();
    });

    it('should add tooltip', () => {
      component.tooltip = 'Test';

      fixture.detectChanges();

      const element = getElementByCss(fixture, labelName)?.nativeElement;

      const tooltipElement = element!.querySelector('small');

      expect(tooltipElement).toBeTruthy();
    });

    it('should add inputId', () => {
      const ID = 'test';

      component.inputId = ID;

      fixture.detectChanges();

      const element = getElementByCss(fixture, labelName)?.nativeElement;

      const tooltipElement = element!.querySelector('label');

      expect(tooltipElement.getAttribute('for')).toBe(ID);
    });

    it('should change label position to start', () => {
      component.position = DynamicPositions.START;

      fixture.detectChanges();

      const element = getElementByDirective(fixture, SprLabelDirective).nativeElement;

      expect(element).toBeTruthy();

      expect(element!.previousElementSibling.localName).toBe(labelName);
    });

    it('should add icons', () => {
      const ICON = 'bo-icon-general-workspace';

      component.labelLeftIcon = ICON;
      component.labelRightIcon = ICON;

      fixture.detectChanges();

      expect(component.labelDirective.componentRef?.instance.leftIcon).toEqual(ICON);
      expect(component.labelDirective.componentRef?.instance.rightIcon).toEqual(ICON);
    });
  });
});
