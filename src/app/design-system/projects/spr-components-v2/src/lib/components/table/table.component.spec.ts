import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { getElementByCss, getElementsByCss, syncViewModel } from '../../shared/utils';
import { DsTableComponent } from './table.component';
import { DisplayedColumn } from './interfaces/table.interface';

const mockHighlightRegistry = {
  set: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'CSS', {
  value: {
    highlights: mockHighlightRegistry,
  },
  writable: true,
});

(window as any).Highlight = jest.fn();
(window as any).Range = jest.fn(() => ({
  setStart: jest.fn(),
  setEnd: jest.fn(),
  getBoundingClientRect: jest.fn(() => ({ top: 0, height: 0 })),
}));

describe('SprTableComponent', () => {
  let fixture: ComponentFixture<DsTableComponent<DisplayedColumn, { [key: string]: any }>>;
  let component: DsTableComponent<DisplayedColumn, { [key: string]: any }>;

  const columns: DisplayedColumn[] = [
    {
      columnKey: 'name',
      text: 'Name',
    },
    {
      columnKey: 'sureName',
      text: 'SureName',
    },
    {
      columnKey: 'age',
      text: 'Age',
      settings: {
        headColumnClasses: 'brd-table__th--right',
        bodyColumnClasses: 'brd-table__td--right',
      },
    },
    {
      columnKey: 'sex',
      text: 'Sex',
    },
    {
      columnKey: 'customText',
      text: 'Text',
    },
    {
      columnKey: 'status',
      text: 'Status',
    },
    {
      columnKey: 'blockManagement',
      text: 'Block Management',
      settings: {
        headColumnClasses: 'brd-table__th--center',
        bodyColumnClasses: 'brd-table__td--center',
      },
    },
  ];

  const rows: { [key: string]: any }[] = [
    {
      name: 'Andrew',
      sureName: 'Andreev',
      age: 22,
      status: 'gray',
      blockManagement: 'Block',
    },
    {
      name: 'Egor',
      sureName: 'Egorov',
      age: 11,
      status: 'olive',
      blockManagement: 'Block',
    },
    {
      name: 'Alex',
      sureName: 'Alexeev',
      age: 6,
      status: 'green',
      blockManagement: 'Block',
    },
    {
      name: 'Roman',
      sureName: 'Romanov',
      age: 32,
      status: 'purple',
      blockManagement: 'Block',
    },
    {
      name: 'Anton',
      sureName: 'Antonov',
      age: 108,
      status: 'blue',
      blockManagement: 'Block',
    },
  ];

  const HEADER_SELECTOR = '[data-testid="table-inner-header"]';
  const PAGINATION_SELECTOR = '[data-testid="pagination-bar"]';
  const SPINNER_SELECTOR = '[data-testid="loading-spinner"]';
  const TABLE_SELECTOR = '[data-testid="data-table"]';
  const ROW_SELECTOR = '[data-testid="table-body-row"]';
  const HEAD_CELL_SELECTOR = '[data-testid="table-head-cell"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, DsTableComponent],
    });

    fixture = TestBed.createComponent(DsTableComponent<DisplayedColumn, { [key: string]: any }>);

    component = fixture.componentInstance;

    component.displayedRows = rows;
    component.displayedColumns = columns;

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should show title', () => {
      const MOCK_TITLE = 'title';

      component.title = MOCK_TITLE;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, HEADER_SELECTOR)?.nativeElement;

      expect(element).toBeTruthy();
      expect(element.textContent?.trim()).toBe(MOCK_TITLE);
    });

    it('should show pagination bar', () => {
      component.withPagination = true;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, PAGINATION_SELECTOR)?.nativeElement;

      expect(element).toBeTruthy();
    });

    it('should show spinner', () => {
      component.isLoading = true;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, SPINNER_SELECTOR)?.nativeElement;

      expect(element).toBeTruthy();
    });

    it('should change cell-size', () => {
      component.cellSize = 'sm';

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, TABLE_SELECTOR)?.nativeElement;

      expect(element).toBeTruthy();
      expect(element.classList.contains('brd-table--sm')).toBeTruthy();
    });

    it('should display rows', () => {
      const rowElements: DebugElement[] = getElementsByCss(fixture, ROW_SELECTOR);

      expect(rowElements.length).toBe(rows.length);
    });

    it('should display cols', () => {
      const colElements: DebugElement[] = getElementsByCss(fixture, HEAD_CELL_SELECTOR);

      expect(colElements.length).toBe(columns.length);
    });
  });
});
