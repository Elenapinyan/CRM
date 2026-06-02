import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ds-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsSpinnerComponent {}
