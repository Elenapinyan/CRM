import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { DsLabelDirective } from '../../directives/label';
import { BaseControl } from '../../shared';
import { COMPONENT_THEME_HOST_DIRECTIVE } from '../../directives/component-theme';

@Component({
  selector: 'ds-radio-button',
  imports: [CommonModule, ReactiveFormsModule, DsLabelDirective],
  templateUrl: 'radio-button.component.html',
  styleUrls: ['radio-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [COMPONENT_THEME_HOST_DIRECTIVE],
  host: {
    class: 'control-action control-action__radio',
    '[class.control-action--decorated]': 'isDecorated',
    '[class.control-action--bottom-margin]': 'isBottomMargin',
    '[class.control-action--disabled]': 'isDisabled || control.disabled',
    '[class.control-action--reverse]': 'isLabelReverse',
  },
})
export class DsRadioButtonComponent extends BaseControl<FormControl<unknown>> implements OnInit {
  @Input() value: unknown;
  @Input() isDecorated: boolean = false;
  @Input() isBottomMargin: boolean = true;
  @Input() isLabelReverse: boolean = false;
  @Input() isInline: boolean = false;
  @Input() leftIcon?: string;
  @Input() rightIcon?: string;
  @Input() name?: string;

  override ngOnInit(): void {
    super.ngOnInit();
    this.ngControl?.control?.valueChanges
      .pipe(
        filter((v) => v !== this.value),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.control.setValue(null, { emitEvent: false });
      });
  }

  protected override initControl(): FormControl<unknown> {
    return this.formBuilder.nonNullable.control<unknown>(null);
  }
}
