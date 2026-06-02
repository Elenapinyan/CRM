import { PipeTransform } from '@angular/core';
import { GroupSidebarNavItem, SidebarNavItem, SidebarParentItem } from '../interfaces/sidebar.interface';
import * as i0 from "@angular/core";
export declare class GroupUnreadCountPipe implements PipeTransform {
    transform(value?: SidebarParentItem | GroupSidebarNavItem | SidebarNavItem[] | null): number | null;
    private sumAllUnread;
    static ɵfac: i0.ɵɵFactoryDeclaration<GroupUnreadCountPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<GroupUnreadCountPipe, "groupUnreadCount", true>;
}
