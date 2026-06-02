import { ChangeDetectionStrategy, Component, input, ViewChild } from '@angular/core';
import { SprOpenMenuDirective } from '../spr-open-menu.directive';
import { SprOpenMenuTitleDirective } from '../../open-menu-title';
import { MenuPlacement } from '../../../interfaces/open-menu.interface';

@Component({
  imports: [SprOpenMenuDirective, SprOpenMenuTitleDirective, SprOpenMenuTitleDirective],
  template: `
    <button sprOpenMenu [placement]="placement()" [autoClose]="autoClose()" [withSubMenu]="withSubMenu()" [closeOnClick]="closeOnClick()">
      Open Menu
      <ng-template sprOpenMenuTitle>Menu Title</ng-template>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprOpenMenuTestComponent {
  @ViewChild(SprOpenMenuDirective, { static: true }) openMenuDirective!: SprOpenMenuDirective;

  autoClose = input<boolean | 'inside' | 'outside'>('outside');
  placement = input<MenuPlacement[]>(['bottom-start']);
  closeOnClick = input<boolean>(true);
  withSubMenu = input<boolean>(true);
}
