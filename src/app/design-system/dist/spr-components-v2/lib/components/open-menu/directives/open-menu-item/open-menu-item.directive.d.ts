import { TemplateRef, ViewContainerRef } from '@angular/core';
import { NgClassDirectiveAllowedTypes } from '../../../../shared/interfaces/ng-class.interface';
import { DsOpenSubMenuDirective } from '../open-sub-menu';
import { DsOpenGroupMenuDirective } from '../open-menu-group';
import * as i0 from "@angular/core";
export declare class DsOpenMenuItemDirective {
    searchValue: import("@angular/core").InputSignal<string | number | undefined>;
    isDisabled: import("@angular/core").InputSignal<boolean>;
    isActive: import("@angular/core").InputSignal<boolean>;
    hasSubMenu: import("@angular/core").InputSignal<boolean>;
    hasTopSplitter: import("@angular/core").InputSignal<boolean>;
    hasBottomSplitter: import("@angular/core").InputSignal<boolean>;
    extraClasses: import("@angular/core").InputSignal<NgClassDirectiveAllowedTypes>;
    clicked: import("@angular/core").OutputEmitterRef<void>;
    readonly viewContainerRef: ViewContainerRef;
    readonly templateRef: TemplateRef<unknown>;
    subMenu?: DsOpenSubMenuDirective;
    groupMenu?: DsOpenGroupMenuDirective;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsOpenMenuItemDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsOpenMenuItemDirective, "ng-template[sprOpenMenuItem]", never, { "searchValue": { "alias": "sprOpenMenuItem"; "required": false; "isSignal": true; }; "isDisabled": { "alias": "isDisabled"; "required": false; "isSignal": true; }; "isActive": { "alias": "isActive"; "required": false; "isSignal": true; }; "hasSubMenu": { "alias": "hasSubMenu"; "required": false; "isSignal": true; }; "hasTopSplitter": { "alias": "hasTopSplitter"; "required": false; "isSignal": true; }; "hasBottomSplitter": { "alias": "hasBottomSplitter"; "required": false; "isSignal": true; }; "extraClasses": { "alias": "extraClasses"; "required": false; "isSignal": true; }; }, { "clicked": "clicked"; }, never, never, true, never>;
}
