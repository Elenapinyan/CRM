import { SimpleChanges } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NgControl } from '@angular/forms';
import { NgbDate, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { getElementByCss, syncViewModel } from '../../../../shared/utils';
import {
  DEFAULT_DROPDOWN_NOT_SELECTED_TEXT,
  DEFAULT_FOOTER_SETTINGS,
  DEFAULT_INPUT_NOT_SELECTED_PLAYSHOLDER,
} from '../../constants/period-selector.constant';
import { PeriodVariants } from '../../enums/period-selector-variants.enum';
import { SprPeriodSelectorComponent } from './spr-period-selector.component';
import { DefaultDateRangeService } from '../../services/date-range.service';

const ngControlStub = {
  control: {
    invalid: true,
    touched: true,
  },
  errors: { required: true },
};

describe('SprPeriodSelectorComponent', () => {
  let fixture: ComponentFixture<SprPeriodSelectorComponent>;
  let component: SprPeriodSelectorComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [SprPeriodSelectorComponent],
      providers: [
        DefaultDateRangeService,
        {
          provide: NgControl,
          useValue: ngControlStub,
        },
      ],
    });

    fixture = TestBed.createComponent(SprPeriodSelectorComponent);

    component = fixture.componentInstance;
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should not throw if null is passed to writeValue', () => {
      expect(() => component.writeValue(null)).not.toThrow();
    });

    it('should handle maxRangeInDays correctly', () => {
      component.maxRangeInDays = 30;

      expect(component.maxRangeInDays).toBe(30);
    });

    it('should call emit with correct value', () => {
      const emitSpy = jest.spyOn(component.selectedRangeChange, 'emit');

      component.selectedRange = PeriodVariants.LastSevenDays;
      component.selectOption({
        text: 'Last 7 days',
        value: PeriodVariants.LastSevenDays,
      });

      expect(emitSpy).toHaveBeenCalledWith(PeriodVariants.LastSevenDays);
    });

    it('should correctly set dateFrom and dateTo to control', () => {
      const DATE_FROM = '1999-09-09';
      const DATE_TO = '2001-01-01';
      const DATE_RANGE = {
        dateFrom: DATE_FROM,
        dateTo: DATE_TO,
      };

      component.writeValue(DATE_RANGE);

      const controlValue = (component as any).control.getRawValue();

      expect(controlValue.dateFrom).toEqual(
        expect.objectContaining({
          year: 1999,
          month: 9,
          day: 9,
        }),
      );

      expect(controlValue.dateTo).toEqual(
        expect.objectContaining({
          year: 2001,
          month: 1,
          day: 1,
        }),
      );
    });

    it('should copy ngControl "required" error to inner control errors', () => {
      (component as any).handleNgControlTouched();

      const control = (component as any).control;

      expect(control).toBeTruthy();
      expect((control.errors as any)?.required).toBeTruthy();
    });

    it('should set selectedDateRange to item with matching value from selectOptions', () => {
      component.selectedRange = PeriodVariants.LastSevenDays;

      component.selectOptions = [
        { text: 'Today', value: 'today' },
        { text: 'Last 7 days', value: 'last_7_days' },
        { text: 'Last 30 days', value: 'last_30_days' },
      ];

      expect(component.selectedDateRange).toEqual({ text: 'Last 7 days', value: 'last_7_days' });
    });

    it('should merge footerSettings with DEFAULT_FOOTER_SETTINGS', () => {
      component.footerSettings = {
        cancelButtonText: 'Close',
        applyButtonText: 'Select',
      };

      expect(component.fullFooterSettings.cancelButtonText).toBe('Close');
      expect(component.fullFooterSettings.applyButtonText).toBe('Select');
      expect(component.fullFooterSettings.showFooter).toBe(DEFAULT_FOOTER_SETTINGS.showFooter);
    });

    it('should emit rangeConfirmed on apply if submitDateOnApply is true', () => {
      const emitSpy = jest.spyOn(component.rangeConfirmed, 'emit');

      component.footerSettings = {
        submitDateOnApply: true,
      };

      (component as any).dateValueReadyToEmit = {
        dateFrom: '2022-01-01T00:00:00.000Z',
        dateTo: '2022-01-02T23:59:59.000Z',
      };

      component.onApply();

      expect(emitSpy).toHaveBeenCalledWith({
        dateFrom: '2022-01-01T00:00:00.000Z',
        dateTo: '2022-01-02T23:59:59.000Z',
      });
    });

    it('should close datepicker and emit cancel if submitDateOnApply is true', () => {
      const cancelSpy = jest.spyOn(component.rangeCanceled, 'emit');
      const mockDatepicker = { close: jest.fn() } as unknown as NgbInputDatepicker;

      component.footerSettings = { submitDateOnApply: true };

      component.onClose(mockDatepicker, true);

      expect(mockDatepicker.close).toHaveBeenCalled();
      expect(cancelSpy).toHaveBeenCalled();
    });

    it('should emit rangeConfirmed when onApply is called', fakeAsync(() => {
      const emitSpy = jest.spyOn(component.rangeConfirmed, 'emit');

      const testDateRange = {
        dateFrom: '2025-01-01T00:00:00.000Z',
        dateTo: '2025-01-02T23:59:59.000Z',
      };

      component['control'].setValue({
        dateFrom: new NgbDate(2025, 1, 1),
        dateTo: new NgbDate(2025, 1, 2),
      });

      (component as any).dateValueReadyToEmit = testDateRange;

      component.onApply();

      expect(emitSpy).toHaveBeenCalledWith(testDateRange);
    }));

    it('should emit rangeCanceled when onClose is called with closeOnButton = true and submitDateOnApply = true', () => {
      jest.spyOn(component.rangeCanceled, 'emit');
      const mockDatepicker = { close: jest.fn() } as unknown as NgbInputDatepicker;

      component.fullFooterSettings = {
        ...component.fullFooterSettings,
        submitDateOnApply: true,
      };

      component.onClose(mockDatepicker, true);

      expect(mockDatepicker.close).toHaveBeenCalled();
      expect(component.rangeCanceled.emit).toHaveBeenCalled();
    });

    it('should not emit rangeCanceled if submitDateOnApply is false', () => {
      jest.spyOn(component.rangeCanceled, 'emit');
      const mockDatepicker = { close: jest.fn() } as unknown as NgbInputDatepicker;

      component.fullFooterSettings = {
        ...component.fullFooterSettings,
        submitDateOnApply: false,
      };

      component.onClose(mockDatepicker, true);

      expect(component.rangeCanceled.emit).not.toHaveBeenCalled();
      expect(mockDatepicker.close).not.toHaveBeenCalled();
    });

    it('should call deselectDate when selectedRange changes to NotSelected', () => {
      const deselectSpy = jest.spyOn(component, 'deselectDate');

      component.selectOptionList = [
        { value: 'last7days', text: 'Last 7 Days' },
        { value: 'last30days', text: 'Last 30 Days' },
        { value: 'custom', text: 'Custom Range' },
      ];

      const changes: SimpleChanges = {
        selectedRange: {
          currentValue: PeriodVariants.NotSelected,
          previousValue: 'last7days',
          firstChange: false,
          isFirstChange: () => false,
        },
      };

      component.ngOnChanges(changes);

      expect(deselectSpy).toHaveBeenCalledTimes(1);
    });

    it('should not call deselectDate when selectedRange is not NotSelected', () => {
      const deselectSpy = jest.spyOn(component, 'deselectDate');

      component.selectOptionList = [
        { value: 'last7days', text: 'Last 7 Days' },
        { value: 'last30days', text: 'Last 30 Days' },
        { value: 'custom', text: 'Custom Range' },
      ];

      const changes: SimpleChanges = {
        selectedRange: {
          currentValue: 'last7days',
          previousValue: PeriodVariants.NotSelected,
          firstChange: false,
          isFirstChange: () => false,
        },
      };

      component.ngOnChanges(changes);

      expect(deselectSpy).not.toHaveBeenCalled();
    });

    it('should not process when selectOptionList is empty and selectedRange is not NotSelected', () => {
      const deselectSpy = jest.spyOn(component, 'deselectDate');

      component.selectOptionList = [];
      const changes: SimpleChanges = {
        selectedRange: {
          currentValue: 'some-value',
          previousValue: 'other-value',
          firstChange: false,
          isFirstChange: () => false,
        },
      };

      component.ngOnChanges(changes);

      expect(deselectSpy).not.toHaveBeenCalled();
      expect(component.selectedDateRange).toEqual({ text: 'Select', value: '' });
    });

    it('should emit dateSelected when onDateSelection method called with custom flag enabled', () => {
      jest.spyOn(component.dateSelected, 'emit');
      jest.spyOn(component, 'onDateSelection');

      const selectedDate = new NgbDate(2026, 1, 1);
      component.onDateSelection(selectedDate, true);

      expect(component.onDateSelection).toHaveBeenCalled();
      expect(component.dateSelected.emit).toHaveBeenCalledWith(selectedDate);
    });

    it('should NOT emit dateSelected when onDateSelection method called WITHOUT custom flag enabled', () => {
      jest.spyOn(component.dateSelected, 'emit');
      jest.spyOn(component, 'onDateSelection');

      const selectedDate = new NgbDate(2026, 1, 1);
      component.onDateSelection(selectedDate, false);

      expect(component.onDateSelection).toHaveBeenCalled();
      expect(component.dateSelected.emit).not.toHaveBeenCalled();
    });

    it('should PRESERVE label when writeValue receives dates matching PeriodVariants.LastMonth', () => {
      component.selectedRange = PeriodVariants.LastMonth;
      component.selectedDateRange = { text: 'Last Month', value: PeriodVariants.LastMonth };

      const dateRangeService = TestBed.inject(DefaultDateRangeService);
      const lastMonthDates = dateRangeService.getDateRange(PeriodVariants.LastMonth);

      const toStr = (d: NgbDate): string => `${d.year}-${d.month.toString().padStart(2, '0')}-${d.day.toString().padStart(2, '0')}`;

      const inputValue = {
        dateFrom: toStr(lastMonthDates!.dateFrom!),
        dateTo: toStr(lastMonthDates!.dateTo!),
      };

      component.writeValue(inputValue);

      expect(component.selectedDateRange.text).toBe('Last Month');
      expect(component.selectedDateRange.value).toBe(PeriodVariants.LastMonth);
    });

    it('should RESET label to "Select" when writeValue receives dates that DO NOT match selectedRange', () => {
      component.selectedRange = PeriodVariants.Today;
      component.selectedDateRange = { text: 'Today', value: PeriodVariants.Today };

      const randomDates = {
        dateFrom: '1990-01-01',
        dateTo: '1990-01-05',
      };

      component.writeValue(randomDates);

      expect(component.selectedDateRange.text).toBe('Select');
      expect(component.selectedDateRange.value).toBe('');
    });

    it('should PRESERVE label when user clicks reset multiple times consecutively', () => {
      component.selectedRange = PeriodVariants.Today;
      component.selectedDateRange = { text: 'Today', value: PeriodVariants.Today };

      const dateRangeService = TestBed.inject(DefaultDateRangeService);
      const todayDates = dateRangeService.getDateRange(PeriodVariants.Today);

      const toStr = (d: NgbDate): string => `${d.year}-${d.month.toString().padStart(2, '0')}-${d.day.toString().padStart(2, '0')}`;

      const inputValue = {
        dateFrom: toStr(todayDates!.dateFrom!),
        dateTo: toStr(todayDates!.dateTo!),
      };

      component.writeValue(inputValue);
      expect(component.selectedDateRange.text).toBe('Today');

      component.writeValue(inputValue);
      expect(component.selectedDateRange.text).toBe('Today');

      component.writeValue(inputValue);

      expect(component.selectedDateRange.text).toBe('Today');
      expect(component.selectedDateRange.value).toBe(PeriodVariants.Today);
    });
  });

  describe('View', () => {
    it('should add is-invalid class', () => {
      syncViewModel(fixture);

      const inputElement: HTMLInputElement = getElementByCss(fixture, '.control-form').nativeElement;

      expect(inputElement.classList.contains('is-invalid')).toBeTruthy();
    });

    it('should show label', () => {
      const MOCK_LABEL = 'label';

      component.label = MOCK_LABEL;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, 'spr-label').nativeElement;

      expect(element.textContent?.trim()).toBe(MOCK_LABEL);
    });

    it('should change control size to large', () => {
      const LARGE_CLASS = 'control-form--large';

      component.controlSize = 'lg';

      syncViewModel(fixture);

      const div: HTMLElement = getElementByCss(fixture, '.form-datepicker-control').nativeElement;

      expect(div.classList.contains(LARGE_CLASS)).toBeTruthy();
    });

    it('should show description', () => {
      const MOCK_DESCRIPTION = 'description';

      ngControlStub.control.invalid = false;

      component.description = MOCK_DESCRIPTION;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, 'spr-field-description').nativeElement;

      expect(element.textContent?.trim()).toBe(MOCK_DESCRIPTION);

      ngControlStub.control.invalid = true;
    });

    it('should show error', () => {
      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, 'spr-error').nativeElement;

      expect(element).toBeTruthy();
    });

    it('should disable toggle btn', () => {
      (component as any).control.disable();

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, '.btn.btn-calendar').nativeElement;

      expect(element.hasAttribute('disabled')).toBeTruthy();
    });

    it('should add is-open class', () => {
      const input: HTMLInputElement = getElementByCss(fixture, '.form-datepicker-control').nativeElement;

      input.dispatchEvent(new Event('click'));

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, '.form-dropdown').nativeElement;

      expect(element.classList.contains('is-open')).toBeTruthy();
    });

    it('Should show deselect button when we isDeselectAllowed and selected date', () => {
      fixture.componentRef.setInput('isDeselectAllowed', true);
      fixture.detectChanges();

      const testDateRange = {
        dateFrom: '2025-01-01T00:00:00.000Z',
        dateTo: '2025-01-02T23:59:59.000Z',
      };

      component['control'].setValue({
        dateFrom: new NgbDate(2025, 1, 1),
        dateTo: new NgbDate(2025, 1, 2),
      });

      (component as any).dateValueReadyToEmit = testDateRange;

      component.onApply();

      const deleteButton: HTMLInputElement = getElementByCss(fixture, '.btn, .btn-calendar').nativeElement;
      expect(!!deleteButton).toBeTruthy();
    });

    it('Do not show deselect button when we havent isDeselectAllowed and selected date', () => {
      const testDateRange = {
        dateFrom: '2025-01-01T00:00:00.000Z',
        dateTo: '2025-01-02T23:59:59.000Z',
      };

      component['control'].setValue({
        dateFrom: new NgbDate(2025, 1, 1),
        dateTo: new NgbDate(2025, 1, 2),
      });

      (component as any).dateValueReadyToEmit = testDateRange;

      component.onApply();

      const deleteButton = getElementByCss(fixture, '.btn, .btn-calendar');
      expect(!!deleteButton).toBeFalsy();
    });

    it('Do not show placeholder when we havent isDeselectAllowed', () => {
      component['control'].setValue({
        dateFrom: null,
        dateTo: null,
      });

      fixture.detectChanges();
      component.onApply();

      const input: HTMLInputElement = getElementByCss(fixture, '.form-datepicker-control').nativeElement;

      expect(input.placeholder).toEqual('');
    });

    it('Should show placeholder and dropdown text when we have isDeselectAllowed', () => {
      fixture.componentRef.setInput('isDeselectAllowed', true);
      component.deselectDate();
      fixture.detectChanges();

      const input: HTMLInputElement = getElementByCss(fixture, '.form-datepicker-control').nativeElement;

      expect(input.placeholder).toEqual(DEFAULT_INPUT_NOT_SELECTED_PLAYSHOLDER);
      expect(component.selectedDateRange.text).toEqual(DEFAULT_DROPDOWN_NOT_SELECTED_TEXT);
      expect(component.selectedDateRange.value).toEqual(PeriodVariants.NotSelected);
    });

    it('Should show custom placeholder and dropdown text when we have isDeselectAllowed', () => {
      const someCustomPleysholder = 'testText';
      const someCustomDropdownText = 'testText';
      fixture.componentRef.setInput('isDeselectAllowed', true);
      fixture.componentRef.setInput('inputPlaceholder', someCustomPleysholder);
      fixture.componentRef.setInput('dropdownNotSelectedText', someCustomDropdownText);
      component.deselectDate();
      fixture.detectChanges();

      const input: HTMLInputElement = getElementByCss(fixture, '.form-datepicker-control').nativeElement;

      expect(input.placeholder).toEqual(someCustomPleysholder);
      expect(component.selectedDateRange.value).toEqual(PeriodVariants.NotSelected);
      expect(component.selectedDateRange.text).toEqual(someCustomDropdownText);
    });
  });
});
