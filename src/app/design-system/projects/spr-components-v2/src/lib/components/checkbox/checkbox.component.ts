import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BaseControl } from '../../shared';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { DsLabelDirective } from '../../directives/label';
import { Placement } from './interfaces/checkbox.interface';
import { COMPONENT_THEME_HOST_DIRECTIVE } from '../../directives/component-theme';

@Component({
  selector: 'ds-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, DsLabelDirective, NgbTooltip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [COMPONENT_THEME_HOST_DIRECTIVE],
  host: {
    class: 'control-action control-action__checkbox',
    '[class.control-action--decorated]': 'isDecorated',
    '[class.control-action--disabled]': 'isDisabled || control.disabled',
    '[class.control-action--reverse]': 'isLabelReverse',
  },
})
export class DsCheckboxComponent extends BaseControl<FormControl<boolean | null>> {
  @Input() isPartiallyChecked: boolean = false;
  @Input() isLabelReverse: boolean = false;
  @Input() isDecorated: boolean = false;
  @Input() isInline: boolean = false;
  @Input() rightIcon?: string;
  @Input() leftIcon?: string;
  @Input() shouldStopLabelClickEventPropagation?: boolean = false;

  // Inputs for checkbox tooltip
  @Input() tooltipClass = 'ds-component';
  @Input() checkboxTooltip = '';
  @Input() tooltipPlacement: Placement = 'auto';

  protected override initControl(): FormControl<boolean | null> {
    return this.formBuilder.nonNullable.control<boolean | null>(false);
  }
}
