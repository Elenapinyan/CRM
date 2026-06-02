import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbDate, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { addYears, subYears } from 'date-fns';
import { getElementByCss, syncViewModel } from '../../../shared/utils';
import { SprDatetimeAdapter } from '../date-adapter';
import { DateTime, ngbDateToDate } from '../datepicker.util';
import { DsDatepicker } from './datepicker';

@Injectable()
class SprCustomDatetimeAdapter extends SprDatetimeAdapter<Date | null> {
  override fromModel(value: Date | null): DateTime<NgbDateStruct | null, NgbTimeStruct | null> {
    return {
      date: value ? { year: value.getFullYear(), month: value.getMonth() + 1, day: value.getDate() } : null,
      time: value ? { hour: value.getHours(), minute: value.getMinutes(), second: value.getSeconds() } : null,
    };
  }

  override toModel(dateTime: DateTime<NgbDateStruct | null, NgbTimeStruct | null>): Date | null {
    return ngbDateToDate(dateTime.date, dateTime.time) ?? null;
  }
}

describe('SprDatetimepickerComponent', () => {
  let fixture: ComponentFixture<DsDatepicker<Date>>;
  let component: DsDatepicker<Date>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsDatepicker],
      providers: [
        {
          provide: SprDatetimeAdapter,
          useClass: SprCustomDatetimeAdapter,
        },
      ],
    });

    fixture = TestBed.createComponent(DsDatepicker<Date>);

    component = fixture.componentInstance;
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should map min date', () => {
      fixture.componentRef.setInput('minDate', new NgbDate(2015, 7, 7));

      const date1 = (component as any).ngbMinDate();

      fixture.componentRef.setInput('minDate', '2015-09-09T09:09:09.384Z');

      const date2 = (component as any).ngbMinDate();

      expect(date1.equals({ day: 7, month: 7, year: 2015 })).toBeTruthy();
      expect(date2.equals({ day: 9, month: 9, year: 2015 })).toBeTruthy();
    });

    it('should map max date', () => {
      fixture.componentRef.setInput('maxDate', new NgbDate(2020, 7, 7));

      const date1 = (component as any).ngbMaxDate();

      fixture.componentRef.setInput('maxDate', '2020-09-09T09:09:09.384Z');

      const date2 = (component as any).ngbMaxDate();

      expect(date1.equals({ day: 7, month: 7, year: 2020 })).toBeTruthy();
      expect(date2.equals({ day: 9, month: 9, year: 2020 })).toBeTruthy();
    });

    it('should map 10 year ago as min date if min date is not provided', () => {
      fixture.componentRef.setInput('minDate', new NgbDate(2015, 7, 7));
      fixture.componentRef.setInput('minDate', undefined);

      const today = subYears(new Date(), 10);

      const date1 = component['ngbMinDate']();

      expect(date1.equals({ day: today.getDate(), month: today.getUTCMonth() + 1, year: today.getUTCFullYear() })).toBeTruthy();
    });

    it('should not map undefined max date', () => {
      fixture.componentRef.setInput('maxDate', new NgbDate(2020, 7, 7));
      fixture.componentRef.setInput('maxDate', undefined);

      const today = addYears(new Date(), 10);

      const date1 = component['ngbMaxDate']();

      expect(date1.equals({ day: today.getDate(), month: today.getUTCMonth() + 1, year: today.getUTCFullYear() })).toBeTruthy();
    });

    it('should write value to control', () => {
      const date = new Date(2020, 9, 9, 9, 9, 9);

      component.writeValue(date);

      const controlValue = (component as any).form.getRawValue();

      expect(controlValue).toBeTruthy();
      expect(
        NgbDate.from(controlValue.date)?.equals({ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() }),
      ).toBeTruthy();
      expect(JSON.stringify(controlValue.time)).toBe(
        JSON.stringify({ hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds() }),
      );
    });

    it('should write nullish value to control', () => {
      const DATE = '2020-09-09';
      const TIME = '09:09:09';
      const FULL_DATE = new Date(`${DATE}T${TIME}.384Z`);

      component.writeValue(FULL_DATE);
      component.writeValue(null);

      const controlValue = (component as any).form.getRawValue();

      expect(controlValue).toBeTruthy();
      expect(controlValue.date).toBe(null);
      expect(controlValue.time).toBe(null);
    });

    it('should validate', () => {
      const result = component.validate();

      expect(result?.['required']).toBeFalsy();
    });

    it('should set date to null on deselectDate', () => {
      (component as any).form.patchValue({ date: new Date(), time: { hour: 12, minute: 0 } });

      component.resetValue();

      expect((component as any).form.getRawValue().date).toBeNull();
    });

    it('should emit dateDeselected on deselectDate', () => {
      const dateDeselectedSpy = jest.spyOn(component.dateDeselected, 'emit');

      (component as any).form.patchValue({ date: new Date(), time: { hour: 12, minute: 0 } });

      component.resetValue();

      expect(dateDeselectedSpy).toHaveBeenCalledTimes(1);
    });

    it('should update control with string date and emit dateChanged on onDateSelected()', () => {
      const patchValueSpy = jest.spyOn((component as any).form, 'setValue');
      const emitSpy = jest.spyOn(component.dateChanged, 'emit');

      const mockDate = new NgbDate(2020, 7, 21);

      component.selectDate(mockDate);

      const normalizedValue = (component as any).dateTimepickerAdapter.toModel((component as any).form.getRawValue());

      expect(patchValueSpy).toHaveBeenCalledWith({
        date: mockDate,
        time: null,
      });

      expect(emitSpy).toHaveBeenCalledWith(normalizedValue);
    });
  });

  describe('View', () => {
    it('should disable toggle btn', () => {
      (component as any).form.disable();

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, '[data-testid="dp-toggle"]').nativeElement;

      expect(element.hasAttribute('disabled')).toBeTruthy();
    });
  });
});
