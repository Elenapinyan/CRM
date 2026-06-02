import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SprMultiSelectDropdownComponent } from './spr-multi-select-dropdown.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { getElementByCss } from '../../shared/utils';
import { DropdownOption } from '../../shared';

describe('SprMultiSelectDropdownComponent', () => {
  let fixture: ComponentFixture<SprMultiSelectDropdownComponent>;
  let component: SprMultiSelectDropdownComponent;

  const MOCK_OPTIONS: DropdownOption[] = [
    { text: 'Spribe', value: 1, isDisabled: true, icon: 'bo-icon-general-diamond' },
    { text: 'Aviator', value: 2, isDisabled: false, icon: 'bo-icon-general-trophy' },
    { text: 'Georgian', value: 3, isDisabled: false, icon: '' },
    { text: 'Ukraine', value: 4, isDisabled: false, icon: '' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule, SprMultiSelectDropdownComponent, ScrollingModule],
    });

    fixture = TestBed.createComponent(SprMultiSelectDropdownComponent);

    component = fixture.componentInstance;

    component.filterStrategy = 'local';

    component.options = MOCK_OPTIONS;

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should select item with null value', () => {
      const MOCK_OPTION = { text: 'option', value: null } as DropdownOption;
      component.select(MOCK_OPTION);

      expect((component as any).control.value[0]).toBe(MOCK_OPTION);
    });

    it('should select existed option with value when option with nullish value added second time', () => {
      const MOCK_OPTION = { text: 'option', value: null } as DropdownOption;
      const MOCK_OPTION_1 = { text: 'option1', value: null } as DropdownOption;

      component.select(MOCK_OPTION);
      component.select(MOCK_OPTION_1);

      expect((component as any).control.value[0]).toBe(MOCK_OPTIONS[0]);
    });

    it('should select different option when selected one option with nullish value', () => {
      const MOCK_OPTION_NULLISH = { text: 'option', value: null } as DropdownOption;

      component.select(MOCK_OPTION_NULLISH);
      component.select(MOCK_OPTIONS[0]);

      expect((component as any).control.value[0]).toBe(MOCK_OPTIONS[1]);
    });

    it('should select items', () => {
      component.select(MOCK_OPTIONS[0]);

      expect((component as any).control.value[0]).toBe(MOCK_OPTIONS[0]);
    });

    it('should iconAddon type guard works', () => {
      const result = component.iconAddonTypeGuard({ icon: 'bo-icon-general-trophy' });

      expect(result).toBe(true);
    });

    it('should textAddon type guard works', () => {
      const result = component.textAddonTypeGuard({ text: 'bo-icon-general-trophy' });

      expect(result).toBe(true);
    });

    it('should textAddon type guard works', () => {
      const result = component.textAddonTypeGuard({ text: 'bo-icon-general-trophy' });

      expect(result).toBe(true);
    });
  });

  describe('View', () => {
    it('should render options', fakeAsync(() => {
      const toggleElement = getElementByCss(fixture, '[ngbDropdownToggle]');

      toggleElement.nativeElement.click();
      tick();
      fixture.detectChanges();

      const virtualScroll = document.querySelector('.cdk-virtual-scroll-viewport.dropdown-list-container-body.cdk-virtual-scrollable');

      if (virtualScroll) {
        virtualScroll.scrollTop = virtualScroll.scrollHeight;
        virtualScroll.dispatchEvent(new Event('scroll'));
        tick(300);
        fixture.detectChanges();
      }

      const items = document.body.querySelectorAll('.dropdown-item');

      expect(items.length).toBe(MOCK_OPTIONS.length);
    }));

    it('should filter rendered options', fakeAsync(() => {
      component.withSearch = true;

      fixture.detectChanges();

      const toggleElement = getElementByCss(fixture, '[ngbDropdownToggle]');

      toggleElement.nativeElement.click();
      tick();
      fixture.detectChanges();

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
      const toggleElement = getElementByCss(fixture, '[ngbDropdownToggle]');

      toggleElement.nativeElement.click();
      tick();
      fixture.detectChanges();

      const virtualScroll = document.querySelector('.cdk-virtual-scroll-viewport.dropdown-list-container-body.cdk-virtual-scrollable');

      if (virtualScroll) {
        virtualScroll.scrollTop = virtualScroll.scrollHeight;
        virtualScroll.dispatchEvent(new Event('scroll'));
        tick(300);
        fixture.detectChanges();
      }

      const disabledItem = document.body.querySelector('.dropdown-item.disabled');

      expect(disabledItem).toBeTruthy();
    }));

    it('should select item', fakeAsync(() => {
      component.select(component.options[0]);

      fixture.detectChanges();

      const toggleElement = getElementByCss(fixture, '[ngbDropdownToggle]');

      toggleElement.nativeElement.click();
      tick();
      fixture.detectChanges();

      const virtualScroll = document.querySelector('.cdk-virtual-scroll-viewport.dropdown-list-container-body.cdk-virtual-scrollable');

      if (virtualScroll) {
        virtualScroll.scrollTop = virtualScroll.scrollHeight;
        virtualScroll.dispatchEvent(new Event('scroll'));
        tick(300);
        fixture.detectChanges();
      }

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
  });
});
