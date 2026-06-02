import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { getElementByCss, getElementsByCss, syncViewModel } from '../../shared/utils';
import { DsMultiSwitcherComponent } from './multi-switcher';

describe('SprMultiSwitcherComponent', () => {
  let fixture: ComponentFixture<DsMultiSwitcherComponent>;
  let component: DsMultiSwitcherComponent;

  const MOCK_OPTIONS = [
    { text: 'Spribe', value: 1 },
    { text: 'Aviator', value: 2, icon: 'ds-icon-general-card' },
    { value: 3, icon: 'ds-icon-general-card' },
    { text: 'Ukraine', value: 4 },
  ];

  const LIST_SELECTOR = '[data-testid="multi-switcher-list"]';
  const OPTION_SELECTOR = '[data-testid="switcher-option"]';
  const OPTION_ICON = '[data-testid="switcher-option-icon"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, DsMultiSwitcherComponent],
    });

    fixture = TestBed.createComponent(DsMultiSwitcherComponent);

    component = fixture.componentInstance;

    fixture.componentRef.setInput('options', MOCK_OPTIONS);
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should change id', () => {
      const ID = 'switcher-id';

      fixture.componentRef.setInput('switcherId', ID);

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, LIST_SELECTOR)?.nativeElement;

      expect(element.getAttribute('id')).toBe(ID);
    });

    it('should render options', () => {
      syncViewModel(fixture);

      const elements: DebugElement[] = getElementsByCss(fixture, OPTION_SELECTOR);

      expect(elements.length).toBe(MOCK_OPTIONS.length);
    });

    it('should set isDisabled', () => {
      component.setDisabledState(true);

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, OPTION_SELECTOR)?.nativeElement;

      expect(element.classList.contains('multi-switcher__item--disabled')).toBeTruthy();
    });

    it('check is icons not rendered', () => {
      const SIZE = 'sm';
      component.onSwitcherChange(MOCK_OPTIONS[0].value);
      fixture.componentRef.setInput('size', SIZE);

      syncViewModel(fixture);

      const icon: HTMLElement = getElementByCss(fixture, `.multi-switcher__item--selected ${OPTION_ICON}`)?.nativeElement;

      expect(icon).toBeFalsy();
    });

    it('check is icon rendered', () => {
      const SIZE = 'sm';
      component.onSwitcherChange(MOCK_OPTIONS[1].value);
      fixture.componentRef.setInput('size', SIZE);

      syncViewModel(fixture);

      const icon: HTMLElement = getElementByCss(fixture, `.multi-switcher__item--selected ${OPTION_ICON}`)?.nativeElement;

      expect(icon).toBeTruthy();
    });

    it('should set size', () => {
      const SIZE = 'sm';
      fixture.componentRef.setInput('size', SIZE);

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, `.${'multi-switcher__item'}--${SIZE}`)?.nativeElement;

      expect(element).toBeTruthy();
    });

    it('should set active for item', () => {
      component.onSwitcherChange(MOCK_OPTIONS[0].value);

      syncViewModel(fixture);

      const elements = getElementsByCss(fixture, OPTION_SELECTOR);

      const firstElement: HTMLElement = elements[0].nativeElement;

      expect(firstElement.classList.contains('multi-switcher__item--selected')).toBeTruthy();
    });
  });
});
