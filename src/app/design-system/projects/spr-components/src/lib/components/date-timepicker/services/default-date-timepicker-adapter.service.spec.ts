import { TestBed } from '@angular/core/testing';
import { SprDefaultDateTimepickerAdapter } from './default-date-timepicker-adapter.service';
import { DateTimePickerKey } from '../enums/spr-date-timepicker-key.enum';

describe('SprDefaultDateTimepickerAdapter', () => {
  let service: SprDefaultDateTimepickerAdapter;
  const DATE = '1999-09-09';
  const TIME = '09:09:09';
  const FULL_DATE = `${DATE}T${TIME}.000Z`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SprDefaultDateTimepickerAdapter],
    });

    service = TestBed.inject(SprDefaultDateTimepickerAdapter);
  });

  describe('Model', () => {
    it('should inject service', () => {
      expect(service).toBeTruthy();
    });

    it('should adapt date toModel', () => {
      const adaptedValue = service.toModel(FULL_DATE);

      expect(adaptedValue[DateTimePickerKey.Date]).toBe(DATE);
      expect(adaptedValue[DateTimePickerKey.Time]).toBe(TIME);
    });

    it('should adapt date fromModel', () => {
      const adaptedValue = service.fromModel({
        [DateTimePickerKey.Date]: DATE,
        [DateTimePickerKey.Time]: TIME,
      });

      expect(adaptedValue).toBe(FULL_DATE);
    });
  });
});
