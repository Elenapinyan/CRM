import { Pipe, PipeTransform } from '@angular/core';
import { GroupSidebarNavItem, SidebarNavItem, SidebarParentItem } from '../interfaces/sidebar.interface';

@Pipe({
  name: 'groupUnreadCount',
  standalone: true,
})
export class GroupUnreadCountPipe implements PipeTransform {
  transform(value?: SidebarParentItem | GroupSidebarNavItem | SidebarNavItem[] | null): number | null {
    if (!value) {
      return null;
    }

    return this.sumAllUnread(Array.isArray(value) ? value : value.subNavs);
  }

  private sumAllUnread(items: SidebarNavItem[] | undefined): number {
    return items?.reduce((acc, item) => ('subNavs' in item ? this.sumAllUnread(item.subNavs) : (item.unreadCount ?? 0)) + acc, 0) || 0;
  }
}
