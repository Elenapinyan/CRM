import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { DsOpenGroupMenuTitleDirective } from '../open-group-menu-title.directive';

@Component({
  imports: [DsOpenGroupMenuTitleDirective],
  template: `
    <ng-template dsOpenGroupMenuTitle>
      <div>Title Content</div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsOpenGroupMenuTitleTestComponent {
  @ViewChild(DsOpenGroupMenuTitleDirective, { static: true })
  directive!: DsOpenGroupMenuTitleDirective;
}
