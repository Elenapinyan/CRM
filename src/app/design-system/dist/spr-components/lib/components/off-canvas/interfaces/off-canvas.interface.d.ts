import { NgbOffcanvasOptions } from '@ng-bootstrap/ng-bootstrap';
export interface OffCanvasConfig<T> {
    settings?: NgbOffcanvasOptions;
    data?: T;
}
export interface OffCanvas<Action = void> {
    readonly closeAction: (action?: Action) => void;
}
export interface OffCanvasWithData<Data, Action = void> extends OffCanvas<Action> {
    readonly data: Data;
}
