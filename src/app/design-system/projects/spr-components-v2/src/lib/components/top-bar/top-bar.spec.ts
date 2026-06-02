import { Component, ComponentRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { syncViewModel } from '../../shared/utils';
import { DsTopBarComponent } from './top-bar';

@Component({
  template: `<ds-top-bar><div data-testid="projected-content">Hello World</div></ds-top-bar>`,
  imports: [DsTopBarComponent],
})
class TestHostComponent {}

describe('TopBarComponent', () => {
  let componentRef: ComponentRef<DsTopBarComponent>;
  let fixture: ComponentFixture<DsTopBarComponent>;
  let htmlElement: HTMLElement;

  const START_BLOCK_SELECTOR = '[data-testid="top-bar-start"]';
  const ICON_SELECTOR = '[data-testid="top-bar-icon"]';
  const MAIN_BLOCK_SELECTOR = '[data-testid="top-bar-main"]';
  const TITLE_SELECTOR = '[data-testid="top-bar-title"]';
  const SUBTITLE_SELECTOR = '[data-testid="top-bar-subtitle"]';
  const END_BLOCK_SELECTOR = '[data-testid="top-bar-end"]';
  const DECLINE_BTN_SELECTOR = '[data-testid="top-bar-decline-btn"]';
  const CONFIRM_BTN_SELECTOR = '[data-testid="top-bar-confirm-btn"]';
  const PROJECTED_CONTENT_SELECTOR = '[data-testid="projected-content"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsTopBarComponent, TestHostComponent],
    });

    fixture = TestBed.createComponent(DsTopBarComponent);

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
    it(`Check displaying left block (icon)`, () => {
      const el: Element = fixture.debugElement.query(By.css(START_BLOCK_SELECTOR))?.nativeElement;
      expect(el).toBeFalsy();

      componentRef.setInput('iconName', 'test-icon');
      syncViewModel(fixture);

      const icon: Element = fixture.debugElement.query(By.css(ICON_SELECTOR))?.nativeElement;
      expect(icon.classList.contains('test-icon')).toBeTruthy();
    });

    it(`Check displaying main block (title + subtitle)`, () => {
      const el: Element = fixture.debugElement.query(By.css(MAIN_BLOCK_SELECTOR))?.nativeElement;
      expect(el).toBeFalsy();

      componentRef.setInput('title', 'Test Title');
      syncViewModel(fixture);

      const title: Element = fixture.debugElement.query(By.css(TITLE_SELECTOR))?.nativeElement;
      expect(title.textContent?.trim()).toEqual('Test Title');

      componentRef.setInput('subtitle', 'Test Subtitle');
      syncViewModel(fixture);

      const subtitle: Element = fixture.debugElement.query(By.css(SUBTITLE_SELECTOR))?.nativeElement;
      expect(subtitle.textContent?.trim()).toEqual('Test Subtitle');
    });

    it(`Check displaying end block (buttons)`, () => {
      const el: Element = fixture.debugElement.query(By.css(END_BLOCK_SELECTOR))?.nativeElement;
      expect(el).toBeFalsy();

      componentRef.setInput('declineBtn', 'Test Decline');
      syncViewModel(fixture);

      const decline: Element = fixture.debugElement.query(By.css(DECLINE_BTN_SELECTOR))?.nativeElement;
      expect(decline.textContent?.trim()).toEqual('Test Decline');

      componentRef.setInput('confirmBtn', 'Test Confirm');
      syncViewModel(fixture);

      const confirm: Element = fixture.debugElement.query(By.css(CONFIRM_BTN_SELECTOR))?.nativeElement;
      expect(confirm.textContent?.trim()).toEqual('Test Confirm');
    });

    it(`Check button outputs`, () => {
      componentRef.setInput('declineBtn', 'Test Decline');
      componentRef.setInput('confirmBtn', 'Test Confirm');
      syncViewModel(fixture);

      const declineActionSpy = jest.spyOn(fixture.componentInstance, 'onDecline');
      const confirmActionSpy = jest.spyOn(fixture.componentInstance, 'onConfirm');

      const declineBtn = fixture.debugElement.query(By.css(DECLINE_BTN_SELECTOR)).nativeElement;
      const confirmBtn = fixture.debugElement.query(By.css(CONFIRM_BTN_SELECTOR)).nativeElement;

      declineBtn.click();
      confirmBtn.click();

      expect(confirmActionSpy).toHaveBeenCalledTimes(1);
      expect(declineActionSpy).toHaveBeenCalledTimes(1);
    });

    it(`Check displaying ng-content`, () => {
      const testFixture = TestBed.createComponent(TestHostComponent);
      const de: DebugElement = testFixture.debugElement.query(By.css(PROJECTED_CONTENT_SELECTOR));
      const el: Element = de.nativeElement;
      expect(el.textContent?.trim()).toEqual('Hello World');
    });
  });
});
