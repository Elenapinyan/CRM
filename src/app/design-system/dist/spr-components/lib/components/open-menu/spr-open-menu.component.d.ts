import { AfterViewInit, ChangeDetectorRef, DestroyRef, QueryList } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { MenuPlacement, SubMenuPlacement } from './interfaces/open-menu.interface';
import { SprOpenMenuTitleDirective } from './directives/open-menu-title';
import { SprOpenMenuItemDirective } from './directives/open-menu-item';
import * as i0 from "@angular/core";
export declare class SprOpenMenuComponent implements AfterViewInit {
    private readonly cdRef;
    private readonly destroyRef;
    ngbDropdown: NgbDropdown;
    type: import("@angular/core").InputSignal<"default" | "sub-menu">;
    items: import("@angular/core").InputSignal<QueryList<SprOpenMenuItemDirective> | undefined>;
    autoClose: import("@angular/core").InputSignal<boolean | "inside" | "outside">;
    placement: import("@angular/core").InputSignal<SubMenuPlacement | MenuPlacement[] | undefined>;
    menuContainer: import("@angular/core").InputSignal<"body" | null>;
    closeOnClick: import("@angular/core").InputSignal<boolean>;
    title: import("@angular/core").InputSignal<SprOpenMenuTitleDirective | undefined>;
    withSubMenu: import("@angular/core").InputSignal<boolean>;
    closeParentOnClick: import("@angular/core").InputSignal<boolean>;
    closeDropdown: import("@angular/core").OutputEmitterRef<void>;
    closeParentMenuDropdown: import("@angular/core").OutputEmitterRef<void>;
    constructor(cdRef: ChangeDetectorRef, destroyRef: DestroyRef);
    ngAfterViewInit(): void;
    onSelect(event: MouseEvent, hasSubMenu: boolean): void;
    subMenuPlacementTypeGuard(placement: MenuPlacement[] | SubMenuPlacement): placement is SubMenuPlacement;
    private subscribeToDropdownClose;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprOpenMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprOpenMenuComponent, "spr-open-menu", never, { "type": { "alias": "type"; "required": false; "isSignal": true; }; "items": { "alias": "items"; "required": false; "isSignal": true; }; "autoClose": { "alias": "autoClose"; "required": false; "isSignal": true; }; "placement": { "alias": "placement"; "required": false; "isSignal": true; }; "menuContainer": { "alias": "menuContainer"; "required": false; "isSignal": true; }; "closeOnClick": { "alias": "closeOnClick"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "withSubMenu": { "alias": "withSubMenu"; "required": false; "isSignal": true; }; "closeParentOnClick": { "alias": "closeParentOnClick"; "required": false; "isSignal": true; }; }, { "closeDropdown": "closeDropdown"; "closeParentMenuDropdown": "closeParentMenuDropdown"; }, never, never, true, never>;
}
