import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DsTabHeaderComponent } from './tab-header.component';
import { getElementByCss, syncViewModel } from '../../../../shared/utils';
import { TabRouterSettings } from '../../interfaces';

describe('SprTabHeaderComponent', () => {
  let fixture: ComponentFixture<DsTabHeaderComponent>;
  let component: DsTabHeaderComponent;

  const MOCK_ROUTER_SETTINGS: TabRouterSettings = {
    routerLink: 'some-link',
    fragment: 'fragment',
    queryParams: {
      someQueryParam: 'someQueryParam',
    },
    queryParamsHandling: 'merge',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, DsTabHeaderComponent],
    });

    fixture = TestBed.createComponent(DsTabHeaderComponent);

    component = fixture.componentInstance;
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should add "tab-header-link--active" class', () => {
      component.isActive = true;

      syncViewModel(fixture);

      const debugElement = getElementByCss(fixture, '.tab-header-link');

      const buttonElement = debugElement.nativeElement as HTMLButtonElement;

      expect(buttonElement.classList.contains('tab-header-link--active')).toBeTruthy();
    });

    it('should add "tab-header-link--invalid" class', () => {
      component.isInvalid = true;

      syncViewModel(fixture);

      const debugElement = getElementByCss(fixture, '.tab-header-link');

      const buttonElement = debugElement.nativeElement as HTMLButtonElement;

      expect(buttonElement.classList.contains('tab-header-link--invalid')).toBeTruthy();
    });

    it('should disable tab', () => {
      component.isDisabled = true;

      syncViewModel(fixture);

      const debugElement = getElementByCss(fixture, '.tab-header-link');

      const buttonElement = debugElement.nativeElement as HTMLButtonElement;

      expect(buttonElement.disabled).toBeTruthy();
    });

    it('should add routerSettings', () => {
      component.routerSettings = MOCK_ROUTER_SETTINGS;

      syncViewModel(fixture);

      const debugElement = getElementByCss(fixture, '.tab-header-link');

      const buttonElement = debugElement.nativeElement as HTMLButtonElement;

      expect(buttonElement.attributes.getNamedItem('ng-reflect-query-params')).toBeTruthy();
      expect(buttonElement.attributes.getNamedItem('ng-reflect-query-params-handling')?.value).toBe(
        MOCK_ROUTER_SETTINGS.queryParamsHandling as string,
      );
      expect(buttonElement.attributes.getNamedItem('ng-reflect-router-link')?.value).toBe(MOCK_ROUTER_SETTINGS.routerLink as string);
      expect(buttonElement.attributes.getNamedItem('ng-reflect-fragment')?.value).toBe(MOCK_ROUTER_SETTINGS.fragment);
    });
  });
});
