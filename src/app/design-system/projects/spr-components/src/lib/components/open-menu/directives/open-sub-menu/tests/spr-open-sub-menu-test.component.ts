import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { SprOpenSubMenuDirective } from '../spr-open-sub-menu.directive';

@Component({
  selector: 'spr-open-sub-menu-test-component',
  template: ` <div sprOpenSubMenu>Open SubMenu</div> `,
  imports: [SprOpenSubMenuDirective, SprOpenSubMenuDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprOpenSubMenuTestComponent {
  @ViewChild(SprOpenSubMenuDirective, { static: true }) directive!: SprOpenSubMenuDirective;
}
