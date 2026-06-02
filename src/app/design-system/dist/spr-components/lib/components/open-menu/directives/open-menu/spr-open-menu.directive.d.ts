import { ComponentRef } from '@angular/core';
import { MenuPlacement } from '../../interfaces/open-menu.interface';
import { SprOpenMenuComponent } from '../../spr-open-menu.component';
import { SprOpenMenuExtensionDirective } from '../open-menu-extension';
import { SprOpenMenuTitleDirective } from '../open-menu-title';
import * as i0 from "@angular/core";
export declare class SprOpenMenuDirective extends SprOpenMenuExtensionDirective {
    title?: SprOpenMenuTitleDirective;
    placement: import("@angular/core").InputSignal<MenuPlacement[]>;
    autoClose: import("@angular/core").InputSignal<boolean | "inside" | "outside">;
    withSubMenu: import("@angular/core").InputSignal<boolean>;
    closeOnClick: import("@angular/core").InputSignal<boolean>;
    menuContainer: import("@angular/core").InputSignal<"body" | null>;
    clickListener(): void;
    setOpenMenuComponentInputParams(componentRef: ComponentRef<SprOpenMenuComponent>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprOpenMenuDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprOpenMenuDirective, "[sprOpenMenu]", never, { "placement": { "alias": "placement"; "required": false; "isSignal": true; }; "autoClose": { "alias": "autoClose"; "required": false; "isSignal": true; }; "withSubMenu": { "alias": "withSubMenu"; "required": false; "isSignal": true; }; "closeOnClick": { "alias": "closeOnClick"; "required": false; "isSignal": true; }; "menuContainer": { "alias": "menuContainer"; "required": false; "isSignal": true; }; }, {}, ["title"], never, true, never>;
}
