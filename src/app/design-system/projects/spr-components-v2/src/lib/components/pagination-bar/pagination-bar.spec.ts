import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationBar } from './pagination-bar';
import { getElementByCss } from '../../shared/utils';

(window as any).Range = jest.fn(() => ({
  setStart: jest.fn(),
  setEnd: jest.fn(),
  getBoundingClientRect: jest.fn(() => ({ top: 0, height: 0 })),
}));

describe('SprPaginationBarComponent', () => {
  let fixture: ComponentFixture<PaginationBar>;
  let component: PaginationBar;

  const MOCK_PAGE = 0;
  const MOCK_SIZE = 25;
  const MOCK_SIZES = [25, 50];
  const MOCK_TOTAL = 101;

  const MOCK_PAGINATION_PARAMS = {
    first: true,
    last: false,
    hasNext: true,
    hasPrevious: false,
  };

  const PAGE_SIZE_SELECTOR = '[data-testid="page-size"]';
  const SHOWING_ITEMS_SELECTOR = '[data-testid="showing-items"]';
  const PAGE_SELECTOR = '[data-testid="page"]';
  const PAGE_MENU_SELECTOR = '[data-testid="page-menu"]';
  const PAGES_COUNTER_SELECTOR = '[data-testid="pages-counter"]';
  const CONTROL_NEXT_SELECTOR = '[data-testid="control-next"]';
  const CONTROL_PREV_SELECTOR = '[data-testid="control-prev"]';

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationBar);

    component = fixture.componentInstance;

    fixture.componentRef.setInput('page', MOCK_PAGE);
    fixture.componentRef.setInput('size', MOCK_SIZE);
    fixture.componentRef.setInput('sizes', MOCK_SIZES);
    fixture.componentRef.setInput('total', MOCK_TOTAL);
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should show page size', () => {
      fixture.detectChanges();

      const dEl = getElementByCss(fixture, PAGE_SIZE_SELECTOR);

      expect(dEl.nativeElement.textContent).toBe(MOCK_SIZE.toString());
    });

    it('should render showing items counter', () => {
      fixture.detectChanges();

      const dEl = getElementByCss(fixture, SHOWING_ITEMS_SELECTOR);

      expect(dEl).toBeTruthy();
    });

    it('should not render showing items counter when paginationParams prop is set', () => {
      fixture.componentRef.setInput('paginationParams', MOCK_PAGINATION_PARAMS);

      fixture.detectChanges();

      const dEl = getElementByCss(fixture, SHOWING_ITEMS_SELECTOR);

      expect(dEl).toBeFalsy();
    });

    it('should render page-menu', () => {
      fixture.detectChanges();

      const dEl = getElementByCss(fixture, PAGE_MENU_SELECTOR);

      expect(dEl).toBeTruthy();
    });

    it('should render page', () => {
      fixture.componentRef.setInput('paginationParams', MOCK_PAGINATION_PARAMS);

      fixture.detectChanges();

      const dEl = getElementByCss(fixture, PAGE_SELECTOR);

      expect(dEl).toBeTruthy();
    });

    it('should render pages counter', () => {
      fixture.detectChanges();

      const dEl = getElementByCss(fixture, PAGES_COUNTER_SELECTOR);

      expect(dEl).toBeTruthy();
    });

    it('should not render pages counter when paginationParams prop is set', () => {
      fixture.componentRef.setInput('paginationParams', MOCK_PAGINATION_PARAMS);

      fixture.detectChanges();

      const dEl = getElementByCss(fixture, PAGES_COUNTER_SELECTOR);

      expect(dEl).toBeFalsy();
    });

    it('should change page to next on click', () => {
      const spy = jest.spyOn(component, 'changePage');

      fixture.detectChanges();

      const dEl = getElementByCss(fixture, CONTROL_NEXT_SELECTOR);

      dEl.triggerEventHandler('click');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(MOCK_PAGE + 1);
    });

    it('should change page to previous on click', () => {
      fixture.componentRef.setInput('page', 1);

      const spy = jest.spyOn(component, 'changePage');

      fixture.detectChanges();

      const dEl = getElementByCss(fixture, CONTROL_PREV_SELECTOR);

      dEl.triggerEventHandler('click');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(0);
    });
  });
});
