import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[sprTableHeader]',
  standalone: true,
})
export class SprTableHeaderDirective<Column extends { [key: string]: any } = { [key: string]: any }> {
  @Input({ required: true }) sprTableHeader!: Column;
  @Input({ required: true }) columnKey = '';

  constructor(readonly templateRef: TemplateRef<{ $implicit: Column }>) {}

  static ngTemplateContextGuard<Column extends { [key: string]: any }>(
    directive: SprTableHeaderDirective<Column>,
    context: unknown,
  ): context is { $implicit: Column } {
    return true;
  }
}
