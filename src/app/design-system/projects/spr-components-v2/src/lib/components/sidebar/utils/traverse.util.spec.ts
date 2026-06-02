import { traverseActiveNavItem } from './traverse.util';
import { SidebarNavItem } from '../interfaces/sidebar.interface';

describe('traversing util of sidebar', () => {
  describe(`${traverseActiveNavItem.name}`, () => {
    const MOCK_NAV_ITEMS: SidebarNavItem[] = [
      {
        label: 'Dashboard',
        link: '/dashboard',
        type: 'link',
      },
      {
        label: 'Reports',
        type: 'group',
        subNavs: [
          {
            link: '/reports/sales',
            type: 'link',
            label: 'Sales Report',
          },
          {
            label: 'Analytics',
            type: 'group',
            subNavs: [
              {
                label: 'Traffic',
                link: '/reports/analytics/traffic',
                type: 'link',
              },
            ],
          },
        ],
      },
    ];

    it('should find active item at root level', () => {
      const result = traverseActiveNavItem(MOCK_NAV_ITEMS, '/dashboard');
      expect(result).toStrictEqual(MOCK_NAV_ITEMS[0]);
    });

    it('should find active item in nested subNavs', () => {
      const result = traverseActiveNavItem(MOCK_NAV_ITEMS, '/reports/sales');
      expect(result?.label).toBe('Sales Report');
    });

    it('should find active item in deeply nested subNavs', () => {
      const result = traverseActiveNavItem(MOCK_NAV_ITEMS, '/reports/analytics/traffic');
      expect(result?.label).toBe('Traffic');
    });

    it('should return undefined when URL does not match any item', () => {
      const result = traverseActiveNavItem(MOCK_NAV_ITEMS, '/non-existent');
      expect(result).toBeUndefined();
    });

    it('should handle URLs with leading slash', () => {
      const result = traverseActiveNavItem(MOCK_NAV_ITEMS, '/dashboard');
      expect(result).toStrictEqual(MOCK_NAV_ITEMS[0]);
    });

    it('should handle URLs without leading slash', () => {
      const result = traverseActiveNavItem(MOCK_NAV_ITEMS, 'dashboard');
      expect(result).toStrictEqual(MOCK_NAV_ITEMS[0]);
    });

    it('should handle case-insensitive URLs', () => {
      const result = traverseActiveNavItem(MOCK_NAV_ITEMS, '/DASHBOARD');
      expect(result).toStrictEqual(MOCK_NAV_ITEMS[0]);
    });

    it('should return undefined for empty items array', () => {
      const result = traverseActiveNavItem([], '/dashboard');
      expect(result).toBeUndefined();
    });
  });
});
