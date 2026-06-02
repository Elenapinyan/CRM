import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { getElementByCss, getElementsByCss, syncViewModel } from '../../shared/utils';
import { PAGE_SIZE_SELECTOR_CONFIG_TOKEN, PageSizeSelectorConfig } from '../page-size-selector';
import { DropdownOption } from '../../shared';
import { SprTableComponent } from './spr-table.component';
import { PAGINATION_BAR_CONFIG_TOKEN, PaginationBarConfig } from '../pagination-bar';
import { DisplayedColumn } from './interfaces/table.interface';
import { DebugElement } from '@angular/core';

describe('SprTableComponent', () => {
  let fixture: ComponentFixture<SprTableComponent<DisplayedColumn, { [key: string]: any }>>;
  let component: SprTableComponent<DisplayedColumn, { [key: string]: any }>;

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

  const mockPaginationBarConfig: PaginationBarConfig = {
    exportLabel: 'Export:',
  };

  const mockPageSizeSelectorConfig: PageSizeSelectorConfig = {
    mapToOptions: (sizes: number[]): DropdownOption[] =>
      sizes.map((size) => ({
        text: `${size} per page`,
        value: size,
      })),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
      providers: [
        {
          provide: PAGINATION_BAR_CONFIG_TOKEN,
          useValue: mockPaginationBarConfig,
        },
        {
          provide: PAGE_SIZE_SELECTOR_CONFIG_TOKEN,
          useValue: mockPageSizeSelectorConfig,
        },
      ],
    });

    fixture = TestBed.createComponent(SprTableComponent<DisplayedColumn, { [key: string]: any }>);

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

      const element: HTMLElement = getElementByCss(fixture, '.inner-header__title')?.nativeElement;

      expect(element).toBeTruthy();
      expect(element.textContent?.trim()).toBe(MOCK_TITLE);
    });

    it('should show pagination bar', () => {
      component.withPagination = true;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, 'spr-pagination-bar')?.nativeElement;

      expect(element).toBeTruthy();
    });

    it('should show spinner', () => {
      component.isLoading = true;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, 'spr-spinner')?.nativeElement;

      expect(element).toBeTruthy();
    });

    it('should change cell-size', () => {
      component.cellSize = 'sm'; // default is lg

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, '.brd-table--sm')?.nativeElement;

      expect(element).toBeTruthy();
    });

    it('should display rows', () => {
      const rowElements: DebugElement[] = getElementsByCss(fixture, 'tbody tr');

      expect(rowElements.length).toBe(rows.length);
    });

    it('should display cols', () => {
      const colElements: DebugElement[] = getElementsByCss(fixture, 'tr th');

      expect(colElements.length).toBe(columns.length);
    });
  });
});
