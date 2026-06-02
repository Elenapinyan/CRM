import { Injectable } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Constructor } from '../../../shared/interfaces/constructor.interface';
import { OffCanvasConfig } from '../interfaces/off-canvas.interface';

@Injectable({
  providedIn: 'root',
})
export class OffCanvasService {
  constructor(private readonly ngbOffCanvas: NgbOffcanvas) {}

  open<Data extends object, Action = void>(component: Constructor, config?: OffCanvasConfig<Data>): Observable<boolean> {
    const settings = config?.settings || {};
    settings.keyboard ??= false;
    settings.position ??= 'end';
    settings.panelClass ??= 'ds-component';
    settings.backdropClass ??= 'ds-component';

    const ref = this.ngbOffCanvas.open(component, settings);

    ref.componentInstance.closeAction = (action?: Action): void => ref.dismiss(action);
    ref.componentInstance.data = config?.data;
    ref.componentInstance.canvasOptions = settings;

    return ref.dismissed;
  }

  dismiss(reason?: any): void {
    this.ngbOffCanvas.dismiss(reason);
  }

  isOffCanvasOpened(): boolean {
    return this.ngbOffCanvas.hasOpenOffcanvas();
  }
}
