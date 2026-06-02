import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class DsTableHeaderDirective<Column extends {
    [key: string]: any;
} = {
    [key: string]: any;
}> {
    readonly templateRef: TemplateRef<{
        $implicit: Column;
    }>;
    dsTableHeader: Column;
    columnKey: string;
    constructor(templateRef: TemplateRef<{
        $implicit: Column;
    }>);
    static ngTemplateContextGuard<Column extends {
        [key: string]: any;
    }>(directive: DsTableHeaderDirective<Column>, context: unknown): context is {
        $implicit: Column;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTableHeaderDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsTableHeaderDirective<any>, "ng-template[dsTableHeader]", never, { "dsTableHeader": { "alias": "dsTableHeader"; "required": true; }; "columnKey": { "alias": "columnKey"; "required": true; }; }, {}, never, never, true, never>;
}
