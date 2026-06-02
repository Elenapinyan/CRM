import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatepickerToggleDirective } from './datepicker-toggle.directive';
import { Component, Input, viewChild } from '@angular/core';
import { DsDatepickerRange } from './datepicker-range';
import { DsButton } from '../button';
import { DateRange } from './datepicker.util';
import { getElementByCss } from '../../shared/utils';

@Component({
  selector: 'ds-toggle-period-selector-test-component',
  imports: [DsDatepickerRange, DatepickerToggleDirective, DsButton],
  template: `
    <ds-datepicker-range hidden #dp />
    <ds-button data-trigger [sprDatepickerToggle]="dp">Open Calendar</ds-button>
  `,
})
class SprTogglePeriodSelectorTestComponent {
  @Input() confirmedRange: DateRange | null = null;
  @Input() maxRangeInDays = 30;
  @Input() isDisabled = false;
  @Input() inputId = 'test-id';

  datepickerToggleDirective = viewChild(DatepickerToggleDirective);
}

describe('SprTogglePeriodSelectorDirective', () => {
  let fixture: ComponentFixture<SprTogglePeriodSelectorTestComponent>;
  let component: SprTogglePeriodSelectorTestComponent;
  let directive: DatepickerToggleDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SprTogglePeriodSelectorTestComponent, DatepickerToggleDirective],
    });

    Object.defineProperty(document, 'defaultView', {
      value: { CSS: { highlights: new Map() } },
      configurable: true,
    });

    fixture = TestBed.createComponent(SprTogglePeriodSelectorTestComponent);

    component = fixture.componentInstance;
    directive = component.datepickerToggleDirective()!;

    fixture.detectChanges();
  });

  describe('View', () => {
    it('should open calendar on trigger', () => {
      const spyOnToggle = jest.spyOn(directive, 'toggle');

      const trigger = getElementByCss(fixture, '[data-trigger]').nativeElement as HTMLElement;

      trigger.click();

      expect(spyOnToggle).toHaveBeenCalledTimes(1);
    });
  });
});
