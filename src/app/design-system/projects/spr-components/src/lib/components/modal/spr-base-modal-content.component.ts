import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'spr-base-modal-content',
  templateUrl: './spr-base-modal-content.component.html',
  styleUrls: ['./spr-base-modal-content.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprBaseModalContentComponent {}
