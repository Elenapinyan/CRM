import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsOpenMenuComponent } from './open-menu.component';
import { ChangeDetectorRef, DestroyRef, Directive, EventEmitter, Input, InputSignal, signal } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { DsOpenMenuItemDirective } from './directives/open-menu-item';
import { getElementByCss } from '../../shared/utils';

function createInputSignalMock<T>(value: T): InputSignal<T> {
  return signal(value) as unknown as InputSignal<T>;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngbDropdown]',
  exportAs: 'ngbDropdown',
})
export class NgbDropdownStubDirective {
  @Input() placement?: string;
  @Input() autoClose?: boolean | string;

  open(): void {}
  close(): void {}
  toggle(): void {}
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngbDropdownMenu]',
})
export class NgbDropdownMenuStubDirective {}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngbDropdownItem]',
})
export class NgbDropdownItemStubDirective {}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngbDropdownToggle]',
})
export class NgbDropdownToggleStubDirective {}

describe('SprOpenMenuComponent', () => {
  let fixture: ComponentFixture<DsOpenMenuComponent>;
  let component: DsOpenMenuComponent;
  let dropdownMock: Partial<NgbDropdown>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DsOpenMenuComponent,
        NgbDropdownStubDirective,
        NgbDropdownMenuStubDirective,
        NgbDropdownItemStubDirective,
        NgbDropdownToggleStubDirective,
      ],
      providers: [
        { provide: DestroyRef, useValue: { onDestroy: (): Observable<never> => of() } },
        { provide: ChangeDetectorRef, useValue: { detectChanges: jest.fn() } },
      ],
    });

    fixture = TestBed.createComponent(DsOpenMenuComponent);
    component = fixture.componentInstance;

    dropdownMock = {
      open: jest.fn(),
      close: jest.fn(),
      openChange: new EventEmitter<boolean>(),
    };

    component['ngbDropdown'] = dropdownMock as NgbDropdown;

    component.type = createInputSignalMock<'default' | 'sub-menu'>('default');
    component.closeOnClick = createInputSignalMock(true);
    component.closeParentOnClick = createInputSignalMock(true);
  });

  it('should open dropdown and detect changes on AfterViewInit', () => {
    component.ngAfterViewInit();
    expect(dropdownMock.open).toHaveBeenCalled();
  });

  it('should emit closeParentMenuDropdown in sub-menu with closeParentOnClick', () => {
    component.type = createInputSignalMock<'default' | 'sub-menu'>('sub-menu');
    component.closeParentOnClick = createInputSignalMock(true);

    const event = new MouseEvent('click');
    const spy = jest.spyOn(component.closeParentMenuDropdown, 'emit');
    component.onSelect(event, { hasSubMenu: () => false, clicked: new EventEmitter<void>() } as unknown as DsOpenMenuItemDirective);

    expect(spy).toHaveBeenCalled();
  });

  it('should stop event propagation if hasSubMenu is true', () => {
    const event = {
      stopImmediatePropagation: jest.fn(),
    } as unknown as MouseEvent;

    component.type = createInputSignalMock<'default' | 'sub-menu'>('default');
    component.closeOnClick = createInputSignalMock(true);
    component.onSelect(event, { hasSubMenu: () => true, clicked: new EventEmitter<void>() } as unknown as DsOpenMenuItemDirective);

    expect(event.stopImmediatePropagation).toHaveBeenCalled();
  });

  it('should stop event propagation if closeOnClick is false', () => {
    const event = {
      stopImmediatePropagation: jest.fn(),
    } as unknown as MouseEvent;

    component.type = createInputSignalMock<'default' | 'sub-menu'>('default');
    component.closeOnClick = createInputSignalMock(false);
    component.onSelect(event, { hasSubMenu: () => false, clicked: new EventEmitter<void>() } as unknown as DsOpenMenuItemDirective);

    expect(event.stopImmediatePropagation).toHaveBeenCalled();
  });

  it('should close dropdown if no subMenu and closeOnClick is true', () => {
    const event = new MouseEvent('click');
    jest.spyOn('requestAnimationFrame' in window ? window : global, 'requestAnimationFrame').withImplementation(
      (cb) => {
        cb(0);
        return 0;
      },
      () => {
        component.type = createInputSignalMock<'default' | 'sub-menu'>('default');
        component.closeOnClick = createInputSignalMock(true);
        component.onSelect(event, { hasSubMenu: () => false, clicked: new EventEmitter<void>() } as unknown as DsOpenMenuItemDirective);

        expect(dropdownMock.close).toHaveBeenCalled();
      },
    );
  });

  it('should detect subMenuPlacement via type guard', () => {
    expect(component.subMenuPlacementTypeGuard('right')).toBe(true);
    expect(component.subMenuPlacementTypeGuard(['bottom-start'])).toBe(false);
  });

  it('should add size class', () => {
    fixture.componentRef.setInput('placement', ['bottom-start']);
    fixture.componentRef.setInput('size', 'md');

    fixture.detectChanges();

    const menuDe = getElementByCss(fixture, '[data-testid="open-menu-component"]');

    expect(menuDe.classes).toHaveProperty('open-menu-component--width-md');
  });
});
