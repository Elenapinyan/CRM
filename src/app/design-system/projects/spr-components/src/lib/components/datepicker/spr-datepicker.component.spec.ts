import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgControl } from '@angular/forms';
import { SprDatepickerComponent } from './spr-datepicker.component';

const ngControlStub = {
  control: {
    invalid: true,
    touched: true,
  },
  errors: { required: true },
};

describe('SprDatepickerComponent', () => {
  let fixture: ComponentFixture<SprDatepickerComponent>;
  let component: SprDatepickerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SprDatepickerComponent],
      providers: [
        {
          provide: NgControl,
          useValue: ngControlStub,
        },
      ],
    });

    fixture = TestBed.createComponent(SprDatepickerComponent);

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

    it('should write value to control', () => {
      const DATE = '1999-09-09';
      const TIME = '09:09:09';
      const FULL_DATE = `${DATE}T${TIME}.384Z`;

      component.writeValue(FULL_DATE);

      const controlValue = (component as any).control.getRawValue();

      expect(controlValue).toBeTruthy();
      expect(controlValue).toBe(FULL_DATE);
    });

    it('should copy ngControl "required" error to inner control errors', () => {
      (component as any).handleNgControlTouched();

      const control = (component as any).control;

      expect(control).toBeTruthy();
      expect((control.errors as any)?.required).toBeTruthy();
    });

    it('should set date to null on deselectDate', () => {
      (component as any).control.patchValue(new Date());

      component.deselectDate();

      expect((component as any).control.value).toBeNull();
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

      const element: HTMLElement = getElementByCss(fixture, '.form-dropdown').nativeElement;

      expect(element.classList.contains('is-open')).toBeTruthy();
    });
  });
});
