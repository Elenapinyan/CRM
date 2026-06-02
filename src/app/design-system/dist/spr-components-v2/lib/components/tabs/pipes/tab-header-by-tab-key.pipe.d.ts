import { PipeTransform, QueryList, TemplateRef } from '@angular/core';
import { DsTabHeaderDirective } from '../directives/tab-header.directive';
import { TabConfigGuard, TabType } from '../interfaces/tabs.interface';
import * as i0 from "@angular/core";
export declare class TabHeaderByTabKeyPipe<Type extends TabType, Config extends TabConfigGuard<Type>> implements PipeTransform {
    transform(tabKey: string, tabHeaderTemplates: QueryList<DsTabHeaderDirective<Type, Config>>): TemplateRef<unknown> | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabHeaderByTabKeyPipe<any, any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TabHeaderByTabKeyPipe<any, any>, "tabHeaderByTabKey", true>;
}
