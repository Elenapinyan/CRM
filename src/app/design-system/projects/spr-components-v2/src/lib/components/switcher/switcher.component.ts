import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SPR_LABEL, LabelContainerDirective } from '../../directives/label';
import { BaseControl } from '../../shared/models/base-control';
import { COMPONENT_THEME_HOST_DIRECTIVE } from '../../directives/component-theme';
import { DsControlSizeDirective } from '../../shared';

@Component({
  selector: 'ds-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule, LabelContainerDirective, DsControlSizeDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [SPR_LABEL, COMPONENT_THEME_HOST_DIRECTIVE],
  host: {
    class: 'control-action control-action__switcher',
    '[class.control-action--decorated]': 'isDecorated',
    '[class.control-action--disabled]': 'isDisabled || control.disabled',
    '[class.control-action--reverse]': 'isLabelReverse',
  },
})
export class DsSwitcherComponent extends BaseControl<FormControl<boolean | null>> {
  @Input() isDecorated: boolean = false;
  @Input() isLabelReverse: boolean = false;
  @Input() isInline: boolean = false;

  protected override initControl(): FormControl<boolean | null> {
    return this.formBuilder.nonNullable.control<boolean | null>(false);
  }
}
