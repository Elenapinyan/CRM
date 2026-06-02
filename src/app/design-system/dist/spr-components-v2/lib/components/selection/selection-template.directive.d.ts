import { TemplateRef } from '@angular/core';
import { SelectionTemplateType, TemplateContext } from './selection.util';
import * as i0 from "@angular/core";
export declare class SelectionTemplateDirective<Type extends SelectionTemplateType = SelectionTemplateType> {
    readonly templateRef: TemplateRef<unknown>;
    type: import("@angular/core").InputSignal<Type | undefined>;
    static ngTemplateContextGuard<Type extends SelectionTemplateType>(directive: SelectionTemplateDirective<Type>, context: unknown): context is TemplateContext<Type>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectionTemplateDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SelectionTemplateDirective<any>, "[sprSelectionTemplate]", never, { "type": { "alias": "sprSelectionTemplate"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
