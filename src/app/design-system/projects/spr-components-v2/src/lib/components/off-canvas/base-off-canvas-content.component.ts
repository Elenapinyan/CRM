import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { OffCanvasVariant } from './interfaces/off-canvas.interface';

@Component({
  selector: 'ds-base-off-canvas-content',
  templateUrl: './base-off-canvas-content.component.html',
  styleUrls: ['./base-off-canvas-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsBaseOffCanvasContentComponent {
  headerVariant = input<OffCanvasVariant>('default');
  footerVariant = input<OffCanvasVariant>('default');
}
