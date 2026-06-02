import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class SprTableHeaderDirective<Column extends {
    [key: string]: any;
} = {
    [key: string]: any;
}> {
    readonly templateRef: TemplateRef<{
        $implicit: Column;
    }>;
    sprTableHeader: Column;
    columnKey: string;
    constructor(templateRef: TemplateRef<{
        $implicit: Column;
    }>);
    static ngTemplateContextGuard<Column extends {
        [key: string]: any;
    }>(directive: SprTableHeaderDirective<Column>, context: unknown): context is {
        $implicit: Column;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<SprTableHeaderDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprTableHeaderDirective<any>, "ng-template[sprTableHeader]", never, { "sprTableHeader": { "alias": "sprTableHeader"; "required": true; }; "columnKey": { "alias": "columnKey"; "required": true; }; }, {}, never, never, true, never>;
}
