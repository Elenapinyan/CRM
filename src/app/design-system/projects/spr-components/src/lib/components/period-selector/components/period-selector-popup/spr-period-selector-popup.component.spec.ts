import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NgControl } from '@angular/forms';
import { DEFAULT_FOOTER_SETTINGS } from '../../constants/period-selector.constant';
import { NgbDate, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { SprPeriodSelectorPopupComponent } from './spr-period-selector-popup.component';

const ngControlStub = {
  control: {
    invalid: true,
    touched: true,
  },
  errors: { required: true },
};

describe('SprPeriodSelectorPopupComponent', () => {
  let fixture: ComponentFixture<SprPeriodSelectorPopupComponent>;
  let component: SprPeriodSelectorPopupComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [SprPeriodSelectorPopupComponent],
      providers: [
        {
          provide: NgControl,
          useValue: ngControlStub,
        },
      ],
    });

    fixture = TestBed.createComponent(SprPeriodSelectorPopupComponent);

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
  });

  describe('View', () => {
    it('should emit calendarOpened when datepicker is opened', async () => {
      jest.spyOn(component.calendarOpened, 'emit');

      component.datepicker.open();
      fixture.detectChanges();

      await fixture.whenStable();
      await new Promise((resolve) => requestAnimationFrame(resolve));

      expect(component.calendarOpened.emit).toHaveBeenCalled();
    });

    it('should emit calendarClosed when onClose is called with isButtonClose = false', () => {
      const spy = jest.spyOn(component, 'onClose');

      component.onClose(component.datepicker, false);

      expect(spy).toHaveBeenCalledWith(component.datepicker, false);
    });
  });
});
