import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Constructor } from '../../../shared/interfaces/constructor.interface';
import { OffCanvasConfig } from '../interfaces/off-canvas.interface';
import * as i0 from "@angular/core";
export declare class OffCanvasService {
    private readonly ngbOffCanvas;
    constructor(ngbOffCanvas: NgbOffcanvas);
    open<Data extends object, Action = void>(component: Constructor, config?: OffCanvasConfig<Data>): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OffCanvasService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OffCanvasService>;
}
