import { Pipe, PipeTransform } from '@angular/core';
import { GroupSidebarNavItem } from '../interfaces/sidebar.interface';
import { traverseActiveNavItem } from '../utils/traverse.util';

@Pipe({
  name: 'isGroupActive',
})
export class IsGroupActivePipe implements PipeTransform {
  transform(group: GroupSidebarNavItem, currentUrl: string): boolean {
    return !!traverseActiveNavItem(group.subNavs, currentUrl);
  }
}
