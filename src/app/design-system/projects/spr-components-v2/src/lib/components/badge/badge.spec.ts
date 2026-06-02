import { CommonModule } from '@angular/common';
import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { DsBadge } from './badge';
import { BadgeRadiusVariant, BadgeSchemeVariant, BadgeSizeVariant } from './badge.options';

describe('Badge', () => {
  let fixture: ComponentFixture<DsBadge>;
  let component: DsBadge;
  let componentRef: ComponentRef<DsBadge>;

  const MOCK_CONTENT = 'Some User';
  const MOCK_ICON = 'ds-icon-controls-cross';
  const MOCK_RADIUS = BadgeRadiusVariant.ROUNDED;
  const MOCK_VARIANT = BadgeSchemeVariant.GREEN;
  const MOCK_SIZE = BadgeSizeVariant.MD;

  const CONTENT_SELECTOR = '[data-testid="badge-content"]';
  const ICON_START_SELECTOR = '[data-testid="badge-icon-start"]';
  const ICON_END_SELECTOR = '[data-testid="badge-icon-end"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
      providers: [provideNoopAnimations()],
    });

    fixture = TestBed.createComponent(DsBadge);

    component = fixture.componentInstance;

    componentRef = fixture.componentRef;

    syncViewModel(fixture);
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should have/not content', () => {
      let content = getElementByCss(fixture, CONTENT_SELECTOR)?.nativeElement;
      let iconStart = getElementByCss(fixture, ICON_START_SELECTOR)?.nativeElement;
      let iconEnd = getElementByCss(fixture, ICON_END_SELECTOR)?.nativeElement;

      expect(content).toBeFalsy();
      expect(iconStart).toBeFalsy();
      expect(iconEnd).toBeFalsy();

      componentRef.setInput('content', MOCK_CONTENT);
      fixture.detectChanges();

      content = getElementByCss(fixture, CONTENT_SELECTOR)?.nativeElement;
      iconStart = getElementByCss(fixture, ICON_START_SELECTOR)?.nativeElement;
      iconEnd = getElementByCss(fixture, ICON_END_SELECTOR)?.nativeElement;

      expect(content.textContent?.trim()).toBe(MOCK_CONTENT);
      expect(iconStart).toBeFalsy();
      expect(iconEnd).toBeFalsy();
    });

    it('should have/not icon start', () => {
      componentRef.setInput('icon', MOCK_ICON);
      fixture.detectChanges();

      let content = getElementByCss(fixture, CONTENT_SELECTOR)?.nativeElement;
      let iconStart = getElementByCss(fixture, ICON_START_SELECTOR)?.nativeElement;
      let iconEnd = getElementByCss(fixture, ICON_END_SELECTOR)?.nativeElement;

      expect(content).toBeFalsy();
      expect(iconStart).toBeTruthy();
      expect(iconEnd).toBeFalsy();
    });

    it('should have/not icon end', () => {
      componentRef.setInput('iconEnd', MOCK_ICON);
      fixture.detectChanges();

      let content = getElementByCss(fixture, CONTENT_SELECTOR)?.nativeElement;
      let iconStart = getElementByCss(fixture, ICON_START_SELECTOR)?.nativeElement;
      let iconEnd = getElementByCss(fixture, ICON_END_SELECTOR)?.nativeElement;

      expect(content).toBeFalsy();
      expect(iconStart).toBeFalsy();
      expect(iconEnd).toBeTruthy();
    });

    it('should change variant', () => {
      componentRef.setInput('variant', MOCK_VARIANT);

      syncViewModel(fixture);
      fixture.detectChanges();

      expect(fixture.elementRef.nativeElement.classList.contains('badge--' + MOCK_VARIANT)).toBeTruthy();
    });

    it('should change radius', () => {
      componentRef.setInput('radius', MOCK_SIZE);

      syncViewModel(fixture);
      fixture.detectChanges();

      expect(fixture.elementRef.nativeElement.classList.contains('badge--' + MOCK_SIZE)).toBeTruthy();
    });

    it('should change size', () => {
      componentRef.setInput('size', MOCK_RADIUS);

      syncViewModel(fixture);
      fixture.detectChanges();

      expect(fixture.elementRef.nativeElement.classList.contains('badge--' + MOCK_RADIUS)).toBeTruthy();
    });
  });
});
