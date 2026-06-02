import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SprTogglePeriodSelectorTestComponent } from './spr-toggle-period-selector-test.component';
import { SprPeriodSelectorPopupComponent } from '../../../components/period-selector-popup';
import { SprTogglePeriodSelectorDirective } from '../spr-toggle-period-selector.directive';
import { By } from '@angular/platform-browser';

describe('SprTogglePeriodSelectorDirective', () => {
  let fixture: ComponentFixture<SprTogglePeriodSelectorTestComponent>;
  let component: SprTogglePeriodSelectorTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SprTogglePeriodSelectorTestComponent, SprPeriodSelectorPopupComponent, SprTogglePeriodSelectorDirective],
    });

    fixture = TestBed.createComponent(SprTogglePeriodSelectorTestComponent);

    component = fixture.componentInstance;
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should create component when clicked', () => {
      const button = fixture.debugElement.query(By.css('button'));

      button.triggerEventHandler('click');

      const popup = fixture.debugElement.query(By.directive(SprPeriodSelectorPopupComponent));

      expect(popup).toBeTruthy();
    });

    it('should emit rangeConfirmed and destroy popup', () => {
      component.togglePeriodSelectorDirective['toggleSelector']();

      const mockRange = {
        dateFrom: '2025-01-01T00:00:00.000Z',
        dateTo: '2025-01-02T23:59:59.000Z',
      };

      component.togglePeriodSelectorDirective['componentRef']!.instance.rangeConfirmed.emit(mockRange);

      expect(component.confirmedRange).toEqual(mockRange);
      expect(component.togglePeriodSelectorDirective['componentRef']).toBeNull();
    });

    it('should emit rangeCanceled only if not confirmed', () => {
      component.togglePeriodSelectorDirective['toggleSelector']();

      component.togglePeriodSelectorDirective['componentRef']!.instance.rangeCanceled.emit();

      expect(component.canceled).toBeTruthy();
      expect(component.togglePeriodSelectorDirective['componentRef']).toBeNull();
    });

    it('should NOT emit rangeCanceled if already confirmed', () => {
      component.togglePeriodSelectorDirective['toggleSelector']();

      component.togglePeriodSelectorDirective['isConfirmed'] = true;

      component.togglePeriodSelectorDirective['componentRef']!.instance.rangeCanceled.emit();

      expect(component.canceled).toBeFalsy();
      expect(component.togglePeriodSelectorDirective['componentRef']).toBeNull();
    });

    it('should destroy component on second click on tag with directive', () => {
      const directive = component.togglePeriodSelectorDirective;

      directive['toggleSelector']();
      expect(directive['componentRef']).not.toBeNull();

      directive['toggleSelector']();
      expect(directive['componentRef']).toBeNull();
    });
  });
});
