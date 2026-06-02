import { Directive, Input, TemplateRef } from '@angular/core';
import { TabConfigGuard, TabType } from '../interfaces/tabs.interface';

@Directive({
  selector: 'ng-template[sprTabContent]',
  standalone: true,
})
export class SprTabContentDirective<Type extends TabType, Config extends TabConfigGuard<Type>> {
  @Input('sprTabContent') tabKey = '';

  constructor(readonly templateRef: TemplateRef<{ $implicit: { $implicit: Config & { isActive: boolean } } }>) {}

  static ngTemplateContextGuard<Type extends TabType, Config extends TabConfigGuard<Type>>(
    directive: SprTabContentDirective<Type, Config>,
    context: unknown,
  ): context is { $implicit: { $implicit: Config & { isActive: boolean } } } {
    return true;
  }
}
