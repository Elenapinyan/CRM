import { ChangeDetectionStrategy, Component, ComponentRef, Directive, ViewChild } from '@angular/core';
import { SprOpenMenuExtensionDirective } from '../spr-open-menu-extension.directive';
import { SprOpenMenuComponent } from '../../../spr-open-menu.component';

@Directive({
  selector: '[sprMockOpenMenuExtension]',
})
export class SprMockOpenMenuExtensionDirective extends SprOpenMenuExtensionDirective {
  override setOpenMenuComponentInputParams(componentRef: ComponentRef<SprOpenMenuComponent>): void {}
}

@Component({
  selector: 'spr-open-menu-extension-test',
  imports: [SprMockOpenMenuExtensionDirective],
  template: `<div sprMockOpenMenuExtension></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprOpenMenuExtensionTestComponent {
  @ViewChild(SprMockOpenMenuExtensionDirective, { static: true })
  directive!: SprMockOpenMenuExtensionDirective;
}
