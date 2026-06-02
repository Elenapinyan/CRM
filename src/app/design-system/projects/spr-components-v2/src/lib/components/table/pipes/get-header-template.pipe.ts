import { Pipe, PipeTransform, QueryList, TemplateRef } from '@angular/core';
import { DsTableHeaderDirective } from '../directives/table-header.directive';
import { DisplayedColumn } from '../interfaces/table.interface';

@Pipe({
  name: 'getHeaderTemplate',
  standalone: true,
})
export class GetHeaderTemplatePipe<Column extends DisplayedColumn> implements PipeTransform {
  transform(columnKey: string, headerTemplates: QueryList<DsTableHeaderDirective<Column>>): TemplateRef<{ $implicit: Column }> | undefined {
    return headerTemplates.find((directiveInstance) => directiveInstance.columnKey === columnKey)?.templateRef;
  }
}
