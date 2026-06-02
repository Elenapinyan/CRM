import { PipeTransform } from '@angular/core';
import { GroupSidebarNavItem } from '../interfaces/sidebar.interface';
import * as i0 from "@angular/core";
export declare class IsGroupActivePipe implements PipeTransform {
    transform(group: GroupSidebarNavItem, currentUrl: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsGroupActivePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IsGroupActivePipe, "isGroupActive", true>;
}
