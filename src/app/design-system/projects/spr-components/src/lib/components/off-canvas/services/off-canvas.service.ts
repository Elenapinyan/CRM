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

  open<Data extends object, Action = boolean>(component: Constructor, config?: OffCanvasConfig<Data>): Observable<Action> {
    const { data, settings } = config || {};
    const position = settings?.position || 'end';

    const ref = this.ngbOffCanvas.open(component, { ...settings, keyboard: false, position });

    ref.componentInstance.closeAction = (action?: Action): void => ref.dismiss(action);
    ref.componentInstance.data = data;

    return ref.dismissed;
  }

  dismiss(reason?: any): void {
    this.ngbOffCanvas.dismiss(reason);
  }

  isOffCanvasOpened(): boolean {
    return this.ngbOffCanvas.hasOpenOffcanvas();
  }
}
