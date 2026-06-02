import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { SprOpenMenuTitleDirective } from '../spr-open-menu-title.directive';

@Component({
  imports: [SprOpenMenuTitleDirective],
  template: `
    <ng-template sprOpenMenuTitle>
      <div>Title Content</div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprOpenMenuTitleTestComponent {
  @ViewChild(SprOpenMenuTitleDirective, { static: true })
  directive!: SprOpenMenuTitleDirective;
}
