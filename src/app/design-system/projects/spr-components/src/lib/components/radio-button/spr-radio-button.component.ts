import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { SprLabelDirective } from '../../directives/spr-label';
import { BaseControl } from '../../shared/models/base-control/base-control';

@Component({
  selector: 'spr-radio-button',
  imports: [CommonModule, ReactiveFormsModule, SprLabelDirective],
  templateUrl: 'spr-radio-button.component.html',
  styleUrls: ['spr-radio-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SprRadioButtonComponent extends BaseControl<FormControl<unknown>> implements OnInit {
  @Input() value: unknown;
  @Input() isDecorated: boolean = false;
  @Input() isBottomMargin: boolean = true;
  @Input() isLabelReverse: boolean = false;
  @Input() isInline: boolean = false;
  @Input() leftIcon?: string;
  @Input() rightIcon?: string;

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
