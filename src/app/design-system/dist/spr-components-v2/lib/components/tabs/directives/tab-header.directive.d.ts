import { TemplateRef } from '@angular/core';
import { TabConfigGuard, TabType } from '../interfaces/tabs.interface';
import * as i0 from "@angular/core";
export declare class DsTabHeaderDirective<Type extends TabType, Config extends TabConfigGuard<Type>> {
    readonly templateRef: TemplateRef<{
        $implicit: Config & {
            isActive: boolean;
        };
    }>;
    tabKey: string;
    type: Type;
    constructor(templateRef: TemplateRef<{
        $implicit: Config & {
            isActive: boolean;
        };
    }>);
    static ngTemplateContextGuard<Type extends TabType, Config extends TabConfigGuard<Type>>(directive: DsTabHeaderDirective<Type, Config>, context: unknown): context is {
        $implicit: Config & {
            isActive: boolean;
        };
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTabHeaderDirective<any, any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsTabHeaderDirective<any, any>, "ng-template[dsTabHeader]", never, { "tabKey": { "alias": "dsTabHeader"; "required": false; }; "type": { "alias": "type"; "required": false; }; }, {}, never, never, true, never>;
}
