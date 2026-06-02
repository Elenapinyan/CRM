import { Directive, inject, input, TemplateRef } from '@angular/core';
import { SelectionTemplateType, TemplateContext } from './selection.util';

@Directive({ selector: '[sprSelectionTemplate]' })
export class SelectionTemplateDirective<Type extends SelectionTemplateType = SelectionTemplateType> {
  readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);

  type = input<Type>(undefined, { alias: 'sprSelectionTemplate' });

  static ngTemplateContextGuard<Type extends SelectionTemplateType>(
    directive: SelectionTemplateDirective<Type>,
    context: unknown,
  ): context is TemplateContext<Type> {
    return true;
  }
}
