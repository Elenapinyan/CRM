import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { SprPaginationBarComponent } from './spr-pagination-bar.component';
import { PAGINATION_BAR_CONFIG_TOKEN } from './constants/pagination-bar.constant';
import { PaginationBarConfig } from './interfaces/pagination-bar-config.interface';
import { PAGE_SIZE_SELECTOR_CONFIG_TOKEN, PageSizeSelectorConfig } from '../page-size-selector';
import { DropdownOption } from '../../shared';

describe('SprPaginationBarComponent', () => {
  let fixture: ComponentFixture<SprPaginationBarComponent>;
  let component: SprPaginationBarComponent;
  const MOCK_PAGINATION_PARAMS = {
    first: true,
    last: false,
    hasNext: true,
    hasPrevious: false,
  };

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

    fixture = TestBed.createComponent(SprPaginationBarComponent);

    component = fixture.componentInstance;
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should throw an error in control when maximum search symbols exceeded', () => {
      component.withSearch = true;
      component.searchMaxLength = 2;
      component.searchControl.patchValue('short');

      component.ngOnChanges({
        searchMaxLength: {
          firstChange: false,
          currentValue: 2,
          previousValue: 100,
          isFirstChange: () => false,
        },
      });

      syncViewModel(fixture);

      expect(component.searchControl.errors).toHaveProperty('maxlength');
    });
  });

  describe('View', () => {
    it('should render custom pages template', () => {
      component.paginationParams = MOCK_PAGINATION_PARAMS;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, '.ngb-custom-pages-item')?.nativeElement;

      expect(element).toBeTruthy();
    });

    it('should call onPageChange', () => {
      const onPageChangeSpy = jest.spyOn(component, 'onPageChange');

      component.paginationParams = MOCK_PAGINATION_PARAMS;

      syncViewModel(fixture);

      const element: HTMLInputElement = getElementByCss(fixture, '.ngb-custom-pages-item input')?.nativeElement;

      element.value = '2';

      element.dispatchEvent(new Event('blur'));

      syncViewModel(fixture);

      expect(element).toBeTruthy();
      expect(onPageChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should call exportAsFormat', () => {
      const exportAsFormatSpy = jest.spyOn(component, 'exportAsFormat');

      component.withExportSection = true;

      syncViewModel(fixture);

      const buttonElement: HTMLButtonElement = getElementByCss(fixture, '.btn-group-holder spr-button')?.nativeElement;

      buttonElement.dispatchEvent(new Event('click'));

      syncViewModel(fixture);

      expect(buttonElement).toBeTruthy();
      expect(exportAsFormatSpy).toHaveBeenCalledTimes(1);
    });

    it('should render exportSection', () => {
      component.withExportSection = true;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, '.btn-group-holder').nativeElement;

      expect(element).toBeTruthy();
    });

    it('should render search', () => {
      component.withSearch = true;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, '.pagination-bar > spr-input')?.nativeElement;

      expect(element).toBeTruthy();
    });

    it('should render page size selector when paginationWithPageSize is true', () => {
      component.paginationWithPageSize = true;
      syncViewModel(fixture);

      const selector = getElementByCss(fixture, 'spr-page-size-selector');
      expect(selector).toBeTruthy();
    });

    it('should not render page size selector when paginationWithPageSize is false', () => {
      component.paginationWithPageSize = false;
      syncViewModel(fixture);

      const selector = getElementByCss(fixture, 'spr-page-size-selector');
      expect(selector).toBeNull();
    });

    it('should disable pagination input when isPaginationInputDisabled is true', () => {
      component.paginationParams = MOCK_PAGINATION_PARAMS;
      component.isPaginationInputDisabled = true;
      syncViewModel(fixture);

      const input: HTMLInputElement = getElementByCss(fixture, '.ngb-custom-pages-item input')?.nativeElement;
      expect(input).toBeTruthy();
      expect(input.disabled).toBe(true);
    });

    it('should enable pagination input when isPaginationInputDisabled is false', () => {
      component.paginationParams = MOCK_PAGINATION_PARAMS;
      component.isPaginationInputDisabled = false;
      syncViewModel(fixture);

      const input: HTMLInputElement = getElementByCss(fixture, '.ngb-custom-pages-item input')?.nativeElement;
      expect(input).toBeTruthy();
      expect(input.disabled).toBe(false);
    });
  });
});
