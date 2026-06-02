import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { DsOpenMenuItemDirective } from '../open-menu-item.directive';

@Component({
  selector: 'ds-open-menu-item-test',
  template: `
    <ng-template
      sprOpenMenuItem
      [hasSubMenu]="true"
      [hasTopSplitter]="true"
      [hasBottomSplitter]="false"
      [extraClasses]="'custom-class'"
      [isDisabled]="true"
    >
      Item Content
    </ng-template>
  `,
  imports: [DsOpenMenuItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsOpenMenuItemTestComponent {
  @ViewChild(DsOpenMenuItemDirective, { static: true })
  directive!: DsOpenMenuItemDirective;
}
