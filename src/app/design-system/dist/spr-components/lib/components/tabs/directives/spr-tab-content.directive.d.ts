import { TemplateRef } from '@angular/core';
import { TabConfigGuard, TabType } from '../interfaces/tabs.interface';
import * as i0 from "@angular/core";
export declare class SprTabContentDirective<Type extends TabType, Config extends TabConfigGuard<Type>> {
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
    static ngTemplateContextGuard<Type extends TabType, Config extends TabConfigGuard<Type>>(directive: SprTabContentDirective<Type, Config>, context: unknown): context is {
        $implicit: {
            $implicit: Config & {
                isActive: boolean;
            };
        };
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<SprTabContentDirective<any, any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprTabContentDirective<any, any>, "ng-template[sprTabContent]", never, { "tabKey": { "alias": "sprTabContent"; "required": false; }; }, {}, never, never, true, never>;
}
