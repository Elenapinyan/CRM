import { Pipe, PipeTransform, QueryList, TemplateRef } from '@angular/core';
import { DsTableRowDirective } from '../directives/table-row.directive';

@Pipe({
  name: 'getRowTemplate',
  standalone: true,
})
export class GetRowTemplatePipe<Row extends { [key: string]: any }> implements PipeTransform {
  transform(columnKey: string, rowTemplates: QueryList<DsTableRowDirective<Row>>): TemplateRef<{ $implicit: Row }> | undefined {
    return rowTemplates.find((directiveInstance) => directiveInstance.columnKey === columnKey)?.templateRef;
  }
}
