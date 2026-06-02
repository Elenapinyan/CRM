import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DsOpenMenuDirective } from '../../open-menu';
import { DsOpenMenuItemDirective } from '../../open-menu-item';
import { DsOpenGroupMenuDirective } from '../open-menu-group.directive';
import { DsOpenGroupMenuTitleDirective } from '../../open-group-menu-title/open-group-menu-title.directive';

@Component({
  imports: [DsOpenMenuDirective, DsOpenMenuItemDirective, DsOpenGroupMenuDirective, DsOpenGroupMenuTitleDirective],
  template: `
    <button dsOpenMenu>
      Open menu component

      <ng-template sprOpenMenuItem>
        <div dsOpenGroupMenu>
          <ng-template dsOpenGroupMenuTitle>Group Menu title</ng-template>

          <ng-template sprOpenMenuItem> Open Menu First Item </ng-template>
        </div>
      </ng-template>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsOpenMenuGroupTestComponent {}
