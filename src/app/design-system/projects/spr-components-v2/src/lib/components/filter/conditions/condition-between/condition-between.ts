import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DsNumericInputComponent } from '../../../numeric-input';
import { BaseControlValueAccessor } from '../../../../shared/utils';
import { FormControlRecord } from '../../../../shared';
import { BetweenConditionPlaceholders, BetweenConditionValue, DEFAULT_CONDITIONS_FILTER_TRANSLATIONS } from '../conditions.util';

@Component({
  selector: 'ds-conditions-filter-between',
  templateUrl: './condition-between.html',
  styleUrl: './condition-between.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DsNumericInputComponent, FormsModule, ReactiveFormsModule],
})
export class DsConditionBetween extends BaseControlValueAccessor<BetweenConditionValue> implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly placeholderKeys = BetweenConditionPlaceholders;

  protected readonly form = this.fb.group<FormControlRecord<BetweenConditionValue>>({
    from: this.fb.control(null, [Validators.required]),
    to: this.fb.control(null, [Validators.required]),
  });

  translations = input(DEFAULT_CONDITIONS_FILTER_TRANSLATIONS);

  override writeValue(value: BetweenConditionValue): void {
    super.writeValue(value);

    this.form.patchValue(value, { emitEvent: false });
  }

  ngOnInit(): void {
    this.formValueHandler();
  }

  private formValueHandler(): void {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      const v = this.form.getRawValue();

      this.value.set(v);

      this.onChange(v);
    });
  }
}
