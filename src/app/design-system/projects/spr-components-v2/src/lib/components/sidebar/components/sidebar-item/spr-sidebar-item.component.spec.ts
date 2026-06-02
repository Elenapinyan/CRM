import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarNavItem } from '../../interfaces/sidebar.interface';
import { provideRouter } from '@angular/router';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { getElementByCss, syncViewModel } from '../../../../shared/utils';
import { DsOpenMenuComponent } from '../../../open-menu';
import { DsSidebarComponent } from '../../sidebar.component';
import { DsSidebarItemComponent } from './sidebar-item.component';

@Component({ template: '', changeDetection: ChangeDetectionStrategy.OnPush })
class DummyComponent {}

describe('SprSidebarItemComponent', () => {
  let fixture: ComponentFixture<DsSidebarItemComponent>;
  let component: DsSidebarItemComponent;

  const MOCK_LINK_ITEM: SidebarNavItem = {
    label: 'Test Link',
    link: '/test-link',
    type: 'link',
    iconClass: 'bo-icon-test',
    unreadCount: 5,
  };

  const MOCK_GROUP_ITEM: SidebarNavItem = {
    label: 'Test Group',
    type: 'group',
    iconClass: 'bo-icon-group',
    subNavs: [
      {
        label: 'Sub Item 1',
        link: '/test-group/sub-1',
        type: 'link',
      },
      {
        label: 'Sub Item 2',
        link: '/test-group/sub-2',
        type: 'link',
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsOpenMenuComponent],
      providers: [
        provideRouter([
          { path: '', component: DummyComponent },
          { path: 'test-link', component: DummyComponent },
          { path: 'test-group/sub-1', component: DummyComponent },
          { path: 'test-group/sub-2', component: DummyComponent },
        ]),
        {
          provide: DsSidebarComponent,
          useValue: {
            currentUrl: signal('/test-link'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DsSidebarItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('currentUrl', '/some/url');
  });

  describe('Link Item', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('item', MOCK_LINK_ITEM);
      fixture.componentRef.setInput('isCollapsed', false);
      syncViewModel(fixture);
    });

    it('should render link element for link type item', () => {
      const linkElement = getElementByCss(fixture, '[data-testid="sidebar-item-link"]');
      expect(linkElement).toBeTruthy();
    });

    it('should display item label', () => {
      const labelElement = getElementByCss(fixture, '[data-testid="sidebar-item-label"]');
      expect(labelElement.nativeElement.textContent.trim()).toBe('Test Link');
    });

    it('should display icon when iconClass is provided', () => {
      const iconElement = getElementByCss(fixture, '[data-testid="sidebar-item-icon"]');
      expect(iconElement).toBeTruthy();
    });

    it('should display badge with unread count', () => {
      const badgeElement = getElementByCss(fixture, '[data-testid="sidebar-item-badge"]');
      expect(badgeElement).toBeTruthy();
      expect(badgeElement.nativeElement.textContent.trim()).toBe('5');
    });

    it('should show badge as dot when collapsed', () => {
      fixture.componentRef.setInput('isCollapsed', true);
      syncViewModel(fixture);

      const badgeElement = getElementByCss(fixture, '[data-testid="sidebar-item-badge"]');
      expect(badgeElement.nativeElement.classList.contains('sidebar-item-link__badge--dot')).toBe(true);
    });

    it('should apply disabled class when item is disabled', () => {
      const disabledItem: SidebarNavItem = { ...MOCK_LINK_ITEM, isDisabled: true };
      fixture.componentRef.setInput('item', disabledItem);
      syncViewModel(fixture);

      const linkElement = getElementByCss(fixture, '[data-testid="sidebar-item-link"]');
      expect(linkElement.nativeElement.classList.contains('sidebar-item-link--disabled')).toBe(true);
    });
  });

  describe('Group Item', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('item', MOCK_GROUP_ITEM);
      fixture.componentRef.setInput('isCollapsed', false);
      syncViewModel(fixture);
    });

    it('should toggle open state when clicked', () => {
      expect(component.isOpen()).toBe(false);

      const groupElement = getElementByCss(fixture, '[data-testid="sidebar-item-group"]');
      groupElement.nativeElement.click();
      syncViewModel(fixture);

      expect(component.isOpen()).toBe(true);

      groupElement.nativeElement.click();
      syncViewModel(fixture);

      expect(component.isOpen()).toBe(false);
    });

    it('should hide sub-nav items when collapsed', () => {
      component.isOpen.set(true);
      fixture.componentRef.setInput('isCollapsed', true);
      syncViewModel(fixture);

      const subNav = getElementByCss(fixture, '[data-testid="sidebar-sub-nav"]');
      expect(subNav).toBeFalsy();
    });

    it('should NOT toggle when disabled and clicked', () => {
      const disabledGroupItem: SidebarNavItem = { ...MOCK_GROUP_ITEM, isDisabled: true };
      fixture.componentRef.setInput('item', disabledGroupItem);
      syncViewModel(fixture);

      expect(component.isOpen()).toBe(false);

      const groupElement = getElementByCss(fixture, '[data-testid="sidebar-item-group"]');
      groupElement.nativeElement.click();
      syncViewModel(fixture);

      expect(component.isOpen()).toBe(false);
    });

    it('should NOT toggle isOpen when sidebar is collapsed (uses menu instead)', () => {
      fixture.componentRef.setInput('isCollapsed', true);
      syncViewModel(fixture);

      expect(component.isOpen()).toBe(false);

      const groupElement = getElementByCss(fixture, '[data-testid="sidebar-item-group"]');
      groupElement.nativeElement.click();
      syncViewModel(fixture);

      expect(component.isOpen()).toBe(false);
    });

    it('should select first sub-item when not collapsed on click', () => {
      fixture.componentRef.setInput('isCollapsed', false);

      const groupElement = getElementByCss(fixture, '[data-testid="sidebar-item-group"]');
      groupElement.nativeElement.click();
      syncViewModel(fixture);

      expect(component.router.url).toBe('/test-group/sub-1');
    });
  });

  describe('View', () => {
    it('should apply collapsed class when isCollapsed is true', () => {
      fixture.componentRef.setInput('item', MOCK_LINK_ITEM);
      fixture.componentRef.setInput('isCollapsed', true);
      syncViewModel(fixture);

      const linkElement = getElementByCss(fixture, '[data-testid="sidebar-item-link"]');
      expect(linkElement.nativeElement.classList.contains('sidebar-item-link--collapsed')).toBe(true);
    });

    it('should show dot badge when showDotOnly is true', () => {
      const dotItem: SidebarNavItem = { ...MOCK_LINK_ITEM, showDotOnly: true };
      fixture.componentRef.setInput('item', dotItem);
      fixture.componentRef.setInput('isCollapsed', false);
      syncViewModel(fixture);

      const badgeElement = getElementByCss(fixture, '[data-testid="sidebar-item-badge"]');
      expect(badgeElement.nativeElement.classList.contains('sidebar-item-link__badge--dot')).toBe(true);
    });
  });
});
