import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Constructor } from '../../../shared/interfaces/constructor.interface';
import { ModalConfig } from '../interfaces/modal.interface';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly renderer: Renderer2;

  constructor(
    private readonly ngbModal: NgbModal,
    rendererFactory2: RendererFactory2,
  ) {
    this.renderer = rendererFactory2.createRenderer(null, null);
  }

  open<ModalData extends object, Action = void>(component: Constructor, config?: ModalConfig<ModalData>): Observable<Action> {
    const { modalData, settings, parentHeight, multi } = config || {};

    if (this.ngbModal.hasOpenModals() && !multi) {
      this.ngbModal.dismissAll();
    }

    const modalRef = this.ngbModal.open(component, { ...settings, keyboard: false });

    modalRef.componentInstance.closeAction = (action?: Action): void => modalRef.dismiss(action);
    modalRef.componentInstance.modalData = modalData ? { ...modalData } : {};

    if (parentHeight) {
      this.setModalHeight();
    }

    return modalRef.dismissed;
  }

  dismissAll(reason?: any): void {
    this.ngbModal.dismissAll(reason);
  }

  isModalOpened(): boolean {
    return this.ngbModal.hasOpenModals();
  }

  private setModalHeight(): void {
    const modals = document.querySelectorAll('.modal-content');
    const parent = modals[modals.length - 2];
    const current = modals[modals.length - 1];

    this.renderer.setStyle(current, 'height', `${parent.clientHeight}px`);
  }
}
