import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BaseControl } from '../../shared/models/base-control/base-control';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { SprLabelDirective } from '../../directives/spr-label';
import { Placement } from './interfaces/spr-checkbox.interface';

@Component({
  selector: 'spr-checkbox',
  templateUrl: './spr-checkbox.component.html',
  styleUrls: ['./spr-checkbox.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, SprLabelDirective, NgbTooltip],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprCheckboxComponent extends BaseControl<FormControl<boolean | null>> {
  @Input() isPartiallyChecked: boolean = false;
  @Input() isLabelReverse: boolean = false;
  @Input() isDecorated: boolean = false;
  @Input() isInline: boolean = false;
  @Input() rightIcon?: string;
  @Input() leftIcon?: string;
  @Input() shouldStopLabelClickEventPropagation?: boolean = false;

  // Inputs for checkbox tooltip
  @Input() tooltipClass = '';
  @Input() checkboxTooltip = '';
  @Input() tooltipPlacement: Placement = 'auto';

  protected override initControl(): FormControl<boolean | null> {
    return this.formBuilder.nonNullable.control<boolean | null>(false);
  }
}
