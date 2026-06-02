import { ModalWithData } from '../modal';
import { ConfirmModalData } from './interfaces/spr-confirm-modal.interface';
import * as i0 from "@angular/core";
export declare class SprConfirmModalComponent implements ModalWithData<ConfirmModalData, boolean> {
    modalData: ConfirmModalData;
    closeAction: (action?: boolean) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SprConfirmModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SprConfirmModalComponent, "spr-confirm-modal", never, { "modalData": { "alias": "modalData"; "required": false; }; "closeAction": { "alias": "closeAction"; "required": false; }; }, {}, never, never, true, never>;
}
