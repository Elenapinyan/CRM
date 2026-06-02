import { Directive, Input, TemplateRef } from '@angular/core';
import { TabConfigGuard, TabType } from '../interfaces/tabs.interface';

@Directive({
  selector: 'ng-template[dsTabContent]',
  standalone: true,
})
export class DsTabContentDirective<Type extends TabType, Config extends TabConfigGuard<Type>> {
  @Input('dsTabContent') tabKey = '';

  constructor(readonly templateRef: TemplateRef<{ $implicit: { $implicit: Config & { isActive: boolean } } }>) {}

  static ngTemplateContextGuard<Type extends TabType, Config extends TabConfigGuard<Type>>(
    directive: DsTabContentDirective<Type, Config>,
    context: unknown,
  ): context is { $implicit: { $implicit: Config & { isActive: boolean } } } {
    return true;
  }
}
