import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsSelection } from './selection';
import { getElementByCss, getElementsByCss } from '../../shared/utils';
import { DropdownOption } from '../../shared';
import { MockResizeObserver } from '../../shared/mocks';

describe('Selection', () => {
  let component: DsSelection;
  let fixture: ComponentFixture<DsSelection>;

  const MOCK_OPTION_WITH_ICON = { text: 'Aviator', value: 2, icon: 'ds-icon-general-trophy' };

  const MOCK_OPTIONS = [
    { text: 'Spribe', value: 1, isDisabled: true },
    { text: 'Aviator', value: 2, icon: 'ds-icon-general-trophy' },
    { text: 'Georgia', value: 3 },
    { text: 'Ukraine', value: 4 },
    { text: 'Moldova', value: 5 },
    { text: 'Poland', value: 6 },
    { text: 'Austria', value: 7 },
    { text: 'Slovakia', value: 8 },
    { text: 'Switzerland', value: 9 },
    { text: 'Germany', value: 10 },
    { text: 'Czech', value: 11 },
  ];

  const OPTION_SELECTOR = '[data-testid="option"]';
  const OPTION_ICON_SELECTOR = '[data-testid="option-icon"]';
  const OPTION_TEXT_SELECTOR = '[data-testid="option-text"]';
  const SELECT_ALL_OPTION_SELECTOR = '[data-testid="select-all-option"]';
  const SEARCH_ERROR_SELECTOR = '[data-testid="search-error"]';
  const SCROLL_VIEWPORT_SELECTOR = '[data-testid="scroll-viewport"]';
  const SEARCH_INPUT_SELECTOR = '[data-testid="search-input"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsSelection],
    });

    global.ResizeObserver = MockResizeObserver;

    fixture = TestBed.createComponent(DsSelection);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('multiselect', false);
    fixture.componentRef.setInput('options', MOCK_OPTIONS);
    fixture.componentRef.setInput('valueKey', false);

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should not select item with null value if it is not in an option list', () => {
      const MOCK_OPTION = { text: 'option', value: null } as DropdownOption;

      component.writeValue(MOCK_OPTION);

      expect((component as any).selectedOptions().length).toBe(0);
    });

    it('should select item with null value if it is in options list', () => {
      const MOCK_OPTION = { text: 'option', value: null } as DropdownOption;
      fixture.componentRef.setInput('options', [...MOCK_OPTIONS, MOCK_OPTION]);

      component.writeValue(MOCK_OPTION);

      expect((component as any).selectedOptions().length).toBe(1);
    });

    it('should select items with valueKey', () => {
      fixture.componentRef.setInput('valueKey', 'value');

      (component as any).select(MOCK_OPTIONS[1]);

      expect((component as any).selectedOptions()).toStrictEqual([MOCK_OPTIONS[1]]);
      expect((component as any).value()).toBe(MOCK_OPTIONS[1].value);
    });

    it('should select items without valueKey', () => {
      fixture.componentRef.setInput('valueKey', false);

      (component as any).select(MOCK_OPTIONS[1]);

      expect((component as any).selectedOptions()).toStrictEqual([MOCK_OPTIONS[1]]);
      expect((component as any).value()).toBe(MOCK_OPTIONS[1]);
    });

    it('should select multiple items', () => {
      fixture.componentRef.setInput('multiselect', true);

      (component as any).select(MOCK_OPTIONS[1]);
      (component as any).select(MOCK_OPTIONS[2]);

      expect((component as any).selectedOptions()).toStrictEqual([MOCK_OPTIONS[1], MOCK_OPTIONS[2]]);
      expect((component as any).value()).toStrictEqual([MOCK_OPTIONS[1], MOCK_OPTIONS[2]]);
    });

    it('should select all items', () => {
      const LOCAL_MOCK_OPTIONS = MOCK_OPTIONS.slice(1);
      fixture.componentRef.setInput('multiselect', true);
      fixture.componentRef.setInput('options', LOCAL_MOCK_OPTIONS);

      (component as any).selectAll();

      expect((component as any).selectedOptions()).toStrictEqual(LOCAL_MOCK_OPTIONS);
      expect((component as any).value()).toStrictEqual(LOCAL_MOCK_OPTIONS);
    });

    it('should apply selected items automatically when auto apply enabled', () => {
      component.disableAutoApply(false);

      (component as any).select(MOCK_OPTIONS[1]);

      expect((component as any).selectedOptions()).toStrictEqual([MOCK_OPTIONS[1]]);
      expect((component as any).value()).toBe(MOCK_OPTIONS[1]);
    });

    it('should not apply selected items automatically when auto apply disabled', () => {
      component.disableAutoApply(true);

      (component as any).select(MOCK_OPTIONS[1]);

      expect((component as any).selectedOptions()).toStrictEqual([MOCK_OPTIONS[1]]);
      expect((component as any).value()).toBe(null);
    });

    it('should apply selected items manually when auto apply disabled', () => {
      component.disableAutoApply(true);

      (component as any).select(MOCK_OPTIONS[1]);

      component.apply();

      expect((component as any).selectedOptions()).toStrictEqual([MOCK_OPTIONS[1]]);
      expect((component as any).value()).toBe(MOCK_OPTIONS[1]);
    });

    it('should reset selected items', () => {
      (component as any).select(MOCK_OPTIONS[0]);

      component.resetValue();

      expect((component as any).selectedOptions()).toStrictEqual([]);
      expect((component as any).value()).toBe(null);
    });

    it('should filter options', () => {
      component.searchTerm.set(MOCK_OPTIONS[1].text);

      expect((component as any).filteredOptions()).toStrictEqual([MOCK_OPTIONS[1]]);
    });

    it('should reset filtering on select option', () => {
      component.searchTerm.set(MOCK_OPTIONS[1].text);

      (component as any).select(MOCK_OPTIONS[1]);

      expect((component as any).filteredOptions()).toStrictEqual(MOCK_OPTIONS);
    });

    it('should select options on writeValue', () => {
      const spy = jest.spyOn(component as any, 'updateSelectedOptions');

      component.writeValue(MOCK_OPTIONS[1]);

      expect(spy).toHaveBeenCalledTimes(1);

      expect((component as any).selectedOptions()).toStrictEqual([MOCK_OPTIONS[1]]);
    });

    it('should select options on writeValue with valueKey', () => {
      fixture.componentRef.setInput('valueKey', 'value');

      const spy = jest.spyOn(component as any, 'updateSelectedOptions');

      component.writeValue(MOCK_OPTIONS[1].value);

      expect(spy).toHaveBeenCalledTimes(1);
      expect((component as any).selectedOptions()).toStrictEqual([MOCK_OPTIONS[1]]);
    });

    it('should not select incorrect option on writeValue with valueKey', () => {
      fixture.componentRef.setInput('valueKey', 'value');

      const spy = jest.spyOn(component as any, 'updateSelectedOptions');

      component.writeValue({ text: 'USA', value: 22 });

      expect(spy).toHaveBeenCalledTimes(1);

      expect((component as any).selectedOptions()).toStrictEqual([]);
    });
  });

  describe('View', () => {
    it('should render options', () => {
      fixture.componentRef.setInput('maxDisplayedItems', MOCK_OPTIONS.length);

      fixture.detectChanges();

      const items = getElementsByCss(fixture, OPTION_SELECTOR);

      expect(items.length).toBe(MOCK_OPTIONS.length);
    });

    it('should render option icon', () => {
      fixture.componentRef.setInput('options', [MOCK_OPTION_WITH_ICON]);

      fixture.detectChanges();

      const element = getElementByCss(fixture, OPTION_ICON_SELECTOR);

      expect(element).toBeTruthy();
    });

    it('should render option text', () => {
      fixture.componentRef.setInput('options', [MOCK_OPTION_WITH_ICON]);

      fixture.detectChanges();

      const element = getElementByCss(fixture, OPTION_TEXT_SELECTOR);

      expect(element.nativeElement.textContent).toBe(MOCK_OPTION_WITH_ICON.text);
    });

    it('should render search error message', () => {
      component.searchTerm.set('undefined');

      fixture.detectChanges();

      const element = getElementByCss(fixture, SEARCH_ERROR_SELECTOR);

      expect((component as any).filteredOptions().length).toBe(0);
      expect(element).toBeTruthy();
    });

    it('should render select-all option', () => {
      fixture.componentRef.setInput('multiselect', true);

      fixture.detectChanges();

      const element = getElementByCss(fixture, SELECT_ALL_OPTION_SELECTOR);

      expect(element).toBeTruthy();
    });

    it('should render search', () => {
      fixture.componentRef.setInput('withSearch', true);

      fixture.detectChanges();

      const element = getElementByCss(fixture, SEARCH_INPUT_SELECTOR);

      expect(element).toBeTruthy();
    });
  });
});
