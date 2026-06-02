import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { SprBaseOffCanvasContentComponent } from '../spr-base-off-canvas-content.component';
import { OffCanvasService } from './off-canvas.service';

describe('OffCanvasService', () => {
  let service: OffCanvasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OffCanvasService],
    });

    service = TestBed.inject(OffCanvasService);
  });

  describe('Model', () => {
    it('should inject service', () => {
      expect(service).toBeTruthy();
    });

    it('should open offCanvas', async () => {
      const ngbOffCanvas = (service as any).ngbOffCanvas;

      const instance = firstValueFrom(ngbOffCanvas.activeInstance);

      service.open(SprBaseOffCanvasContentComponent);

      const ngbOffCanvasRef = await instance;

      expect(ngbOffCanvasRef).toBeTruthy();
    });

    describe('dismiss', () => {
      it('should call ngbOffcanvas.dismiss with the provided reason', () => {
        const dismissSpy = jest.spyOn((service as any).ngbOffCanvas, 'dismiss');
        const reason = 'cancel';

        service.dismiss(reason);
        expect(dismissSpy).toHaveBeenCalledWith(reason);
      });
    });

    describe('isOffCanvasOpened', () => {
      it('should return true if ngbOffcanvas has open offcanvas', () => {
        jest.spyOn((service as any).ngbOffCanvas, 'hasOpenOffcanvas').mockReturnValue(true);

        expect(service.isOffCanvasOpened()).toBe(true);
      });

      it('should return false if ngbOffcanvas has no open offcanvas', () => {
        jest.spyOn((service as any).ngbOffCanvas, 'hasOpenOffcanvas').mockReturnValue(false);

        expect(service.isOffCanvasOpened()).toBe(false);
      });
    });
  });
});
