import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SprControlSizeDirective } from '../../shared';
import { ControlSize } from '../../shared/interfaces/controls-size.interface';

@Component({
  selector: 'spr-readonly-control',
  imports: [SprControlSizeDirective],
  templateUrl: './spr-readonly-control.component.html',
  styleUrls: ['./spr-readonly-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprReadonlyControlComponent {
  @Input() controlSize: ControlSize = 'md';
}
