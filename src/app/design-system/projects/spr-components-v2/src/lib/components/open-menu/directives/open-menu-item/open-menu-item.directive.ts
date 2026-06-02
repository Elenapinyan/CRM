import { Directive, inject, input, output, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgClassDirectiveAllowedTypes } from '../../../../shared/interfaces/ng-class.interface';
import { DsOpenSubMenuDirective } from '../open-sub-menu';
import { DsOpenGroupMenuDirective } from '../open-menu-group';

@Directive({
  selector: 'ng-template[sprOpenMenuItem]',
})
export class DsOpenMenuItemDirective {
  // TODO: temp solution as currently not possible to easily get text from each item template to search by
  searchValue = input<string | number | undefined>(undefined, {
    alias: 'sprOpenMenuItem',
  });

  isDisabled = input<boolean>(false);
  isActive = input<boolean>(false);
  hasSubMenu = input<boolean>(false);
  hasTopSplitter = input<boolean>(false);
  hasBottomSplitter = input<boolean>(false);
  extraClasses = input<NgClassDirectiveAllowedTypes>();

  clicked = output();

  readonly viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  readonly templateRef: TemplateRef<unknown> = inject(TemplateRef);

  subMenu?: DsOpenSubMenuDirective;
  groupMenu?: DsOpenGroupMenuDirective;
}
