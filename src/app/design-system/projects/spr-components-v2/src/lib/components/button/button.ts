import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DsBtnSpinnerDirective } from '../../directives/btn-spinner/btn-spinner.directive';
import { COMPONENT_THEME_HOST_DIRECTIVE } from '../../directives/component-theme';
import { ButtonSizeType, ButtonType, ButtonVariant } from './button.options';
import { ButtonClassesPipe } from './button-classes.pipe';

@Component({
  selector: 'ds-button',
  templateUrl: 'button.html',
  styleUrls: ['button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, ButtonClassesPipe, DsBtnSpinnerDirective],
  hostDirectives: [COMPONENT_THEME_HOST_DIRECTIVE],
  host: { '[class.disabled]': 'disabled' },
})
export class DsButton {
  @Input() variant: ButtonVariant = 'main';
  @Input() type: ButtonType = 'button';
  @Input() size: ButtonSizeType = 'lg';
  @Input() isBtnSpinner = false;
  @Input() isRadius = false;
  @Input() disabled = false;
  @Input() isIcon = false;
  @Input() buttonId = '';
  @Input() formId?: string;
}
