import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[dsOpenMenuTitle]',
})
export class DsOpenMenuTitleDirective {
  constructor(readonly templateRef: TemplateRef<unknown>) {}
}
