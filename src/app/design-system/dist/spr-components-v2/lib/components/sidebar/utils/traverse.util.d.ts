import { Router } from '@angular/router';
import { SidebarNavItem, SidebarParentItem } from '../interfaces/sidebar.interface';
export declare function isRouteActive(link: string, router: Router, paths?: 'subset' | 'exact'): boolean;
export declare function isSameLink(link: string, route: string, paths?: 'subset' | 'exact'): boolean;
export declare function traverseActiveNavItem(items: SidebarNavItem[] | undefined, router: Router): SidebarNavItem | undefined;
export declare function traverseActiveNavItem(items: SidebarNavItem[] | undefined, currentUrl: string): SidebarNavItem | undefined;
export declare const findParentNavItem: (items: SidebarParentItem[], router: Router) => SidebarParentItem | undefined;
export declare function getFirstLinkSubItem({ item, currentUrl, }: {
    item: SidebarNavItem | SidebarParentItem;
    currentUrl: string;
}): undefined | string;
