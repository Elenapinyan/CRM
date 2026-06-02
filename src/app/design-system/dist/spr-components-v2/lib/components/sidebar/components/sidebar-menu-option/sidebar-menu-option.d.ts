import { SidebarParentItem } from '../../interfaces/sidebar.interface';
import * as i0 from "@angular/core";
export declare class DsSidebarMenuOption {
    readonly item: import("@angular/core").InputSignal<SidebarParentItem>;
    protected isExternal(url: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsSidebarMenuOption, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsSidebarMenuOption, "ds-sidebar-menu-option", never, { "item": { "alias": "item"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}
