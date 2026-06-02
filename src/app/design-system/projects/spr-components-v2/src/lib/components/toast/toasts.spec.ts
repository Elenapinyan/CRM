import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { getElementByCss, getElementsByCss, syncViewModel } from '../../shared/utils';
import { ToastService } from './toast.service';
import { DsToasts } from './toasts';

describe('ToastsComponent', () => {
  let fixture: ComponentFixture<DsToasts>;
  let component: DsToasts;
  let toastService: ToastService;

  const TOAST_ITEM_SELECTOR = '[data-testid="toast-item"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService, provideNoopAnimations()],
    });

    fixture = TestBed.createComponent(DsToasts);

    component = fixture.componentInstance;

    toastService = TestBed.inject(ToastService);

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should create component instance', () => {
      expect(component).toBeTruthy();
    });

    it(`should emit removeToast method`, fakeAsync(() => {
      const spy = jest.spyOn(component, 'removeToast');

      toastService.showSuccessCustom(
        {
          header: '<strong>Success</strong>',
          description: 'This <b>action</b> cannot be undone.',
          footer: '<a href="https://google.com/">Button</a>',
          icon: 'ds-icon-control-check-circle',
        },
        { autohide: true, delay: 1 },
      );

      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      tick();

      expect(spy).toHaveBeenCalledTimes(1);
    }));
  });

  describe('View', () => {
    it(`should render toasts`, () => {
      toastService.showSuccessCustom(
        {
          header: '<strong>Success</strong>',
          description: 'This <b>action</b> cannot be undone.',
          footer: '<a href="https://google.com/">Button</a>',
          icon: 'ds-icon-control-check-circle',
        },
        { autohide: false },
      );

      toastService.showSuccessCustom(
        {
          header: '<strong>Success</strong>',
          description: 'This <b>action</b> cannot be undone.',
          footer: '<a href="https://google.com/">Button</a>',
          icon: 'ds-icon-control-check-circle',
        },
        { autohide: false },
      );

      syncViewModel(fixture);

      const elements = getElementsByCss(fixture, TOAST_ITEM_SELECTOR);

      expect(elements.length).toBe(2);
    });

    it(`should emit removeToast method on click on close icon`, fakeAsync(() => {
      const spy = jest.spyOn(component, 'removeToast');

      toastService.showSuccessCustom(
        {
          header: '<strong>Success</strong>',
          description: 'This <b>action</b> cannot be undone.',
          footer: '<a href="https://google.com/">Button</a>',
          icon: 'ds-icon-control-check-circle',
        },
        { autohide: false },
      );

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, `${TOAST_ITEM_SELECTOR} .toast__close button`).nativeElement;

      element.click();

      syncViewModel(fixture);
      tick();

      expect(spy).toHaveBeenCalledTimes(1);
    }));
  });
});
