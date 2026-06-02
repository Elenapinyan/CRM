import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'spr-field-description',
  standalone: true,
  templateUrl: './spr-field-description.component.html',
  styleUrls: ['./spr-field-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprFieldDescriptionComponent {}
