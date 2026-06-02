import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentRef, ElementRef } from '@angular/core';
import { syncViewModel } from '../../shared/utils';
import { DsStatusBadgeComponent } from './status-badge';

describe('SprStatusBadgeComponent', () => {
  let componentRef: ComponentRef<DsStatusBadgeComponent>;
  let fixture: ComponentFixture<DsStatusBadgeComponent>;
  let badgePointElement: HTMLElement;

  const INPUT_KEY = 'pointColor';
  const DEFAULT_COLOR = 'grey';
  const STATUS_SELECTOR = '.status';
  const STATUS_ATTRIBUTE = 'data-color';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsStatusBadgeComponent],
    });

    fixture = TestBed.createComponent(DsStatusBadgeComponent);

    componentRef = fixture.componentRef;

    syncViewModel(fixture);

    badgePointElement = fixture.componentRef.injector.get(ElementRef).nativeElement.querySelector(STATUS_SELECTOR);
  });

  describe('Model', () => {
    it('should create component instance', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });
  });

  describe('View', () => {
    it(`should change ${INPUT_KEY}`, () => {
      // check default color
      expect(badgePointElement.getAttribute(STATUS_ATTRIBUTE)).toEqual(DEFAULT_COLOR);
      componentRef.setInput(INPUT_KEY, 'olive');
      syncViewModel(fixture);

      expect(badgePointElement.getAttribute(STATUS_ATTRIBUTE)).toEqual('olive');
    });
  });
});
