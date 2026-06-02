import { GroupUnreadCountPipe } from './group-unread-count.pipe';
import { SidebarParentItem } from '../interfaces/sidebar.interface';

describe('GroupUnreadCountPipe', () => {
  let pipe: GroupUnreadCountPipe;

  beforeEach(() => {
    pipe = new GroupUnreadCountPipe();
  });

  it('should return null for nullish input', () => {
    expect(pipe.transform(null)).toBeNull();
    expect(pipe.transform(undefined)).toBeNull();
  });

  it('should return 0 when no subNavs have unreadCount', () => {
    const parentItem: SidebarParentItem = {
      label: 'Test Parent',
      value: 'test-parent',
      iconClass: 'bo-icon-test',
      iconBg: '#ff0000',
      subNavs: [
        {
          label: 'Child 1',
          link: '/child-1',
          type: 'link',
        },
        {
          label: 'Child 2',
          link: '/child-2',
          type: 'link',
        },
      ],
    };

    expect(pipe.transform(parentItem)).toBe(0);
  });

  it('should sum unreadCount from direct children', () => {
    const parentItem: SidebarParentItem = {
      label: 'Test Parent',
      value: 'test-parent',
      iconClass: 'bo-icon-test',
      iconBg: '#ff0000',
      subNavs: [
        {
          label: 'Child 1',
          link: '/child-1',
          type: 'link',
          unreadCount: 5,
        },
        {
          label: 'Child 2',
          link: '/child-2',
          type: 'link',
          unreadCount: 3,
        },
      ],
    };

    expect(pipe.transform(parentItem)).toBe(8);
  });

  it('should sum unreadCount from nested children', () => {
    const parentItem: SidebarParentItem = {
      label: 'Test Parent',
      value: 'test-parent',
      iconClass: 'bo-icon-test',
      iconBg: '#ff0000',
      subNavs: [
        {
          label: 'Child 1',
          link: '/child-1',
          type: 'link',
          unreadCount: 2,
        },
        {
          label: 'Group',
          type: 'group',
          subNavs: [
            {
              label: 'Nested Child 1',
              link: '/group/nested-1',
              type: 'link',
              unreadCount: 10,
            },
            {
              label: 'Nested Child 2',
              link: '/group/nested-2',
              type: 'link',
              unreadCount: 5,
            },
          ],
        },
      ],
    };

    expect(pipe.transform(parentItem)).toBe(17);
  });

  it('should sum unreadCount from deeply nested children', () => {
    const parentItem: SidebarParentItem = {
      label: 'Test Parent',
      value: 'test-parent',
      iconClass: 'bo-icon-test',
      iconBg: '#ff0000',
      subNavs: [
        {
          label: 'Group Level 1',
          type: 'group',
          subNavs: [
            {
              label: 'Group Level 2',
              type: 'group',
              subNavs: [
                {
                  label: 'Deep Nested Child',
                  link: '/deep/nested',
                  type: 'link',
                  unreadCount: 100,
                },
              ],
            },
          ],
        },
      ],
    };

    expect(pipe.transform(parentItem)).toBe(100);
  });

  it('should return 0 for empty subNavs array', () => {
    const parentItem: SidebarParentItem = {
      label: 'Test Parent',
      value: 'test-parent',
      iconClass: 'bo-icon-test',
      iconBg: '#ff0000',
      subNavs: [],
    };

    expect(pipe.transform(parentItem)).toBe(0);
  });
});
