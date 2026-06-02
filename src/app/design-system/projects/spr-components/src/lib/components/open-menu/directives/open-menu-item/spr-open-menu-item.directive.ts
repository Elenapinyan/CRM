import { Directive, input, TemplateRef } from '@angular/core';
import { NgClassDirectiveAllowedTypes } from '../../../../shared/interfaces/ng-class.interface';

@Directive({
  selector: 'ng-template[sprOpenMenuItem]',
})
export class SprOpenMenuItemDirective {
  isDisabled = input<boolean>(false);
  hasSubMenu = input<boolean>(false);
  hasTopSplitter = input<boolean>(false);
  hasBottomSplitter = input<boolean>(false);
  extraClasses = input<NgClassDirectiveAllowedTypes>();

  constructor(readonly templateRef: TemplateRef<unknown>) {}
}
