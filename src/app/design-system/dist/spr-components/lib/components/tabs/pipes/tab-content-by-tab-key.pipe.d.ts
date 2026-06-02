import { PipeTransform, QueryList, TemplateRef } from '@angular/core';
import { SprTabContentDirective } from '../directives/spr-tab-content.directive';
import { TabConfigGuard, TabType } from '../interfaces/tabs.interface';
import * as i0 from "@angular/core";
export declare class TabContentByTabKeyPipe<Type extends TabType, Config extends TabConfigGuard<Type>> implements PipeTransform {
    transform(tabKey: string, tabContentTemplates: QueryList<SprTabContentDirective<Type, Config>>): TemplateRef<unknown> | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabContentByTabKeyPipe<any, any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TabContentByTabKeyPipe<any, any>, "tabContentByTabKey", true>;
}
