import { Directive, inject, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: 'ng-template[dsOpenGroupMenuTitle]',
})
export class DsOpenGroupMenuTitleDirective {
  readonly viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  readonly templateRef: TemplateRef<unknown> = inject(TemplateRef);
}
