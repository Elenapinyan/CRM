import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[dsTableRow]',
  standalone: true,
})
export class DsTableRowDirective<Row extends { [key: string]: any } = { [key: string]: any }> {
  @Input({ required: true }) dsTableRow!: Row;
  @Input({ required: true }) columnKey = '';

  constructor(readonly templateRef: TemplateRef<{ $implicit: Row }>) {}

  static ngTemplateContextGuard<Row extends { [key: string]: any }>(
    directive: DsTableRowDirective<Row>,
    context: unknown,
  ): context is { $implicit: Row; rowIndex: number } {
    return true;
  }
}
