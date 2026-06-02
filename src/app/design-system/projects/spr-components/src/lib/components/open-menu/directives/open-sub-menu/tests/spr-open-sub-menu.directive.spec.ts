import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SprOpenSubMenuTestComponent } from './spr-open-sub-menu-test.component';
import { SprOpenSubMenuDirective } from '../spr-open-sub-menu.directive';
import { DebugElement, InputSignal, QueryList, Renderer2 } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { SprOpenMenuComponent } from '../../../spr-open-menu.component';
import { SprOpenMenuItemDirective } from '../../open-menu-item';
import { SubMenuPlacement } from '../../../interfaces/open-menu.interface';

function createInputSignalMock<T>(value: T): InputSignal<T> {
  return (() => value) as InputSignal<T>;
}

describe('SprOpenSubMenuDirective', () => {
  let fixture: ComponentFixture<SprOpenSubMenuTestComponent>;
  let component: SprOpenSubMenuTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SprOpenSubMenuTestComponent, SprOpenMenuComponent, SprOpenSubMenuDirective],
      providers: [Renderer2],
    });

    fixture = TestBed.createComponent(SprOpenSubMenuTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create test component', () => {
    expect(component).toBeTruthy();
  });

  it('should create submenu component on click', () => {
    const debugElement = fixture.debugElement.query(By.directive(SprOpenSubMenuDirective));
    const directive = debugElement.injector.get(SprOpenSubMenuDirective);

    (directive as any).dropdownClose$ = new Subject<void>();

    debugElement.triggerEventHandler('click');

    expect(directive['componentRef']).toBeTruthy();
  });

  it('should dismiss submenu if already open on click', () => {
    const directive = component.directive;

    directive['dismiss'] = jest.fn();
    directive['componentRef'] = {} as any;

    const element = fixture.debugElement.query(By.directive(SprOpenSubMenuDirective));
    element.triggerEventHandler('click');

    expect(directive['dismiss']).toHaveBeenCalled();
  });

  it('should set inputs to SprOpenMenuComponent', () => {
    const directive = component.directive;

    const mockSetInput = jest.fn();
    const mockComponentRef = {
      setInput: mockSetInput,
    } as any;

    const queryList = new QueryList<SprOpenMenuItemDirective>();

    queryList.reset([]);
    directive['items'] = queryList;

    directive['placement'] = createInputSignalMock<SubMenuPlacement>('right');
    directive['closeParentOnClick'] = createInputSignalMock(true);
    directive.setOpenMenuComponentInputParams(mockComponentRef);

    expect(mockSetInput).toHaveBeenCalledWith('placement', 'right');
    expect(mockSetInput).toHaveBeenCalledWith('type', 'sub-menu');
    expect(mockSetInput).toHaveBeenCalledWith('items', queryList);
    expect(mockSetInput).toHaveBeenCalledWith('closeParentOnClick', true);
  });

  it('should add classes after view init', () => {
    const directive = component.directive;
    const addClassSpy = jest.spyOn(directive['renderer2'], 'addClass');

    directive.ngAfterViewInit();

    expect(addClassSpy).toHaveBeenCalledWith(expect.anything(), 'spr-sub-menu-list-item-padding-class');
  });

  describe('customPlacement logic', () => {
    let directive: SprOpenSubMenuDirective;
    let debugElement: DebugElement;
    let hostElement: HTMLElement;

    beforeEach(() => {
      debugElement = fixture.debugElement.query(By.directive(SprOpenSubMenuDirective));
      directive = debugElement.injector.get(SprOpenSubMenuDirective);
      hostElement = debugElement.nativeElement;

      directive['componentRef'] = null;

      directive['placement'] = createInputSignalMock<SubMenuPlacement>('right');
      (directive as any).dropdownClose$ = new Subject<void>();
      directive['subscribeToMouseLeaveEvent'] = jest.fn();
      directive['subscribeToCloseParentMenuDropdown'] = jest.fn();
      directive['subscribeToDropdownClose'] = jest.fn();
      directive['setOpenMenuComponentInputParams'] = jest.fn();
    });

    it('should keep default placement when there is enough space on right and not near left edge', () => {
      Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });
      jest.spyOn(hostElement, 'getBoundingClientRect').mockReturnValue({
        width: 150,
        x: 200,
        right: 350,
        y: 100,
        height: 50,
        top: 100,
        bottom: 150,
        left: 200,
      } as DOMRect);

      debugElement.triggerEventHandler('click');

      expect(directive['customPlacement']()).toBe('right');
    });

    it('should set placement to left when right side overflows and left has enough space', () => {
      Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });
      jest.spyOn(hostElement, 'getBoundingClientRect').mockReturnValue({
        width: 150,
        x: 200,
        right: 1100,
        y: 100,
        height: 50,
        top: 100,
        bottom: 150,
        left: 200,
      } as DOMRect);

      debugElement.triggerEventHandler('click');

      expect(directive['customPlacement']()).toBe('left');
    });

    it('should keep default placement when right overflows but left does not have enough space', () => {
      Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });
      jest.spyOn(hostElement, 'getBoundingClientRect').mockReturnValue({
        width: 150,
        x: 50,
        right: 1100,
        y: 100,
        height: 50,
        top: 100,
        bottom: 150,
        left: 50,
      } as DOMRect);

      debugElement.triggerEventHandler('click');

      expect(directive['customPlacement']()).toBe('right'); // Keeps original placement
    });

    it('should handle zero width elements', () => {
      Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });
      jest.spyOn(hostElement, 'getBoundingClientRect').mockReturnValue({
        width: 0,
        x: 100,
        right: 100,
        y: 100,
        height: 50,
        top: 100,
        bottom: 150,
        left: 100,
      } as DOMRect);

      debugElement.triggerEventHandler('click');

      expect(directive['customPlacement']()).toBe('right'); // No overflow, should keep default
    });

    it('should handle very narrow elements near screen edge', () => {
      directive['placement'] = createInputSignalMock<SubMenuPlacement>('left');
      Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });
      jest.spyOn(hostElement, 'getBoundingClientRect').mockReturnValue({
        width: 50,
        x: 40, // x <= width + buffer (40 <= 60)
        right: 90,
        y: 100,
        height: 50,
        top: 100,
        bottom: 150,
        left: 40,
      } as DOMRect);

      debugElement.triggerEventHandler('click');

      expect(directive['customPlacement']()).toBe('right');
    });

    it('should initialize customPlacement with default placement value', () => {
      directive['placement'] = createInputSignalMock<SubMenuPlacement>('left');
      Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });
      jest.spyOn(hostElement, 'getBoundingClientRect').mockReturnValue({
        width: 150,
        x: 400,
        right: 550,
        y: 100,
        height: 50,
        top: 100,
        bottom: 150,
        left: 400,
      } as DOMRect);

      debugElement.triggerEventHandler('click');

      expect(directive['customPlacement']()).toBe('left');
    });
  });

  it('should pass customPlacement to SprOpenMenuComponent', () => {
    const directive = component.directive;

    Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });
    const getBoundingClientRectSpy = jest.spyOn(directive['hostElement'].nativeElement, 'getBoundingClientRect').mockReturnValue({
      width: 150,
      x: 200,
      right: 1100,
      y: 100,
      height: 50,
      top: 100,
      bottom: 150,
      left: 200,
    } as DOMRect);

    const mockSetInput = jest.fn();
    const mockComponentRef = {
      setInput: mockSetInput,
    } as any;

    const queryList = new QueryList<SprOpenMenuItemDirective>();
    queryList.reset([]);
    directive['items'] = queryList;
    directive['closeParentOnClick'] = createInputSignalMock(true);

    const debugElement = fixture.debugElement.query(By.directive(SprOpenSubMenuDirective));
    debugElement.triggerEventHandler('click');

    directive.setOpenMenuComponentInputParams(mockComponentRef);

    expect(mockSetInput).toHaveBeenCalledWith('placement', 'left'); // Should use customPlacement, not original
    expect(mockSetInput).toHaveBeenCalledWith('type', 'sub-menu');
    expect(mockSetInput).toHaveBeenCalledWith('items', queryList);
    expect(mockSetInput).toHaveBeenCalledWith('closeParentOnClick', true);

    getBoundingClientRectSpy.mockRestore();
  });
});
