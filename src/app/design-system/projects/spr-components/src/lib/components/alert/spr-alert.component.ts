import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass, NgSwitch, NgSwitchCase } from '@angular/common';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { AlertType } from './interfaces/alert.interface';

@Component({
  selector: 'spr-alert',
  imports: [NgSwitch, NgSwitchCase, NgbAlert, NgClass],
  templateUrl: './spr-alert.component.html',
  styleUrls: ['./spr-alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprAlertComponent {
  @Input() type: AlertType = 'info';
  @Input({ required: true }) message!: string;
  @Input() dismissible = true;
  @Input() icon?: string;
}
