import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { SprConfirmModalComponent } from './spr-confirm-modal.component';
import { ConfirmModalData } from './interfaces/spr-confirm-modal.interface';

describe('SprConfirmModalComponent', () => {
  let component: SprConfirmModalComponent;
  let fixture: ComponentFixture<SprConfirmModalComponent>;

  const MOCK_MODAL_DATA: ConfirmModalData = {
    title: 'Some Title',
    body: 'Some Body Message',
    cancelButtonText: 'Some Cancel Button Text',
    confirmButtonText: 'Some Confirm Button Text',
    disabledConfirmButton: true,
  };

  const BODY_MESSAGE_SELECTOR = '[data-testid="modal-body-message"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
    });

    fixture = TestBed.createComponent(SprConfirmModalComponent);

    component = fixture.componentInstance;

    component.modalData = MOCK_MODAL_DATA;

    syncViewModel(fixture);
  });

  describe('Model', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should show body message', () => {
      const messageElement: HTMLElement = getElementByCss(fixture, BODY_MESSAGE_SELECTOR).nativeElement;

      expect(messageElement.textContent?.trim()).toBe(MOCK_MODAL_DATA.body);
    });

    it('should show title', () => {
      const titleElement: HTMLElement = getElementByCss(fixture, '.modal-header__title').nativeElement;

      expect(titleElement.textContent?.trim()).toBe(MOCK_MODAL_DATA.title);
    });

    it('should show cancelButtonText', () => {
      const btnElement: HTMLElement = getElementByCss(fixture, '.button--outline').nativeElement;

      expect(btnElement.textContent?.trim()).toBe(MOCK_MODAL_DATA.cancelButtonText);
    });

    it('should show confirmButtonText', () => {
      const btnElement: HTMLElement = getElementByCss(fixture, '.button--accent').nativeElement;

      expect(btnElement.textContent?.trim()).toBe(MOCK_MODAL_DATA.confirmButtonText);
    });

    it('should call closeAction when close button clicked', () => {
      const closeActionSpy = jest.spyOn(component, 'closeAction');
      const btnElement: HTMLElement = getElementByCss(fixture, '.close-modal-button').nativeElement;

      btnElement.dispatchEvent(new Event('click'));

      expect(closeActionSpy).toHaveBeenCalledTimes(1);
    });

    it('should disable confirm button', () => {
      const btnElement: HTMLButtonElement = getElementByCss(fixture, '.button--accent').nativeElement;

      expect(btnElement.disabled).toBeTruthy();
    });

    it('should enable confirm button', () => {
      const btnElement: HTMLButtonElement = getElementByCss(fixture, '.button--accent').nativeElement;

      component.modalData = {
        ...MOCK_MODAL_DATA,
        disabledConfirmButton: false,
      };
      syncViewModel(fixture);

      expect(btnElement.disabled).toBeFalsy();
    });
  });
});
