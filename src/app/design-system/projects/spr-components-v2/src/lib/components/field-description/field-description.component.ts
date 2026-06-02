import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ds-field-description',
  standalone: true,
  templateUrl: './field-description.component.html',
  styleUrls: ['./field-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsFieldDescriptionComponent {}
