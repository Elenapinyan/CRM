import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, signal, viewChild } from '@angular/core';
import { MenuDirective } from './menu.directive';
import { MenuPosition } from './menu.util';

@Component({
  template: `
    <button #host>Toggle</button>

    <ng-template sprMenu [host]="host" [position]="position()"></ng-template>
  `,
  imports: [MenuDirective],
})
class TestMenuComponent {
  readonly menuDirective = viewChild(MenuDirective);

  readonly position = signal<MenuPosition>('bottom');
}

describe('MenuDirective', () => {
  let component: TestMenuComponent;
  let directive: MenuDirective;
  let fixture: ComponentFixture<TestMenuComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMenuComponent);
    component = fixture.componentInstance;

    directive = component.menuDirective()!;

    fixture.detectChanges();
  });

  it('should open menu', () => {
    const spyAttach = jest.spyOn((directive as any).overlayRef, 'attach');

    directive.open();

    expect(directive.isOpened()).toBeTruthy();
    expect(spyAttach).toHaveBeenCalledTimes(1);
  });

  it('should close menu', () => {
    const spyDetach = jest.spyOn((directive as any).overlayRef, 'detach');
    jest.spyOn((directive as any).overlayRef, 'hasAttached').mockReturnValue(true);

    directive.close();

    expect(directive.isOpened()).toBeFalsy();
    expect(spyDetach).toHaveBeenCalledTimes(1);
  });

  it('should update overlay position on position changes', fakeAsync(() => {
    const spyCreate = jest.spyOn((directive as any).positionStrategy, 'apply');

    component.position.set('top');

    fixture.detectChanges();

    tick(1000);

    expect(spyCreate).toHaveBeenCalledTimes(1);
  }));
});
