import { AfterViewInit, ComponentRef } from '@angular/core';
import { SubMenuPlacement } from '../../interfaces/open-menu.interface';
import { DsOpenMenuComponent } from '../../open-menu.component';
import { DsOpenMenuExtensionDirective } from '../open-menu-extension';
import * as i0 from "@angular/core";
export declare class DsOpenSubMenuDirective extends DsOpenMenuExtensionDirective implements AfterViewInit {
    closeParentOnClick: import("@angular/core").InputSignal<boolean>;
    placement: import("@angular/core").InputSignal<SubMenuPlacement>;
    private readonly customPlacement;
    private readonly parentMenuItem;
    private readonly openMenuDirective;
    private readonly hostElement;
    private readonly renderer2;
    constructor();
    ngAfterViewInit(): void;
    mouseEnterListener(): void;
    setOpenMenuComponentInputParams(componentRef: ComponentRef<DsOpenMenuComponent>): void;
    private addSpecialClasses;
    private subscribeToCloseParentMenuDropdown;
    private subscribeToMouseLeaveEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsOpenSubMenuDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsOpenSubMenuDirective, "[dsOpenSubMenu]", never, { "closeParentOnClick": { "alias": "closeParentOnClick"; "required": false; "isSignal": true; }; "placement": { "alias": "placement"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
