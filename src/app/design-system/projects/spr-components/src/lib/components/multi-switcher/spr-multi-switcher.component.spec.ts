import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SprMultiSwitcherComponent } from './spr-multi-switcher.component';
import { DebugElement } from '@angular/core';
import { getElementByCss, getElementsByCss, syncViewModel } from '../../shared/utils';

describe('SprMultiSwitcherComponent', () => {
  let fixture: ComponentFixture<SprMultiSwitcherComponent>;
  let component: SprMultiSwitcherComponent;
  const MOCK_OPTIONS = [
    { text: 'Spribe', value: 1 },
    { text: 'Aviator', value: 2 },
    { text: 'Georgian', value: 3 },
    { text: 'Ukraine', value: 4 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, SprMultiSwitcherComponent],
    });

    fixture = TestBed.createComponent(SprMultiSwitcherComponent);

    component = fixture.componentInstance;

    component.options = MOCK_OPTIONS;
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should change id', () => {
      const ID = 'switcher-id';

      component.switcherId = ID;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, 'ul')?.nativeElement;

      expect(element.getAttribute('id')).toBe(ID);
    });

    it('should render options', () => {
      syncViewModel(fixture);

      const elements: DebugElement[] = getElementsByCss(fixture, 'ul > li');

      expect(elements.length).toBe(MOCK_OPTIONS.length);
    });

    it('should set isDisabled', () => {
      component.isDisabled = true;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, '.tab-level-3-list__item--disabled')?.nativeElement;

      expect(element).toBeTruthy();
    });

    it('should set isError', () => {
      component.isError = true;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, '.tab-level-3-list__item--error')?.nativeElement;

      expect(element).toBeTruthy();
    });

    it('should set active for item', () => {
      component.currentSelectedValue = MOCK_OPTIONS[0].value;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, '.tab-level-3-list__item--active')?.nativeElement;

      expect(element).toBeTruthy();
    });
  });
});
