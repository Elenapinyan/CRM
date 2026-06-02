import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsDatepickerTime } from './datepicker-time';
import { getElementByCss, syncViewModel } from '../../../shared/utils';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { TimeMasks } from '../datepicker.util';

describe('TimeSelector', () => {
  let component: DsDatepickerTime;
  let fixture: ComponentFixture<DsDatepickerTime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsDatepickerTime],
    }).compileComponents();

    fixture = TestBed.createComponent(DsDatepickerTime);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should parse string time to ngbTime', () => {
      (component as any).timeValue.set('12:12:12');

      fixture.detectChanges();

      const ngbTime = (component as any).ngbTime() as NgbTimeStruct;

      expect(ngbTime.hour).toBe(12);
      expect(ngbTime.minute).toBe(12);
      expect(ngbTime.second).toBe(12);
    });
  });

  describe('View', () => {
    it('should show label', () => {
      const MOCK_LABEL = 'somelabel';

      fixture.componentRef.setInput('label', MOCK_LABEL);

      syncViewModel(fixture);

      const el = getElementByCss(fixture, '[data-testid="dp-timepicker-label"]').nativeElement as HTMLElement;

      expect(el.textContent).toContain(MOCK_LABEL);
    });

    it('should handle value with mask', () => {
      fixture.componentRef.setInput('timeMask', TimeMasks.HM);

      fixture.detectChanges();

      const element = getElementByCss(fixture, 'ds-input input').nativeElement as HTMLInputElement;

      element.value = '12:12:12';

      element.dispatchEvent(new Event('input', { bubbles: true }));

      fixture.detectChanges();

      const ngbTime = (component as any).ngbTime() as NgbTimeStruct;

      expect(ngbTime.hour).toBe(12);
      expect(ngbTime.minute).toBe(12);
      expect(ngbTime.second).toBe(12);
    });

    it('should show placeholder', () => {
      const MOCK_PLACEHOLDER = 'Hh:m0';
      fixture.componentRef.setInput('timePlaceholder', MOCK_PLACEHOLDER);

      fixture.detectChanges();

      const element = getElementByCss(fixture, 'ds-input input').nativeElement as HTMLInputElement;

      expect(element.getAttribute('placeholder')).toBe(MOCK_PLACEHOLDER);
    });
  });
});
