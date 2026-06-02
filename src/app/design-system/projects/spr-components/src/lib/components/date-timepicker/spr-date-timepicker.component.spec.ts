import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SprDateTimepickerComponent } from './spr-date-timepicker.component';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { SPR_DATE_TIMEPICKER_ADAPTER_TOKEN } from './constants/spr-date-timepicker.constant';
import { DateTimePickerFormGroupValue } from './interfaces/spr-date-timepicker.interface';
import { NgControl } from '@angular/forms';

const ngControlStub = {
  control: {
    invalid: true,
    touched: true,
  },
  errors: { required: true },
};

const dateTimepickerAdapterStub = {
  toModel: jest.fn((value: string) => {
    const dateObj = value.split(/[ T]/);

    return {
      date: dateObj[0],
      time: dateObj?.[1]?.split('.')?.[0]?.replace('Z', '') || null,
    } as DateTimePickerFormGroupValue;
  }),
};

describe('SprDateTimepickerComponent', () => {
  let fixture: ComponentFixture<SprDateTimepickerComponent>;
  let component: SprDateTimepickerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SprDateTimepickerComponent],
      providers: [
        {
          provide: NgControl,
          useValue: ngControlStub,
        },
        {
          provide: SPR_DATE_TIMEPICKER_ADAPTER_TOKEN,
          useValue: dateTimepickerAdapterStub,
        },
      ],
    });

    fixture = TestBed.createComponent(SprDateTimepickerComponent);

    component = fixture.componentInstance;
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should map min date', () => {
      component.minDate = new NgbDate(1977, 7, 7);

      const date1 = component.mappedMinDate;

      component.minDate = '1999-09-09T09:09:09.384Z';

      const date2 = component.mappedMinDate;

      expect(date1.equals({ day: 7, month: 7, year: 1977 })).toBeTruthy();
      expect(date2.equals({ day: 9, month: 9, year: 1999 })).toBeTruthy();
    });

    it('should map max date', () => {
      component.maxDate = new NgbDate(1977, 7, 7);

      const date1 = component.mappedMaxDate;

      component.maxDate = '1999-09-09T09:09:09.384Z';

      const date2 = component.mappedMaxDate;

      expect(date1.equals({ day: 7, month: 7, year: 1977 })).toBeTruthy();
      expect(date2.equals({ day: 9, month: 9, year: 1999 })).toBeTruthy();
    });

    it('should not map undefined min date', () => {
      component.minDate = new NgbDate(1977, 7, 7);
      component.minDate = undefined;

      const date1 = component.mappedMinDate;

      expect(date1.equals({ day: 7, month: 7, year: 1977 })).toBeTruthy();
    });

    it('should not map undefined max date', () => {
      component.maxDate = new NgbDate(1977, 7, 7);
      component.maxDate = undefined;

      const date1 = component.mappedMaxDate;

      expect(date1.equals({ day: 7, month: 7, year: 1977 })).toBeTruthy();
    });

    it('should write value to control', () => {
      const DATE = '1999-09-09';
      const TIME = '09:09:09';
      const FULL_DATE = `${DATE}T${TIME}.384Z`;

      component.writeValue(FULL_DATE);

      const controlValue = (component as any).control.getRawValue();

      expect(controlValue).toBeTruthy();
      expect(controlValue.date).toBe(DATE);
      expect(controlValue.time).toBe(TIME);
    });

    it('should write nullish value to control', () => {
      const DATE = '1999-09-09';
      const TIME = '09:09:09';
      const FULL_DATE = `${DATE}T${TIME}.384Z`;

      component.writeValue(FULL_DATE);
      component.writeValue(null);

      const controlValue = (component as any).control.getRawValue();

      expect(controlValue).toBeTruthy();
      expect(controlValue.date).toBe(null);
      expect(controlValue.time).toBe(null);
    });

    it('should copy ngControl "required" error to inner control errors', () => {
      (component as any).handleNgControlTouched();

      const control = (component as any).control;

      expect(control).toBeTruthy();
      expect((control.errors as any)?.required).toBeTruthy();
    });

    it('should validate', () => {
      const result = component.validate();

      expect(result?.['required']?.valid).toBeFalsy();
    });

    it('should initControlListener', () => {
      const sub = (component as any).initControlListener();

      expect(sub).toBeTruthy();
    });

    it('should set date to null on deselectDate', () => {
      (component as any).control.patchValue({ date: new Date(), time: { hour: 12, minute: 0 } });

      component.deselectDate();

      expect((component as any).control.value.date).toBeNull();
    });

    it('should set date to null on deselectDate and emit dateDeselected', () => {
      const dateDeselectedSpy = jest.spyOn(component.dateDeselected, 'emit');

      (component as any).control.patchValue({ date: new Date(), time: { hour: 12, minute: 0 } });

      component.deselectDate();

      expect((component as any).control.value.date).toBeNull();
      expect(dateDeselectedSpy).toHaveBeenCalled();
    });

    it('should update control with string date and emit dateChanged on onDateSelected()', () => {
      const patchValueSpy = jest.spyOn((component as any).control, 'setValue');
      const emitSpy = jest.spyOn(component.dateChanged, 'emit');

      const mockDate = new NgbDate(2025, 7, 21);

      (component as any).control.setValue({ date: null, time: null });

      component.onDateSelected(mockDate);

      expect(patchValueSpy).toHaveBeenCalledWith(
        {
          date: '2025-07-21',
          time: null,
        },
        { emitEvent: false },
      );

      expect(emitSpy).toHaveBeenCalledWith('2025-07-21');
    });
  });

  describe('View', () => {
    it('should add is-invalid class', () => {
      syncViewModel(fixture);

      const inputElement: HTMLInputElement = getElementByCss(fixture, '.form-datepicker-control').nativeElement;

      expect(inputElement.classList.contains('is-invalid')).toBeTruthy();
    });

    it('should show description', () => {
      const MOCK_DESCRIPTION = 'description';

      ngControlStub.control.invalid = false;

      component.description = MOCK_DESCRIPTION;

      syncViewModel(fixture);

      const element: HTMLElement = getElementByCss(fixture, 'spr-field-description > .form-input-description').nativeElement;

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

      const element: HTMLElement = getElementByCss(fixture, '.date-timepicker').nativeElement;

      expect(element.classList.contains('is-open')).toBeTruthy();
    });
  });
});
