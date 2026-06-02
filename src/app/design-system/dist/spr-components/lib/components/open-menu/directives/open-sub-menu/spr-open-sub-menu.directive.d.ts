import { AfterViewInit, ComponentRef, ElementRef, Renderer2 } from '@angular/core';
import { SubMenuPlacement } from '../../interfaces/open-menu.interface';
import { SprOpenMenuComponent } from '../../spr-open-menu.component';
import { SprOpenMenuExtensionDirective } from '../open-menu-extension';
import { SprOpenMenuDirective } from '../open-menu';
import * as i0 from "@angular/core";
export declare class SprOpenSubMenuDirective extends SprOpenMenuExtensionDirective implements AfterViewInit {
    private readonly openMenuDirective;
    private readonly hostElement;
    private readonly renderer2;
    closeParentOnClick: import("@angular/core").InputSignal<boolean>;
    placement: import("@angular/core").InputSignal<SubMenuPlacement>;
    private readonly customPlacement;
    constructor(openMenuDirective: SprOpenMenuDirective, hostElement: ElementRef<HTMLElement>, renderer2: Renderer2);
    ngAfterViewInit(): void;
    mouseEnterListener(): void;
    setOpenMenuComponentInputParams(componentRef: ComponentRef<SprOpenMenuComponent>): void;
    private addSpecialClasses;
    private subscribeToCloseParentMenuDropdown;
    private subscribeToMouseLeaveEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprOpenSubMenuDirective, [{ optional: true; host: true; }, null, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprOpenSubMenuDirective, "[sprOpenSubMenu]", never, { "closeParentOnClick": { "alias": "closeParentOnClick"; "required": false; "isSignal": true; }; "placement": { "alias": "placement"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
