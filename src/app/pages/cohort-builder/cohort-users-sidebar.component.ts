import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import type { CohortMatrixCell, CohortPlayerRow } from './cohort-builder.model';

@Component({
  selector: 'app-cohort-users-sidebar',
  imports: [],
  templateUrl: './cohort-users-sidebar.component.html',
  styleUrl: './cohort-users-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CohortUsersSidebarComponent {
  readonly open = input(false);
  readonly cell = input<CohortMatrixCell | null>(null);
  readonly periodLabel = input('');
  readonly intervalLabel = input('');
  readonly players = input<CohortPlayerRow[]>([]);

  readonly closed = output<void>();

  protected onClose(): void {
    this.closed.emit();
  }
}
