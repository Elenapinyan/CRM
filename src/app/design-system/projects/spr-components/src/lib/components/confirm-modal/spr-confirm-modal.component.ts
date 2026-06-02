import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { ModalWithData, SprBaseModalContentComponent } from '../modal';
import { ConfirmModalData, ConfirmModalDataWithTemplate } from './interfaces/spr-confirm-modal.interface';
import { SprButtonComponent } from '../button/spr-button.component';

@Component({
  selector: 'spr-confirm-modal',
  imports: [CommonModule, SprBaseModalContentComponent, SprButtonComponent],
  templateUrl: './spr-confirm-modal.component.html',
  styleUrls: ['./spr-confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprConfirmModalComponent implements ModalWithData<ConfirmModalData, boolean> {
  @Input({ required: true }) modalData!: ConfirmModalData;

  @Input() closeAction: (action?: boolean) => void = () => {};

  hasBodyTemplate(payload: ConfirmModalData): payload is ConfirmModalDataWithTemplate {
    return payload.body instanceof TemplateRef;
  }
}
