import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DsControlSizeDirective } from '../../shared';
import { ControlSize } from '../../shared/interfaces/controls-size.interface';
import { DsLabelDirective } from '../../directives/label';

@Component({
  selector: 'ds-readonly-control',
  imports: [DsControlSizeDirective, DsLabelDirective],
  templateUrl: './readonly-control.component.html',
  styleUrls: ['./readonly-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsReadonlyControlComponent {
  readonly controlSize = input<ControlSize>('md');
  readonly label = input<string>('');
  readonly tooltip = input<string | null>(null);
  readonly tooltipClassForLabel = input<string>('ds-component');
}
