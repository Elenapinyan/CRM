import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[dsTableHeader]',
  standalone: true,
})
export class DsTableHeaderDirective<Column extends { [key: string]: any } = { [key: string]: any }> {
  @Input({ required: true }) dsTableHeader!: Column;
  @Input({ required: true }) columnKey = '';

  constructor(readonly templateRef: TemplateRef<{ $implicit: Column }>) {}

  static ngTemplateContextGuard<Column extends { [key: string]: any }>(
    directive: DsTableHeaderDirective<Column>,
    context: unknown,
  ): context is { $implicit: Column } {
    return true;
  }
}
