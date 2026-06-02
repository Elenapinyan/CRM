import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SprOpenMenuExtensionTestComponent } from './spr-open-menu-extension-test.component';
import { Subject } from 'rxjs';
import { SprOpenMenuComponent } from '../../../spr-open-menu.component';

describe('SprOpenMenuExtensionDirective', () => {
  let fixture: ComponentFixture<SprOpenMenuExtensionTestComponent>;
  let component: SprOpenMenuExtensionTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SprOpenMenuExtensionTestComponent],
    });

    fixture = TestBed.createComponent(SprOpenMenuExtensionTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create test component', () => {
    expect(component).toBeTruthy();
    expect(component.directive).toBeTruthy();
  });

  it('should dismiss menu and clear componentRef', () => {
    const fakeComponentRef = {
      destroy: jest.fn(),
    } as any;

    component.directive['componentRef'] = fakeComponentRef;

    component.directive.dismiss();

    expect(fakeComponentRef.destroy).toHaveBeenCalled();
    expect(component.directive['componentRef']).toBeNull();
  });

  it('should subscribe to closeDropdown and call dismiss()', () => {
    const closeDropdown$ = new Subject<void>();

    const mockComponent = {
      closeDropdown: {
        subscribe: (dropdown: () => void) => {
          dropdown();
          return { unsubscribe: (): void => {} };
        },
      },
    } as unknown as SprOpenMenuComponent;

    const dismissSpy = jest.spyOn(component.directive, 'dismiss');

    component.directive['subscribeToDropdownClose'](mockComponent);

    closeDropdown$.next();

    expect(dismissSpy).toHaveBeenCalled();
  });
});
