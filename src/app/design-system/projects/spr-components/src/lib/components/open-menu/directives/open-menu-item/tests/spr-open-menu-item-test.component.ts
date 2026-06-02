import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { SprOpenMenuItemDirective } from '../spr-open-menu-item.directive';

@Component({
  selector: 'spr-open-menu-item-test',
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
  imports: [SprOpenMenuItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprOpenMenuItemTestComponent {
  @ViewChild(SprOpenMenuItemDirective, { static: true })
  directive!: SprOpenMenuItemDirective;
}
