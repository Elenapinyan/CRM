import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarParentItem } from '../../interfaces/sidebar.interface';
import { DsSidebarMenuOption } from './sidebar-menu-option';

describe('DsSidebarMenuOption', () => {
  let fixture: ComponentFixture<DsSidebarMenuOption>;
  let component: DsSidebarMenuOption;

  const MOCK_ITEM: SidebarParentItem = {
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
  };

  beforeEach(async () => {
    fixture = TestBed.createComponent(DsSidebarMenuOption);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('item', MOCK_ITEM);
  });

  describe('Model', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    describe('isExternal', () => {
      it('should return true for URLs starting with http or https', () => {
        expect(component['isExternal']('http://example.com')).toBe(true);
        expect(component['isExternal']('https://example.com')).toBe(true);
      });

      it('should return true for protocol-relative URLs starting with //', () => {
        expect(component['isExternal']('//example.com/asset.png')).toBe(true);
      });

      it('should return false for absolute internal paths', () => {
        expect(component['isExternal']('/internal/path')).toBe(false);
      });

      it('should return false for relative internal paths', () => {
        expect(component['isExternal']('assets/logo.svg')).toBe(false);
      });

      it('should return false for an empty string', () => {
        expect(component['isExternal']('')).toBe(false);
      });
    });
  });
});
