import { Directive, Input, TemplateRef } from '@angular/core';
import { TabConfigGuard, TabType } from '../interfaces/tabs.interface';

@Directive({
  selector: 'ng-template[dsTabHeader]',
  standalone: true,
})
export class DsTabHeaderDirective<Type extends TabType, Config extends TabConfigGuard<Type>> {
  @Input('dsTabHeader') tabKey = '';
  @Input() type: Type = 'default' as Type;

  constructor(readonly templateRef: TemplateRef<{ $implicit: Config & { isActive: boolean } }>) {}

  static ngTemplateContextGuard<Type extends TabType, Config extends TabConfigGuard<Type>>(
    directive: DsTabHeaderDirective<Type, Config>,
    context: unknown,
  ): context is { $implicit: Config & { isActive: boolean } } {
    return true;
  }
}
