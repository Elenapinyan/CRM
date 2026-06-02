import { TemplateRef } from '@angular/core';
import { TabConfigGuard, TabType } from '../interfaces/tabs.interface';
import * as i0 from "@angular/core";
export declare class DsTabContentDirective<Type extends TabType, Config extends TabConfigGuard<Type>> {
    readonly templateRef: TemplateRef<{
        $implicit: {
            $implicit: Config & {
                isActive: boolean;
            };
        };
    }>;
    tabKey: string;
    constructor(templateRef: TemplateRef<{
        $implicit: {
            $implicit: Config & {
                isActive: boolean;
            };
        };
    }>);
    static ngTemplateContextGuard<Type extends TabType, Config extends TabConfigGuard<Type>>(directive: DsTabContentDirective<Type, Config>, context: unknown): context is {
        $implicit: {
            $implicit: Config & {
                isActive: boolean;
            };
        };
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTabContentDirective<any, any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsTabContentDirective<any, any>, "ng-template[dsTabContent]", never, { "tabKey": { "alias": "dsTabContent"; "required": false; }; }, {}, never, never, true, never>;
}
