import { Injectable } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NgbDate, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { DsDatepickerRange } from './datepicker-range';
import { date2NgbDate, DateRange, DatetimeRange, getDiffInDays, ngbDateToDate, PeriodVariants } from '../datepicker.util';
import { getElementByCss, syncViewModel } from '../../../shared/utils';
import { SprDateRangeAdapter } from '../date-adapter';
import { subDays } from 'date-fns';

@Injectable()
class CustomDateRangeAdapter extends SprDateRangeAdapter<DateRange<Date>> {
  override fromModel(range: DateRange<Date>): DatetimeRange<NgbDateStruct> {
    const parsedDateFrom = date2NgbDate(range.dateFrom);
    const parsedDateTo = date2NgbDate(range.dateTo);

    return {
      date: {
        dateFrom: parsedDateFrom?.date ?? null,
        dateTo: parsedDateTo?.date ?? null,
      },
      time: {
        timeFrom: parsedDateFrom?.time ?? null,
        timeTo: parsedDateTo?.time ?? null,
      },
    };
  }

  override toModel(range: DatetimeRange<NgbDateStruct | null>): DateRange<Date> {
    return {
      dateFrom: ngbDateToDate(range.date.dateFrom, range.time?.timeFrom),
      dateTo: ngbDateToDate(range.date.dateTo, range.time?.timeTo),
    };
  }
}

