import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'spr-error',
  templateUrl: './spr-error.component.html',
  styleUrls: ['./spr-error.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprErrorComponent {}
