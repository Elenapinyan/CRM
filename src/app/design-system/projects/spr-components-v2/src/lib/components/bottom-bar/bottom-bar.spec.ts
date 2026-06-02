import { Component, ComponentRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { syncViewModel } from '../../shared/utils';
import { DsBottomBarComponent } from './bottom-bar';

@Component({
  imports: [DsBottomBarComponent],
  template: `<ds-bottom-bar><div>Hello World</div></ds-bottom-bar>`,
})
class TestHostComponent {}

describe('BottomBarComponent', () => {
  let componentRef: ComponentRef<DsBottomBarComponent>;
  let fixture: ComponentFixture<DsBottomBarComponent>;
  let htmlElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsBottomBarComponent, TestHostComponent],
    });

    fixture = TestBed.createComponent(DsBottomBarComponent);

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
    it(`Check displaying projected content`, () => {
      const testFixture = TestBed.createComponent(TestHostComponent);
      const de: DebugElement = testFixture.debugElement.query(By.css('div'));
      const el: Element = de.nativeElement;
      expect(el.textContent).toEqual('Hello World');
    });
  });
});
