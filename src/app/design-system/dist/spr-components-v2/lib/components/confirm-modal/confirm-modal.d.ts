import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalWithData } from '../modal';
import { ConfirmModalData, ConfirmModalDataWithTemplate } from './confirm-modal.options';
import * as i0 from "@angular/core";
export declare class DsConfirmModal implements ModalWithData<ConfirmModalData, boolean> {
    modalData: ConfirmModalData;
    modalSettings?: NgbModalOptions;
    closeAction: (action?: boolean) => void;
    hasBodyTemplate(payload: ConfirmModalData): payload is ConfirmModalDataWithTemplate;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsConfirmModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsConfirmModal, "ds-confirm-modal", never, { "modalData": { "alias": "modalData"; "required": true; }; "modalSettings": { "alias": "modalSettings"; "required": false; }; "closeAction": { "alias": "closeAction"; "required": false; }; }, {}, never, never, true, never>;
}
