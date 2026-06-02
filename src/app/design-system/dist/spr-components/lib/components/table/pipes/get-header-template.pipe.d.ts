import { PipeTransform, QueryList, TemplateRef } from '@angular/core';
import { SprTableHeaderDirective } from '../directives/spr-table-header.directive';
import { DisplayedColumn } from '../interfaces/table.interface';
import * as i0 from "@angular/core";
export declare class GetHeaderTemplatePipe<Column extends DisplayedColumn> implements PipeTransform {
    transform(columnKey: string, headerTemplates: QueryList<SprTableHeaderDirective<Column>>): TemplateRef<{
        $implicit: Column;
    }> | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<GetHeaderTemplatePipe<any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<GetHeaderTemplatePipe<any>, "getHeaderTemplate", true>;
}
