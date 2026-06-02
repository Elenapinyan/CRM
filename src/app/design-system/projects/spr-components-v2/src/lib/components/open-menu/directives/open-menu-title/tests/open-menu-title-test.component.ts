import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { DsOpenMenuTitleDirective } from '../open-menu-title.directive';

@Component({
  imports: [DsOpenMenuTitleDirective],
  template: `
    <ng-template dsOpenMenuTitle>
      <div>Title Content</div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsOpenMenuTitleTestComponent {
  @ViewChild(DsOpenMenuTitleDirective, { static: true })
  directive!: DsOpenMenuTitleDirective;
}
