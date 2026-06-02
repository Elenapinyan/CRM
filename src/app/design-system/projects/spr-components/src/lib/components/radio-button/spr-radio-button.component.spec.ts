import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SprRadioButtonComponent } from './spr-radio-button.component';
import { getElementByCss } from '../../shared/utils';

describe('SprRadioButtonComponent', () => {
  let fixture: ComponentFixture<SprRadioButtonComponent>;
  let component: SprRadioButtonComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule, ClipboardModule, SprRadioButtonComponent],
    });

    fixture = TestBed.createComponent(SprRadioButtonComponent);

    component = fixture.componentInstance;
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should add isDecorated class', () => {
      const CLASS_NAME = 'radio-button-control--decorated';

      component.isDecorated = true;

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.firstChild.classList.contains(CLASS_NAME)).toBeTruthy();
    });

    it('should add isBottomMargin class', () => {
      const CLASS_NAME = 'radio-button-control--bottom-margin';

      component.isBottomMargin = true;

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.firstChild.classList.contains(CLASS_NAME)).toBeTruthy();
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
