import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { DsConfirmModal } from './confirm-modal';
import { ConfirmModalData } from './confirm-modal.options';
import { By } from '@angular/platform-browser';

describe('SprConfirmModalComponent', () => {
  let component: DsConfirmModal;
  let fixture: ComponentFixture<DsConfirmModal>;

  const MOCK_MODAL_DATA: ConfirmModalData = {
    title: 'Some Title',
    body: 'Some Body Message',
    cancelButtonText: 'Some Cancel Button Text',
    confirmButtonText: 'Some Confirm Button Text',
    disabledConfirmButton: true,
  };

  const TITLE_SELECTOR = '[data-testid="modal-title"]';
  const BODY_MESSAGE_SELECTOR = '[data-testid="modal-body-message"]';
  const CANCEL_BUTTON_SELECTOR = '[data-testid="modal-cancel-button"]';
  const CONFIRM_BUTTON_SELECTOR = '[data-testid="modal-confirm-button"]';
  const CLOSE_BUTTON_SELECTOR = '[data-testid="modal-close-button"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, DsConfirmModal],
    });

    fixture = TestBed.createComponent(DsConfirmModal);

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
    it('should show title', () => {
      const titleElement: HTMLElement = getElementByCss(fixture, TITLE_SELECTOR).nativeElement;

      expect(titleElement.textContent?.trim()).toBe(MOCK_MODAL_DATA.title);
    });

    it('should show bodyMessage', () => {
      const bodyElement: HTMLElement = getElementByCss(fixture, BODY_MESSAGE_SELECTOR).nativeElement;

      expect(bodyElement.textContent?.trim()).toBe(MOCK_MODAL_DATA.body);
    });

    it('should show cancelButtonText', () => {
      const btnElement: HTMLElement = getElementByCss(fixture, CANCEL_BUTTON_SELECTOR).nativeElement;

      expect(btnElement.textContent?.trim()).toBe(MOCK_MODAL_DATA.cancelButtonText);
    });

    it('should show confirmButtonText', () => {
      const btnElement: HTMLElement = getElementByCss(fixture, CONFIRM_BUTTON_SELECTOR).nativeElement;

      expect(btnElement.textContent?.trim()).toBe(MOCK_MODAL_DATA.confirmButtonText);
    });

    it('should call closeAction when close button clicked', () => {
      const closeActionSpy = jest.spyOn(component, 'closeAction');
      const btnElement: HTMLElement = getElementByCss(fixture, CLOSE_BUTTON_SELECTOR).nativeElement;

      btnElement.dispatchEvent(new Event('click'));

      expect(closeActionSpy).toHaveBeenCalledTimes(1);
    });

    it('should disable confirm button', () => {
      const btnElement = fixture.debugElement.query(By.css(CONFIRM_BUTTON_SELECTOR));

      expect(btnElement.componentInstance.disabled).toBeTruthy();
    });

    it('should enable confirm button', () => {
      const btnElement: HTMLButtonElement = getElementByCss(fixture, '.button--secondary').nativeElement;

      component.modalData = {
        ...MOCK_MODAL_DATA,
        disabledConfirmButton: false,
      };
      syncViewModel(fixture);

      expect(btnElement.disabled).toBeFalsy();
    });
  });
});
