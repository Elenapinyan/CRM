import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { syncViewModel } from '../../shared/utils';
import { DsMonochromeBadgeComponent } from './monochrome-badge';

describe('SprStatusBadgeComponent', () => {
  let componentRef: ComponentRef<DsMonochromeBadgeComponent>;
  let fixture: ComponentFixture<DsMonochromeBadgeComponent>;
  let htmlElement: HTMLElement;

  const FIXED_CLASS = 'monochrome-badge--fixed';
  const SHAPE_DEFAULT_CLASS = 'monochrome-badge--circle';
  const SHAPE_ALT_CLASS = 'monochrome-badge--square';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsMonochromeBadgeComponent],
    });

    fixture = TestBed.createComponent(DsMonochromeBadgeComponent);

    componentRef = fixture.componentRef;

    syncViewModel(fixture);

    htmlElement = fixture.nativeElement;
  });

  describe('Model', () => {
    it('should create component instance', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });
  });

  describe('View', () => {
    it(`should change shape`, () => {
      // check default shape (square)
      componentRef.setInput('badgeShape', 'circle');
      fixture.detectChanges();

      expect(htmlElement.classList.contains(SHAPE_DEFAULT_CLASS)).toBeTruthy();

      // change shape
      componentRef.setInput('badgeShape', 'square');
      fixture.detectChanges();

      expect(htmlElement.classList.contains(SHAPE_ALT_CLASS)).toBeTruthy();
    });

    it(`Check displaying text with [badgeContent] input`, () => {
      // Check is text displayed
      componentRef.setInput('badgeContent', 'Test Text');
      syncViewModel(fixture);

      expect(htmlElement.textContent?.trim()).toEqual('Test Text');
    });

    it(`Check [isFixedSize] right classes`, () => {
      // check default (no class)
      fixture.detectChanges();

      expect(htmlElement.classList.contains(FIXED_CLASS)).toBeFalsy();

      // change fixed class
      componentRef.setInput('isFixedSize', true);
      fixture.detectChanges();

      expect(htmlElement.classList.contains(FIXED_CLASS)).toBeTruthy();
    });
  });
});
