import { Router } from '@angular/router';
import { SidebarNavItem } from '../../interfaces/sidebar.interface';
import * as i0 from "@angular/core";
export declare class DsSidebarItemComponent {
    readonly item: import("@angular/core").InputSignal<SidebarNavItem>;
    readonly isCollapsed: import("@angular/core").InputSignal<boolean>;
    readonly nestingLevel: import("@angular/core").InputSignal<number>;
    readonly currentUrl: import("@angular/core").InputSignal<string>;
    readonly toggled: import("@angular/core").OutputEmitterRef<void>;
    readonly router: Router;
    readonly isOpen: import("@angular/core").WritableSignal<boolean>;
    constructor();
    protected onToggle(): void;
    protected isRouteActive(item: SidebarNavItem): boolean;
    private openParentGroups;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsSidebarItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsSidebarItemComponent, "ds-sidebar-item", never, { "item": { "alias": "item"; "required": true; "isSignal": true; }; "isCollapsed": { "alias": "isCollapsed"; "required": false; "isSignal": true; }; "nestingLevel": { "alias": "nestingLevel"; "required": false; "isSignal": true; }; "currentUrl": { "alias": "currentUrl"; "required": true; "isSignal": true; }; }, { "toggled": "toggled"; }, never, never, true, never>;
}
