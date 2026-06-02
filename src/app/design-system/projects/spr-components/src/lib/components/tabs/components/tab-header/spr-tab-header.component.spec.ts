import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { getElementByCss, syncViewModel } from '../../../../shared/utils';
import { TabRouterSettings } from '../../interfaces';
import { SprTabHeaderComponent } from './spr-tab-header.component';

describe('SprTabHeaderComponent', () => {
  let fixture: ComponentFixture<SprTabHeaderComponent>;
  let component: SprTabHeaderComponent;

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
      imports: [CommonModule, RouterTestingModule],
    });

    fixture = TestBed.createComponent(SprTabHeaderComponent);

    component = fixture.componentInstance;
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('View', () => {
    it('should add "is-active" class', () => {
      component.isActive = true;

      syncViewModel(fixture);

      const debugElement = getElementByCss(fixture, '.tab-header-link');

      const buttonElement = debugElement.nativeElement as HTMLButtonElement;

      expect(buttonElement.classList.contains('is-active')).toBeTruthy();
    });

    it('should add "invalid" class', () => {
      component.isInvalid = true;

      syncViewModel(fixture);

      const debugElement = getElementByCss(fixture, '.tab-header-link');

      const buttonElement = debugElement.nativeElement as HTMLButtonElement;

      expect(buttonElement.classList.contains('invalid')).toBeTruthy();
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
