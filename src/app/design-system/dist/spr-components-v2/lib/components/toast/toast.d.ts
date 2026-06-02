import { DsAutocloseBase } from '../../shared/models';
import { DsToastTemplateDirective } from './toast-template';
import { ToastItem } from './toast.options';
import * as i0 from "@angular/core";
export declare class DsToast extends DsAutocloseBase {
    item: import("@angular/core").InputSignal<ToastItem | undefined>;
    protected templates: import("@angular/core").Signal<readonly DsToastTemplateDirective<any>[]>;
    readonly data: import("@angular/core").Signal<import("./toast.options").ToastItemDataTemplates>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsToast, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsToast, "ds-toast, [ds-toast], [dsToast]", never, { "item": { "alias": "item"; "required": false; "isSignal": true; }; }, {}, ["templates"], never, true, never>;
}
