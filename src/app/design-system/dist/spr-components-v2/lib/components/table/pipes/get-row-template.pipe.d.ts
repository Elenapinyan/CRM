import { PipeTransform, QueryList, TemplateRef } from '@angular/core';
import { DsTableRowDirective } from '../directives/table-row.directive';
import * as i0 from "@angular/core";
export declare class GetRowTemplatePipe<Row extends {
    [key: string]: any;
}> implements PipeTransform {
    transform(columnKey: string, rowTemplates: QueryList<DsTableRowDirective<Row>>): TemplateRef<{
        $implicit: Row;
    }> | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<GetRowTemplatePipe<any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<GetRowTemplatePipe<any>, "getRowTemplate", true>;
}
