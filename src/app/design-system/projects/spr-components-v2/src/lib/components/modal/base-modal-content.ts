import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ModalVariant } from './modal.options';

@Component({
  selector: 'ds-base-modal-content',
  templateUrl: './base-modal-content.html',
  styleUrls: ['./base-modal-content.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsBaseModalContent {
  headerVariant = input<ModalVariant>('default');
  footerVariant = input<ModalVariant>('default');
}
