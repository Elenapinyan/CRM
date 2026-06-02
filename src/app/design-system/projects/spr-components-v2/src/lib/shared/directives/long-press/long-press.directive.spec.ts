import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { syncViewModel } from 'projects/spr-components/src/lib/shared/utils';
import { DsLongPressDirective } from './long-press.directive';

@Component({
  imports: [DsLongPressDirective],
  template: `<button (sprLongPress)="onLongPress()"></button>`,
})
class TestComponent {
  onLongPress(): void {}
}

describe('DsLongPressDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsLongPressDirective, TestComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create test component', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger long press event', fakeAsync((): void => {
    const spy = jest.spyOn(component, 'onLongPress');
    const button = fixture.debugElement.query(By.css('button'));

    // Simulate mousedown event
    button.nativeElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    fixture.detectChanges();

    tick(2000);
    fixture.detectChanges();
    syncViewModel(fixture);

    // Should emit at least once after debounce+interval
    expect(spy).toHaveBeenCalled();

    // Simulate mouseup event to stop interval
    button.nativeElement.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    fixture.detectChanges();

    // No further calls after mouseup
    const callCount = spy.mock.calls.length;
    tick(1500);
    expect(spy).toHaveBeenCalledTimes(callCount);
  }));
});
