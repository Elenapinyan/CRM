import { RendererFactory2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Constructor } from '../../../shared/interfaces/constructor.interface';
import { ModalConfig } from '../interfaces/modal.interface';
import * as i0 from "@angular/core";
export declare class ModalService {
    private readonly ngbModal;
    private readonly renderer;
    constructor(ngbModal: NgbModal, rendererFactory2: RendererFactory2);
    open<ModalData extends object, Action = void>(component: Constructor, config?: ModalConfig<ModalData>): Observable<Action>;
    dismissAll(reason?: any): void;
    isModalOpened(): boolean;
    private setModalHeight;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ModalService>;
}
