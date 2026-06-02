import { DsToastTemplateDirective } from './toast-template';
import * as i0 from "@angular/core";
/**
 * Aggregator directive. It can contain multiple toasts templates.
 **/
export declare class DsToastCustomDirective {
    private readonly toastService;
    /**
     * This property can be used to filter multiple directives retrieved via @ViewChildren or @ContentChildren
     **/
    id: import("@angular/core").InputSignal<string | null>;
    protected templates: import("@angular/core").Signal<readonly DsToastTemplateDirective<any>[]>;
    readonly data: import("@angular/core").Signal<import("./toast.options").ToastItemDataTemplates>;
    show(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsToastCustomDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsToastCustomDirective, "[dsToastCustom]", ["dsToastCustom"], { "id": { "alias": "id"; "required": false; "isSignal": true; }; }, {}, ["templates"], never, true, never>;
}
