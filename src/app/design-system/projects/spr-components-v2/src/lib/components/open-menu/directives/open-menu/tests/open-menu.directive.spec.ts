import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsOpenMenuTestComponent } from './open-menu-test.component';
import { By } from '@angular/platform-browser';
import { DsOpenMenuComponent } from '../../../open-menu.component';

describe('DsOpenMenuDirective', () => {
  let fixture: ComponentFixture<DsOpenMenuTestComponent>;
  let component: DsOpenMenuTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DsOpenMenuTestComponent, DsOpenMenuComponent],
    });

    fixture = TestBed.createComponent(DsOpenMenuTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create test component', () => {
    expect(component).toBeTruthy();
  });

  it('should open dropdown on click', () => {
    const button = fixture.debugElement.query(By.css('button'));

    button.triggerEventHandler('click');
    fixture.detectChanges();

    const dropdown = fixture.debugElement.query(By.directive(DsOpenMenuComponent));
    expect(dropdown).toBeTruthy();
  });

  it('should close dropdown on second click', () => {
    const directive = component.openMenuDirective;

    directive['clickListener']();
    expect(directive['componentRef']).toBeTruthy();

    directive['clickListener']();
    expect(directive['componentRef']).toBeNull();
  });

  it('should pass correct inputs to dropdown', () => {
    const directive = component.openMenuDirective;

    directive['clickListener']();
    fixture.detectChanges();

    const instance = directive['componentRef']?.instance;
    expect(instance?.autoClose()).toBe('outside');
    expect(instance?.closeOnClick()).toBe(true);
    expect(instance?.withSubMenu()).toBe(true);
  });
});
