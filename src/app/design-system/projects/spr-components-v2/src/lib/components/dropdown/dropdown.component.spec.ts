import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElementByCss } from '../../shared/utils';
import { DsDropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let fixture: ComponentFixture<DsDropdownComponent>;
  let component: DsDropdownComponent;

  const MOCK_OPTIONS = [
    { text: 'Spribe', value: 1, isDisabled: true },
    { text: 'Aviator', value: 2, icon: 'ds-icon-general-trophy' },
    { text: 'Georgian', value: 3 },
    { text: 'Ukraine', value: 4 },
  ];

  const SPINNER_SELECTOR = '[data-testid="spinner"]';
  const ADDON_START_SELECTOR = '[data-testid="addon-start"]';
  const ADDON_ICON_SELECTOR = '[data-testid="addon-icon"]';
  const ADDON_TEXT_SELECTOR = '[data-testid="addon-text"]';

  beforeEach(() => {
    if (!window.CSS) {
      (window as any).CSS = {};
    }

    TestBed.configureTestingModule({
      imports: [DsDropdownComponent],
    });

    fixture = TestBed.createComponent(DsDropdownComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('options', MOCK_OPTIONS);
    fixture.componentRef.setInput('withSearch', true);

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should iconAddon type guard works', () => {
      const result = component.iconAddonTypeGuard({ icon: 'ds-icon-general-trophy' });

      expect(result).toBe(true);
    });

    it('should textAddon type guard works', () => {
      const result = component.textAddonTypeGuard({ text: 'ds-icon-general-trophy' });

      expect(result).toBe(true);
    });

    it('should update dropdown value', () => {
      (component as any).updateSelectedOptions(MOCK_OPTIONS, MOCK_OPTIONS[MOCK_OPTIONS.length - 1].value);

      const control = (component as any).control;

      expect(control.value?.value).toBe(MOCK_OPTIONS[MOCK_OPTIONS.length - 1].value);
    });
  });

  describe('View', () => {
    it('should show isLoading', () => {
      fixture.componentRef.setInput('isLoading', true);

      fixture.detectChanges();

      const spinnerElement = getElementByCss(fixture, SPINNER_SELECTOR).nativeElement;

      expect(spinnerElement).toBeTruthy();
    });

    it('should show icon addonStart', () => {
      fixture.componentRef.setInput('addonStart', { icon: 'ds-icon-general-placeholder' });

      fixture.detectChanges();

      const divElement = getElementByCss(fixture, ADDON_START_SELECTOR).nativeElement;
      const iconElement = getElementByCss(fixture, `${ADDON_START_SELECTOR} ${ADDON_ICON_SELECTOR}`).nativeElement;

      expect(divElement).toBeTruthy();
      expect(iconElement).toBeTruthy();
    });

    it('should show text addonStart', () => {
      fixture.componentRef.setInput('addonStart', { text: 'ds-icon-general-placeholder' });

      fixture.detectChanges();

      const divElement = getElementByCss(fixture, ADDON_START_SELECTOR).nativeElement;
      const textElement = getElementByCss(fixture, `${ADDON_START_SELECTOR} ${ADDON_TEXT_SELECTOR}`).nativeElement;

      expect(divElement).toBeTruthy();
      expect(textElement).toBeTruthy();
    });
  });
});
