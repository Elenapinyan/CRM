import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { DsTabsComponent } from './tabs.component';
import { DefaultTabConfiguration, RoutingTabConfiguration } from './interfaces';
import { getElementByCss, syncViewModel } from '../../shared/utils';

describe('SprTabsComponent', () => {
  let fixture: ComponentFixture<DsTabsComponent<any, any>>;
  let component: DsTabsComponent<any, any>;
  let ngbNav: NgbNav;
  let router: Router;

  const ITEMS_MOCK: RoutingTabConfiguration[] = [
    {
      tabKey: 'one',
      text: 'One',
      destroyOnHide: true,
      routerSettings: {
        routerLink: 'one',
      },
    },
    {
      tabKey: 'two',
      text: 'Two',
      destroyOnHide: true,
      routerSettings: {
        routerLink: 'two',
      },
    },
    {
      tabKey: 'three',
      text: 'Three',
      destroyOnHide: true,
      routerSettings: {
        routerLink: 'three',
      },
    },
    {
      tabKey: 'four',
      text: 'Four',
      destroyOnHide: true,
      routerSettings: {
        routerLink: 'four',
      },
    },
  ];

  const ROUTES: Routes = [
    { path: '', component: DsTabsComponent<any, any> },
    { path: 'one', component: DsTabsComponent<any, any> },
    { path: 'two', component: DsTabsComponent<any, any> },
    { path: 'three', component: DsTabsComponent<any, any> },
    { path: 'four', component: DsTabsComponent<any, any> },
  ];

  const NAV_LIST_SELECTOR = '[data-testid="tabs-nav-list"]';
  const NAV_OUTLET_SELECTOR = '[data-testid="nav-outlet-container"]';
  const ROUTER_OUTLET_CONTAINER_SELECTOR = '[data-testid="router-outlet-container"]';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule.withRoutes(ROUTES)],
    });

    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(DsTabsComponent);

    component = fixture.componentInstance;

    ngbNav = (component as any).ngbNav as NgbNav;

    component.tabsConfig = ITEMS_MOCK;
    component.orientation = 'horizontal';
    component.variant = 'tabs--level-second';
    component.destroyOnHide = false;

    fixture.detectChanges();
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should change orientation', () => {
      component.orientation = 'vertical';

      syncViewModel(fixture);

      expect(ngbNav.orientation).toBe('vertical');
    });

    it('should change destroyOnHide', () => {
      component.destroyOnHide = true;

      syncViewModel(fixture);

      expect(ngbNav.destroyOnHide).toBeTruthy();
    });

    it('should change animation', () => {
      component.animation = true;

      syncViewModel(fixture);

      expect(ngbNav.animation).toBeTruthy();
    });

    it('should change activeId', () => {
      component.activeId = ITEMS_MOCK[0].tabKey;

      syncViewModel(fixture);

      expect(ngbNav.activeId).toBe(ITEMS_MOCK[0].tabKey);
    });

    it('should select tab', () => {
      component.select(ITEMS_MOCK[0].tabKey);

      syncViewModel(fixture);

      expect(ngbNav.activeId).toBe(ITEMS_MOCK[0].tabKey);
    });

    it('should set selected tab by url', async () => {
      const targetIndex = 1;
      const targetRoute = ITEMS_MOCK[targetIndex].routerSettings.routerLink as string;
      const targetTabKey = ITEMS_MOCK[targetIndex].tabKey as string;

      component.type = 'withRouting';

      router.initialNavigation();
      await router.navigateByUrl(targetRoute);

      (component as any).setSelectedTabByUrl();

      syncViewModel(fixture);

      expect(ngbNav.activeId).toBe(targetTabKey);
      expect(router.url).toContain(targetRoute);
    });

    it('should do nothing if a tab does not have routing', () => {
      const spyOnNgbNavSelect = jest.spyOn(ngbNav, 'select');
      const configMock: DefaultTabConfiguration = {
        tabKey: 'one',
        text: 'One',
        destroyOnHide: true,
      };

      component.tabsConfig = [configMock];
      fixture.detectChanges();

      component['setSelectedTabByUrl']();

      expect(spyOnNgbNavSelect).not.toHaveBeenCalled();
    });
  });

  describe('View', () => {
    it('should change variant', () => {
      const CLASS_MOCK = 'tabs--level-second';

      component.variant = CLASS_MOCK;

      syncViewModel(fixture);

      const debugElement = getElementByCss(fixture, NAV_LIST_SELECTOR);
      const ulElement: HTMLElement = debugElement.nativeElement;

      expect(ulElement.classList.contains(CLASS_MOCK)).toBeTruthy();
    });

    it('should change isTransparentBg', () => {
      component.isTransparentBg = true;

      syncViewModel(fixture);

      const debugElement = getElementByCss(fixture, NAV_OUTLET_SELECTOR);
      const divElement = debugElement.nativeElement;

      expect(divElement.classList.contains('tab-content--transparent')).toBeTruthy();
    });

    it('should change type', () => {
      component.type = 'withRouting';

      syncViewModel(fixture);

      const debugElement = getElementByCss(fixture, ROUTER_OUTLET_CONTAINER_SELECTOR);
      const element = debugElement.nativeElement;

      expect(element).toBeTruthy();
    });
  });
});
