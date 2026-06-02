import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonSizeType, ButtonType, ButtonVariant } from './interfaces/spr-button.interface';
import { SprButtonClassesPipe } from './pipes/spr-button-classes.pipe';
import { SprBtnSpinnerDirective } from '../../directives/btn-spinner/spr-btn-spinner.directive';

@Component({
  selector: 'spr-button',
  templateUrl: 'spr-button.component.html',
  styleUrls: ['spr-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, SprButtonClassesPipe, SprBtnSpinnerDirective],
  host: { '[class.disabled]': 'disabled' },
})
export class SprButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() type: ButtonType = 'button';
  @Input() size: ButtonSizeType = 'md';
  @Input() isBtnSpinner = false;
  @Input() isRadius = false;
  @Input() disabled = false;
  @Input() isIcon = false;
  @Input() buttonId = '';
  @Input() formId?: string;
}
