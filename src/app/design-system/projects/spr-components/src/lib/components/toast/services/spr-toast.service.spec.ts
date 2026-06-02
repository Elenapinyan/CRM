import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { ToastType } from '../enums/toast-type.enum';
import { ToastItem } from '../interfaces/toast.interface';
import { SprToastService } from './spr-toast.service';

describe('SprToastService', () => {
  let toastService: SprToastService;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SprToastService],
    });

    sanitizer = TestBed.inject(DomSanitizer);
    toastService = TestBed.inject(SprToastService);
  });

  describe('Model', () => {
    it('should clear all toasts', async () => {
      toastService.showSuccess('1');
      toastService.showSuccess('2');

      toastService.clear();

      const toasts = await firstValueFrom(toastService.toasts$);

      expect(toasts.length).toBe(0);
    });

    it('should remove certain toast', async () => {
      const MOCK_TYPE = ToastType.Warning;

      toastService.show('1', MOCK_TYPE);

      let toasts = await firstValueFrom(toastService.toasts$);
      const toast: ToastItem = toasts[0];

      toastService.showSuccess('2');
      toastService.showSuccess('3');

      toastService.remove(toast);

      toasts = await firstValueFrom(toastService.toasts$);

      const hasToastWithMockType = toasts.some((t) => t.context === MOCK_TYPE);

      expect(toasts.length).toBe(2);
      expect(hasToastWithMockType).toBeFalsy();
    });

    it('should show toast', async () => {
      const MOCK_TYPE = ToastType.Danger;
      const MOCK_MESSAGE = '123';

      toastService.show(MOCK_MESSAGE, MOCK_TYPE);

      const toasts = await firstValueFrom(toastService.toasts$);

      expect(toasts.length).toBe(1);
      expect(toasts[0].context).toBe(MOCK_TYPE);
      expect(toasts[0].message).toEqual(sanitizer.bypassSecurityTrustHtml(MOCK_MESSAGE) as string);
    });

    it('should show toast with sanitized footer', async () => {
      const MOCK_MESSAGE = 'Main message';
      const MOCK_FOOTER = '<b>Extra info</b>';

      toastService.show(MOCK_MESSAGE, ToastType.Success, { footerMessage: MOCK_FOOTER });

      const toasts = await firstValueFrom(toastService.toasts$);
      const toast = toasts[0];

      expect(toast.options.footerMessage).toEqual(sanitizer.bypassSecurityTrustHtml(MOCK_FOOTER) as string);
    });
  });
});
