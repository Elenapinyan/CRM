import { ChangeDetectionStrategy, Component, ComponentRef, Directive, ViewChild } from '@angular/core';
import { DsOpenMenuExtensionDirective } from '../open-menu-extension.directive';
import { DsOpenMenuComponent } from '../../../open-menu.component';

@Directive({
  selector: '[dsMockOpenMenuExtension]',
})
export class DsMockOpenMenuExtensionDirective extends DsOpenMenuExtensionDirective {
  override setOpenMenuComponentInputParams(componentRef: ComponentRef<DsOpenMenuComponent>): void {}
}

@Component({
  selector: 'ds-open-menu-extension-test',
  imports: [DsMockOpenMenuExtensionDirective],
  template: `<div dsMockOpenMenuExtension></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsOpenMenuExtensionTestComponent {
  @ViewChild(DsMockOpenMenuExtensionDirective, { static: true })
  directive!: DsMockOpenMenuExtensionDirective;
}
