import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { getElementByCss } from '../../shared/utils';
import { DsRadioButtonComponent } from './radio-button.component';

describe('SprRadioButtonComponent', () => {
  let fixture: ComponentFixture<DsRadioButtonComponent>;
  let component: DsRadioButtonComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule, ClipboardModule, DsRadioButtonComponent],
    });

    fixture = TestBed.createComponent(DsRadioButtonComponent);

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

    it('should add isBottomMargin class', () => {
      const CLASS_NAME = 'control-action--bottom-margin';

      component.isBottomMargin = true;

      fixture.detectChanges();

      expect(fixture.elementRef.nativeElement.classList.contains(CLASS_NAME)).toBeTruthy();
    });

    it('should add inputId', () => {
      const ID = 'test-id';

      fixture.componentRef.setInput('inputId', ID);

      fixture.detectChanges();

      const element: HTMLElement = getElementByCss(fixture, 'input')?.nativeElement;

      expect(element.getAttribute('id')).toBe(ID);
    });
  });
});
