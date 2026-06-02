import { Directive, Input, TemplateRef } from '@angular/core';
import { TabConfigGuard, TabType } from '../interfaces/tabs.interface';

@Directive({
  selector: 'ng-template[sprTabHeader]',
  standalone: true,
})
export class SprTabHeaderDirective<Type extends TabType, Config extends TabConfigGuard<Type>> {
  @Input('sprTabHeader') tabKey = '';
  @Input() type: Type = 'default' as Type;

  constructor(readonly templateRef: TemplateRef<{ $implicit: Config & { isActive: boolean } }>) {}

  static ngTemplateContextGuard<Type extends TabType, Config extends TabConfigGuard<Type>>(
    directive: SprTabHeaderDirective<Type, Config>,
    context: unknown,
  ): context is { $implicit: Config & { isActive: boolean } } {
    return true;
  }
}
