import { TemplateRef } from '@angular/core';
import { NgClassDirectiveAllowedTypes } from '../../../../shared/interfaces/ng-class.interface';
import * as i0 from "@angular/core";
export declare class SprOpenMenuItemDirective {
    readonly templateRef: TemplateRef<unknown>;
    isDisabled: import("@angular/core").InputSignal<boolean>;
    hasSubMenu: import("@angular/core").InputSignal<boolean>;
    hasTopSplitter: import("@angular/core").InputSignal<boolean>;
    hasBottomSplitter: import("@angular/core").InputSignal<boolean>;
    extraClasses: import("@angular/core").InputSignal<NgClassDirectiveAllowedTypes>;
    constructor(templateRef: TemplateRef<unknown>);
    static ɵfac: i0.ɵɵFactoryDeclaration<SprOpenMenuItemDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprOpenMenuItemDirective, "ng-template[sprOpenMenuItem]", never, { "isDisabled": { "alias": "isDisabled"; "required": false; "isSignal": true; }; "hasSubMenu": { "alias": "hasSubMenu"; "required": false; "isSignal": true; }; "hasTopSplitter": { "alias": "hasTopSplitter"; "required": false; "isSignal": true; }; "hasBottomSplitter": { "alias": "hasBottomSplitter"; "required": false; "isSignal": true; }; "extraClasses": { "alias": "extraClasses"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
