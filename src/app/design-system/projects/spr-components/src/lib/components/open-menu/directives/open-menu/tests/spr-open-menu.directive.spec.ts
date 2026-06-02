import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SprOpenMenuTestComponent } from './spr-open-menu-test.component';
import { By } from '@angular/platform-browser';
import { SprOpenMenuComponent } from '../../../spr-open-menu.component';

describe('SprOpenMenuDirective', () => {
  let fixture: ComponentFixture<SprOpenMenuTestComponent>;
  let component: SprOpenMenuTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SprOpenMenuTestComponent, SprOpenMenuComponent],
    });

    fixture = TestBed.createComponent(SprOpenMenuTestComponent);
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

    const dropdown = fixture.debugElement.query(By.directive(SprOpenMenuComponent));
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
    expect(instance?.placement()).toEqual(['bottom-start']);
    expect(instance?.closeOnClick()).toBe(true);
    expect(instance?.withSubMenu()).toBe(true);
  });
});
