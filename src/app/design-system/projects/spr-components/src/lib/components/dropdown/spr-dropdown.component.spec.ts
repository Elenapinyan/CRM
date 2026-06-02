import { CommonModule } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { getElementByCss } from '../../shared/utils';
import { SprDropdownComponent } from './spr-dropdown.component';
import { DropdownOption } from '../../shared';

describe('SprDropdownComponent', () => {
  let fixture: ComponentFixture<SprDropdownComponent>;
  let component: SprDropdownComponent;

  const MOCK_OPTIONS = [
    { text: 'Spribe', value: 1, isDisabled: true },
    { text: 'Aviator', value: 2, icon: 'bo-icon-general-trophy' },
    { text: 'Georgian', value: 3 },
    { text: 'Ukraine', value: 4, class: 'test-class' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(SprDropdownComponent);

    component = fixture.componentInstance;

    component.options = MOCK_OPTIONS;

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should select items', () => {
      component.select(MOCK_OPTIONS[0]);

      expect((component as any).control.value).toBe(MOCK_OPTIONS[0]);
    });

    it('should iconAddon type guard works', () => {
      const result = component.iconAddonTypeGuard({ icon: 'bo-icon-general-trophy' });

      expect(result).toBe(true);
    });

    it('should textAddon type guard works', () => {
      const result = component.textAddonTypeGuard({ text: 'bo-icon-general-trophy' });

      expect(result).toBe(true);
    });

    it('should update dropdown value', () => {
      (component as any).updateSelectedOptions(MOCK_OPTIONS, MOCK_OPTIONS[MOCK_OPTIONS.length - 1].value);

      const control = (component as any).control;

      expect(control.value?.value).toBe(MOCK_OPTIONS[MOCK_OPTIONS.length - 1].value);
    });
  });

  describe('View', () => {
    function toggleDropdown(): void {
      const toggleElement = getElementByCss(fixture, '[ngbDropdownToggle]');

      toggleElement.nativeElement.click();
      tick();
      fixture.detectChanges();
    }

    function scrollDropdown(): void {
      const virtualScroll = document.querySelector('.cdk-virtual-scroll-viewport.dropdown-list-container-body.cdk-virtual-scrollable');

      if (virtualScroll) {
        virtualScroll.scrollTop = virtualScroll.scrollHeight;
        virtualScroll.dispatchEvent(new Event('scroll'));
        tick(300);
        fixture.detectChanges();
      }
    }

    it('should render options', fakeAsync(() => {
      toggleDropdown();
      scrollDropdown();

      const items = document.body.querySelectorAll('.dropdown-item');

      expect(items.length).toBe(MOCK_OPTIONS.length);
    }));

    it('should filter rendered options', fakeAsync(() => {
      component.withSearch = true;

      fixture.detectChanges();

      toggleDropdown();

      const search: HTMLInputElement | null = document.body.querySelector('.dropdown-list-container-header spr-input');

      if (search) {
        component.searchControl.patchValue(MOCK_OPTIONS[0].text);
        search.value = MOCK_OPTIONS[0].text;
        search.dispatchEvent(new Event('input'));
        fixture.detectChanges();
      }

      const virtualScroll = document.querySelector('.dropdown-list-container-body');

      if (virtualScroll) {
        virtualScroll.scrollTop = virtualScroll.scrollHeight;
        virtualScroll.dispatchEvent(new Event('scroll'));
        tick(300);
        fixture.detectChanges();
      }

      const items = document.body.querySelectorAll('.dropdown-item');

      expect(items.length).toBe(1);
    }));

    it('should disable item', fakeAsync(() => {
      toggleDropdown();
      scrollDropdown();

      const disabledItem = document.body.querySelector('.dropdown-item.disabled');

      expect(disabledItem).toBeTruthy();
    }));

    it('should add class to the first option from its property', fakeAsync(() => {
      const testClass = 'test-class';
      let newOptions: DropdownOption[] = [...MOCK_OPTIONS];
      newOptions[0] = { ...newOptions[0], class: testClass };
      component.options = newOptions;

      toggleDropdown();
      scrollDropdown();

      const firstOption = document.body.querySelector('.dropdown-item');
      const optionWithTestClass = document.body.querySelector(`.dropdown-item.${testClass}`);

      expect(firstOption).toBe(optionWithTestClass);
    }));

    it('should select item', fakeAsync(() => {
      component.select(component.options[0]);
      fixture.detectChanges();

      toggleDropdown();
      scrollDropdown();

      const selectedItem = document.body.querySelector('.dropdown-item.selected');

      expect(selectedItem).toBeTruthy();
    }));

    it('should show description', fakeAsync(() => {
      const DESCRIPTION_MOCK = 'description';

      component.description = DESCRIPTION_MOCK;

      fixture.detectChanges();
      tick(100);

      const descriptionElement: HTMLElement = getElementByCss(fixture, '.form-input-description').nativeElement;

      expect(descriptionElement).toBeTruthy();
      expect(descriptionElement.textContent?.trim()).toBe(DESCRIPTION_MOCK);
    }));

    it('should show isLoading', () => {
      component.isLoading = true;

      fixture.detectChanges();

      const spinnerElement = getElementByCss(fixture, 'spr-spinner').nativeElement;

      expect(spinnerElement).toBeTruthy();
    });

    it('should show icon addonStart', () => {
      component.addonStart = { icon: 'bo-icon-general-placeholder' };

      fixture.detectChanges();

      const divElement = getElementByCss(fixture, '.form-dropdown__addon').nativeElement;
      const iconElement = getElementByCss(fixture, '.form-dropdown__addon i').nativeElement;

      expect(divElement).toBeTruthy();
      expect(iconElement).toBeTruthy();
    });

    it('should show text addonStart', () => {
      component.addonStart = { text: 'bo-icon-general-placeholder' };

      fixture.detectChanges();

      const divElement = getElementByCss(fixture, '.form-dropdown__addon').nativeElement;
      const textElement = getElementByCss(fixture, '.form-dropdown__addon .addon-text').nativeElement;

      expect(divElement).toBeTruthy();
      expect(textElement).toBeTruthy();
    });
  });
});