describe('SprDatepickerRangeComponent', () => {
  let fixture: ComponentFixture<DsDatepickerRange<DateRange<Date>>>;
  let component: DsDatepickerRange<DateRange<Date>>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [DsDatepickerRange],
      providers: [
        {
          provide: SprDateRangeAdapter,
          useClass: CustomDateRangeAdapter,
        },
      ],
    });

    fixture = TestBed.createComponent(DsDatepickerRange<DateRange<Date>>);

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
      const MAX_RANGE_MOCK = 5;
      fixture.componentRef.setInput('maxRangeInDays', MAX_RANGE_MOCK);

      const date = new Date();
      const pastDate = subDays(date, MAX_RANGE_MOCK + 2);
      const ngbDate = date2NgbDate(date);
      const ngbPastDate = date2NgbDate(pastDate);

      component.selectDate(ngbPastDate.date!);
      component.selectDate(ngbDate.date!);

      const range = component.dateControl.getRawValue();

      if (!range || !range.dateFrom || !range.dateTo) {
        expect(range).toBeTruthy();
        expect(range?.dateFrom).toBeTruthy();
        expect(range?.dateTo).toBeTruthy();
        return;
      }

      const actualDiff = getDiffInDays(range.dateFrom, range.dateTo);

      expect(actualDiff).toBe(MAX_RANGE_MOCK);
    });

    it('should call emit with correct value', () => {
      const emitSpy = jest.spyOn(component.selectedRange, 'set');

      fixture.componentRef.setInput('selectedRange', PeriodVariants.LastSevenDays);

      (component as any).selectOption({
        text: 'Last 30 days',
        value: PeriodVariants.LastThirtyDays,
      });

      expect(emitSpy).toHaveBeenCalledWith(PeriodVariants.LastThirtyDays);
    });

    it('should correctly set dateFrom and dateTo to control', () => {
      const DATE_FROM = new Date('1999-09-09');
      const DATE_TO = new Date('2001-01-01');

      const DATE_RANGE = {
        dateFrom: DATE_FROM,
        dateTo: DATE_TO,
      };

      component.writeValue(DATE_RANGE);

      const controlValue = component.dateControl.getRawValue();

      expect(controlValue?.dateFrom).toEqual(
        expect.objectContaining({
          year: 1999,
          month: 9,
          day: 9,
        }),
      );

      expect(controlValue?.dateTo).toEqual(
        expect.objectContaining({
          year: 2001,
          month: 1,
          day: 1,
        }),
      );
    });

    it('should set selectedRange to item with matching value from selectOptions', () => {
      fixture.componentRef.setInput('selectedRange', PeriodVariants.LastThirtyDays);

      fixture.componentRef.setInput('selectOptions', [
        { text: 'Today', value: PeriodVariants.Today },
        { text: 'Last 7 days', value: PeriodVariants.LastSevenDays },
        { text: 'Last 30 days', value: PeriodVariants.LastThirtyDays },
      ]);

      (component as any).selectOption({ text: 'Last 7 days', value: PeriodVariants.LastSevenDays });

      expect(component.selectedRange()).toEqual(PeriodVariants.LastSevenDays);
    });

    it('should close datepicker and emit rangeCanceled if showFooter is true', () => {
      const DATE_FROM = new Date('1999-09-09');
      const DATE_TO = new Date('2001-01-01');

      const DATE_RANGE = {
        dateFrom: DATE_FROM,
        dateTo: DATE_TO,
      };

      const cancelSpy = jest.spyOn(component.rangeCanceled, 'emit');
      const mockDatepicker = { close: jest.fn(), isOpen: () => true } as unknown as NgbInputDatepicker;

      component.writeValue(DATE_RANGE);

      fixture.componentRef.setInput('showFooter', true);

      component.close(mockDatepicker, true);

      expect(mockDatepicker.close).toHaveBeenCalled();
      expect(cancelSpy).toHaveBeenCalled();
    });

    it('should emit rangeConfirmed when onApply is called', fakeAsync(() => {
      const emitSpy = jest.spyOn(component.rangeConfirmed, 'emit');

      component.dateControl.setValue({
        dateFrom: new NgbDate(2025, 1, 1),
        dateTo: new NgbDate(2025, 1, 2),
      });

      component.timeControl.setValue({
        timeFrom: { hour: 0, minute: 0, second: 0 },
        timeTo: { hour: 23, minute: 59, second: 59 },
      });

      component.apply();

      const range = (component as any).dateRangeAdapter.toModel((component as any).form.getRawValue());

      expect(emitSpy).toHaveBeenCalledWith(range);
    }));

    it('should call deselectDate when selectedRange changes to NotSelected', () => {
      const deselectSpy = jest.spyOn(component, 'resetValue');

      fixture.componentRef.setInput('selectOptions', [
        { value: PeriodVariants.LastSevenDays, text: 'Last 7 Days' },
        { value: PeriodVariants.LastThirtyDays, text: 'Last 30 Days' },
        { value: PeriodVariants.Custom, text: 'Custom Range' },
      ]);

      fixture.componentRef.setInput('selectedRange', PeriodVariants.NotSelected);

      fixture.detectChanges();

      expect(deselectSpy).toHaveBeenCalledTimes(1);
    });

    it('should not call deselectDate when selectedRange is not NotSelected', () => {
      const deselectSpy = jest.spyOn(component as any, 'resetValue');

      fixture.componentRef.setInput('selectOptions', [
        { value: PeriodVariants.LastSevenDays, text: 'Last 7 Days' },
        { value: PeriodVariants.LastThirtyDays, text: 'Last 30 Days' },
        { value: PeriodVariants.Custom, text: 'Custom Range' },
      ]);

      fixture.componentRef.setInput('selectedRange', PeriodVariants.LastSevenDays);

      expect(deselectSpy).not.toHaveBeenCalled();
    });
  });

  describe('View', () => {
    it('should change control size to small', () => {
      const SMALL_CLASS = 'control-field--small';

      fixture.componentRef.setInput('controlSize', 'sm');

      syncViewModel(fixture);

      const div: HTMLElement = getElementByCss(fixture, '[data-testid="dp-control-field"]').nativeElement;

      expect(div.classList.contains(SMALL_CLASS)).toBeTruthy();
    });

    it('should disable toggle btn', () => {
      (component as any).form.disable();

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, '[data-testid="dp-toggle"]').nativeElement;

      expect(element.hasAttribute('disabled')).toBeTruthy();
    });

    it('Should show deselect button when we isDeselectAllowed and selected date', () => {
      fixture.componentRef.setInput('isDeselectAllowed', true);

      component.dateControl.setValue({
        dateFrom: new NgbDate(2025, 1, 1),
        dateTo: new NgbDate(2025, 1, 2),
      });

      component.timeControl.setValue({
        timeFrom: { hour: 0, minute: 0, second: 0 },
        timeTo: { hour: 23, minute: 59, second: 59 },
      });

      component.apply();

      syncViewModel(fixture);

      const deleteButton: HTMLInputElement = getElementByCss(fixture, '[data-testid="dp-deselect"]').nativeElement;

      expect(!!deleteButton).toBeTruthy();
    });

    it('Do not show deselect button when we haven`t isDeselectAllowed and selected date', () => {
      component.dateControl.setValue({
        dateFrom: new NgbDate(2025, 1, 1),
        dateTo: new NgbDate(2025, 1, 2),
      });

      component.timeControl.setValue({
        timeFrom: { hour: 0, minute: 0, second: 0 },
        timeTo: { hour: 23, minute: 59, second: 59 },
      });

      component.apply();

      const deleteButton = getElementByCss(fixture, '[data-testid="dp-deselect"]');

      expect(!!deleteButton).toBeFalsy();
    });

    it('Should show placeholder when input is readonly', () => {
      const MOCK_PLACEHOLDER = 'somePlaceholder';
      fixture.componentRef.setInput('inputReadonly', true);
      fixture.componentRef.setInput('placeholder', MOCK_PLACEHOLDER);

      (component as any).resetValue();

      fixture.detectChanges();

      const input: HTMLInputElement = getElementByCss(fixture, '[data-testid="dp-control"]').nativeElement;

      expect(input.placeholder).toEqual(MOCK_PLACEHOLDER);
      expect(component.selectedRange()).toEqual(PeriodVariants.NotSelected);
    });

    it('Should show mask placeholder when input is not readonly', () => {
      const MOCK_PLACEHOLDER = 'somePlaceholder';
      const MOCK_MASK_PLACEHOLDER = (component as any).dateParserFormatter.inputMaskConfig().placeholder;

      fixture.componentRef.setInput('inputReadonly', false);
      fixture.componentRef.setInput('placeholder', MOCK_PLACEHOLDER);
      fixture.componentRef.setInput('timepicker', true);

      (component as any).resetValue();

      fixture.detectChanges();

      const input: HTMLInputElement = getElementByCss(fixture, '[data-testid="dp-control"]').nativeElement;

      expect(input.placeholder).toEqual(MOCK_MASK_PLACEHOLDER + ' - ' + MOCK_MASK_PLACEHOLDER);
      expect(component.selectedRange()).toEqual(PeriodVariants.NotSelected);
    });
  });
});
