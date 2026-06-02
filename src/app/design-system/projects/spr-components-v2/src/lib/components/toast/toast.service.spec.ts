import { TestBed } from '@angular/core/testing';
import { ToastItem, ToastType } from './toast.options';
import { ToastService } from './toast.service';

describe('DsToastService', () => {
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService],
    });

    toastService = TestBed.inject(ToastService);
  });

  describe('Model', () => {
    it('should clear all toasts', () => {
      toastService.showSuccess('1');
      toastService.showSuccess('2');

      toastService.clear();

      const toasts = toastService.toasts();

      expect(toasts.length).toBe(0);
    });

    it('should remove certain toast', () => {
      const MOCK_TYPE = ToastType.Warning;

      toastService.push({ header: '1', type: MOCK_TYPE });

      let toasts = toastService.toasts();

      const toast: ToastItem = toasts[0];

      toastService.showSuccess('2');
      toastService.showSuccess('3');

      toastService.remove(toast);

      toasts = toastService.toasts();

      const hasToastWithMockType = toasts.some((t) => t.type === MOCK_TYPE);

      expect(toasts.length).toBe(2);
      expect(hasToastWithMockType).toBeFalsy();
    });

    it('should show toast', () => {
      const MOCK_TYPE = ToastType.Danger;
      const MOCK_MESSAGE = '123';

      toastService.push({ header: MOCK_MESSAGE, type: MOCK_TYPE });

      const toasts = toastService.toasts();

      expect(toasts.length).toBe(1);
      expect(toasts[0].type).toBe(MOCK_TYPE);
      expect(toasts[0].header).toEqual(MOCK_MESSAGE);
    });

    it('should show toast with sanitized footer', () => {
      const MOCK_MESSAGE = 'Main message';
      const MOCK_FOOTER = '<b>Extra info</b>';

      toastService.push({ header: MOCK_MESSAGE, type: ToastType.Success, footer: MOCK_FOOTER });

      const toasts = toastService.toasts();
      const toast = toasts[0];

      expect(toast.footer).toEqual(MOCK_FOOTER);
    });
  });
});
