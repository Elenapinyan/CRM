import { TemplateRef } from '@angular/core';
import { ToastItem, ToastTemplateType } from './toast.options';
import * as i0 from "@angular/core";
export declare class DsToastTemplateDirective<T = ToastItem> {
    readonly templateRef: TemplateRef<any>;
    /**
     * This property accepts the type of custom templates available.
     **/
    type: import("@angular/core").InputSignal<ToastTemplateType>;
    static ngTemplateContextGuard<T>(dir: DsToastTemplateDirective<T>, ctx: unknown): ctx is {
        $implicit: T;
        index: number;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<DsToastTemplateDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsToastTemplateDirective<any>, "[dsToastTemplate]", never, { "type": { "alias": "dsToastTemplate"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}
