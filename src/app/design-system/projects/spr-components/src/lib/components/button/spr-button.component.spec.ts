import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { SprButtonComponent } from './spr-button.component';
import { ButtonSizeType, ButtonType, ButtonVariant } from './interfaces/spr-button.interface';

describe('SprButtonComponent', () => {
  let fixture: ComponentFixture<SprButtonComponent>;
  let component: SprButtonComponent;
  let buttonElement: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule, ClipboardModule, SprButtonComponent],
    });

    fixture = TestBed.createComponent(SprButtonComponent);

    component = fixture.componentInstance;

    buttonElement = getElementByCss(fixture, 'button')?.nativeElement;
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should change variant', () => {
      const MOCK_VARIANT: ButtonVariant = 'secondary';

      component.variant = MOCK_VARIANT;

      syncViewModel(fixture);

      expect(buttonElement.classList.contains('button--' + MOCK_VARIANT)).toBeTruthy();
    });

    it('should change type', () => {
      const MOCK_TYPE: ButtonType = 'submit';

      component.type = MOCK_TYPE;

      syncViewModel(fixture);

      expect(buttonElement.getAttribute('type')).toBe(MOCK_TYPE);
    });

    it('should change size', () => {
      const MOCK_SIZE: ButtonSizeType = 'lg';

      component.size = MOCK_SIZE;

      syncViewModel(fixture);

      expect(buttonElement.classList.contains('button--' + MOCK_SIZE)).toBeTruthy();
    });

    it('should set id', () => {
      const MOCK_ID = 'test-id';

      component.buttonId = MOCK_ID;

      syncViewModel(fixture);

      expect(buttonElement.getAttribute('id')).toBe(MOCK_ID);
    });

    it('should disable state', () => {
      component.disabled = true;

      syncViewModel(fixture);

      expect(buttonElement.hasAttribute('disabled')).toBeTruthy();
    });

    it('should change isRadius', () => {
      component.isRadius = true;

      syncViewModel(fixture);

      expect(buttonElement.classList.contains('button--rounded')).toBeTruthy();
    });

    it('should change isBtnSpinner', () => {
      component.isBtnSpinner = true;

      syncViewModel(fixture);

      expect(buttonElement.classList.contains('button--loading')).toBeTruthy();
    });
  });
});
