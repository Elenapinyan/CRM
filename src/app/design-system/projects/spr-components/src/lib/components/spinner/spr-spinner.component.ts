import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'spr-spinner',
  templateUrl: './spr-spinner.component.html',
  styleUrls: ['./spr-spinner.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprSpinnerComponent {}
