import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DsMultiSelectDropdownComponent } from './multi-select-dropdown';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { getElementByCss } from '../../shared/utils';
import { DropdownOption } from '../../shared';
import { MockResizeObserver } from '../../shared/mocks';

describe('MultiSelectDropdownComponent', () => {
  let fixture: ComponentFixture<DsMultiSelectDropdownComponent>;
  let component: DsMultiSelectDropdownComponent;

  const MOCK_OPTIONS: DropdownOption[] = [
    { text: 'Spribe', value: 1, isDisabled: true, icon: 'ds-icon-general-diamond' },
    { text: 'Aviator', value: 2, isDisabled: false, icon: 'ds-icon-general-trophy' },
    { text: 'Georgian', value: 3, isDisabled: false, icon: '' },
    { text: 'Ukraine', value: 4, isDisabled: false, icon: '' },
  ];

  const SPINNER_SELECTOR = '[data-testid="spinner"]';

  beforeAll(() => {
    global.ResizeObserver = MockResizeObserver;

    Object.defineProperty(document, 'defaultView', {
      value: { CSS: { highlights: new Map() } },
      configurable: true,
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule, DsMultiSelectDropdownComponent, ScrollingModule],
    });

    fixture = TestBed.createComponent(DsMultiSelectDropdownComponent);

    component = fixture.componentInstance;

    fixture.componentRef.setInput('filterStrategy', 'local');
    fixture.componentRef.setInput('options', MOCK_OPTIONS);

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

    it('should textAddon type guard works', () => {
      const result = component.textAddonTypeGuard({ text: 'ds-icon-general-trophy' });

      expect(result).toBe(true);
    });
  });

  describe('View', () => {
    it('should show selected items under the select', fakeAsync(() => {
      (component as any).control.patchValue([component.options()[0]]);

      fixture.detectChanges();

      tick();

      const selectedValuesContainer = document.body.querySelector('.selected-values');

      expect(selectedValuesContainer?.children?.length).toBeTruthy();
      expect(selectedValuesContainer!.children!.length > 0).toBeTruthy();
    }));

    it('should show isLoading', () => {
      fixture.componentRef.setInput('isLoading', true);

      fixture.detectChanges();

      const spinnerElement = getElementByCss(fixture, SPINNER_SELECTOR).nativeElement;

      expect(spinnerElement).toBeTruthy();
    });
  });
});
