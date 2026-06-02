import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[sprTableRow]',
  standalone: true,
})
export class SprTableRowDirective<Row extends { [key: string]: any } = { [key: string]: any }> {
  @Input({ required: true }) sprTableRow!: Row;
  @Input({ required: true }) columnKey = '';

  constructor(readonly templateRef: TemplateRef<{ $implicit: Row }>) {}

  static ngTemplateContextGuard<Row extends { [key: string]: any }>(
    directive: SprTableRowDirective<Row>,
    context: unknown,
  ): context is { $implicit: Row; rowIndex: number } {
    return true;
  }
}
