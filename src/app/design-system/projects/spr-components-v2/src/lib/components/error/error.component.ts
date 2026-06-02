import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ds-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsErrorComponent {}
