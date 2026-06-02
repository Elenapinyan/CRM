import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

export interface ModalConfig<ModalData> {
  modalData?: ModalData;
  settings?: NgbModalOptions;
  parentHeight?: number;
  multi?: boolean;
}

export interface Modal<Action = void> {
  readonly closeAction: (action?: Action) => void;
}

export interface ModalWithData<ModalData, Action = void> extends Modal<Action> {
  readonly modalData: ModalData;
}

export type ModalVariant = 'default' | 'bordered' | 'filled';
