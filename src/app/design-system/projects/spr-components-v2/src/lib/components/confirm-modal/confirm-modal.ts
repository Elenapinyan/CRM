import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalWithData, DsBaseModalContent } from '../modal';
import { ConfirmModalData, ConfirmModalDataWithTemplate } from './confirm-modal.options';
import { DsButton } from '../button';
import { DsBadge } from '../badge';

@Component({
  selector: 'ds-confirm-modal',
  imports: [CommonModule, DsBaseModalContent, DsButton, DsBadge],
  templateUrl: 'confirm-modal.html',
  styleUrl: 'confirm-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsConfirmModal implements ModalWithData<ConfirmModalData, boolean> {
  @Input({ required: true }) modalData!: ConfirmModalData;
  @Input() modalSettings?: NgbModalOptions;

  @Input() closeAction: (action?: boolean) => void = () => {};

  hasBodyTemplate(payload: ConfirmModalData): payload is ConfirmModalDataWithTemplate {
    return payload.body instanceof TemplateRef;
  }
}
