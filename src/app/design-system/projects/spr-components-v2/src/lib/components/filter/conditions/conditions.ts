import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, filter } from 'rxjs';
import { DsConditionEquals } from './condition-equals/condition-equals';
import { DsConditionBlank } from './condition-blank/condition-blank';
import { DsConditionBetween } from './condition-between/condition-between';
import {
  BlankConditionOperator,
  BlankConditionValue,
  ConditionExtendedTypes,
  ConditionFilterType,
  ConditionPlaceholderKeys,
  CONDITIONS_FILTER_TRANSLATIONS,
  ConditionsFilterValue,
  ConditionsForm,
  DEFAULT_CONDITIONS_FILTER_TRANSLATIONS,
  getOptionsByType,
  isBetweenCondition,
  isBlankCondition,
} from './conditions.util';
import { DsDropdownComponent } from '../../dropdown';
import { DsInputComponent } from '../../input';
import { BaseControlValueAccessor, FilterValueAccessor, provideFilterValueAccessor } from '../../../shared/utils';
import { date2NgbDate, SprDateParserFormatter, SprDMYFormatter } from '../../datepicker';

@Component({
  selector: 'ds-conditions',
  templateUrl: './conditions.html',
  styleUrl: './conditions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DsDropdownComponent,
    FormsModule,
    DsInputComponent,
    DsConditionEquals,
    DsConditionBlank,
    DsConditionBetween,
    ReactiveFormsModule,
  ],
  providers: [provideFilterValueAccessor(DsConditions), SprDMYFormatter],
})
export class DsConditions extends BaseControlValueAccessor<ConditionsFilterValue | null> implements FilterValueAccessor, OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dateParserFormatter: SprDateParserFormatter =
    inject(SprDateParserFormatter, { optional: true }) ?? inject(SprDMYFormatter);

  protected readonly conditions = ConditionExtendedTypes;
  protected readonly placeholderKeys = ConditionPlaceholderKeys;

  protected readonly form = this.fb.group<ConditionsForm>({
    condition: this.fb.nonNullable.control(ConditionExtendedTypes.EQUALS),
    conditionValue: this.fb.control(null, Validators.required),
  });

  protected readonly conditionOptions = computed(() => getOptionsByType(this.type(), this.translations()));

  readonly filterValue = computed(() => {
    const v = this.value();

    if (!v) {
      return '';
    }

    return this.prettifyFilterValue(v);
  });

  /**
   * Enables/disables value auto apply.
   * @Default false
   **/
  protected readonly autoApplyDisabled = signal(false);

  /**
   * Specifies the value inputs type for filtering.
   * @Default text
   **/
  type = input<ConditionFilterType>(ConditionFilterType.TEXT);

  /**
   * Translate all options, displayed value and input placeholders.
   * Also, can be provided by token `CONDITIONS_FILTER_TRANSLATIONS`.
   * @Default If nothing set or provided DEFAULT_CONDITIONS_FILTER_TRANSLATIONS constant will be used.
   **/
  translations = input(inject(CONDITIONS_FILTER_TRANSLATIONS, { optional: true }) ?? DEFAULT_CONDITIONS_FILTER_TRANSLATIONS);

  ngOnInit(): void {
    this.formValueHandler();
  }

  resetValue(): void {
    const selectedValue = this.form.getRawValue();

    this.form.reset(
      {
        condition: selectedValue.condition,
        conditionValue: null,
      },
      { emitEvent: false },
    );

    this.value.set(null);

    this.onChange(null);
  }

  apply(): void {
    const v = this.form.getRawValue();

    this.value.set(v);
    this.onChange(v);
  }

  disableAutoApply(value: boolean): void {
    this.autoApplyDisabled.set(value);
  }

  private formValueHandler(): void {
    this.form.controls.condition.valueChanges.pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.form.controls.conditionValue.patchValue(null, { emitEvent: false });

      !this.autoApplyDisabled() && this.apply();
    });

    this.form.controls.conditionValue.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
        filter(() => !this.autoApplyDisabled()),
      )
      .subscribe(() => this.apply());
  }

  private prettifyFilterValue(value: ConditionsFilterValue): string {
    const conditionValue = value.conditionValue;
    const i18n = this.translations();

    if (value.condition === ConditionExtendedTypes.BLANK && isBlankCondition(conditionValue)) {
      const operator = conditionValue.operator === BlankConditionOperator.AND ? '&' : i18n[conditionValue.operator];

      return `${i18n[value.condition]} ${operator} ${this.prettifySelectedConditionValue(conditionValue)}`;
    }

    return this.prettifySelectedConditionValue(value);
  }

  private prettifySelectedConditionValue(value: BlankConditionValue | ConditionsFilterValue): string {
    const i18n = this.translations();

    if (value.condition === ConditionExtendedTypes.EQUALS && value.conditionValue instanceof Date) {
      const datetime = date2NgbDate(value.conditionValue);

      return `${i18n[value.condition]} ${this.dateParserFormatter.format(datetime.date)}`;
    }

    if (value.condition === ConditionExtendedTypes.BETWEEN && isBetweenCondition(value.conditionValue)) {
      if (!value.conditionValue.from || !value.conditionValue.to) {
        return '';
      }

      return `${i18n[value.condition]} ${value.conditionValue.from} – ${value.conditionValue.to}`;
    }

    if (!value.conditionValue) {
      return '';
    }

    return `${i18n[value.condition]} ${value.conditionValue}`;
  }
}
