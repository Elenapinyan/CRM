import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, pairwise, startWith } from 'rxjs';
import {
  BlankConditionOperator,
  BlankConditionValue,
  ConditionFilterType,
  ConditionPlaceholderKeys,
  ConditionTypes,
  DEFAULT_CONDITIONS_FILTER_TRANSLATIONS,
} from '../conditions.util';
import { BlankConditionForm, getOptionsByType } from './condition-blank.util';
import { DsConditionEquals } from '../condition-equals/condition-equals';
import { DsConditionBetween } from '../condition-between/condition-between';
import { DsRadioButtonComponent } from '../../../radio-button';
import { DsDropdownComponent } from '../../../dropdown';
import { DsInputComponent } from '../../../input';
import { BaseControlValueAccessor } from '../../../../shared/utils';

@Component({
  selector: 'ds-conditions-filter-blank',
  templateUrl: './condition-blank.html',
  styleUrl: './condition-blank.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DsRadioButtonComponent,
    DsDropdownComponent,
    DsConditionEquals,
    FormsModule,
    DsInputComponent,
    DsConditionBetween,
    ReactiveFormsModule,
  ],
})
export class DsConditionBlank extends BaseControlValueAccessor<BlankConditionValue> implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly types = ConditionFilterType;
  protected readonly operators = BlankConditionOperator;
  protected readonly conditions = ConditionTypes;
  protected readonly placeholderKeys = ConditionPlaceholderKeys;

  protected readonly form = this.fb.group<BlankConditionForm>({
    operator: this.fb.nonNullable.control(BlankConditionOperator.OR, Validators.required),
    condition: this.fb.nonNullable.control(ConditionTypes.EQUALS, Validators.required),
    conditionValue: this.fb.control(null, Validators.required),
  });

  protected readonly options = computed(() => getOptionsByType(this.type(), this.translations()));

  type = input<ConditionFilterType>(ConditionFilterType.TEXT);

  translations = input(DEFAULT_CONDITIONS_FILTER_TRANSLATIONS);

  ngOnInit(): void {
    this.formValueHandler();
  }

  override writeValue(value: BlankConditionValue): void {
    super.writeValue(value);

    this.form.patchValue(value, { emitEvent: false });
  }

  private formValueHandler(): void {
    this.form.valueChanges
      .pipe(
        startWith(this.form.getRawValue()),
        pairwise(),
        map(([pv, cv]) => {
          if (pv.condition !== cv.condition) {
            this.form.controls.conditionValue.patchValue(null, { emitEvent: false });
          }

          return cv;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        const v = this.form.getRawValue();

        this.value.set(v);
        this.onChange(v);
      });
  }
}
