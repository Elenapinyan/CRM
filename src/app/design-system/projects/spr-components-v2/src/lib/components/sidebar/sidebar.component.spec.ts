import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { getElementByCss, syncViewModel } from '../../shared/utils';
import { DsOpenMenuComponent } from '../open-menu';
import { SidebarParentItem } from './interfaces/sidebar.interface';
import { DsSidebarComponent } from './sidebar.component';

@Component({ template: '', changeDetection: ChangeDetectionStrategy.OnPush })
class DummyComponent {}

describe('SprSidebarComponent', () => {
  let fixture: ComponentFixture<DsSidebarComponent>;
  let component: DsSidebarComponent;

  const MOCK_ITEMS: SidebarParentItem[] = [
    {
      label: 'Parent 1',
      value: 'parent-1',
      iconClass: 'bo-icon-test-1',
      iconBg: '#ff0000',
      background: 'url(/bg1.svg)',
      subNavs: [
        {
          label: 'Menu Item 1',
          link: '/parent-1/item-1',
          type: 'link',
        },
        {
          label: 'Menu Item 2',
          type: 'group',
          subNavs: [
            {
              label: 'Menu Item 2.1',
              link: '/parent-1/item-2/sub-1',
              type: 'link',
            },
          ],
        },
      ],
    },
    {
      label: 'Parent 2',
      value: 'parent-2',
      iconClass: 'bo-icon-test-2',
      iconBg: '#00ff00',
      subNavs: [
        {
          label: 'Menu Item 3',
          link: '/parent-2/item-3',
          type: 'link',
        },
      ],
    },
  ];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [DsOpenMenuComponent],
      providers: [
        provideRouter([
          { path: '', component: DummyComponent },
          { path: 'parent-1/item-1', component: DummyComponent },
          { path: 'parent-1/item-2/sub-1', component: DummyComponent },
          { path: 'parent-2/item-3', component: DummyComponent },
        ]),
      ],
    });

    fixture = TestBed.createComponent(DsSidebarComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('items', MOCK_ITEMS);
  });

  describe('Collapse/Expand', () => {
    it('should expand sidebar when clicking collapse trigger while collapsed', () => {
      component.isMinified.set(true);
      syncViewModel(fixture);

      const collapseTrigger = getElementByCss(fixture, '[data-testid="collapse-trigger"]');
      collapseTrigger.nativeElement.click();
      syncViewModel(fixture);

      expect(component.isMinified()).toBe(false);
    });

    it('should update collapsed model to true when collapse is toggled', () => {
      syncViewModel(fixture);

      const collapseTrigger = getElementByCss(fixture, '[data-testid="collapse-trigger"]');
      collapseTrigger.nativeElement.click();
      syncViewModel(fixture);

      expect(component.isMinified()).toBe(true);
    });
  });

  describe('Parent App Dropdown', () => {
    it('should render parent dropdown trigger when items are provided', () => {
      syncViewModel(fixture);

      const dropdown = getElementByCss(fixture, '[data-testid="parent-dropdown"]');
      expect(dropdown).toBeTruthy();
    });

    it('should not render parent dropdown trigger when no items provided', () => {
      fixture.componentRef.setInput('items', []);
      syncViewModel(fixture);

      const dropdown = getElementByCss(fixture, '[data-testid="parent-dropdown"]');
      expect(dropdown).toBeFalsy();
    });

    it('should emit parentChange when selecting new parent', () => {
      const parentChangeSpy = jest.spyOn(component.parentChange, 'emit');
      syncViewModel(fixture);

      component['selectParent'](MOCK_ITEMS[1]);
      syncViewModel(fixture);

      expect(parentChangeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          text: 'Parent 2',
          value: 'parent-2',
        }),
      );
    });

    it('should not emit parentChange when selecting the same parent', () => {
      const parentChangeSpy = jest.spyOn(component.parentChange, 'emit');
      syncViewModel(fixture);

      component['selectParent'](MOCK_ITEMS[0]);
      syncViewModel(fixture);
      component['selectParent'](MOCK_ITEMS[0]);
      syncViewModel(fixture);

      expect(parentChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should select first sub-item of the parent when selecting a new parent', () => {
      const navigateSpy = jest.spyOn(component['router'], 'navigateByUrl');
      component['selectParent'](MOCK_ITEMS[0]);
      syncViewModel(fixture);

      expect(navigateSpy).toHaveBeenCalledWith('/parent-1/item-1');
    });

    it('should select parent when a menu item is clicked', () => {
      const selectParentSpy = jest.spyOn(component, 'selectParent' as never);
      syncViewModel(fixture);

      const trigger = getElementByCss(fixture, '[data-testid="parent-dropdown"]');
      trigger.nativeElement.click();
      syncViewModel(fixture);

      const menuOption = fixture.debugElement.query((el) => el.nativeElement.classList.contains('sidebar-menu-option'));
      menuOption?.nativeElement.click();
      syncViewModel(fixture);

      expect(selectParentSpy).toHaveBeenCalled();
    });
  });

  describe('News Block', () => {
    const MOCK_NEWS = {
      imageUrl: 'https://example.com/image.png',
      title: 'Test News',
      description: 'Click here',
      link: 'https://example.com',
    };

    it('should render news block when provided and not collapsed', () => {
      fixture.componentRef.setInput('newsBlock', MOCK_NEWS);
      component.isMinified.set(false);
      syncViewModel(fixture);

      const newsSection = getElementByCss(fixture, '[data-testid="news-section"]');
      expect(newsSection).toBeTruthy();
    });

    it('should not render news block when collapsed', () => {
      fixture.componentRef.setInput('newsBlock', MOCK_NEWS);
      component.isMinified.set(true);
      syncViewModel(fixture);

      const newsSection = getElementByCss(fixture, '[data-testid="news-section"]');
      expect(newsSection).toBeFalsy();
    });

    it('should hide news block when close button is clicked', () => {
      fixture.componentRef.setInput('newsBlock', MOCK_NEWS);
      component.isMinified.set(false);
      syncViewModel(fixture);

      const closeButton = getElementByCss(fixture, '[data-testid="news-close"]');
      closeButton.nativeElement.click();
      syncViewModel(fixture);

      const newsSection = getElementByCss(fixture, '[data-testid="news-section"]');
      expect(newsSection.nativeElement.classList.contains('sidebar-news--hidden')).toBe(true);
    });
  });
});
