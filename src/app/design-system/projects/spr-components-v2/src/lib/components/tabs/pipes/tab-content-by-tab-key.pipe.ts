import { Pipe, PipeTransform, QueryList, TemplateRef } from '@angular/core';
import { DsTabContentDirective } from '../directives/tab-content.directive';
import { TabConfigGuard, TabType } from '../interfaces/tabs.interface';

@Pipe({
  name: 'tabContentByTabKey',
  standalone: true,
})
export class TabContentByTabKeyPipe<Type extends TabType, Config extends TabConfigGuard<Type>> implements PipeTransform {
  transform(tabKey: string, tabContentTemplates: QueryList<DsTabContentDirective<Type, Config>>): TemplateRef<unknown> | undefined {
    return tabContentTemplates.find((item) => item.tabKey === tabKey)?.templateRef;
  }
}
