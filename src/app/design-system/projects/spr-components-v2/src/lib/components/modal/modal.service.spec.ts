import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';
import { DsBaseModalContent } from './base-modal-content';
import { firstValueFrom } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalService],
    });

    service = TestBed.inject(ModalService);
  });

  describe('Model', () => {
    it('should inject service', () => {
      expect(service).toBeTruthy();
    });

    it('should open modal', async () => {
      const ngbModal = (service as any).ngbModal;

      const instances = firstValueFrom(ngbModal.activeInstances as EventEmitter<NgbModalRef[]>);

      service.open(DsBaseModalContent);

      const modalRef = (await instances)[0];

      expect(modalRef).toBeTruthy();
    });

    it('should close modal by ref', async () => {
      const ngbModal = (service as any).ngbModal;

      let instances = firstValueFrom(ngbModal.activeInstances as EventEmitter<NgbModalRef[]>);

      service.open(DsBaseModalContent);

      const modalRef = (await instances)[0];

      instances = firstValueFrom(ngbModal.activeInstances);

      modalRef.close();

      expect(modalRef).toBeTruthy();
      expect((await instances)?.[0]).toBeFalsy();
    });

    it('should dismiss all modals', async () => {
      const ngbModal = (service as any).ngbModal;

      let instances = firstValueFrom(ngbModal.activeInstances as EventEmitter<NgbModalRef[]>);

      service.open(DsBaseModalContent);

      const modalRef = (await instances)[0];

      instances = firstValueFrom(ngbModal.activeInstances);

      service.dismissAll();

      expect(modalRef).toBeTruthy();
      expect((await instances)?.[0]).toBeFalsy();
    });

    it('should return isModalOpened true', () => {
      service.open(DsBaseModalContent);

      expect(service.isModalOpened()).toBeTruthy();
    });

    it('should return isModalOpened false', async () => {
      const ngbModal = (service as any).ngbModal;

      let instances = firstValueFrom(ngbModal.activeInstances as EventEmitter<NgbModalRef[]>);

      service.open(DsBaseModalContent);

      const modalRef = (await instances)[0];

      service.dismissAll();

      const modalRef2 = (await instances)?.[0];

      expect(modalRef).toBeTruthy();
      expect(modalRef2).toBeFalsy();
      expect(service.isModalOpened()).toBeFalsy();
    });
  });
});
