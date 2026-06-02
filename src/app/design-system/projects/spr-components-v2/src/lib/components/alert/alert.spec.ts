import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { DsAlert } from './alert';
import { AlertTypes } from './alert.options';

describe('SprAlertComponent', () => {
  let fixture: ComponentFixture<DsAlert>;
  let component: DsAlert;

  const MOCK_MESSAGE = 'some message';
  const MOCK_NEW_ICON_CLASS = 'some-new-icon-class';

  const ALERT_CONTENT_TEXT_SELECTOR = '[data-testid="alert-content-text"]';
  const ALERT_ICON_SELECTOR = '[data-testid="alert-icon"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
      providers: [provideNoopAnimations()],
    });

    fixture = TestBed.createComponent(DsAlert);

    component = fixture.componentInstance;

    fixture.componentRef.setInput('message', MOCK_MESSAGE);
    fixture.componentRef.setInput('icon', MOCK_NEW_ICON_CLASS);

    syncViewModel(fixture);
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should emit dismissFinished on animation done', async () => {
      const spy = jest.spyOn(component.dismissed, 'emit');

      component.dismiss();

      fixture.detectChanges();

      await fixture.whenStable();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('View', () => {
    it('should have message', () => {
      const element = getElementByCss(fixture, ALERT_CONTENT_TEXT_SELECTOR).nativeElement;

      expect(element.textContent?.trim()).toBe(MOCK_MESSAGE);
    });

    it('should have new icon class', () => {
      syncViewModel(fixture);

      const iconElement = getElementByCss(fixture, ALERT_ICON_SELECTOR).nativeElement;

      expect(iconElement.classList.contains(MOCK_NEW_ICON_CLASS)).toBeTruthy();
    });

    it('should have info type', () => {
      fixture.componentRef.setInput('type', AlertTypes.INFO);

      fixture.detectChanges();

      expect(fixture.nativeElement.classList.contains(`alert--${AlertTypes.INFO}`)).toBeTruthy();
    });

    it('should have warning type', () => {
      fixture.componentRef.setInput('type', AlertTypes.WARNING);

      fixture.detectChanges();

      expect(fixture.nativeElement.classList.contains(`alert--${AlertTypes.WARNING}`)).toBeTruthy();
    });

    it('should have danger type', () => {
      fixture.componentRef.setInput('type', AlertTypes.DANGER);

      fixture.detectChanges();

      expect(fixture.nativeElement.classList.contains(`alert--${AlertTypes.DANGER}`)).toBeTruthy();
    });

    it('should have success type', () => {
      fixture.componentRef.setInput('type', AlertTypes.SUCCESS);

      fixture.detectChanges();

      expect(fixture.nativeElement.classList.contains(`alert--${AlertTypes.SUCCESS}`)).toBeTruthy();
    });
  });
});
