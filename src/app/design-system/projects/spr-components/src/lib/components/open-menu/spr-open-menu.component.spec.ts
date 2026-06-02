import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SprOpenMenuComponent } from './spr-open-menu.component';
import { ChangeDetectorRef, DestroyRef, EventEmitter, InputSignal, signal } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';

function createInputSignalMock<T>(value: T): InputSignal<T> {
  return signal(value) as unknown as InputSignal<T>;
}

describe('SprOpenMenuComponent', () => {
  let fixture: ComponentFixture<SprOpenMenuComponent>;
  let component: SprOpenMenuComponent;
  let dropdownMock: Partial<NgbDropdown>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SprOpenMenuComponent],
      providers: [
        { provide: DestroyRef, useValue: { onDestroy: (): Observable<never> => of() } },
        { provide: ChangeDetectorRef, useValue: { detectChanges: jest.fn() } },
      ],
    });

    fixture = TestBed.createComponent(SprOpenMenuComponent);
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
    component.onSelect(event, false);

    expect(spy).toHaveBeenCalled();
  });

  it('should stop event propagation if hasSubMenu is true', () => {
    const event = {
      stopImmediatePropagation: jest.fn(),
    } as unknown as MouseEvent;

    component.type = createInputSignalMock<'default' | 'sub-menu'>('default');
    component.closeOnClick = createInputSignalMock(true);
    component.onSelect(event, true);

    expect(event.stopImmediatePropagation).toHaveBeenCalled();
  });

  it('should stop event propagation if closeOnClick is false', () => {
    const event = {
      stopImmediatePropagation: jest.fn(),
    } as unknown as MouseEvent;

    component.type = createInputSignalMock<'default' | 'sub-menu'>('default');
    component.closeOnClick = createInputSignalMock(false); // <- Здесь false!
    component.onSelect(event, false);

    expect(event.stopImmediatePropagation).toHaveBeenCalled();
  });

  it('should close dropdown if no subMenu and closeOnClick is true', () => {
    const event = new MouseEvent('click');

    component.type = createInputSignalMock<'default' | 'sub-menu'>('default');
    component.closeOnClick = createInputSignalMock(true);
    component.onSelect(event, false);

    expect(dropdownMock.close).toHaveBeenCalled();
  });

  it('should detect subMenuPlacement via type guard', () => {
    expect(component.subMenuPlacementTypeGuard('right')).toBe(true);
    expect(component.subMenuPlacementTypeGuard(['bottom-start'])).toBe(false);
  });
});
