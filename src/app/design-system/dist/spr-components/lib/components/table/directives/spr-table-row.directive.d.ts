import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class SprTableRowDirective<Row extends {
    [key: string]: any;
} = {
    [key: string]: any;
}> {
    readonly templateRef: TemplateRef<{
        $implicit: Row;
    }>;
    sprTableRow: Row;
    columnKey: string;
    constructor(templateRef: TemplateRef<{
        $implicit: Row;
    }>);
    static ngTemplateContextGuard<Row extends {
        [key: string]: any;
    }>(directive: SprTableRowDirective<Row>, context: unknown): context is {
        $implicit: Row;
        rowIndex: number;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<SprTableRowDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SprTableRowDirective<any>, "ng-template[sprTableRow]", never, { "sprTableRow": { "alias": "sprTableRow"; "required": true; }; "columnKey": { "alias": "columnKey"; "required": true; }; }, {}, never, never, true, never>;
}
