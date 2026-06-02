import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { DsOpenSubMenuDirective } from '../open-sub-menu.directive';

@Component({
  selector: 'ds-open-sub-menu-test-component',
  template: ` <div dsOpenSubMenu>Open SubMenu</div> `,
  imports: [DsOpenSubMenuDirective, DsOpenSubMenuDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsOpenSubMenuTestComponent {
  @ViewChild(DsOpenSubMenuDirective, { static: true }) directive!: DsOpenSubMenuDirective;
}
