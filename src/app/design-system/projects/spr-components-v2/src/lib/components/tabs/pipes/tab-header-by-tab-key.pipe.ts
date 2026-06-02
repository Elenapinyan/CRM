import { Pipe, PipeTransform, QueryList, TemplateRef } from '@angular/core';
import { DsTabHeaderDirective } from '../directives/tab-header.directive';
import { TabConfigGuard, TabType } from '../interfaces/tabs.interface';

@Pipe({
  name: 'tabHeaderByTabKey',
  standalone: true,
})
export class TabHeaderByTabKeyPipe<Type extends TabType, Config extends TabConfigGuard<Type>> implements PipeTransform {
  transform(tabKey: string, tabHeaderTemplates: QueryList<DsTabHeaderDirective<Type, Config>>): TemplateRef<unknown> | undefined {
    return tabHeaderTemplates.find((item) => item.tabKey === tabKey)?.templateRef;
  }
}
