import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[sprOpenMenuTitle]',
})
export class SprOpenMenuTitleDirective {
  constructor(readonly templateRef: TemplateRef<unknown>) {}
}
