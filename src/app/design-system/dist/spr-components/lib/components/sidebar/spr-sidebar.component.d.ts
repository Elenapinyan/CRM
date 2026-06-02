import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarNavItem } from './interfaces/sidebar.interface';
import * as i0 from "@angular/core";
export declare class SprSidebarComponent implements OnInit {
    private readonly route;
    title?: string;
    items?: SidebarNavItem[];
    constructor(route: Router);
    ngOnInit(): void;
    closeOtherSubMenus(currentItem: SidebarNavItem): void;
    private checkIfSubNavItemIsOpened;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprSidebarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprSidebarComponent, "spr-sidebar", never, { "title": { "alias": "title"; "required": false; }; "items": { "alias": "items"; "required": false; }; }, {}, never, never, true, never>;
}
