import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { TOAST_CLASSES_BY_CONTEXT, TOAST_ICON_BY_TYPE } from './constants/toast.constant';
import { SprToastService } from './services/spr-toast.service';

@Component({
  selector: 'spr-toasts',
  templateUrl: './spr-toasts.component.html',
  styleUrls: ['./spr-toasts.component.scss'],
  imports: [NgbToastModule, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprToastsComponent {
  readonly classes = TOAST_CLASSES_BY_CONTEXT;
  readonly icons = TOAST_ICON_BY_TYPE;

  constructor(protected readonly toastService: SprToastService) {}
}
