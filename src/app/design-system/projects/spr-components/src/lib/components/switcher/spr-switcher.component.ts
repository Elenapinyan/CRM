import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SPR_LABEL, SprLabelContainerDirective, SprLabelDirective } from '../../directives/spr-label';
import { BaseControl } from '../../shared/models/base-control/base-control';

@Component({
  selector: 'spr-switcher',
  templateUrl: './spr-switcher.component.html',
  styleUrls: ['./spr-switcher.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule, SprLabelContainerDirective, SprLabelDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [SPR_LABEL],
})
export class SprSwitcherComponent extends BaseControl<FormControl<boolean | null>> {
  @Input() isDecorated: boolean = false;
  @Input() isLabelReverse: boolean = false;
  @Input() isInline: boolean = false;
  @Input() secondLabel: string | null = null;
  @Input() secondTooltip: string | null = null;

  protected override initControl(): FormControl<boolean | null> {
    return this.formBuilder.nonNullable.control<boolean | null>(false);
  }
}
