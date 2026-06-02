import { ChangeDetectionStrategy, Component, input, ViewChild } from '@angular/core';
import { DsOpenMenuDirective } from '../open-menu.directive';
import { DsOpenMenuTitleDirective } from '../../open-menu-title';
import { MenuPlacement } from '../../../interfaces/open-menu.interface';

@Component({
  imports: [DsOpenMenuDirective, DsOpenMenuTitleDirective, DsOpenMenuTitleDirective],
  template: `
    <button
      dsOpenMenu
      [menuPlacement]="placement()"
      [autoClose]="autoClose()"
      [withSubMenu]="withSubMenu()"
      [closeOnClick]="closeOnClick()"
    >
      Open Menu
      <ng-template dsOpenMenuTitle>Menu Title</ng-template>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsOpenMenuTestComponent {
  @ViewChild(DsOpenMenuDirective, { static: true }) openMenuDirective!: DsOpenMenuDirective;

  autoClose = input<boolean | 'inside' | 'outside'>('outside');
  placement = input<MenuPlacement[]>(['bottom-start']);
  closeOnClick = input<boolean>(true);
  withSubMenu = input<boolean>(true);
}
